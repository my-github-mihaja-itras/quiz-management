import { forwardRef } from "react";
import IconFile from "../shared/icons/iconFile";
import style from "./diploma.form.field.module.css";
import { api } from "@/cores/constant/constant.resource.api";
import IconDownload from "../shared/icons/iconDownload";

interface FilenameProps {
  label: string;
  filename: string;
  readonly: boolean;
}

const FileNameText = forwardRef<HTMLDivElement, FilenameProps>(
  ({ filename, readonly, label }, ref) => {
    let extension;
    let filenameWrap;

    if (filename && filename?.length >= 20) {
      filenameWrap = filename?.substring(0, 15) + "...";
      extension = filename?.substring(filename.length - 3);
      filenameWrap += extension;
    } else {
      filenameWrap = filename;
    }

    return (
      <div ref={ref}>
        <div className={readonly ? style.fileDisabled : style.file}>
          {" "}
          <label className={`${style.label}`}>{label}</label>
          {filename ? (
            extension === "pdf" ? (
              readonly ? (
                <div>
                  <span>{filenameWrap.toString()}</span> <IconFile />
                </div>
              ) : (
                <a
                  className={style.fileLink}
                  href={`${api.file.index}/${filename.toString()}`}
                  download={true}
                >
                  <span>{filenameWrap.toString()}</span>{" "}
                  <IconDownload fill={"#0FC3ED"} />
                </a>
              )
            ) : readonly ? (
              <div>
                <span>{filenameWrap.toString()}</span>{" "}
                <IconDownload fill={"#0FC3ED"} />
              </div>
            ) : (
              <a
                className={style.fileLink}
                href={`${api.file.index}/${filename.toString()}`}
                download={true}
              >
                <span>{filenameWrap.toString()}</span>{" "}
                <IconDownload fill={"#0FC3ED"} />
              </a>
            )
          ) : (
            <span>Aucun fichier</span>
          )}
        </div>
      </div>
    );
  }
);

export default FileNameText;
