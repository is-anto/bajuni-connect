import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, MapPin, Heart, Waves, ArrowRight } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Connect with Community",
      description: "Find and connect with Bajuni people from around the world"
    },
    {
      icon: <MapPin className="h-8 w-8 text-primary" />,
      title: "Global Network",
      description: "Members spanning from Kenya, Somalia, and the diaspora"
    },
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Cultural Heritage",
      description: "Preserve and celebrate our rich Bajuni culture and traditions"
    },
    {
      icon: <Waves className="h-8 w-8 text-primary" />,
      title: "Coastal Identity",
      description: "United by our connection to the beautiful East African coast"
    }
  ];

  const stats = [
    { number: "500+", label: "Community Members" },
    { number: "15+", label: "Countries" },
    { number: "50+", label: "Cities" },
    { number: "100%", label: "Welcome" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24 sm:py-32">
          <div className="text-center text-white">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              Welcome to
              <span className="block bg-gradient-sunset bg-clip-text text-transparent">
                Bajuni Connect
              </span>
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              The digital home for the Bajuni community worldwide. Connect, share, and celebrate our coastal heritage together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
                  Join Our Community
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/members">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Explore Members
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-background to-sand/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-ocean bg-clip-text text-transparent">
              Why Join Bajuni Connect?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the power of community and celebrate our shared heritage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center shadow-soft hover:shadow-medium transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Our Heritage
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Celebrating Bajuni Culture
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              The Bajuni people are a unique ethnic group with deep roots along the East African coast, 
              particularly in Kenya and Somalia. Our community is known for its rich maritime culture, 
              traditional dhow sailing, fishing heritage, and beautiful coastal settlements. 
              Through Bajuni Connect, we preserve our traditions while building bridges across the diaspora.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="p-6 bg-primary/5 rounded-lg">
                <h3 className="font-semibold mb-2 text-primary">Maritime Heritage</h3>
                <p className="text-sm text-muted-foreground">
                  Centuries of seafaring tradition and connection to the Indian Ocean
                </p>
              </div>
              <div className="p-6 bg-secondary/5 rounded-lg">
                <h3 className="font-semibold mb-2 text-secondary">Cultural Diversity</h3>
                <p className="text-sm text-muted-foreground">
                  A rich blend of African, Arab, and Persian influences
                </p>
              </div>
              <div className="p-6 bg-primary/5 rounded-lg">
                <h3 className="font-semibold mb-2 text-primary">Global Community</h3>
                <p className="text-sm text-muted-foreground">
                  Bajuni people thriving in communities around the world
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Connect?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join our growing community and be part of something special. 
            Connect with fellow Bajuni people, share your story, and celebrate our heritage together.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
