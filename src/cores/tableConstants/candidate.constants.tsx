import { Media } from "react-data-table-component";
import { ApplicationStatus } from "../constant/constant.application";
import { getDate, getTime } from "@/utils/date.utils";
import IconEdit from "@/components/shared/icons/iconEdit";
import IconDelete from "@/components/shared/icons/iconDelete";
import { BadgeCell } from "@/components/shared/dropdown/cell.style";
import Dropdown from "@/components/shared/dropdown/dropDown.component";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CandidateType } from "@/services/candidate/candidate-models";


export const candidateColumns = [
  {
    name: "Identifiant",
    selector: (row: CandidateType) => row?.user?.username,
    sortable: true,
    hide: Media.MD,
  },
  {
    name: "Nom",
    selector: (row: CandidateType) => row?.user?.lastname,
    sortable: true,
  },
  {
    name: "Prénom(s)",
    selector: (row: CandidateType) => row?.user?.firstname,
    sortable: true,
    hide: Media.MD,
  },
  {
    name: "Statut",
    selector: (row: CandidateType) => row?.applicationStatus,
    sortable: true,
    center: true,
    cell: (row: CandidateType) => {
      const status = row?.applicationStatus;
      switch (status) {
        case ApplicationStatus.UNREAD:
          return (
            <BadgeCell bg="#ffecd1" color="#ffa319">
              {" "}
              Non lu{" "}
            </BadgeCell>
          );
        case ApplicationStatus.IN_PROCESSING:
          return (
            <BadgeCell bg="#d6f2ff" color="#0fc3ed">
              En traitement
            </BadgeCell>
          );
        case ApplicationStatus.REGISTRATED_FOR_COMPETITION:
          return (
            <BadgeCell bg="#ddf4d2" color="#57ca22">
              Inscrit au Bootcamp
            </BadgeCell>
          );
        case ApplicationStatus.ACCEPTED_FOR_INTERVIEW:
          return (
            <BadgeCell bg="#ffecd1" color="#ffa319">
              En attente d’entretien
            </BadgeCell>
          );
        case ApplicationStatus.INTERVIEWED:
          return (
            <BadgeCell bg="#d6f2ff" color="#33c2ff">
              Interviewé
            </BadgeCell>
          );
        case ApplicationStatus.REQUEST_ACCEPTED:
          return (
            <BadgeCell bg="#ddf4d2" color="#57ca22">
              Accepté
            </BadgeCell>
          );
        case ApplicationStatus.REQUEST_REFUSED:
          return (
            <BadgeCell bg="#ffd1d9" color="#ff2950">
              Refusé
            </BadgeCell>
          );
        default:
          return <BadgeCell>Non définie </BadgeCell>;
      }
    },
  },
  {
    name: "Date entrée",
    selector: (row: CandidateType) => row?.createdAt,
    sortable: true,
    hide: Media.MD,
    cell: (row: any) => {
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
    name: "Date modification",
    selector: (row: CandidateType) => row?.updatedAt,
    sortable: true,
    hide: Media.MD,
    cell: (row: any) => {
      const date = getDate(row?.updatedAt);
      const time = getTime(row?.updatedAt);

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
    width: "5%",
    cell: (row: CandidateType) => {
      const [isOpen, setIsOpen] = useState<Boolean>(false);

      const [message, setMessage] = useState<{}>({});
      const router = useRouter();
      function handleEdit(_id: string): void {
        router.push("/candidate/" + _id);
      }

      function handleDelete(_id: string): void {
        setIsOpen(true);

        setMessage({
          title: "Confirmation",
          message: "Voulez vous vraiment supprimer ce candidat",
        });
      }

      const [openDropdownId, setOpenDropdownId] = useState(null);
      const handleToggleDropdown = (id: any) => {
        setOpenDropdownId((prevId) => (prevId === id ? null : id));
      };

      return (
        <div>
          <Dropdown
            id={row?._id}
            key={row?._id}
            isOpen={openDropdownId === row?._id}
            onToggle={handleToggleDropdown}
          >
            <button onClick={() => handleEdit(row?._id)}>
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
