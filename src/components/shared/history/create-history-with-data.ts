import { HistoryType } from "./history.constant";

export interface HistoryWithData {
  data: any;
  history?: HistoryType;
}
