import style from "./details.profile.module.css";

interface DetailsProfileProps<T> {
  children: any;
}

const DetailsProfile: React.FC<DetailsProfileProps<any>> = ({ children }) => {
  return (
    <section className={style.container}>
      <div className={style.detailsContent}>
        <div className={style.children}>{children}</div>
      </div>
    </section>
  );
};

export default DetailsProfile;
