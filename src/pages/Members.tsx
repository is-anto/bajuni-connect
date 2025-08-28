import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Briefcase, User, Users as UsersIcon } from 'lucide-react';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';

interface Member {
  id: string;
  fullName: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  location: string;
  occupation: string;
  age: number;
}

const Members: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    filterMembers();
  }, [members, searchTerm, filterType]);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/members');
      setMembers(response.data);
    } catch (error) {
      console.error('Failed to fetch members:', error);
      toast({
        title: 'Error',
        description: 'Failed to load community members. Using sample data.',
        variant: 'destructive',
      });
      
      // Sample data for demonstration
      const sampleMembers: Member[] = [
        {
          id: '1',
          fullName: 'Amina Hassan',
          email: 'amina@example.com',
          dateOfBirth: '1990-05-15',
          gender: 'female',
          location: 'Mombasa, Kenya',
          occupation: 'Marine Biologist',
          age: 34
        },
        {
          id: '2',
          fullName: 'Omar Ali',
          email: 'omar@example.com',
          dateOfBirth: '1985-12-03',
          gender: 'male',
          location: 'Mogadishu, Somalia',
          occupation: 'Software Engineer',
          age: 39
        },
        {
          id: '3',
          fullName: 'Fatima Mohammed',
          email: 'fatima@example.com',
          dateOfBirth: '1992-08-22',
          gender: 'female',
          location: 'Lamu, Kenya',
          occupation: 'Cultural Historian',
          age: 32
        },
        {
          id: '4',
          fullName: 'Ahmed Rashid',
          email: 'ahmed@example.com',
          dateOfBirth: '1988-03-10',
          gender: 'male',
          location: 'Kismayo, Somalia',
          occupation: 'Fisherman',
          age: 36
        },
        {
          id: '5',
          fullName: 'Zainab Omar',
          email: 'zainab@example.com',
          dateOfBirth: '1995-07-18',
          gender: 'female',
          location: 'Kilifi, Kenya',
          occupation: 'Teacher',
          age: 29
        },
        {
          id: '6',
          fullName: 'Yusuf Abdi',
          email: 'yusuf@example.com',
          dateOfBirth: '1983-11-25',
          gender: 'male',
          location: 'Barawa, Somalia',
          occupation: 'Business Owner',
          age: 41
        }
      ];
      setMembers(sampleMembers);
    } finally {
      setLoading(false);
    }
  };

  const filterMembers = () => {
    let filtered = members;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(member =>
        member.fullName.toLowerCase().includes(term) ||
        member.location.toLowerCase().includes(term) ||
        member.occupation.toLowerCase().includes(term)
      );
    }

    if (filterType !== 'all') {
      if (filterType === 'location') {
        // Group by location for location filter
        filtered = filtered.sort((a, b) => a.location.localeCompare(b.location));
      } else if (filterType === 'occupation') {
        // Group by occupation for occupation filter
        filtered = filtered.sort((a, b) => a.occupation.localeCompare(b.occupation));
      }
    }

    setFilteredMembers(filtered);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilterType('all');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-sand/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading community members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-sand/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <UsersIcon className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold bg-gradient-ocean bg-clip-text text-transparent">
                Community Members
              </h1>
            </div>
            <p className="text-muted-foreground">
              Connect with {members.length} members of the Bajuni community worldwide
            </p>
          </div>

          {/* Search and Filter Section */}
          <Card className="mb-8 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Find Members</CardTitle>
              <CardDescription>
                Search by name, location, or occupation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search members..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Members</SelectItem>
                    <SelectItem value="location">By Location</SelectItem>
                    <SelectItem value="occupation">By Occupation</SelectItem>
                  </SelectContent>
                </Select>
                {(searchTerm || filterType !== 'all') && (
                  <Button variant="outline" onClick={clearSearch}>
                    Clear
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Results Summary */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredMembers.length} of {members.length} members
            </p>
          </div>

          {/* Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <Card key={member.id} className="shadow-soft hover:shadow-medium transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-ocean rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{member.fullName}</CardTitle>
                  <CardDescription>Age {member.age}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{member.location}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm">
                    <Briefcase className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{member.occupation}</span>
                  </div>

                  <div className="pt-2">
                    <Badge variant="secondary" className="capitalize">
                      {member.gender}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <UsersIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No members found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Members;