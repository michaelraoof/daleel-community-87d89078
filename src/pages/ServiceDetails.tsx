import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { sampleServices } from "@/data/services";
import { ArrowLeft, MapPin, Building, Clock, ThumbsUp, FileText, DollarSign, CheckCircle, AlertCircle, User, Calendar } from "lucide-react";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const service = sampleServices.find(s => s.id === id);
  
  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="py-8">
            <h2 className="text-2xl font-bold mb-4">Service Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The service you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'government':
        return 'bg-primary-light text-primary border-primary/20';
      case 'education':
        return 'bg-accent-light text-accent border-accent/20';
      case 'healthcare':
        return 'bg-success-light text-success border-success/20';
      case 'legal':
        return 'bg-warning-light text-warning border-warning/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'text-success bg-success-light border-success/20';
      case 'medium':
        return 'text-warning bg-warning-light border-warning/20';
      case 'hard':
        return 'text-destructive bg-destructive-light border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Button>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {service.title}
              </h1>
              <div className="flex items-center text-white/90 mb-4">
                <Building className="w-5 h-5 mr-2" />
                <span>{service.institution}</span>
              </div>
            </div>
            <Badge 
              variant="secondary" 
              className={`w-fit ${getCategoryColor(service.category)}`}
            >
              {service.category}
            </Badge>
          </div>
        </div>
      </div>

      {/* Service Overview */}
      <div className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Service Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Service Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center text-sm">
                      <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span>{service.averageTime}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span>{service.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <ThumbsUp className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span>{service.upvotes} upvotes</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <FileText className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span>{service.experienceCount} experiences</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Experiences */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Community Experiences</h2>
                {service.experiences.map((experience) => (
                  <Card key={experience.id} className="border-l-4 border-l-primary">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">{experience.author}</span>
                          </div>
                          <Badge 
                            variant="secondary" 
                            className={getDifficultyColor(experience.difficulty)}
                          >
                            {experience.difficulty}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{experience.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{experience.upvotes}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Required Documents */}
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-success" />
                          Required Documents
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-6">
                          {experience.requiredDocuments.map((doc, index) => (
                            <li key={index}>{doc}</li>
                          ))}
                        </ul>
                      </div>

                      <Separator />

                      {/* Fees */}
                      {experience.fees && (
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-accent" />
                            Fees
                          </h4>
                          <p className="text-sm text-muted-foreground ml-6">{experience.fees}</p>
                        </div>
                      )}

                      <Separator />

                      {/* Process */}
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <FileText className="w-4 h-4 text-primary" />
                          Process
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed ml-6">
                          {experience.process}
                        </p>
                      </div>

                      {/* Tips */}
                      {experience.tips && (
                        <>
                          <Separator />
                          <div>
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 text-warning" />
                              Tips & Advice
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed ml-6">
                              {experience.tips}
                            </p>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Community Rating</span>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4 text-success" />
                      <span className="font-medium">{service.upvotes}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Experiences Shared</span>
                    <span className="font-medium">{service.experienceCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Last Updated</span>
                    <span className="font-medium">{service.lastUpdated}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Average Time</span>
                    <span className="font-medium">{service.averageTime}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Help the Community</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full" 
                    onClick={() => navigate("/share-experience")}
                  >
                    Share Your Experience
                  </Button>
                  <Button variant="outline" className="w-full">
                    Report Issue
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;