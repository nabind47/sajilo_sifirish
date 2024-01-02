// @ts-nocheck
import axios from "axios";
import React, { useState } from "react";

interface FormDataState {
  transactionImage: File | null;
  front: File | null;
  back: File | null;
}

const ImageUpload: React.FC = () => {
  const [formData, setFormData] = useState<FormDataState>({
    transactionImage: null,
    front: null,
    back: null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create a FormData object to append files
    const formDataToSend = new FormData();
    formDataToSend.append("transactionImage", formData.transactionImage!);
    formDataToSend.append("front", formData.front!);
    formDataToSend.append("back", formData.back!);

    // Log the updated formData
    setFormData((prevFormData) => {
      return prevFormData;
    });

    try {
      // Make a POST request to your server
      const response = await axios.post(
        "http://localhost:8000/users/abc",
        formDataToSend,
        {
          headers: { "Content-Type": "application/form-data" },
        }
      );

      // Handle the response as needed
      console.log(response.data);
    } catch (error) {
      // Handle error
      console.error("Error uploading files", error);
    }
  };

  const handleFileChange = (
    name: keyof FormDataState,
    files: FileList | null
  ) => {
    setFormData({
      ...formData,
      [name]: files ? files[0] : null,
    });
  };

  return (
    <div>
      <h2>Birth Certificate Upload</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => handleFileChange("transactionImage", e.target.files)}
        />
        <input
          type="file"
          onChange={(e) => handleFileChange("front", e.target.files)}
        />
        <input
          type="file"
          onChange={(e) => handleFileChange("back", e.target.files)}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default ImageUpload;
