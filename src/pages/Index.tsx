import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ServiceCard } from "@/components/ServiceCard";
import { sampleServices, categories } from "@/data/services";
import { Search, Plus, Users, CheckCircle, BookOpen } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = sampleServices.filter(service => {
    const matchesCategory = selectedCategory === "All" || service.category === selectedCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.institution.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleServiceClick = (serviceId: string) => {
    navigate(`/service/${serviceId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary via-primary-hover to-accent py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            دليل
            <span className="block text-2xl md:text-3xl font-normal mt-2 opacity-90">
              Your Guide to Every Service
            </span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Never waste time on bureaucracy again. Find real experiences from people who've been there, 
            shared by the community to help you navigate any service or errand with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8 py-3">
              <Search className="w-5 h-5 mr-2" />
              Browse Services
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 py-3 bg-white/10 border-white/30 text-white hover:bg-white/20"
              onClick={() => navigate("/share-experience")}
            >
              <Plus className="w-5 h-5 mr-2" />
              Share Experience
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-light rounded-full mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {sampleServices.length}+ Services
              </h3>
              <p className="text-muted-foreground">
                Documented processes and experiences
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-accent-light rounded-full mx-auto mb-4">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {sampleServices.reduce((acc, service) => acc + service.experienceCount, 0)}+ Experiences
              </h3>
              <p className="text-muted-foreground">
                Real stories from real people
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-success-light rounded-full mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {sampleServices.reduce((acc, service) => acc + service.upvotes, 0)}+ Upvotes
              </h3>
              <p className="text-muted-foreground">
                Community-verified information
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search for a service, institution, or location..."
                className="pl-10 py-3 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Badge
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "secondary"}
                  className={`cursor-pointer px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === category.name 
                      ? "bg-primary text-primary-foreground hover:bg-primary-hover" 
                      : "hover:bg-secondary/80"
                  }`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {category.name} ({category.count})
                </Badge>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                {...service}
                onClick={() => handleServiceClick(service.id)}
              />
            ))}
          </div>

          {filteredServices.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-muted-foreground text-lg mb-4">
                  No services found matching your criteria.
                </p>
                <Button variant="outline" onClick={() => navigate("/share-experience")}>
                  <Plus className="w-4 h-4 mr-2" />
                  Be the first to share this experience
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-primary to-accent py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Help Others Navigate Bureaucracy
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Share your experience and save someone else hours of frustration. 
            Every contribution makes a difference.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="px-8 py-3"
            onClick={() => navigate("/share-experience")}
          >
            <Plus className="w-5 h-5 mr-2" />
            Share Your Experience
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
