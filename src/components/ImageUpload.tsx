// @ts-nocheck
import { privateApi } from "@/api";
import React, { useState } from "react";
import { Input } from "./ui/input";

interface FormDataState {
  transactionImage: File | null;
  front: File | null;
  back: File | null;
}

const ImageUpload: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

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
    formDataToSend.append("name", name);
    formDataToSend.append("email", email);

    // Log the updated formData
    setFormData((prevFormData) => {
      return prevFormData;
    });

    try {
      // Make a POST request to your server
      const response = await privateApi.post(
        "birth-certs/abc",
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
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="file"
          onChange={(e) => handleFileChange("transactionImage", e.target.files)}
        />
        <Input
          type="file"
          onChange={(e) => handleFileChange("front", e.target.files)}
        />
        <Input
          type="file"
          onChange={(e) => handleFileChange("back", e.target.files)}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default ImageUpload;
