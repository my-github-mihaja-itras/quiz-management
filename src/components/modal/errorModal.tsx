import style from "./errorModal.module.css";
export interface ErrorMessage {
  title: string;
  message: string;
}
export default function ErrorModal(props: any) {
  const { close, message, color } = props;
  const closeErrorModal = () => {
    close(false);
  };

  return (
    <div className={style.modalContainer}>
      <div className={style.modal}>
        <p className={style.title}>{message?.title}</p>
        <p className={style.message}>{message?.message}</p>
        <button style={{ background: color }} onClick={() => closeErrorModal()}>
          Fermer
        </button>
      </div>
    </div>
  );
}
