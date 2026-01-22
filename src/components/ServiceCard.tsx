import { MapPin, Clock, ChevronRight, ChevronLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ServiceCardProps {
  id: string;
  title: string;
  institution: string;
  location: string;
  category: string;
  upvotes: number;
  experienceCount: number;
  averageTime: string;
  lastUpdated: string;
  onClick: () => void;
}

export const ServiceCard = ({
  title,
  institution,
  location,
  category,
  experienceCount,
  averageTime,
  onClick
}: ServiceCardProps) => {
  const { t, isRTL } = useLanguage();
  
  const getCategoryTranslation = (categoryName: string) => {
    const key = `category.${categoryName.toLowerCase()}`;
    return t(key);
  };

  const Chevron = isRTL ? ChevronLeft : ChevronRight;

  return (
    <button 
      className="w-full bg-card rounded-xl p-4 text-start active:bg-secondary/50 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 className="font-semibold text-foreground leading-tight mb-1 truncate">
            {title}
          </h3>
          
          {/* Institution */}
          <p className="text-sm text-muted-foreground mb-2 truncate">
            {institution}
          </p>
          
          {/* Meta row */}
          <div className={`flex items-center gap-3 text-xs text-muted-foreground ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {averageTime}
            </span>
            <span className="text-primary font-medium">
              {experienceCount} {t('services.experiences')}
            </span>
          </div>
        </div>
        
        {/* Arrow */}
        <div className="flex-shrink-0 flex items-center self-center">
          <Chevron className="w-5 h-5 text-muted-foreground/50" />
        </div>
      </div>
    </button>
  );
};
