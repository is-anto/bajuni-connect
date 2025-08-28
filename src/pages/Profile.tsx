import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, MapPin, Briefcase, Mail, User, Cake } from 'lucide-react';
import { format } from 'date-fns';

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Not logged in</h1>
          <p className="text-muted-foreground">Please log in to view your profile</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-sand/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-ocean bg-clip-text text-transparent">
              My Profile
            </h1>
            <p className="text-muted-foreground mt-2">
              Welcome to your Bajuni Community profile
            </p>
          </div>

          <Card className="shadow-medium">
            <CardHeader className="text-center pb-6">
              <div className="w-24 h-24 bg-gradient-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-12 w-12 text-white" />
              </div>
              <CardTitle className="text-2xl">{user.fullName}</CardTitle>
              <CardDescription className="flex items-center justify-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{user.location}</span>
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-accent/20 rounded-lg">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-accent/20 rounded-lg">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Occupation</p>
                      <p className="font-medium">{user.occupation}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-accent/20 rounded-lg">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                      <p className="font-medium">{formatDate(user.dateOfBirth)}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-accent/20 rounded-lg">
                    <Cake className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Age</p>
                      <p className="font-medium">{user.age} years old</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Gender</p>
                    <Badge variant="secondary" className="capitalize">
                      {user.gender}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Location</p>
                    <Badge variant="outline">
                      {user.location}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Member Since</p>
                    <Badge variant="outline">
                      Member
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="text-center p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Welcome to Bajuni Community!</h3>
                <p className="text-muted-foreground">
                  You're part of a vibrant community connecting Bajuni people worldwide. 
                  Explore our member directory to connect with others.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;