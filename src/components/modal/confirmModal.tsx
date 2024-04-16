import style from "./confirmModal.module.css";
export interface ConfirmMessage {
  title: string;
  message: string;
}
export default function ConfirmModal(props: any) {
  const { close, message, handleConfirmation } = props;
  const closeModal = () => {
    close(false);
  };

  return (
    <div className={style.modalContainer}>
      <div className={style.modal}>
        <p className={style.title}>{message.title}</p>
        <p className={style.message}>{message.message}</p>
        <div className={style.actionBtn}>
          <button
            onClick={() => handleConfirmation(message.id,message.status)}
            className={message.status===false ? style.confirmBtnBlue : style.confirmBtn}
          >
            {message.confirmText}
          </button>
          <button onClick={() => closeModal()} className={style.closeBtn}>
            FERMER
          </button>
        </div>
      </div>
    </div>
  );
}
