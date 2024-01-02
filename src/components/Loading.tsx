import { Loader2 } from "lucide-react"; // Using Lucide-React's RefreshCw icon

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-96">
      <div className="animate-spin text-blue-500">
        <Loader2 size={80} />
      </div>
    </div>
  );
};

export default Loading;
