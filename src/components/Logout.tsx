import { Button } from "@/components/ui/button";
import useAuth from "@/context/useAuth";

const Logout = () => {
  const { clearAuthData } = useAuth();

  return (
    <div>
      <Button variant="link" onClick={clearAuthData}>
        Logout
      </Button>
    </div>
  );
};

export default Logout;
