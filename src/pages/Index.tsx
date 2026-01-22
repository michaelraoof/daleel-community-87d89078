import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ServiceCard } from "@/components/ServiceCard";
import { sampleServices, categories } from "@/data/services";
import { Search, Plus } from "lucide-react";
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
      {/* Clean Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-foreground tracking-tight">
            {t('hero.title')}
          </h1>
          <div className="flex items-center gap-3">
            <LanguageSwitch />
            <Button 
              size="sm"
              onClick={() => navigate("/share-experience")}
              className="rounded-full h-8 w-8 p-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <div className="pt-6 pb-4 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Search Bar - iOS style */}
          <div className="relative mb-4">
            <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4`} />
            <Input
              placeholder={t('search.placeholder')}
              className={`${isRTL ? 'pr-10' : 'pl-10'} h-10 text-sm rounded-xl bg-secondary border-0 focus-visible:ring-1 focus-visible:ring-primary`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Categories - Horizontal scroll pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.name
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground active:bg-secondary/70"
                }`}
              >
                {getCategoryTranslation(category.name)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="pb-8 px-4">
        <div className="max-w-2xl mx-auto space-y-2">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              {...service}
              onClick={() => handleServiceClick(service.id)}
            />
          ))}

          {filteredServices.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-sm">
                {t('services.noResults')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
