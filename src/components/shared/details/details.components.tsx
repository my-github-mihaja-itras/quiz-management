import style from "./details.module.css";

interface DetailsProps<T> {
  children: any;
}

const Details: React.FC<DetailsProps<any>> = ({ children }) => {
  return (
    <div className={style.container}>
      <div className={style.child}>{children}</div>
    </div>
  );
};

export default Details;
