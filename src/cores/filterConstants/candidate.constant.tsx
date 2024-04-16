import { ChoiceFilterType } from "@/components/shared/filter/filter.constant";
import { ApplicationStatus } from "../constant/constant.application";
import { BadgeCell } from "@/components/shared/dropdown/cell.style";
import { CandidateType } from "@/services/candidate/candidate-models";

export const candidateFilterConstant: ChoiceFilterType[] = [];

export const candidateFilterByItem = (
  candidats: CandidateType[],
  item: string
) => {
  const results = candidats.filter((candidate) => {
    return candidate.applicationStatus === item;
  });
  return results;
};

export const mapStatusToLabelValue = (status: ApplicationStatus) => {
  switch (status) {
    case ApplicationStatus.UNREAD:
      return { label: "Non lu", value: status };
    case ApplicationStatus.IN_PROCESSING:
      return { label: "En traitement", value: status };
    case ApplicationStatus.REGISTRATED_FOR_COMPETITION:
      return { label: "Inscrits au Bootcamp", value: status };
    case ApplicationStatus.ACCEPTED_FOR_INTERVIEW:
      return { label: "En attente d'entretien", value: status };
    case ApplicationStatus.INTERVIEWED:
      return { label: "Interviewé", value: status };
    case ApplicationStatus.REQUEST_ACCEPTED:
      return { label: "Accepté", value: status };
    case ApplicationStatus.REQUEST_REFUSED:
      return { label: "Refusé", value: status };
    default:
      return { label: "Inconnu", value: status };
  }
};

export const candidateDateFilterOptionConstant = [
  {
    label: "Date de création",
    value: "createdAt",
  },
  {
    label: "Date de modification",
    value: "updatedAt",
  },
];

export const translateStatus = (status: string) => {
  switch (status) {
    case ApplicationStatus.UNREAD:
      return (
        <BadgeCell bg="#ffecd1" color="#ffa319">
          Non lu
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
};
