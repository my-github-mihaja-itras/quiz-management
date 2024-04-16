import { OptionsType } from "@/components/shared/form/input-field/input.interface";
import { ApplicationStatus } from "@/cores/constant/constant.application";

const filterStatus = (currentStatus: any, statusOptions: OptionsType[]): OptionsType[] => {
    let result: OptionsType[] = []
    if(currentStatus === ApplicationStatus.UNREAD) {
        result = statusOptions.filter(option => (option.value != ApplicationStatus.REQUEST_ACCEPTED && option.value != ApplicationStatus.REQUEST_REFUSED))
    } else {
        result = statusOptions.filter(option => (option.value != ApplicationStatus.UNREAD))
    }
    return result;
};

export default filterStatus;