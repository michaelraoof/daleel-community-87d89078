import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { sampleServices } from "@/data/services";
import { ArrowLeft, ArrowRight, MapPin, Clock, ThumbsUp, FileText, DollarSign, CheckCircle, AlertCircle, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitch } from "@/components/LanguageSwitch";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();
  
  const service = sampleServices.find(s => s.id === id);
  
  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">{t('details.notFound') || 'Service Not Found'}</h2>
          <p className="text-muted-foreground mb-4 text-sm">
            The service you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate("/")} size="sm">
            {t('details.backToServices')}
          </Button>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'text-success bg-success-light';
      case 'medium':
        return 'text-warning bg-warning-light';
      case 'hard':
        return 'text-destructive bg-destructive/10';
      default:
        return 'text-muted-foreground bg-muted';
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

  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-primary font-medium text-sm"
          >
            <BackArrow className="w-4 h-4" />
            {t('details.backToServices')}
          </button>
          <LanguageSwitch />
        </div>
      </header>

      {/* Service Info */}
      <div className="px-4 pt-6 pb-4 border-b border-border">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-xl font-bold text-foreground mb-2">
            {service.title}
          </h1>
          <p className="text-muted-foreground text-sm mb-4">
            {service.institution}
          </p>
          
          {/* Quick stats */}
          <div className={`flex flex-wrap gap-4 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {service.location}
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="w-4 h-4" />
              {service.averageTime}
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <ThumbsUp className="w-4 h-4" />
              {service.upvotes}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      {service.description && (
        <div className="px-4 py-4 border-b border-border">
          <div className="max-w-2xl mx-auto">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>
      )}

      {/* Experiences */}
      <div className="px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-base font-semibold mb-4">
            {t('details.experiences')} ({service.experienceCount})
          </h2>
          
          <div className="space-y-4">
            {service.experiences.map((experience) => (
              <div 
                key={experience.id} 
                className="bg-card rounded-xl p-4"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{experience.author}</p>
                      <p className="text-xs text-muted-foreground">{experience.date}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(experience.difficulty)}`}>
                    {getDifficultyTranslation(experience.difficulty)}
                  </span>
                </div>

                {/* Documents */}
                <div className="mb-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm font-medium">{t('details.requiredDocuments')}</span>
                  </div>
                  <ul className={`text-sm text-muted-foreground space-y-1 ${isRTL ? 'mr-6' : 'ml-6'}`}>
                    {experience.requiredDocuments.map((doc, index) => (
                      <li key={index} className="list-disc list-inside">{doc}</li>
                    ))}
                  </ul>
                </div>

                {/* Fees */}
                {experience.fees && (
                  <div className="mb-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <DollarSign className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium">{t('details.fees')}</span>
                    </div>
                    <p className={`text-sm text-muted-foreground ${isRTL ? 'mr-6' : 'ml-6'}`}>
                      {experience.fees}
                    </p>
                  </div>
                )}

                {/* Process */}
                <div className="mb-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{t('details.process')}</span>
                  </div>
                  <p className={`text-sm text-muted-foreground leading-relaxed ${isRTL ? 'mr-6' : 'ml-6'}`}>
                    {experience.process}
                  </p>
                </div>

                {/* Tips */}
                {experience.tips && (
                  <div className="bg-warning-light rounded-lg p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <AlertCircle className="w-4 h-4 text-warning" />
                      <span className="text-sm font-medium">{t('details.tips')}</span>
                    </div>
                    <p className={`text-sm text-muted-foreground leading-relaxed ${isRTL ? 'mr-6' : 'ml-6'}`}>
                      {experience.tips}
                    </p>
                  </div>
                )}

                {/* Upvotes */}
                <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-border">
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="ml-1.5 text-sm">{experience.upvotes}</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action */}
      <div className="fixed bottom-6 left-0 right-0 px-4">
        <div className="max-w-2xl mx-auto">
          <Button 
            className="w-full rounded-xl h-12 shadow-lg"
            onClick={() => navigate("/share-experience")}
          >
            {t('details.shareExperience')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
