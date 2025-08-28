import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-sand/20 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="text-6xl font-bold text-primary mb-4">404</div>
          <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
          <p className="text-muted-foreground">
            Sorry, we couldn't find the page you're looking for in the Bajuni Community.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <a href="/" className="flex items-center space-x-2">
              <Home className="h-4 w-4" />
              <span>Return Home</span>
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/members" className="flex items-center space-x-2">
              <Search className="h-4 w-4" />
              <span>Explore Members</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
