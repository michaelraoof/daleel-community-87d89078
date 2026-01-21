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
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary via-primary-hover to-accent py-20 px-4">
        {/* Language Switch */}
        <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'}`}>
          <LanguageSwitch />
        </div>
        
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t('hero.title')}
            <span className="block text-2xl md:text-3xl font-normal mt-2 opacity-90">
              {t('hero.subtitle')}
            </span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8 py-3">
              <Search className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t('hero.browseServices')}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 py-3 bg-white/10 border-white/30 text-white hover:bg-white/20"
              onClick={() => navigate("/share-experience")}
            >
              <Plus className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t('hero.shareExperience')}
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto py-8 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-light mb-3">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">150+</div>
              <div className="text-muted-foreground">{t('stats.sharedExperiences')}</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-success-light mb-3">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div className="text-3xl font-bold text-foreground">500+</div>
              <div className="text-muted-foreground">{t('stats.verifiedTips')}</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-light mb-3">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <div className="text-3xl font-bold text-foreground">1,200+</div>
              <div className="text-muted-foreground">{t('stats.helpingOthers')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Categories */}
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5`} />
            <Input
              placeholder={t('search.placeholder')}
              className={`${isRTL ? 'pr-12' : 'pl-12'} py-6 text-lg rounded-xl border-border/50 focus:border-primary`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{t('categories.title')}</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Badge
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "secondary"}
                  className={`px-4 py-2 cursor-pointer transition-all ${
                    selectedCategory === category.name
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80"
                  }`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {getCategoryTranslation(category.name)} ({category.count})
                </Badge>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          <h2 className="text-2xl font-bold mb-6">{t('services.title')}</h2>
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
                <p className="text-muted-foreground text-lg">
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
