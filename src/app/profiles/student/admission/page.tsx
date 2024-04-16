"use client";
import genericStudentStyle from "../student.module.css";
import Image from "next/image";
import Stepper from "@/components/stepper/stepper";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import extractTokenInfo from "@/utils/extract.token";
import { useEffect, useState } from "react";
import { GetUserById } from "@/services/user/user-service";
import { GetApplicationByUserId } from "@/services/candidate/candidate-service";
import { generateColors } from "@/utils/color.utils";
import IconClinicalNote from "@/components/shared/icons/iconClinicalNote";
import DataTable, { Media } from "react-data-table-component";
import { BadgeCell } from "@/components/shared/dropdown/cell.style";
import { competitionResultTableStyle } from "@/components/shared/table/default.table.style";
import Loader from "@/components/loader/loader";
import Pagination from "@/components/shared/pagination/pagination.component";
import { GetHistoryByTargetId } from "@/services/history/history.service";
import { statusList } from "@/cores/constant/constant.application";
import { HistoryType } from "@/components/shared/history/history.constant";
import style from "./admission.module.css";
import { CandidateType } from "@/services/candidate/candidate-models";
import { User } from "@/services/user/user.models";
import { getAllRoles } from "@/services/role/role.service";
const CandidateAdmission = () => {
  const [user, setUser] = useState<User | null>(null);
  const [appData, setAppData] = useState<any>();
  const [histories, setHistories] = useState<HistoryType[]>([])

  const token: string | null = getLocalStorageItem("loginAccessToken");
  const userInfo: any = token ? extractTokenInfo(token) : null;

  //Competition result state
  const [currentPageNumber, setCurrentPageNumberPage] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [rowPerPage, setRowPerPage] = useState<number>(20);
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [isAStudent, setIsAStudent] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<any[] | []>([]);
  const [defaultStatus, setDefaultStatus] = useState<string>("Non lu");

  // const fetchData = async (userId: string) => {
  //   const userData = await GetUserById(userId);
  //   const application: CandidateType = await GetApplicationByUserId(userId);
  //   const roleRes = await getAllRoles();
  //   const studentRole = roleRes.data
  //     .filter((role: { name: string }) => role.name === "Étudiant")
  //     .map((role: { _id: any }) => role._id);

    const fetchData = async (userId: string) => {
      const userData = await GetUserById(userId);
      const application: CandidateType = await GetApplicationByUserId(userId);
      application && setAppData(application);
      const roleRes = await getAllRoles();
      const historyData: any = await GetHistoryByTargetId(application?._id);
      historyData && setHistories(historyData.data.data);
      const studentRole = roleRes.data
      .filter((role: { name: string; }) => role.name === "Étudiant")
      .map((role: { _id: any; }) => role._id);  
    
      setIsAStudent(userData.data.data.roles.map((role: { _id: any; }) => role._id).includes(studentRole[0]));
      setUser(userData.data.data)
      
      if(isAStudent || !application?._id){
        setDefaultStatus("Accepté")
      }
    };
  // }
    useEffect(() => {
      userInfo && fetchData(userInfo._id);
    }, []);

  // Comptetion result fonction
  const competitionColumn = [
    {
      name: "Nom",
      selector: (row: any) => row?.name,
      sortable: true,
      cell: (row: any, index: number) => {
        return (
          <span>
            {index}-{row?.name}
          </span>
        );
      },
    },
    {
      name: "Catégorie",
      selector: (row: any) => row?.category,
      sortable: true,
      hide: Media.MD || Media.SM,
    },
    {
      name: "Nombre d’essais",
      selector: (row: any) => row?.tryNumber,
      sortable: true,
      center: true,
      hide: Media.MD || Media.SM,
    },
    {
      name: "Statut",
      selector: (row: any) => row?.status,
      sortable: true,
      center: true,
      hide: Media.SM,
      cell: (row: any) => {
        const status = row?.status;
        switch (status) {
          case "FINISHED":
            return (
              <BadgeCell bg="#d6f2ff" color="#0fc3ed">
                Terminé
              </BadgeCell>
            );
          case "IN_PROCESS":
            return (
              <BadgeCell bg="#2ba449" color="#fff">
                En cours
              </BadgeCell>
            );
          case "NOT_FINISHED":
            return (
              <BadgeCell bg="#FFD1D9" color="#D35151">
                Non terminé
              </BadgeCell>
            );
          default:
            return (
              <BadgeCell bg="#ddd" color="#808080">
                En traitement
              </BadgeCell>
            );
        }
      },
    },
    {
      name: "Date d’entrée",
      selector: (row: any) => row?.date,
      sortable: true,
      right: true,
      hide: Media.MD || Media.SM,
    },
  ];

  const data = [
    {
      id: "id1",
      name: "L’instruction if",
      category: "Structures conditionnelles",
      tryNumber: 2,
      status: "FINISHED",
      date: "2023-10-30",
    },
    {
      id: "id2",
      name: "L’instruction if-else",
      category: "Structures conditionnelles",
      tryNumber: 2,
      status: "FINISHED",
      date: "2023-10-30",
    },
    {
      id: "id3",
      name: "L’instruction if-elsif-else",
      category: "Structures conditionnelles",
      tryNumber: 4,
      status: "NOT_FINISHED",
      date: "2023-10-30",
    },
    {
      id: "id4",
      name: "Vérification d’égalité",
      category: "Structures conditionnelles",
      tryNumber: 2,
      status: "FINISHED",
      date: "2023-10-30",
    },
    {
      id: "id5",
      name: "Catégorie d’âge",
      category: "Structures conditionnelles",
      tryNumber: 2,
      status: "FINISHED",
      date: "2023-10-30",
    },
    {
      id: "id6",
      name: "Bagages",
      category: "Structures conditionnelles",
      tryNumber: 3,
      status: "IN_PROCESS",
      date: "2023-10-30",
    },
    {
      id: "id7",
      name: "Vérification de la valeur",
      category: "Structures conditionnelles",
      tryNumber: 1,
      status: "FINISHED",
      date: "2023-10-30",
    },
  ];

  const handleChangePage = (currentPageNumber: any) => {
    setCurrentPageNumberPage(currentPageNumber);
  };

  // Fonction qui attribue la nombre d'element par page
  const handleChangeRowPerPage = (rowPerPage: any) => {
    setRowPerPage(rowPerPage);
  };

  const handleSelectedRows = ({ selectedRows }: any) => {
    setSelectedData(selectedRows);
  };
  return (
    <div className={style.container}>
      <div className={genericStudentStyle.container}>
        <section className={genericStudentStyle.application}>
          <div className={genericStudentStyle.contentHeader}>
            <Image
              src={"/resources/icons/file-icon.svg"}
              width={19}
              height={19}
              alt=""
              objectFit="cover"
            />
            Demande d'admission
          </div>
          <div className={genericStudentStyle.content}>
            <div className={genericStudentStyle.headWrapper}>
              <div className={genericStudentStyle.left}>
                <p className={genericStudentStyle.title}>
                  Developpement Full Stack
                </p>
                <p className={genericStudentStyle.date}>Session Janvier 2024</p>
              </div>
              <div className={genericStudentStyle.right}>
                <div></div>
              </div>
            </div>
            {!isAStudent && <div className={style.stepper}>
              <Stepper
                application={appData}
                history={histories || []}
              />
            </div>}
          </div>
        </section>
        <section className={genericStudentStyle.application}>
          <div className={genericStudentStyle.contentHeader}>
            <IconClinicalNote /> Epreuve Bootcamp
          </div>
          <div className={genericStudentStyle.content}>
            <div></div>
            <div>
              <DataTable
                columns={competitionColumn}
                data={data}
                fixedHeader
                persistTableHead
                noDataComponent={"Aucune Donnée... "}
                fixedHeaderScrollHeight="auto"
                highlightOnHover
                onSelectedRowsChange={handleSelectedRows}
                customStyles={competitionResultTableStyle}
                pagination
                paginationServer
                responsive={true}
                progressComponent={<Loader />}
                paginationComponent={() => (
                  <Pagination
                    paginationProps={{
                      currentPage: currentPageNumber,
                      onChangePage: handleChangePage,
                      tableTotalRows: totalRows,
                      onChangeRowsPerPage: handleChangeRowPerPage,
                      totalPages: totalPage,
                      totalRowPerPage: rowPerPage,
                    }}
                  />
                )}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default CandidateAdmission;
