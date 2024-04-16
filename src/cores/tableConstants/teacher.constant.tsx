import { getDate, getTime } from "@/utils/date.utils";
import IconEdit from "@/components/shared/icons/iconEdit";
import IconDelete from "@/components/shared/icons/iconDelete";
import Dropdown from "@/components/shared/dropdown/dropDown.component";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DisableUserById } from "@/services/user/user-service";
import IconDisableUser from "@/components/shared/icons/iconDisableUser";
import { getColorClass } from "@/utils/color.utils";
import { GroupCell, RoleCell } from "@/components/shared/dropdown/cell.style";
import { Teacher } from "@/services/teacher/teacher.models";

export const teachersColumns = [
  {
    name: "Identifiant",
    selector: (row: Teacher) => row?.user?.username,
    sortable: true,
  },
  {
    name: "Nom",
    selector: (row: Teacher) => row?.user?.lastname,
    sortable: true,
  },
  {
    name: "Prénom(s)",
    selector: (row: Teacher) => row?.user?.firstname,

    sortable: true,
  },

  {
    name: "Groupe",
    selector: (row: Teacher) => row?.user?.groups,
    sortable: true,
    cell: (row: Teacher) => {
      const groupAlias = row?.user?.groups.map(
        (group: { alias: string }) => group.alias
      );
      const groupNames = row?.user?.groups.map(
        (group: { name: string }) => group.name
      );
      return (
        <>
          {groupAlias.map((groupAlias, index) => (
            <GroupCell key={index} color={getColorClass(groupAlias).color}>
              <span>{groupNames[index]}</span>
              {groupAlias}
            </GroupCell>
          ))}
        </>
      );
    },
  },
  {
    name: "Rôle",
    selector: (row: Teacher) => row?.user?.roles,
    sortable: true,
    cell: (row: Teacher) => {
      const roleAlias = row?.user?.roles.map(
        (role: { alias: string }) => role.alias
      );
      const roleName = row?.user?.roles.map(
        (role: { name: string }) => role.name
      );
      const groupNames = row?.user?.groups.map(
        (group: { alias: string }) => group.alias
      );
      return (
        <div>
          {roleAlias.map((roleAlias, index) => (
            <RoleCell
              key={index}
              bg={getColorClass(groupNames[index]).bgcolor}
              color={getColorClass(groupNames[index]).color}
            >
              <span>{roleName[index]}</span>
              {roleAlias}
            </RoleCell>
          ))}
        </div>
      );
    },
  },
  {
    name: "Temps de travail",
    selector: (row: Teacher) => row?.timeWork,
    sortable: true,
  },
  {
    name: "Date d'entrée",
    selector: (row: Teacher) => row?.user?.creationDate,
    sortable: true,
    cell: (row: Teacher) => {
      const date = getDate(row?.user?.creationDate);
      const time = getTime(row?.user?.creationDate);

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
        router.push("/user/" + _id);
      }

      function handleDelete(_id: string): void {
        console.log("HANDLE DELETE :", _id);
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
                handleDelete(row?._id);
              }}
            >
              <IconDelete /> <span style={{ color: "#D35151" }}>Supprimer</span>
            </button>
          </Dropdown>
        </div>
      );
    },
  },
];
