import style from "./details.section.module.css";

interface DetailsSectionProps<T> {
  children: any;
}

const DetailsSection: React.FC<DetailsSectionProps<any>> = ({ children }) => {
  return (
    <section className={style.container}>
      <div className={style.detailsContent}>
        <div className={style.children}>{children}</div>
      </div>
    </section>
  );
};

export default DetailsSection;
