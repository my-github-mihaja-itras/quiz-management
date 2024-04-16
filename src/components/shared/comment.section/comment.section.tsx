"use client ";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import style from "./comment.module.css";
import { InputText } from "../form/input-field/input-field";
import extractTokenInfo from "@/utils/extract.token";
import {
  DeleteCommentaryById,
  UpdateCommentaryById,
  addCommentService,
  getCommentByTargetId,
} from "@/services/comment/comment.service";
import { CommentType } from "@/services/comment/comment.models";
import { api } from "@/cores/constant/constant.resource.api";
import Dropdown from "../dropdown/dropDown.component";
import IconEdit from "../icons/iconEdit";
import IconDelete from "../icons/iconDelete";
import IconCloseComment from "../icons/IconCloseComment";
import IconOpenComment from "../icons/IconOpenComment";
import { ActionType } from "@/cores/constant/constant.history";
import ConfirmModal from "@/components/modal/confirmModal";
import ErrorModal from "@/components/modal/errorModal";
import Loader from "@/components/loader/loader";
import { cp } from "fs";
import ScrollableContainer from "./ ScrollableContainer";
import { getLocalStorageItem } from "@/utils/localStorage.utils";
import Image from "next/image";
interface CommentProps {
  candidateId: string;
  onChangeHistory: any;
}
const CommentSection: React.FC<CommentProps> = ({
  candidateId,
  onChangeHistory,
}) => {
  const [listCommentary, setListCommentary] = useState<[CommentType]>();

  const [isOpenCommentary, setIsOpenCommentary] = useState<boolean>(true);

  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);

  const [isOpenConfirmation, setIsOpenConfirmation] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isOpenSuccess, setIsOpenSuccess] = useState<boolean>(false);

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [message, setMessage] = useState<{}>({});

  const [updateListComment, setUpdateListComment] = useState(false);

  const [openDropdownId, setOpenDropdownId] = useState(null);

  const [editCommentary, setEditCommentary] = useState<any>(null);

  const [textEditCommentary, setTextEditCommentary] = useState<any>("");

  const token = getLocalStorageItem("loginAccessToken") || "";

  const tokenInfo: any = extractTokenInfo(token);

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, disabled },
  } = useForm<any>({ defaultValues: {} });

  const comment = watch("comment");

  const getCommentary = async () => {
    const response = await getCommentByTargetId(candidateId);
    if (response.data) {
      setListCommentary(response.data);
    } else {
      console.log("No data");
    }
  };

  const updateListCommentary = () => {
    setUpdateListComment((prev) => !prev);
  };

  const handleToggleDropdown = (id: any) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };
  const toggleIsOpenCommentary = () => {
    setIsOpenCommentary(!isOpenCommentary);
  };

  const openFormUpdate = (comment: CommentType) => {
    setIsOpenEdit(!isOpenEdit);
    setOpenDropdownId(null);
    setEditCommentary(comment);
    setTextEditCommentary(comment.comment);
  };

  const handleUpdateCommentary = async () => {
    setIsOpenConfirmation(false);
    setIsLoading(true);
    const response = await updateCommentary();
    setIsOpenEdit(!isOpenEdit);
    if (response?.statusText === "OK") {
      updateListCommentary();
      setIsLoading(false);
      setIsOpenSuccess(true);
      setIsSuccess(true);
      setMessage({
        title: "Modification effectuée",
        message: " Votre commentaire a bien été modifié !",
      });
    } else {
      setIsLoading(false);
      setIsOpenSuccess(true);
      setIsSuccess(false);
      setMessage({
        title: "Modification non effectuée",
        message: " Votre commentaire n'a pas été modifié !",
      });
    }
  };

  const updateCommentary = async () => {
    const history = {
      action: { name: ActionType.UPDATE_COMMENT },
      user: tokenInfo._id,
      targetId: candidateId,
      entity: "Application",
    };

    const response = await UpdateCommentaryById(
      editCommentary._id,
      textEditCommentary,
      history
    );
    return response;
  };

  const onChangeEditcommentary = (e: any) => {
    setTextEditCommentary(e.target.value);
  };

  const openConfirmation = (_id: any) => {
    setIsOpenConfirmation(true);
    setMessage({
      title: "Confirmer la suppression",
      message: "Voulez-vous vraiment supprimer ce commentaire ?",
      confirmText: "SUPPRIMER",
      id: _id,
    });
  };
  const handleConfirmation = async (_id: string) => {
    setIsOpenConfirmation(false);
    setIsLoading(true);
    const isDelete = await deleteCommentary(_id);
    if (isDelete?.data.data) {
      updateListCommentary();
      setIsLoading(false);
      setIsOpenSuccess(true);
      setIsSuccess(true);
      setMessage({
        title: "Suppression effectuée",
        message: " Votre commentaire a bien été supprimé !",
      });
    } else {
      setIsLoading(false);
      setIsOpenSuccess(true);
      setIsSuccess(false);
      setMessage({
        title: "Suppression non effectuée",
        message: " Votre commentaire n'a pas été supprimé !",
      });
    }
  };

  const deleteCommentary = async (_id: any): Promise<any> => {
    const history = {
      action: { name: ActionType.DELETE_COMMENT },
      user: tokenInfo._id,
      targetId: candidateId,
      entity: "Application",
    };
    const response = await DeleteCommentaryById(_id, history);
    handleToggleDropdown(_id);
    return response;
  };

  const onSubmit: SubmitHandler<any> = async (comment: any) => {
    const commentData = {
      user: tokenInfo._id,
      targetId: candidateId,
      entity: "Application",
      comment: comment.comment,
    };

    const history = {
      action: { name: ActionType.CREATE_COMMENT },
      user: tokenInfo._id,
      targetId: candidateId,
      entity: "Application",
    };

    const response = await addCommentService(commentData, history);

    if (response.statusText === "Created") {
      updateListCommentary();
      reset({ comment: "" });
    }
  };

  const getTime = (commentDate: string | undefined) => {
    if (!commentDate) {
      console.error("La date du commentaire est indéfinie.");
      return "N/A";
    }

    const dateEntree = new Date(commentDate);
    const dateActuelle = new Date();
    const differenceEnMillisecondes =
      dateActuelle.getTime() - dateEntree.getTime();
    const differenceEnMinutes = Math.floor(
      differenceEnMillisecondes / (1000 * 60)
    );

    if (differenceEnMinutes < 1) {
      return " quelques secondes";
    } else if (differenceEnMinutes < 60) {
      return ` ${differenceEnMinutes} minute${
        differenceEnMinutes > 1 ? "s" : ""
      }`;
    } else if (differenceEnMinutes < 1440) {
      // moins de 24 heures
      const differenceEnHeures = Math.floor(differenceEnMinutes / 60);
      return ` ${differenceEnHeures} heure${differenceEnHeures > 1 ? "s" : ""}`;
    } else if (differenceEnMinutes < 10080) {
      // moins de 7 jours
      const differenceEnJours = Math.floor(differenceEnMinutes / 1440);
      return ` ${differenceEnJours} jour${differenceEnJours > 1 ? "s" : ""}`;
    } else {
      const differenceEnSemaines = Math.floor(differenceEnMinutes / 10080);
      return ` ${differenceEnSemaines} semaine${
        differenceEnSemaines > 1 ? "s" : ""
      }`;
    }
  };
  const closeModal = (value: boolean) => {
    setIsOpenSuccess(false);
    setIsOpenConfirmation(value);
  };
  const handleItemClick = (index: number) => {
    // Obtenez la référence à l'élément DOM du conteneur
    const container = document.getElementById("scrollable-container");

    // Obtenez la référence à l'élément DOM de l'élément cliqué
    const item = document.getElementById(`item-${index}`);

    // Assurez-vous que le conteneur et l'élément existent avant de faire défiler
    if (container && item) {
      // Calculez la position de l'élément par rapport à la partie visible du conteneur
      const containerRect = container.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();

      // Si l'élément est en dessous de la partie visible, faites défiler vers le haut
      if (itemRect.bottom > containerRect.bottom) {
        container.scrollTo({
          top: container.scrollTop + itemRect.bottom - containerRect.bottom,
          behavior: "smooth",
        });
      }

      // Si l'élément est au-dessus de la partie visible, faites défiler vers le haut
      if (itemRect.top < containerRect.top) {
        container.scrollTo({
          top: container.scrollTop - (containerRect.top - itemRect.top),
          behavior: "smooth",
        });
      }
    }
  };
  useEffect(() => {
    getCommentary();
    onChangeHistory();
  }, [updateListComment]);

  return (
    <>
      {/* <>
        <ScrollableContainer />
      </> */}
      <>
        {isOpenConfirmation && (
          <ConfirmModal
            close={closeModal}
            message={message}
            handleConfirmation={handleConfirmation}
          />
        )}
        {isLoading && <Loader />}
        {isOpenSuccess && (
          <ErrorModal
            close={closeModal}
            message={message}
            color={isSuccess ? "#0FC3ED" : "#ee0d0d"}
          ></ErrorModal>
        )}
        <div className={style.container}>
          <span className={style.title}>Commentaires </span>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.inputContainer}>
              <InputText
                label="Ajouter un commentaire"
                onChange={comment}
                fieldName={"comment"}
                register={register}
                value={comment}
                required={"Champ requis"}
                onError={errors.comment}
              />
              <button type="submit" className={style.editBtn}>
                Ajouter
              </button>
            </div>
          </form>
          <div className={style.commentaryContainer}>
            <div className={style.title}>
              <span> Voir les commentaires ({listCommentary?.length})</span>
              <div onClick={toggleIsOpenCommentary}>
                {isOpenCommentary ? <IconOpenComment /> : <IconCloseComment />}
              </div>
            </div>
            {isOpenCommentary && (
              <div id="scrollable-container" className={style.list}>
                {listCommentary?.map((comment, index) => (
                  <div key={index} className={style.item}>
                    <div className={style.top}>
                      <div className={style.containerLeft}>
                        <div className={style.containerUser}>
                          <Image
                            className={style.image}
                            alt="Photo de profile"
                            src={`${api.image.profile}/${comment.user.photo}`}
                            unoptimized
                            width={24}
                            height={24}
                            objectFit="cover"
                          />
                          <div className={style.text}>
                            {comment?.user.firstname}
                          </div>
                        </div>
                        <div className={style.containerDate}>
                          <div className={style.point}> </div>
                          <div className={style.text}>
                            {" "}
                            il y a {getTime(comment?.updatedAt)}
                          </div>
                        </div>
                      </div>
                      <div className={style.containerRight}>
                        {comment.user._id === tokenInfo._id && (
                          <Dropdown
                            key={comment?._id}
                            id={comment?._id}
                            isOpen={openDropdownId === comment?._id}
                            onToggle={handleToggleDropdown}
                          >
                            <button onClick={() => openFormUpdate(comment)}>
                              <IconEdit />{" "}
                              <span style={{ color: "#0231A8" }}>Éditer</span>
                            </button>

                            <button
                              onClick={() => {
                                openConfirmation(comment?._id);
                              }}
                            >
                              <IconDelete />
                              <span style={{ color: "#D35151" }}>
                                Supprimer
                              </span>
                            </button>
                          </Dropdown>
                        )}
                      </div>
                    </div>
                    <div id={`item-${index}`} className={style.bottom}>
                      {isOpenEdit && editCommentary._id === comment?._id ? (
                        <div onClick={() => handleItemClick(index)}>
                          <textarea
                            value={textEditCommentary}
                            onChange={onChangeEditcommentary}
                            rows={4}
                            cols={50} //
                          />
                          <div className={style.layout}>
                            <div className={style.containerButton}>
                              <button type="button" className={style.btnCancel}>
                                Annuler
                              </button>

                              <button
                                type="button"
                                className={style.btnSave}
                                onClick={handleUpdateCommentary}
                              >
                                Enregistrer
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>{comment.comment}</>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </>
    </>
  );
};

export default CommentSection;
