import { API_BASE_URL } from "@/api";
import { ProfileUpload } from "@/dialog/ProfileUpload";
import { Edit, Mail, Phone, Verified } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

interface Certificate {
  _id: string;
  fullName: string;
  age: number;
  fatherName: string;
  grandFatherName: string;
  ruralMunicipality: string;
  transactionImage: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  title?: string;
  // Add other properties as needed
}

interface User {
  _id: string;
  userName: string;
  email: string;
  phone: string;
  isVerified: boolean;
  role: string;
  profileImage: string;
  birthCertificates: Certificate[];
  abibahitCertificates: Certificate[];
  createdAt: string;
  updatedAt: string;
}

interface UserDetailsProps {
  user: User;
}

const CertificateItem: React.FC<Certificate> = ({
  fullName,
  isVerified,
  createdAt,
  _id,
  title = "Birth Certificates",
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <Edit className="h-4 w-4 hover:scale-105 transistion duration-300 ease-in-out" />
    </CardHeader>
    {/* <div className="flex items-center justify-between">
    </div> */}

    <CardContent>
      <p>{fullName}</p>
      <p>{_id}</p>
      <p>{createdAt}</p>
    </CardContent>
    <CardFooter>
      <p className={`mt-2 ${isVerified ? "text-green-600" : "text-red-600"}`}>
        {isVerified ? "Verified" : "Not Verified"}
      </p>
    </CardFooter>
  </Card>
);

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  return (
    <section className="grid grid-cols-4 gap-4 w-full my-4">
      {/* Documents */}
      <div className="col-span-3">
        <div className="grid grid-cols-2 gap-4 p-1">
          {user.birthCertificates.map((certificate) => (
            <CertificateItem key={certificate._id} {...certificate} />
          ))}

          {user.abibahitCertificates.map((certificate) => (
            <CertificateItem
              title="Abibahit Certificates"
              key={certificate._id}
              {...certificate}
            />
          ))}
        </div>
      </div>

      {/* Profile */}
      <div className="col-span-1 flex flex-col items-center justify-center bg-blue-500 text-white p-2">
        <div className="relative">
          <img
            src={`${API_BASE_URL}/images/${user._id}/${user.profileImage}`}
            alt="@shadcn"
            className="h-52 w-52 object-cover rounded-full border-4 border-gray-200 p-1 "
          />

          <ProfileUpload />
        </div>
        <h2 className="text-2xl font-semibold">{user.userName}</h2>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          <p className="text-gray-300">{user.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4" />
          <p className="text-gray-300">{user.phone}</p>
        </div>
        <div className="flex items-center gap-2">
          <Verified className="h-4 w-4" />
          <p className="text-gray-300">{user.role}</p>
        </div>
      </div>
    </section>
  );
};

export default UserDetails;
