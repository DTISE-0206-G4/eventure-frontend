import React, { Dispatch, FC, SetStateAction, useState } from "react";
import axios from "axios";

interface ImageUploaderProps {
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
    
    throw new Error("Failed to upload image.");
  }
};
const ImageUploader: FC<ImageUploaderProps> = ({ setImageUrl }) => {
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
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {loading && <p>Uploading...</p>}
      {uploadedImageUrl && (
        <div>
          <p>Uploaded Image:</p>
          <img
            src={uploadedImageUrl}
            alt="Uploaded"
            style={{ width: "200px" }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
