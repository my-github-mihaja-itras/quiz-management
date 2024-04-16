import styles from "./dashboardCard.module.css";
import { APPLICATION_STATUS_LABELS, DASHBOARD } from "../constants";
import { DashboardCard } from "../interfaces";
import DashboardIcon from "../dashboard.icon";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import extractTokenInfo from "@/utils/extract.token";
import { FilterCardsByPrivileges } from "@/utils/guard-utils";
import { getStatistic } from "@/services/student/student.service";
import { ApplicationStatus } from "@/cores/constant/constant.application";
import { useRouter } from "next/navigation";
import { GetUserPrivilegesNames } from "@/services/privilege/privilege.service";


const DashboardCards = async () => {

  let cards: DashboardCard[] = [...DASHBOARD]
  const token: string | null = getLocalStorageItem("loginAccessToken");
  let filtredCards: DashboardCard[] = [];
  const label = APPLICATION_STATUS_LABELS;
  const router = useRouter()
  const data = await getStatistic();

  cards[0].count = data.totalNumber?  data.totalNumber : 0;

  cards = cards.map((card, index) => {
    if (index > 0 ) {
      card.count = data[card.status] || 0;
    } 
    return card;
  })

  if (token) {
    const userInfo: any = token ? extractTokenInfo(token) : null;
    const privileges = await GetUserPrivilegesNames(userInfo._id);
    if( privileges ) {
      filtredCards = FilterCardsByPrivileges(cards, privileges);
    }
  }

  const redirectToList = (index: number) => {
    if (index === 0) {
      router.push('/candidate')
    } else {
      router.push(`/candidate?filter=${filtredCards[index].status}`)
    }
  }

  return (
    <div className={styles.cardWrapper}>
      { 
        filtredCards.map((card, index) =>   
          <div className={styles.card} key={`cardKey-${index}`} onClick={() => redirectToList(index)}>
            <div className={styles.detailContainer}>
              <p className={styles.text}>
                {
                  index > 0 ?
                  label[ApplicationStatus[card.status as keyof typeof ApplicationStatus]]
                  : card.status
                }
              </p>
              <p className={styles.count}>{card.count}</p>
            </div>
            <div>
              <DashboardIcon color={card.color} />
            </div>
          </div>
        )
      }
    </div>
   
  );
}

export default DashboardCards;