"use client";

import { DeleteRoleById } from "@/services/role/role.service";
import { useEffect, useState } from "react";
import ListSection from "@/components/shared/liste-section/listSection.component";
import Loader from "@/components/loader/loader";

import { roleFilterByItem } from "@/cores/filterConstants/role.constant";
import { Group } from "@/services/group/group.models";
import {
  FilterKeywords,
  ParsedType,
} from "@/components/shared/filter/filter.constant";
import style from "./student.module.css";
import ConfirmModal from "@/components/modal/confirmModal";
import extractTokenInfo from "@/utils/extract.token";
import { ActionType, EntityName } from "@/cores/constant/constant.history";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import Dropdown from "@/components/shared/dropdown/dropDown.component";
import IconEdit from "@/components/shared/icons/iconEdit";
import { useRouter } from "next/navigation";
import { getQuizSessionPaginated } from "@/services/quiz-session/quiz-session.service";
import { QuizSession } from "@/services/quiz-session/quiz-session.models";
import { getDate, getTime } from "@/utils/date.utils";
import { quizDateFilterOptionConstant } from "@/cores/filterConstants/quiz-session.constant";

const QuizList = () => {
  const [groups, setGroups] = useState<Group[]>([]);

  const [currentPageNumber, setCurrentPageNumberPage] = useState<number>(1);

  const [totalRows, setTotalRows] = useState<number>(0);

  const [rowPerPage, setRowPerPage] = useState<number>(20);

  const [isLoading, setisLoading] = useState<boolean>(true);

  const [totalPage, setTotalPage] = useState<number>(0);

  const [isOpenModalDelete, setIsOpenModalDelete] = useState<Boolean>(false);

  const [message, setMessage] = useState<any>();

  const [openDropdownId, setOpenDropdownId] = useState(null);

  const token = getLocalStorageItem("loginAccessToken") || "";

  const tokenInfo: any = extractTokenInfo(token);

  const [filterKeywords, setFilterKeywords] = useState<FilterKeywords[]>([]);

  //Search Keywords
  const [searchKeywords, setSearchKeywords] = useState<string>("");

  // State pour les données a insérer dans la table
  const [roleData, setRoleData] = useState<QuizSession[]>([]);

  const router = useRouter();

  const roleColumns = [
    {
      name: "Numéro",
      selector: (row: QuizSession, index: number) => "Quiz-" + row?.quizNumber,
      sortable: true,
    },

    {
      name: "Date Création",
      selector: (row: QuizSession) => row?._id,
      sortable: true,
      cell: (row: QuizSession) => {
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
      name: "Nbre Bonne Réponse",
      selector: (row: QuizSession) => row?._id,
      sortable: true,
      cell: (row: QuizSession) => {
        const { correctCount } = getQuizResults(row);
        return <div className={style.tabCell}>{correctCount}</div>;
      },
    },
    {
      name: "Nbre Question",
      selector: (row: QuizSession) => row?._id,
      sortable: true,
      cell: (row: QuizSession) => {
        return <div className={style.tabCell}>{row?.quiz.length}</div>;
      },
    },
    {
      name: "Résultat",
      selector: (row: QuizSession) => row?._id,
      sortable: true,
      cell: (row: QuizSession) => {
        const { correctCount, incorrectCount } = getQuizResults(row);
        const passed: boolean = incorrectCount > correctCount;
        return (
          <div className={style.tabCell}>
            <img
              src={`/resources/${
                passed ? "IconCheckRed" : "IconCheckGreen"
              }.svg`}
              className={style.image}
              width={20}
              height={20}
            />
          </div>
        );
      },
    },
    {
      name: "",
      button: true,
      allowOverflow: true,
      width: "5%",
      center: true,
      cell: (row: QuizSession) => {
        function handleEdit(_id: string): void {
          router.push("/quiz/" + _id);
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
              <button onClick={() => row?._id && handleEdit(row?._id)}>
                <IconEdit /> <span style={{ color: "#0231A8" }}>Consulter</span>
              </button>
            </Dropdown>
          </div>
        );
      },
    },
  ];
  const getQuizResults = (quizSession: QuizSession) => {
    let correctCount: number = 0;
    let incorrectCount: number = 0;

    quizSession.quiz.forEach((quiz) => {
      quiz.isValidAnswer ? correctCount++ : incorrectCount++;
    });

    return { correctCount, incorrectCount };
  };

  const fetchData = async () => {
    const res = await getQuizSessionPaginated(
      currentPageNumber,
      rowPerPage,
      filterKeywords,
      searchKeywords
    );

    const totalItems = res.data.totalItems;
    const totalPage = res.data.pageNumber;
    setTotalRows(totalItems);
    setTotalPage(totalPage);

    const roleData: QuizSession[] = res.data.items;
    setRoleData(roleData);

    setisLoading(false);
  };

  const handleChangeFilter = (keywordsList: any) => {
    setFilterKeywords(keywordsList);
  };

  // Extract keywords for search
  const handleSearchKeywordsChange = (keywords: any) => {
    setSearchKeywords(keywords);
  };

  const closeModalDelete = (value: boolean) => {
    setIsOpenModalDelete(value);
  };

  const handleDeleteConfirmation = async (role_id: string) => {
    const history = {
      action: { name: ActionType.DELETE_ROLE },
      user: tokenInfo._id,
      targetId: role_id,
      entity: EntityName.ROLE,
    };
    const response = await DeleteRoleById(role_id, history);
    if (response.status === 200) {
      window.location.reload();
      setIsOpenModalDelete(false);
      setisLoading(false);
    } else {
      setIsOpenModalDelete(false);
      setisLoading(false);
    }
  };

  // Fonction qui attribue le numero de page
  const handleChangePage = (currentPageNumber: any) => {
    setCurrentPageNumberPage(currentPageNumber);
  };

  // Fonction qui attribue la nombre d'element par page
  const handleChangeRowPerPage = (rowPerPage: any) => {
    setRowPerPage(rowPerPage);
    if (rowPerPage === totalRows) {
      setCurrentPageNumberPage(1);
    }
  };

  // Fonction qui fait mets a jour le constant du filtre si le filtre est variable
  const updateFiltersConstant = (
    dataToTransform: any,
    title: string,
    name: string,
    type: ParsedType
  ) => {
    const transformedData = dataToTransform.map((item: any) => ({
      label: item.name,
      value: item.name,
    }));
  };

  useEffect(() => {
    updateFiltersConstant(groups, "Groupe", "groups.name", ParsedType.LIST);
  }, [groups]);

  useEffect(() => {
    fetchData();
  }, [currentPageNumber, rowPerPage, searchKeywords, filterKeywords]);

  return (
    <>
      {isOpenModalDelete && (
        <ConfirmModal
          close={closeModalDelete}
          message={message}
          handleConfirmation={handleDeleteConfirmation}
        />
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <ListSection
          listeTitle="Sessions Quiz"
          tableColumns={roleColumns}
          tableData={roleData}
          tableTotalRows={totalRows}
          handlePageNumberChange={handleChangePage}
          handleRowPerPageNumberChange={handleChangeRowPerPage}
          currentPageNumber={currentPageNumber}
          totalRowPerPage={rowPerPage}
          hasAddButton={false}
          hasFilter={true}
          dateFilterOption={quizDateFilterOptionConstant}
          hasChoiceFilter={false}
          hasDateFilter={true}
          conditionalFilter={roleFilterByItem}
          redirectLink={"/roles/add"}
          isLoading={isLoading}
          totalPageNumber={totalPage}
          handleFilterKeywordsChange={handleChangeFilter}
          handleSearchKeywordsChange={handleSearchKeywordsChange}
          allDataToExport={roleData}
        />
      )}
    </>
  );
};

export default QuizList;
