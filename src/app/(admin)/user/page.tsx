"use client";

import ListSection from "@/components/shared/liste-section/listSection.component";
import { useContext, useEffect, useState } from "react";
import {
  DeleteUserById,
  DisableUserById,
  getActivityCount,
  getAllUser,
  getGroupCount,
  getPaginatedUser,
  getRoleCount,
} from "@/services/user/user-service";
import {
  userFilterByItem,
  userFilterConstant,
  userDateFilterOptionConstant,
} from "@/cores/filterConstants/user.constant";
import { Role } from "@/services/role/role.models";
import { Group } from "@/services/group/group.models";
import { GroupCell, RoleCell } from "@/components/shared/dropdown/cell.style";
import { addOpacityToColor, getColorClass } from "@/utils/color.utils";
import IconActive from "@/components/shared/icons/iconActive";
import IconDisable from "@/components/shared/icons/iconDisable";
import { getDate, getTime, isoDateStringToDate } from "@/utils/date.utils";
import { useRouter } from "next/navigation";
import Dropdown from "@/components/shared/dropdown/dropDown.component";
import IconEdit from "@/components/shared/icons/iconEdit";
import IconDisableUser from "@/components/shared/icons/iconDisableUser";
import IconDelete from "@/components/shared/icons/iconDelete";
import ConfirmModal from "@/components/modal/confirmModal";
import {
  ChoiceFilterType,
  FilterKeywords,
  ParsedType,
} from "@/components/shared/filter/filter.constant";
import { Media } from "react-data-table-component";
import { CountextType, Privileges } from "@/context/privileges.context";
import { User } from "@/services/user/user.models";

const UserList = () => {
  const [currentPageNumber, setCurrentPageNumberPage] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [rowPerPage, setRowPerPage] = useState<number>(20);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalPage, setTotalPage] = useState<number>(0);

  // State pour les données a insérer dans la table
  const [usersData, setUsersData] = useState<User[]>([]);
  const [userAllData, setUserAllData] = useState<User[] | any>([]);

  // State pour les filtre non constante
  const [roles, setRoles] = useState<Role[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [activity, setActivity] = useState<any[]>([]);

  const [updatedFilter, setUpdatedFilter] = useState(userFilterConstant);

  // context that store the privileges values
  const { privilegesContext, setPrivilegesContext }: CountextType =
    useContext(Privileges);

  //
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<Boolean>(false);
  const [isOpenModalDisable, setIsOpenModalDisable] = useState<Boolean>(false);

  const [message, setMessage] = useState<any>();

  //Filter Keywords
  const [filterKeywords, setFilterKeywords] = useState<FilterKeywords[]>([]);

  //Search Keywords
  const [searchKeywords, setSearchKeywords] = useState<string>("");
  const [onChangeStatus, setOnChangeStatus] = useState<Boolean>(false);

  //
  const router = useRouter();

  /**
   * Fonction qui recharge les données du server
   */
  const fetchData = async () => {
    setIsLoading(true);
    const res = await getPaginatedUser(
      currentPageNumber,
      rowPerPage,
      filterKeywords,
      searchKeywords
    );

    const totalPage = res.data.data.pageNumber;
    const totalItems = res.data.data.totalItems;
    setTotalRows(totalItems);
    setTotalPage(totalPage);
    const response = await getAllUser();
    setUserAllData(response.data.data);

    const userData: User[] = res.data.data.items;

    setUsersData(userData);
    setIsLoading(false);
  };

  //
  const loadGroupAndRoles = async () => {
    const rolesRes = await getRoleCount();

    const groupsRes = await getGroupCount();

    const activityRes = await getActivityCount();

    setRoles(rolesRes.data.data.items);
    setGroups(groupsRes.data.data.items);
    setActivity(activityRes.data.data.items);

    setIsLoading(false);
  };

  // Rechargement de la page apres chaque load
  useEffect(() => {
    fetchData();
    loadGroupAndRoles();
  }, [currentPageNumber, rowPerPage, filterKeywords, searchKeywords,onChangeStatus]);

  // Fonction qui attribue la nombre d'element par page
  const handleChangeRowPerPage = (rowPerPage: any) => {
    setRowPerPage(rowPerPage);
    if (rowPerPage === totalRows) {
      setCurrentPageNumberPage(1);
    }
  };

  const handleChangePage = (currentPageNumber: any) => {
    setCurrentPageNumberPage(currentPageNumber);
  };

  // Fonction qui fait mets a jour le constant du filtre si le filtre est variable
  const updateFiltersConstant = (
    dataToTransform: any,
    title: string,
    name: string,
    type: ParsedType
  ) => {
    let transformedData: any;

    if (name === "isActive") {
      transformedData = dataToTransform.map((item: any) => ({
        label: item.name,
        value: item.name === "Actif" ? true : false,
        count: item.count,
        isChecked: false,
      }));
    } else {
      transformedData = dataToTransform.map((item: any) => ({
        label: item.name,
        value: item.name,
        count: item.count,
        isChecked: false,
      }));
    }

    setUpdatedFilter((prevFilters) => {
      const newFilters: ChoiceFilterType[] = [
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
    setUpdatedFilter(userFilterConstant);
    updateFiltersConstant(groups, "Groupe", "groups.name", ParsedType.LIST);
    updateFiltersConstant(roles, "Rôles", "roles.name", ParsedType.LIST);
    updateFiltersConstant(
      activity,
      "Activité du compte",
      "isActive",
      ParsedType.LIST
    );
  }, [groups, roles, activity]);

  const usersColumns = [
    {
      name: "Identifiant",
      selector: (row: User) => row?.username,
      sortable: true,
    },
    {
      name: "Nom",
      selector: (row: User) => row?.lastname,
      sortable: true,
      hide: Media.MD || Media.SM,
    },
    {
      name: "Prénom(s)",
      selector: (row: User) => row?.firstname,
      sortable: true,
      hide: Media.MD || Media.SM,
    },
    {
      name: "Groupe",
      selector: (row: User) => row?.groups,
      sortable: true,
      left: true,
      hide: Media.SM,
      cell: (row: User) => {
        const groupAlias = row?.groups.map(
          (group: { alias: string }) => group.alias
        );
        const groupNames = row.groups.map(
          (group: { name: string }) => group.name
        );
        const roleColor = row?.roles.map((role: any) => role?.color);

        return (
          <>
            {groupAlias.map((groupAlias, index) => (
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
      name: "Status",
      selector: (row: User) => row.isActive,
      sortable: true,
      left: true,
      cell: (row: User) => {
        const status = row.isActive ? "actif" : "inactif";
        return (
          <div
            style={{
              color: row.isActive ? "#57CA22" : "#D35151",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 0,
              margin: 0,
            }}
          >
            {row.isActive ? <IconActive /> : <IconDisable />}

            <p style={{ marginLeft: "5px" }}>{status}</p>
          </div>
        );
      },
    },
    {
      name: "Rôle",
      selector: (row: User) => row.roles,
      sortable: true,
      left: true,
      hide: Media.SM,

      cell: (row: User) => {
        const roleAlias = row?.roles.map(
          (role: { alias: string }) => role.alias
        );
        const roleName = row?.roles.map((role: { name: string }) => role?.name);
        const roleColor = row?.roles.map((role: any) => role?.color);
        return (
          <>
            {roleAlias.map((roleAlias, index) => (
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
      selector: (row: User) => row?.createdAt,
      sortable: true,
      hide: Media.MD || Media.SM,
      cell: (row: User) => {
        const date = getDate(row?.createdAt);
        const time = getTime(row?.createdAt);

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

      width: "5%",
      center: true,
      cell: (row: User) => {
        function handleEdit(_id: string): void {
          router.push("/user/" + _id);
        }

        function handleDisableUser(_id: string, status: boolean): void {
          setIsOpenModalDisable(true);
          setMessage({
            title: "Confirmation",
            message: status
              ? "Voulez vous vraiment désactiver cette utilisateur ?"
              : "Voulez vous vraiment activer cette utilisateur ?",
            confirmText: status ? "Désactiver" : "Activer",
            id: _id,
            status: status,
          });
        }

        function handleDelete(_id: string): void {
          setIsOpenModalDelete(true);
          setMessage({
            title: "Confirmation",
            message: "Voulez vous vraiment supprimer cette utilisateur ?",
            confirmText: "Supprimer",
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
              <button onClick={() => handleEdit(row._id)}>
                <IconEdit /> <span style={{ color: "#0231A8" }}>Consulter</span>
              </button>
              <button
                onClick={() => {
                  handleDisableUser(row?._id, row.isActive);
                }}
              >
                <IconDisableUser />
                <span style={{ color: "#5C5C5C" }}>
                  {row.isActive ? "Désactiver" : "Activer"}
                </span>
              </button>
              {privilegesContext.delete_user ? (
                <button
                  onClick={() => {
                    handleDelete(row?._id);
                  }}
                >
                  <IconDelete />
                  <span style={{ color: "#D35151" }}>Supprimer</span>
                </button>
              ) : (
                <></>
              )}
            </Dropdown>
          </div>
        );
      },
    },
  ];

  const closeModalDelete = (value: boolean) => {
    setIsOpenModalDelete(value);
  };

  const handleDeleteConfirmation = async (id: string) => {
    const response = await DeleteUserById(id);

    if (response.status === 200) {
      setOnChangeStatus(!onChangeStatus)
      setIsOpenModalDelete(false);
      setIsLoading(false);
    } else {
      setIsOpenModalDelete(false);
      setIsLoading(false);
    }
  };

  const closeModalDisable = (value: boolean) => {
    setIsOpenModalDisable(value);
  };

  const handleChangeStatusConfirmation = async (
    id: string,
    status: boolean
  ) => {
    const response = await DisableUserById(id, status);
    if (response.status === 200) {
      setOnChangeStatus(!onChangeStatus)
      setIsOpenModalDisable(false);
      setIsLoading(false);
    } else {
      setIsOpenModalDisable(false);
      setIsLoading(false);
    }
  };

  // specific function for data to be formatted
  const ExportDataFormatter = (item: any): any => {
    return {
      ...item,
      isActive: item.isActive ? "Actif" : "Inactif",
      createdAt: isoDateStringToDate(item.createdAt),
    };
  };

  return (
    <>
      {isOpenModalDelete && (
        <ConfirmModal
          close={closeModalDelete}
          message={message}
          handleConfirmation={handleDeleteConfirmation}
        />
      )}
      {isOpenModalDisable && (
        <ConfirmModal
          close={closeModalDisable}
          message={message}
          handleConfirmation={handleChangeStatusConfirmation}
        />
      )}
      <ListSection
        listeTitle="Utilisateurs"
        tableColumns={usersColumns}
        tableData={usersData}
        tableTotalRows={totalRows}
        handlePageNumberChange={handleChangePage}
        handleRowPerPageNumberChange={handleChangeRowPerPage}
        currentPageNumber={currentPageNumber}
        totalRowPerPage={rowPerPage}
        hasAddButton={false}
        hasFilter={true}
        choiceFilterOption={updatedFilter}
        dateFilterOption={userDateFilterOptionConstant}
        hasChoiceFilter={true}
        hasDateFilter={true}
        conditionalFilter={userFilterByItem}
        isLoading={isLoading}
        totalPageNumber={totalPage}
        allDataToExport={userAllData}
        handleFilterKeywordsChange={handleChangeFilter}
        handleSearchKeywordsChange={handleSearchKeywordsChange}
        exportDataFormatter={ExportDataFormatter}
      />
    </>
  );
};

export default UserList;
