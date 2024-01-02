import { useQuery } from "@tanstack/react-query";

import { privateApi } from "@/api";
import Loading from "@/components/Loading";
import UserDetails from "@/components/UserDetails";
import useAuth from "@/context/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", user?.userId],
    queryFn: () => privateApi.get("/users/me").then((res) => res.data.user),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p className="text-red-600">Error loading data. {error?.message}</p>;
  }

  return (
    <div className="w-11/12 mx-auto">
      <UserDetails user={data} />
    </div>
  );
};

export default Dashboard;
