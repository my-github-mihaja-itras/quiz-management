"use client";

import ListSection from "@/components/shared/liste-section/listSection.component";
import { useContext, useEffect, useState } from "react";
import { Role } from "@/services/role/role.models";
import Loader from "@/components/loader/loader";
import {
  teacherFilterByItem,
  teacherFilterOptionConstant,
} from "@/cores/filterConstants/teacher.constant";
import { Teacher } from "@/services/teacher/teacher.models";
import {
  getAllTeacher,
  getPaginatedTeacher,
} from "@/services/teacher/teacher.service";
import { useRouter } from "next/navigation";
import Dropdown from "@/components/shared/dropdown/dropDown.component";
import IconEdit from "@/components/shared/icons/iconEdit";
import IconDelete from "@/components/shared/icons/iconDelete";
import { GroupCell, RoleCell } from "@/components/shared/dropdown/cell.style";
import { addOpacityToColor, getColorClass } from "@/utils/color.utils";
import { getDate, getTime, isoDateStringToDate } from "@/utils/date.utils";
import { DeleteUserById, getRoleCount } from "@/services/user/user-service";
import ConfirmModal from "@/components/modal/confirmModal";
import {
  FilterKeywords,
  ParsedType,
} from "@/components/shared/filter/filter.constant";
import { CountextType, Privileges } from "@/context/privileges.context";
import { Media } from "react-data-table-component";

const TeacherList = () => {
  const [currentPageNumber, setCurrentPageNumberPage] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [rowPerPage, setRowPerPage] = useState<number>(20);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [totalPage, setTotalPage] = useState<number>(0);

  // State pour les données a insérer dans la table
  const [teachersData, setTeachersData] = useState<Teacher[]>([]);
  const [allTeacherData, setAllTeacherData] = useState<Teacher[]>([]);

  // State pour les filtre non constante
  const [roles, setRoles] = useState<Role[]>([]);

  //Search Keywords
  const [searchKeywords, setSearchKeywords] = useState<string>("");

  //   const [groups, setGroups] = useState<Group[]>([]);

  // context that store the privileges values
  const { privilegesContext, setPrivilegesContext }: CountextType =
    useContext(Privileges);

  //
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<Boolean>(false);
  const [message, setMessage] = useState<{}>({});

  //Filter Keywords
  const [filterKeywords, setFilterKeywords] = useState<FilterKeywords[]>([]);

  /**
   * Fonction qui recharge les données du server
   */
  const fetchData = async () => {
    const res = await getPaginatedTeacher(
      currentPageNumber,
      rowPerPage,
      filterKeywords,
      searchKeywords
    );
    const totalItems = res.data.data.totalItems;
    const totalPage = res.data.data.pageNumber;
    setTotalRows(totalItems);
    setTotalPage(totalPage);

    const teacherData: Teacher[] = res.data.data.items;
    setTeachersData(teacherData);

    const response = await getAllTeacher();
    setAllTeacherData(response.data.data);

    setisLoading(false);
  };

  //
  const loadGroupAndRoles = async () => {
    const rolesRes = await getRoleCount();

    setRoles(rolesRes.data.data.items);

    setisLoading(false);
  };

  // Rechargement de la page apres chaque load
  useEffect(() => {
    fetchData();
    loadGroupAndRoles();
  }, [currentPageNumber, rowPerPage, filterKeywords, searchKeywords]);

  const handleChangeFilter = (keywordsList: any) => {
    setFilterKeywords(keywordsList);
  };

  // Extract keywords for search
  const handleSearchKeywordsChange = (keywords: any) => {
    setSearchKeywords(keywords);
  };

  // Fonction qui attribue le numero de page
  const handleChangePage = (pageNumber: any) => {
    setCurrentPageNumberPage(pageNumber);
  };

  // Fonction qui attribue la nombre d'element par page
  const handleChangeRowPerPage = (rowPerPage: any) => {
    setRowPerPage(rowPerPage);
    if (rowPerPage === totalRows) {
      setCurrentPageNumberPage(1);
    }
  };

  const teachersColumns = [
    {
      name: "Identifiant",
      selector: (row: Teacher) => row?.user?.username,
      sortable: true,
    },
    {
      name: "Nom",
      selector: (row: Teacher) => row?.user?.lastname,
      sortable: true,
      hide: Media.MD || Media.SM,
    },
    {
      name: "Prénom(s)",
      selector: (row: Teacher) => row?.user?.firstname,
      hide: Media.MD || Media.SM,
      sortable: true,
    },

    {
      name: "Rôle",
      selector: (row: Teacher) => row.user.roles,
      sortable: true,
      left: true,
      hide: Media.MD || Media.SM,

      cell: (row: Teacher) => {
        const roleAlias = row?.user.roles.map(
          (role: { alias: string }) => role.alias
        );
        const roleName = row?.user.roles.map(
          (role: { name: string }) => role?.name
        );
        const roleColor = row?.user.roles.map((role: any) => role?.color);

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
      name: "Groupe",
      selector: (row: Teacher) => row?.user.groups,
      sortable: true,
      left: true,
      hide: Media.SM,
      cell: (row: Teacher) => {
        const groupAlias = row?.user.groups.map(
          (group: { alias: string }) => group.alias
        );
        const groupNames = row.user.groups.map(
          (group: { name: string }) => group.name
        );
        const roleColor = row?.user.roles.map((role: any) => role?.color);

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
      name: "Temps de travail",
      selector: (row: Teacher) => row?.timeWork,
      sortable: true,
      hide: Media.MD || Media.SM,
    },
    {
      name: "Date d'entrée",
      selector: (row: Teacher) => row?.createdAt,
      sortable: true,
      hide: Media.MD || Media.SM,
      cell: (row: Teacher) => {
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
      allowOverflow: true,
      accessor: "actionColumn",
      disableSortBy: true,
      width: "5%",
      cell: (row: Teacher) => {
        const router = useRouter();

        function handleEdit(_id: string): void {
          router.push("/teacher/" + _id);
        }

        function handleDelete(_id: string): void {
          setIsOpenModalDelete(true);
          setMessage({
            title: "Confirmation",
            message: "Voulez vous vraiment supprimer cette utilisateur",
            confirmText: "Supprimer",
            id: row.user._id,
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
              {/* {privilegesContext.delete_teacher ? (
                <button
                  onClick={() => {
                    handleDelete(row?.user._id);
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

  const closeModalDelete = (value: boolean) => {
    setIsOpenModalDelete(value);
  };

  const handleDeleteConfirmation = async (id: string) => {
    const response = await DeleteUserById(id);

    if (response.status === 200) {
      window.location.reload();
      setIsOpenModalDelete(false);
      setisLoading(false);
    } else {
      setIsOpenModalDelete(false);
      setisLoading(false);
    }
  };

  // fonction spécifique pour les données a formater
  const formatFunctionToExportData = (item: any): any => {
    return {
      ...item,
      createdAt: isoDateStringToDate(item.createdAt),
      updatedAt: isoDateStringToDate(item.createdAt),
    };
  };

  return (
    <>
      {isLoading && <Loader />}
      {isOpenModalDelete && (
        <ConfirmModal
          close={closeModalDelete}
          message={message}
          handleConfirmation={handleDeleteConfirmation}
        />
      )}

      <ListSection
        listeTitle="Enseignants"
        tableColumns={teachersColumns}
        tableData={teachersData}
        tableTotalRows={totalRows}
        handlePageNumberChange={handleChangePage}
        handleRowPerPageNumberChange={handleChangeRowPerPage}
        currentPageNumber={currentPageNumber}
        totalRowPerPage={rowPerPage}
        hasAddButton={true}
        hasFilter={true}
        dateFilterOption={teacherFilterOptionConstant}
        hasChoiceFilter={false}
        hasDateFilter={true}
        conditionalFilter={teacherFilterByItem}
        isLoading={isLoading}
        totalPageNumber={totalPage}
        allDataToExport={allTeacherData}
        redirectLink="/teacher/add"
        handleFilterKeywordsChange={handleChangeFilter}
        handleSearchKeywordsChange={handleSearchKeywordsChange}
        exportDataFormatter={formatFunctionToExportData}
      />
    </>
  );
};

export default TeacherList;
