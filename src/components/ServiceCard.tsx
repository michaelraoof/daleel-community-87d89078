import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Building, Clock, ThumbsUp, FileText } from "lucide-react";

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
  upvotes,
  experienceCount,
  averageTime,
  lastUpdated,
  onClick
}: ServiceCardProps) => {
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

  return (
    <Card 
      className="hover:shadow-[var(--shadow-elevated)] transition-all duration-300 cursor-pointer border border-border/50 hover:border-primary/30"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-foreground leading-tight">
            {title}
          </CardTitle>
          <Badge 
            variant="secondary" 
            className={`ml-2 ${getCategoryColor(category)}`}
          >
            {category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3 pb-4">
        <div className="flex items-center text-muted-foreground text-sm">
          <Building className="w-4 h-4 mr-2" />
          <span>{institution}</span>
        </div>
        
        <div className="flex items-center text-muted-foreground text-sm">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{location}</span>
        </div>
        
        <div className="flex items-center text-muted-foreground text-sm">
          <Clock className="w-4 h-4 mr-2" />
          <span>Average time: {averageTime}</span>
        </div>
      </CardContent>
      
      <CardFooter className="pt-4 border-t border-border/50">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <ThumbsUp className="w-4 h-4 mr-1" />
              <span>{upvotes}</span>
            </div>
            <div className="flex items-center">
              <FileText className="w-4 h-4 mr-1" />
              <span>{experienceCount} experiences</span>
            </div>
          </div>
          
          <Button variant="outline" size="sm" className="ml-2">
            View Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};