import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Users, User, Home } from 'lucide-react';

const Navigation: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b bg-card shadow-soft">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold bg-gradient-ocean bg-clip-text text-transparent">
              Bajuni Connect
            </Link>
            
            <div className="hidden md:flex items-center space-x-4">
              <Link 
                to="/"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/') 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              
              <Link 
                to="/members"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/members') 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <Users className="h-4 w-4" />
                <span>Members</span>
              </Link>

              {user && (
                <Link 
                  to="/profile"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/profile') 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground hidden sm:block">
                  Welcome, {user.fullName}
                </span>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">
                    Join Community
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;