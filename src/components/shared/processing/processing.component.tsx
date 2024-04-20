import style from "./processing.module.css";

interface Processing<T> {
  title?: string;
  titleIcon?: React.ReactElement;
  children: any;
}

const Processing: React.FC<Processing<any>> = ({
  title,
  titleIcon,
  children,
}) => {
  return (
    <div className={style.container}>
      {title && (
        <>
          <div className={style.header}>
            {titleIcon && <div className={style.icon}>{titleIcon}</div>}
            <div className={style.title}>{title}</div>
          </div>
        </>
      )}
      <div className={style.child}>{children}</div>
    </div>
  );
};

export default Processing;
