import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/useAuth";

const Home = () => {
  const { clearAuthData } = useAuth();
  return (
    <div>
      <Button variant="outline" onClick={clearAuthData}>
        Logout
      </Button>
    </div>
  );
};

export default Home;
