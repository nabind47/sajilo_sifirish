import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { privateApi } from "@/api";
import useAuth from "@/context/useAuth";

export function ProfileUpload() {
  const [profileImage, setProfileImage] = useState(null);
  const client = useQueryClient();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleFileChange = (e: any) => {
    setProfileImage(e.target.files[0]);
  };

  const uploadProfileImage = async () => {
    const formData = new FormData();
    // @ts-ignore
    formData.append("profileImage", profileImage);
    const response = await privateApi.post(
      "http://localhost:8000/users/profileImage",
      formData
    );
    return response.data; // Assuming the server responds with data after successful upload
  };

  const { mutate } = useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: () => {
      // @ts-ignore
      client.invalidateQueries(["users", user.userId]);
      toast({ description: "Successfully uploaded" });
    },
    onError: (error) => {
      toast({
        description: "Error uploading image",
        variant: "error",
      });
      console.error("Error uploading image:", error);
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit className="absolute bottom-10 right-10 cursor-pointer  h-4 w-4 hover:scale-105 transistion duration-300 ease-in-out" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Profile</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col space-y-4">
          {!profileImage && (
            <div className="grid flex-1 gap-2">
              <Input id="file" type="file" onChange={handleFileChange} />
            </div>
          )}
          {profileImage && (
            <div>
              <img
                src={URL.createObjectURL(profileImage)}
                alt="Selected Profile Image"
                className="aspect-square w-full h-52 object-cover"
              />
            </div>
          )}
          <Button
            type="button"
            disabled={!profileImage}
            size="sm"
            className="px-3"
            onClick={() => mutate()}
          >
            Upload Image
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
