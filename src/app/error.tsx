"use client";
import Image from "next/image";
import style from "./page.module.css";

const error = ({}) => {
  return (
    <div className={style.errorContainer}>
      <div className={style.errorContent}>
        <Image
          src="/resources/error.png"
          alt="Image"
          className={style.image}
          width={300}
          height={300}
          objectFit="cover"
        />
        <div className={style.errorMessage}>
          <div>Une erreur est survenue.</div>
          <div>S'il vous plaît, veuillez contacter le service technique.</div>
        </div>
      </div>
    </div>
  );
};

export default error;
