import { UPLOAD_API_URL } from "./fileUpload.constants";

export async function UploadFile(formData: FormData): Promise<string> {
  const response = await fetch(
    `${process.env.API_BASE_URL}/${UPLOAD_API_URL}/image`,
    {
      method: "POST",
      body: formData,
    }
  );
  const sendFile = await response.json();
  return sendFile.data as string;
}

export async function RemoveUploaded(filename: string): Promise<any> {
  const remove = await fetch(
    `${process.env.API_BASE_URL}/${UPLOAD_API_URL}/image/${filename.replace(
      /^\/image\/profile\//,
      ""
    )}`,
    {
      method: "DELETE",
    }
  );
  const deleted = await remove.json();
  return deleted as any;
}
