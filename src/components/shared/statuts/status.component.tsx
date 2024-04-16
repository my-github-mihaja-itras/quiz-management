import { ApplicationStatus } from "@/cores/constant/constant.application";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
export interface StatutList {
  label: string;
  value: string;
  color: string;
  bg: string;
}
interface StatusFieldsProps {
  statusList: StatutList[];
  lastValue: string;
  isDisabled: boolean;
  onChangeSelected: any;
}
const StatusFields: React.FC<StatusFieldsProps> = ({
  statusList,
  lastValue,
  isDisabled = true,
  onChangeSelected,
}) => {
  const [selectedStyle, setSelectedStyle] = useState<StatutList>();
  const [lastSelected, setLastSelected] = useState<StatutList>();
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const optionValue = e.target.value;
    onChangeSelected(e.target.value);
    switch (optionValue) {
      case ApplicationStatus.UNREAD:
        setSelectedStyle({
          label: "Non lu",
          value: ApplicationStatus.UNREAD,
          color: "#FFA319",
          bg: "#FFECD1",
        });
        break;
      case ApplicationStatus.IN_PROCESSING:
        setSelectedStyle({
          label: "En traitement",
          value: ApplicationStatus.IN_PROCESSING,
          color: "#0FC3ED",
          bg: "#D6F2FF",
        });
        break;
      case ApplicationStatus.REGISTRATED_FOR_COMPETITION:
        setSelectedStyle({
          label: "Inscrits au Bootcamp",
          value: ApplicationStatus.REGISTRATED_FOR_COMPETITION,
          color: "#57CA22",
          bg: "#DDF4D2",
        });
        break;
      case ApplicationStatus.ACCEPTED_FOR_INTERVIEW:
        setSelectedStyle({
          label: "En attente d'\entretien",
          value: ApplicationStatus.ACCEPTED_FOR_INTERVIEW,
          color: "#FFA319",
          bg: "#FFECD1",
        });
        break;
      case ApplicationStatus.INTERVIEWED:
        setSelectedStyle({
          label: "Interviewé",
          value: ApplicationStatus.INTERVIEWED,
          color: "#33C2FF",
          bg: "#D6F2FF",
        });
        break;
      case ApplicationStatus.REQUEST_ACCEPTED:
        setSelectedStyle({
          label: "Accepté",
          value: ApplicationStatus.REQUEST_ACCEPTED,
          color: "#57CA22",
          bg: "#DDF4D2",
        });
        break;
      default:
        setSelectedStyle({
          label: "Refusé",
          value: ApplicationStatus.REQUEST_REFUSED,
          color: "#D35151",
          bg: "#FFD1D9",
        });
        break;
    }
  };

  const handleLastSelected = () => {
    switch (lastValue) {
      case ApplicationStatus.UNREAD:
        setLastSelected({
          label: "Non lu",
          value: ApplicationStatus.UNREAD,
          color: "#FFA319",
          bg: "#FFECD1",
        });
        break;
      case ApplicationStatus.IN_PROCESSING:
        setLastSelected({
          label: "En traitement",
          value: ApplicationStatus.IN_PROCESSING,
          color: "#0FC3ED",
          bg: "#D6F2FF",
        });
        break;
      case ApplicationStatus.REGISTRATED_FOR_COMPETITION:
        setLastSelected({
          label: "Inscrits au Bootcamp",
          value: ApplicationStatus.REGISTRATED_FOR_COMPETITION,
          color: "#57CA22",
          bg: "#DDF4D2",
        });
        break;
      case ApplicationStatus.ACCEPTED_FOR_INTERVIEW:
        setLastSelected({
          label: "En attente d'\entretien",
          value: ApplicationStatus.ACCEPTED_FOR_INTERVIEW,
          color: "#FFA319",
          bg: "#FFECD1",
        });
        break;
      case ApplicationStatus.INTERVIEWED:
        setLastSelected({
          label: "Interviewé",
          value: ApplicationStatus.INTERVIEWED,
          color: "#33C2FF",
          bg: "#D6F2FF",
        });
        break;
      case ApplicationStatus.REQUEST_ACCEPTED:
        setLastSelected({
          label: "Accepté",
          value: ApplicationStatus.REQUEST_ACCEPTED,
          color: "#57CA22",
          bg: "#DDF4D2",
        });
        break;
      case ApplicationStatus.REQUEST_REFUSED:
        setLastSelected({
          label: "Refusé",
          value: ApplicationStatus.REQUEST_REFUSED,
          color: "#D35151",
          bg: "#FFD1D9",
        });
        break;

      default:
        setLastSelected({
          label: "Non lu",
          value: ApplicationStatus.UNREAD,
          color: "#FFA319",
          bg: "#FFECD1",
        });
        break;
    }
  };

  useEffect(() => {
    handleLastSelected();
  }, []);

  return (
    <>
      {isDisabled ? (
        <Select
          bg={lastSelected?.bg}
          color={lastSelected?.color}
          disabled={true}
        >
          {lastValue && (
            <option
              key={`lastValue-${lastSelected?.value}`}
              value={lastSelected?.value}
            >
              {lastSelected?.label}
            </option>
          )}
        </Select>
      ) : (
        <Select
          bg={selectedStyle?.bg}
          color={selectedStyle?.color}
          onChange={handleChange}
          disabled={false}
        >
          {statusList.map((status, index) => (
            <option key={index} value={status.value}>
              {status.label}
            </option>
          ))}
        </Select>
      )}
    </>
  );
};

export default StatusFields;

export const Select = styled.select<{
  bg?: string;
  color?: string;
}>`
  width: 130px;
  height: 40px;

  border-radius: 6px;
  text-align: center;
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #5c5c5c;
  border: 1px solid #eee;
  background: #fff;
`;
