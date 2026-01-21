import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitch } from "@/components/LanguageSwitch";

const ShareExperience = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, isRTL } = useLanguage();
  const [documents, setDocuments] = useState<string[]>([]);
  const [newDocument, setNewDocument] = useState("");

  const [formData, setFormData] = useState({
    serviceTitle: "",
    institution: "",
    location: "",
    category: "",
    description: "",
    fees: "",
    process: "",
    tips: "",
    difficulty: "",
    averageTime: ""
  });

  const addDocument = () => {
    if (newDocument.trim()) {
      setDocuments([...documents, newDocument.trim()]);
      setNewDocument("");
    }
  };

  const removeDocument = (index: number) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.serviceTitle || !formData.institution || !formData.category) {
      toast({
        title: t('share.errorTitle'),
        description: t('share.errorDescription'),
        variant: "destructive",
      });
      return;
    }

    // Simulate successful submission
    toast({
      title: t('share.successTitle'),
      description: t('share.successDescription'),
    });

    // Navigate back to home after a short delay
    setTimeout(() => {
      navigate("/");
    }, 2000);
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
        
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              <BackArrow className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t('share.backToHome')}
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {t('share.title')}
          </h1>
          <p className="text-white/90">
            {t('share.subtitle')}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>{t('share.serviceInfo')}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="serviceTitle">{t('share.serviceTitle')} *</Label>
                    <Input
                      id="serviceTitle"
                      placeholder={t('share.serviceTitlePlaceholder')}
                      value={formData.serviceTitle}
                      onChange={(e) => setFormData({...formData, serviceTitle: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="institution">{t('share.institution')} *</Label>
                    <Input
                      id="institution"
                      placeholder={t('share.institutionPlaceholder')}
                      value={formData.institution}
                      onChange={(e) => setFormData({...formData, institution: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">{t('share.location')}</Label>
                    <Input
                      id="location"
                      placeholder={t('share.locationPlaceholder')}
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">{t('share.category')} *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('share.selectCategory')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Government">{t('category.government')}</SelectItem>
                        <SelectItem value="Education">{t('category.education')}</SelectItem>
                        <SelectItem value="Healthcare">{t('category.healthcare')}</SelectItem>
                        <SelectItem value="Legal">{t('category.legal')}</SelectItem>
                        <SelectItem value="Banking">{t('category.banking')}</SelectItem>
                        <SelectItem value="Other">{t('category.other')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="averageTime">{t('share.averageTime')}</Label>
                    <Input
                      id="averageTime"
                      placeholder={t('share.averageTimePlaceholder')}
                      value={formData.averageTime}
                      onChange={(e) => setFormData({...formData, averageTime: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="difficulty">{t('share.difficulty')}</Label>
                    <Select value={formData.difficulty} onValueChange={(value) => setFormData({...formData, difficulty: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('share.selectDifficulty')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Easy">{t('share.easy')}</SelectItem>
                        <SelectItem value="Medium">{t('share.medium')}</SelectItem>
                        <SelectItem value="Hard">{t('share.hard')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">{t('share.description')}</Label>
                  <Textarea
                    id="description"
                    placeholder={t('share.descriptionPlaceholder')}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fees">{t('share.fees')}</Label>
                  <Input
                    id="fees"
                    placeholder={t('share.feesPlaceholder')}
                    value={formData.fees}
                    onChange={(e) => setFormData({...formData, fees: e.target.value})}
                  />
                </div>

                {/* Required Documents */}
                <div className="space-y-4">
                  <Label>{t('share.requiredDocuments')}</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder={t('share.addDocument')}
                      value={newDocument}
                      onChange={(e) => setNewDocument(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDocument())}
                    />
                    <Button type="button" onClick={addDocument} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {documents.map((doc, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1">
                        {doc}
                        <button
                          type="button"
                          onClick={() => removeDocument(index)}
                          className={`${isRTL ? 'mr-2' : 'ml-2'} hover:text-destructive`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="process">{t('share.process')}</Label>
                  <Textarea
                    id="process"
                    placeholder={t('share.processPlaceholder')}
                    value={formData.process}
                    onChange={(e) => setFormData({...formData, process: e.target.value})}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tips">{t('share.tips')}</Label>
                  <Textarea
                    id="tips"
                    placeholder={t('share.tipsPlaceholder')}
                    value={formData.tips}
                    onChange={(e) => setFormData({...formData, tips: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="flex gap-4 pt-6">
                  <Button type="submit" size="lg" className="px-8">
                    {t('share.submit')}
                  </Button>
                  <Button type="button" variant="outline" size="lg" onClick={() => navigate("/")}>
                    {t('share.cancel')}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ShareExperience;
