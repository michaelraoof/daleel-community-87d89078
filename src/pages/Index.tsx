import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ServiceCard } from "@/components/ServiceCard";
import { sampleServices, categories } from "@/data/services";
import { Search, Plus, Users, CheckCircle, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitch } from "@/components/LanguageSwitch";

const Index = () => {
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = sampleServices.filter((service) => {
    const matchesCategory =
      selectedCategory === "All" || service.category === selectedCategory;
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleServiceClick = (id: string) => {
    navigate(`/service/${id}`);
  };

  const getCategoryTranslation = (categoryName: string) => {
    const key = `category.${categoryName.toLowerCase()}`;
    return t(key);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Compact Header */}
      <div className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">{t('hero.title')}</h1>
              <p className="text-xs text-muted-foreground">{t('hero.subtitle')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              size="sm" 
              onClick={() => navigate("/share-experience")}
              className="bg-primary hover:bg-primary-hover"
            >
              <Plus className={`w-4 h-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
              {t('hero.shareExperience')}
            </Button>
            <LanguageSwitch />
          </div>
        </div>
      </div>

      {/* Search Section - Prominent */}
      <div className="bg-secondary/30 border-b border-border py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative max-w-2xl mx-auto">
            <Search className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5`} />
            <Input
              placeholder={t('search.placeholder')}
              className={`${isRTL ? 'pr-12' : 'pl-12'} py-6 text-base rounded-2xl border-border bg-card shadow-sm focus:shadow-md transition-shadow`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Horizontal scrolling categories */}
          <div className="mt-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-2 min-w-max">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category.name
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-card text-muted-foreground hover:bg-muted border border-border"
                  }`}
                >
                  {getCategoryTranslation(category.name)} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats - Inline compact */}
      <div className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto py-3 px-4">
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-primary" />
              <strong className="text-foreground">150+</strong> {t('stats.sharedExperiences')}
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-success" />
              <strong className="text-foreground">500+</strong> {t('stats.verifiedTips')}
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <Users className="w-4 h-4 text-accent" />
              <strong className="text-foreground">1,200+</strong> {t('stats.helpingOthers')}
            </span>
          </div>
        </div>
      </div>

      {/* Services Grid - Primary content */}
      <div className="py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              {filteredServices.length} {t('services.title').toLowerCase()}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                {...service}
                onClick={() => handleServiceClick(service.id)}
              />
            ))}
          </div>

          {filteredServices.length === 0 && (
            <Card className="text-center py-12 border-dashed">
              <CardContent className="pt-6">
                <Search className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {t('services.noResults')}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            {t('footer.madeWith')} ❤️ {t('footer.forCommunity')}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
