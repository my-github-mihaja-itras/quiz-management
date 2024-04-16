import React from "react";
import style from "./classTab.module.css";

interface Props {
  class: string;
}

const ClassTab: React.FC<Props> = ({ class: classProp }) => {
  return (
    <>
      <div className={style.container}>
        <h1>Classe</h1>
        <br />
        <div className={style.content}>
          <input type="text" defaultValue={classProp} disabled={true} />
        </div>
      </div>
    </>
  );
};

export default ClassTab;

