"use client";

import { forwardRef, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import style from "./profile.image.module.css";
import { UploadFile } from "@/services/file-upload/fileUpload.service";
import { MAX_SIZE } from "@/services/file-upload/fileUpload.constants";
import { formatFilePath } from "@/utils/file-path.utils.";
import IconCamera from "../shared/icons/iconCamera";
import Image from "next/image";

const ProfileImageUpload = forwardRef(
  ({ onUploaded, defaultValue, readOnly }: any, ref: any) => {
    const filePreviewPath = `/image/profile/${defaultValue}`;

    const [filePreview, setFilePreview] = useState<string | null>(
      filePreviewPath
    );
    const [message, setMessage] = useState("");

    const onUpload = async (event: any) => {
      const formData = new FormData();
      const file = event.target.files[0];

      if (readImage(file)) {
        formData.append("files", file, `${uuid()}${file.name}`);
      }

      const filesUploaded = await UploadFile(formData);

      setFilePreview(`/image/profile/${filesUploaded}`);
    };

    const readImage = (file: any) => {
      if (file) {
        const fileData = file;
        const mimeType = fileData.type;
        if (file.size > MAX_SIZE.maxsize) {
          setMessage("Fichier trop volumineux");
          return false;
        }
        if (
          mimeType !== "image/jpeg" &&
          mimeType !== "image/png" &&
          !file.name.toLowerCase().endsWith(".jpg") &&
          !file.name.toLowerCase().endsWith(".png")
        ) {
          setMessage("Fichier non supporté");
          return false;
        }
        return true;
      }
      return false;
    };

    useEffect(() => {
      onUploaded({
        file: filePreview?.replace(/^\/image\/profile\//, ""),
        errorMessage: message,
      });
      setMessage("");
    }, [filePreview, onUploaded, message]);

    return (
      <div className={style.profileImageContainer}>
        {filePreview && (
          <div className={style.profileImage}>
            <Image
              className={style.image}
              alt={"photo de profile"}
              width={160}
              height={160}
              src={formatFilePath(filePreview ? filePreview : "")}
              unoptimized
              objectFit="cover"
            />
          </div>
        )}
        {!readOnly && (
          <>
            <input
              id="add-file"
              type="file"
              accept="image/*"
              onChange={onUpload}
            />
            <label htmlFor="add-file">
              <IconCamera />
            </label>
          </>
        )}
      </div>
    );
  }
);

export default ProfileImageUpload;
