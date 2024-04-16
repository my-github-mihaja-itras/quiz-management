import { getDate, getTime } from "@/utils/date.utils";
import IconEdit from "@/components/shared/icons/iconEdit";
import IconDelete from "@/components/shared/icons/iconDelete";
import Dropdown from "@/components/shared/dropdown/dropDown.component";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DisableUserById } from "@/services/user/user-service";
import IconDisableUser from "@/components/shared/icons/iconDisableUser";
import { EducationalClasses } from "@/services/educational-classes/educational-classes.models";

export const educationalClassColumns = [
  {
    name: "Nom",
    selector: (row: EducationalClasses) => row?.name,
    sortable: true,
  },
  {
    name: "Filière",
    selector: (row: EducationalClasses) => row?.cursus?.name,

    sortable: true,
  },
  {
    name: "Année universitaire",
    selector: (row: EducationalClasses) => row?.schoolYear,
    sortable: true,
  },
  {
    name: "Date d'entrée",
    selector: (row: EducationalClasses) => row?.createdAt,
    sortable: true,
    cell: (row: EducationalClasses) => {
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
    cell: (row: EducationalClasses) => {
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
            <button onClick={() => handleEdit(row?._id as string)}>
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
