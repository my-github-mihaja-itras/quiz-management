import { getDate, getTime } from "@/utils/date.utils";
import IconEdit from "@/components/shared/icons/iconEdit";
import IconDelete from "@/components/shared/icons/iconDelete";
import IconDisableUser from "@/components/shared/icons/iconDisableUser";
import Dropdown from "@/components/shared/dropdown/dropDown.component";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Administration } from "@/services/administration/administration.model";

export const administrationsColumns = [
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
    name: "Identifiant",
    selector: (row: Administration) => row.user?.username,
    sortable: true,
  },
  {
    name: "Groupe",
    selector: (row: Administration) =>
      row.user?.groups.map((group: { name: String }) => group.name).join(", "),
    sortable: true,

    cell: (row: Administration) => {
      const groupName = row.user?.groups
        .map((group: { name: String }) => group.name)
        .join(", ");
      return <div style={{ textTransform: "capitalize" }}>{groupName}</div>;
    },
  },
  {
    name: "Rôles",
    selector: (row: Administration) =>
      row.user?.roles.map((role: { name: String }) => role.name).join(", ") ||
      "Non assigné",
    sortable: true,
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
            <button onClick={() => handleEdit(row._id as string)}>
              <IconEdit /> <span style={{ color: "#0231A8" }}>Consulter</span>
            </button>
            <button
              onClick={() => {
                handleDelete(row?._id as string);
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
