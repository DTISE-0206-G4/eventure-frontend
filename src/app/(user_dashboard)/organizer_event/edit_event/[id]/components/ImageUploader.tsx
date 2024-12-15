import React, { Dispatch, FC, SetStateAction, useState } from "react";
import axios from "axios";
// import { image } from "html2canvas/dist/types/css/types/image";
import Image from "next/image";

interface ImageUploaderProps {
  imageUrl: string | null;
  setImageUrl: Dispatch<SetStateAction<string | null>>;
}
const uploadToBuilder = async (file: File): Promise<string> => {
  try {
    const binaryData = await file.arrayBuffer();

    const response = await axios.post(
      `https://builder.io/api/v1/upload?name=${file.name}&folder=0a6a552ba3ca45ddb8979d943927e562`,
      binaryData,
      {
        headers: {
          Authorization: "Bearer bpk-9904f99ed9fe4997b95163a7799fc36f", // Replace with your private API key
          "Content-Type": file.type,
        },
      }
    );

    // Return the uploaded file URL
    return response.data.url; // Assuming the response contains the uploaded URL
  } catch (error) {
    console.error("Error uploading to Builder.io:", error);
    // if (error.response) {
    //   // Server responded with a status code outside the 2xx range
    //   console.error("Response error:", error.response.data);
    //   console.error("Status code:", error.response.status);
    // } else if (error.request) {
    //   // Request was made, but no response received
    //   console.error("Request error:", error.request);
    // } else {
    //   // Something else happened
    //   console.error("Error message:", error.message);
    // }
    throw new Error("Failed to upload image.");
  }
};
const ImageUploader: FC<ImageUploaderProps> = ({ setImageUrl, imageUrl }) => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);

    try {
      const url = await uploadToBuilder(file);
      setUploadedImageUrl(url);
      setImageUrl(url);
    } catch (error) {
      console.error(error);
      alert("Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 my-5">
        <div className="relative w-full h-full">
          <Image
            className="object-contain"
            src={
              imageUrl
                ? imageUrl
                : "https://flowbite.com/docs/images/carousel/carousel-1.svg"
            }
            fill
            alt="Event Image"
          />
        </div>
      </div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {loading && <p>Uploading...</p>}
      {uploadedImageUrl && (
        <div>
          <p>Uploaded Image:</p>
          <Image
            src={uploadedImageUrl}
            width={200}
            height={200}
            alt="Uploaded"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
