import style from "@/components/shared/liste/list.module.css";

interface ListProps<T> {
  title: string;
  children: any;
}

const List: React.FC<ListProps<any>> = ({ title, children }) => {
  return (
    <div className={style.container}>
      <div className={style.title}>{title}</div>
      <div className={style.content}>{children}</div>
    </div>
  );
};

export default List;
