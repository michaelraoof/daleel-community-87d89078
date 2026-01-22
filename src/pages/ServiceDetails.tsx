import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { sampleServices } from "@/data/services";
import { ArrowLeft, ArrowRight, MapPin, Building, Clock, ThumbsUp, FileText, DollarSign, CheckCircle, AlertCircle, User, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitch } from "@/components/LanguageSwitch";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();
  
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
              {t('details.backToServices')}
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

  const getDifficultyTranslation = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return t('share.easy');
      case 'medium':
        return t('share.medium');
      case 'hard':
        return t('share.hard');
      default:
        return difficulty;
    }
  };

  const getCategoryTranslation = (categoryName: string) => {
    const key = `category.${categoryName.toLowerCase()}`;
    return t(key);
  };

  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent py-8 px-4 relative">
        {/* Language Switch */}
        <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'}`}>
          <LanguageSwitch />
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              <BackArrow className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t('details.backToServices')}
            </Button>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {service.title}
              </h1>
              <div className="flex items-center text-white/90 mb-4">
                <Building className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                <span>{service.institution}</span>
              </div>
            </div>
            <Badge 
              variant="secondary" 
              className={`w-fit ${getCategoryColor(service.category)}`}
            >
              {getCategoryTranslation(service.category)}
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
                    {t('details.overview')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center text-sm">
                      <Clock className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'} text-muted-foreground`} />
                      <span>{service.averageTime}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'} text-muted-foreground`} />
                      <span>{service.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <ThumbsUp className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'} text-muted-foreground`} />
                      <span>{service.upvotes} {t('details.helpful')}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <FileText className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'} text-muted-foreground`} />
                      <span>{service.experienceCount} {t('services.experiences')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Experiences */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">{t('details.experiences')}</h2>
                {service.experiences.map((experience) => (
                  <Card key={experience.id} className={`${isRTL ? 'border-r-4 border-r-primary' : 'border-l-4 border-l-primary'}`}>
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
                            {getDifficultyTranslation(experience.difficulty)}
                          </Badge>
                        </div>
                        <div className={`flex items-center gap-4 text-sm text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
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
                          {t('details.requiredDocuments')}
                        </h4>
                        <ul className={`list-disc space-y-1 text-sm text-muted-foreground ${isRTL ? 'mr-6 list-inside' : 'ml-6 list-inside'}`}>
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
                            {t('details.fees')}
                          </h4>
                          <p className={`text-sm text-muted-foreground ${isRTL ? 'mr-6' : 'ml-6'}`}>{experience.fees}</p>
                        </div>
                      )}

                      <Separator />

                      {/* Process */}
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <FileText className="w-4 h-4 text-primary" />
                          {t('details.process')}
                        </h4>
                        <p className={`text-sm text-muted-foreground leading-relaxed ${isRTL ? 'mr-6' : 'ml-6'}`}>
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
                              {t('details.tips')}
                            </h4>
                            <p className={`text-sm text-muted-foreground leading-relaxed ${isRTL ? 'mr-6' : 'ml-6'}`}>
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
                  <CardTitle className="text-lg">{t('details.overview')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{t('details.helpful')}</span>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4 text-success" />
                      <span className="font-medium">{service.upvotes}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{t('details.experiences')}</span>
                    <span className="font-medium">{service.experienceCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{t('details.lastUpdated')}</span>
                    <span className="font-medium">{service.lastUpdated}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{t('details.averageTime')}</span>
                    <span className="font-medium">{service.averageTime}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('details.shareExperience')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full" 
                    onClick={() => navigate("/share-experience")}
                  >
                    {t('details.shareExperience')}
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
