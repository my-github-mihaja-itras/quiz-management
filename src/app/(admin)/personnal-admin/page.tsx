"use client";

import ListSection from "@/components/shared/liste-section/listSection.component";
import { ComponentType, useContext, useEffect, useState } from "react";
import Loader from "@/components/loader/loader";

/**
 * State par défaut pour l'initialisation de la liste
 */
import {
  DeleteAdministrationById,
  getPaginatedAdministration,
} from "@/services/administration/administration.service";
import {
  administrationFilterByItem,
  administrationFilterConstant,
} from "@/cores/filterConstants/administration.constant";
import { Role } from "@/services/role/role.models";
import { Group } from "@/services/group/group.models";
import Dropdown from "@/components/shared/dropdown/dropDown.component";
import IconEdit from "@/components/shared/icons/iconEdit";
import { useRouter } from "next/navigation";
import IconDelete from "@/components/shared/icons/iconDelete";
import { getDate, getTime } from "@/utils/date.utils";
import ConfirmModal from "@/components/modal/confirmModal";
import { Media } from "react-data-table-component";

import {
  FilterKeywords,
  ParsedType,
} from "@/components/shared/filter/filter.constant";
import { getGroupCount, getRoleCount } from "@/services/user/user-service";
import { CountextType, Privileges } from "@/context/privileges.context";
import { GroupCell, RoleCell } from "@/components/shared/dropdown/cell.style";
import { addOpacityToColor } from "@/utils/color.utils";
import { teacherFilterOptionConstant } from "@/cores/filterConstants/teacher.constant";
import { Administration } from "@/services/administration/administration.model";
import { HttpStatusCode } from "axios";

const PersonalAdminList = () => {
  const [currentPageNumber, setCurrentPageNumberPage] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [rowPerPage, setRowPerPage] = useState<number>(20);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [totalPage, setTotalPage] = useState<number>(0);

  // State pour les données a insérer dans la table
  const [administrationsData, setAdministrationsData] = useState<
    Administration[]
  >([]);

  // State pour les filtre non constante
  const [roles, setRoles] = useState<Role[]>([]);
  const [updatedFilter, setUpdatedFilter] = useState(
    administrationFilterConstant
  );
  const [groups, setGroups] = useState<Group[]>([]);
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const [message, setMessage] = useState<{}>({});
  const router = useRouter();

  //Filter Keywords
  const [filterKeywords, setFilterKeywords] = useState<FilterKeywords[]>([]);

  //Search Keywords
  const [searchKeywords, setSearchKeywords] = useState<string>("");

  // context that store the privileges values
  const { privilegesContext, setPrivilegesContext }: CountextType =
    useContext(Privileges);

  /**
   * Fonction qui recharge les données du server
   */
  const fetchData = async () => {
    const res = await getPaginatedAdministration(
      currentPageNumber,
      rowPerPage,
      filterKeywords,
      searchKeywords
    );
    if (res.status === HttpStatusCode.Ok) {
      const totalPage = res.data.data.pageNumber;
      const totalItems = res.data.data.totalItems;
      setTotalRows(totalItems);
      setTotalPage(totalPage);
      const administrationData: Administration[] = res.data.data.items;
      setAdministrationsData(administrationData);

      setisLoading(false);
    }
  };

  //
  const loadGroupAndRoles = async () => {
    const rolesRes = await getRoleCount();

    const groupsRes = await getGroupCount();

    setRoles(rolesRes.data.data.items);
    setGroups(groupsRes.data.data.items);

    setisLoading(false);
  };

  useEffect(() => {
    fetchData();
    loadGroupAndRoles();
  }, [currentPageNumber, rowPerPage, filterKeywords, searchKeywords]);

  // Fonction qui attribue le numero de page
  const handleChangePage = (currentPageNumber: any) => {
    setCurrentPageNumberPage(currentPageNumber);
  };

  // Fonction qui attribue la nombre d'element par page
  const handleChangeRowPerPage = (rowPerPage: any) => {
    setRowPerPage(rowPerPage);
    if (rowPerPage === totalRows) {
      setCurrentPageNumberPage(1);
    }
  };

  // Fonction qui fait mets a jour le constant du filtre si le filtre est variable
  const updateFiltersConstant = (
    dataToTransform: any,
    title: string,
    name: string,
    type: ParsedType
  ) => {
    const transformedData = dataToTransform.map((item: any) => ({
      label: item.name,
      value: item.name,
      count: item.count,
    }));

    setUpdatedFilter((prevFilters) => {
      const newFilters = [
        ...prevFilters,
        {
          title,
          name,
          type,
          element: transformedData,
        },
      ];
      return newFilters;
    });
  };

  // Extract keywords for search
  const handleSearchKeywordsChange = (keywords: any) => {
    setSearchKeywords(keywords);
  };

  const handleChangeFilter = (keywordsList: any) => {
    setFilterKeywords(keywordsList);
  };

  useEffect(() => {
    setUpdatedFilter(administrationFilterConstant);
    updateFiltersConstant(groups, "Groupe", "groups.name", ParsedType.LIST);
    updateFiltersConstant(roles, "Rôles", "roles.name", ParsedType.LIST);
  }, [groups, roles]);

  const administrationsColumns = [
    {
      name: "Identifiant",
      selector: (row: Administration) => row.user?.username,
      sortable: true,
    },
    {
      name: "Nom",
      selector: (row: Administration) => row.user?.lastname,
      sortable: true,
    },
    {
      name: "Prénom(s)",
      selector: (row: Administration) => row.user?.firstname,

      sortable: true,
    },
    {
      name: "Groupe",
      selector: (row: Administration) => row?.user?.groups,
      sortable: true,
      left: true,
      hide: Media.SM,
      cell: (row: Administration) => {
        const groupAlias = row?.user?.groups?.map(
          (group: { alias: string }) => group.alias
        );
        const groupNames =
          row?.user?.groups.map((group: { name: string }) => group.name) || [];
        const roleColor =
          row?.user?.roles.map((role: any) => role?.color) || [];

        return (
          <>
            {groupAlias?.map((groupAlias, index) => (
              <GroupCell key={index} color={roleColor[index]}>
                <span>{groupNames[index]}</span>
                {groupAlias}
              </GroupCell>
            ))}
          </>
        );
      },
    },
    {
      name: "Poste",
      selector: (row: Administration) => row.position,
      sortable: true,
    },
    {
      name: "Rôle",
      selector: (row: Administration) => row?.user?.roles,
      sortable: true,
      left: true,
      hide: Media.SM,

      cell: (row: Administration) => {
        const roleAlias = row?.user?.roles.map(
          (role: { alias: string }) => role.alias
        );
        const roleName =
          row?.user?.roles.map((role: { name: string }) => role?.name) || [];
        const roleColor =
          row?.user?.roles.map((role: any) => role?.color) || [];
        return (
          <>
            {roleAlias?.map((roleAlias, index) => (
              <RoleCell
                key={index}
                bg={addOpacityToColor(roleColor[index], 0.2)}
                color={roleColor[index]}
              >
                <span>{roleName[index]}</span>
                {roleAlias}
              </RoleCell>
            ))}
          </>
        );
      },
    },
    {
      name: "Date d'entrée",
      selector: (row: Administration) => row.user?.creationDate,
      sortable: true,
      cell: (row: Administration) => {
        const date = getDate(row.user?.creationDate);
        const time = getTime(row.user?.creationDate);

        return (
          <div>
            {date} <span style={{ color: "#B4B4B4" }}> {time} </span>
          </div>
        );
      },
    },
    {
      name: "",
      button: true,
      allowOverflow: true,
      accessor: "actionColumn",
      disableSortBy: true,
      width: "5%",
      cell: (row: Administration) => {
        function handleEdit(adminId: string): void {
          router.push("/personnal-admin/" + adminId);
        }

        function handleDelete(_id: string): void {
          setIsOpen(true);
          setMessage({
            title: "Confirmation",
            message: "Voulez vous vraiment supprimer",
            confirmText: "Confirmer",
            id: _id,
          });
        }

        const [openDropdownId, setOpenDropdownId] = useState(null);
        const handleToggleDropdown = (id: any) => {
          setOpenDropdownId((prevId) => (prevId === id ? null : id));
        };

        return (
          <div>
            <Dropdown
              key={row?._id}
              id={row?._id}
              isOpen={openDropdownId === row?._id}
              onToggle={handleToggleDropdown}
            >
              <button onClick={() => row._id && handleEdit(row?._id)}>
                <IconEdit /> <span style={{ color: "#0231A8" }}>Consulter</span>
              </button>
              {/* {privilegesContext.delete_administration ? (
                <button
                  onClick={() => {
                    row._id && handleDelete(row?._id);
                  }}
                >
                  <IconDelete />{" "}
                  <span style={{ color: "#D35151" }}>Supprimer</span>
                </button>
              ) : (
                <></>
              )} */}
            </Dropdown>
          </div>
        );
      },
    },
  ];
  const handleConfirmation = async (id: string) => {
    setisLoading(true);
    const response = await DeleteAdministrationById(id);

    if (response.status === 200) {
      window.location.reload();
      setIsOpen(false);
      setisLoading(false);
    } else {
      setIsOpen(false);
      setisLoading(false);
    }
  };
  const closeModal = (value: boolean) => {
    setIsOpen(value);
  };
  return (
    <>
      {isLoading && <Loader />}
      {isOpen && (
        <ConfirmModal
          close={closeModal}
          message={message}
          handleConfirmation={handleConfirmation}
        />
      )}
      <ListSection
        listeTitle="Personnel administratif"
        tableColumns={administrationsColumns}
        tableData={administrationsData}
        tableTotalRows={totalRows}
        handlePageNumberChange={handleChangePage}
        handleRowPerPageNumberChange={handleChangeRowPerPage}
        currentPageNumber={currentPageNumber}
        totalRowPerPage={rowPerPage}
        hasAddButton={true}
        hasFilter={true}
        choiceFilterOption={updatedFilter}
        dateFilterOption={teacherFilterOptionConstant}
        hasChoiceFilter={false}
        hasDateFilter={true}
        conditionalFilter={administrationFilterByItem}
        isLoading={isLoading}
        totalPageNumber={totalPage}
        allDataToExport={[]}
        redirectLink="/personnal-admin/add"
        handleFilterKeywordsChange={handleChangeFilter}
        handleSearchKeywordsChange={handleSearchKeywordsChange}
      />
    </>
  );
};

export default PersonalAdminList;
