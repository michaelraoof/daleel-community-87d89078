import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { DocumentsList } from "@/components/share/DocumentsList";
import { StepsEditor } from "@/components/share/StepsEditor";
import { TimeInput } from "@/components/share/TimeInput";
import { FeesInput } from "@/components/share/FeesInput";
import { CustomFieldInput } from "@/components/share/CustomFieldInput";

interface Document {
  id: string;
  name: string;
  required: boolean;
}

interface Step {
  id: string;
  content: string;
}

interface CustomField {
  id: string;
  label: string;
  value: string;
}

const ShareExperience = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, isRTL } = useLanguage();

  const [formData, setFormData] = useState({
    serviceTitle: "",
    institution: "",
    location: "",
    category: "",
    description: "",
    difficulty: "",
    tips: "",
  });

  const [time, setTime] = useState({ amount: "", unit: "hours" });
  const [fees, setFees] = useState({ amount: "", currency: "EGP", note: "" });
  const [documents, setDocuments] = useState<Document[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [customFields, setCustomFields] = useState<CustomField[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.serviceTitle || !formData.institution || !formData.category) {
      toast({
        title: t('share.errorTitle'),
        description: t('share.errorDescription'),
        variant: "destructive",
      });
      return;
    }

    toast({
      title: t('share.successTitle'),
      description: t('share.successDescription'),
    });

    setTimeout(() => {
      navigate("/");
    }, 2000);
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
            {t('share.backToHome')}
          </button>
          <LanguageSwitch />
        </div>
      </header>

      {/* Title */}
      <div className="px-4 pt-6 pb-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-xl font-bold text-foreground mb-1">
            {t('share.title')}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t('share.subtitle')}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="px-4 pb-8">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          {/* Basic Info */}
          <section className="bg-card rounded-xl p-4 space-y-4">
            <h2 className="font-semibold text-foreground">{t('share.basicInfoSection')}</h2>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="serviceTitle" className="text-sm">
                  {t('share.serviceTitle')} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="serviceTitle"
                  placeholder={t('share.serviceTitlePlaceholder')}
                  value={formData.serviceTitle}
                  onChange={(e) => setFormData({ ...formData, serviceTitle: e.target.value })}
                  className="mt-1.5 bg-secondary border-0"
                />
              </div>

              <div>
                <Label htmlFor="institution" className="text-sm">
                  {t('share.institution')} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="institution"
                  placeholder={t('share.institutionPlaceholder')}
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  className="mt-1.5 bg-secondary border-0"
                />
              </div>

              <div>
                <Label htmlFor="location" className="text-sm">{t('share.location')}</Label>
                <Input
                  id="location"
                  placeholder={t('share.locationPlaceholder')}
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="mt-1.5 bg-secondary border-0"
                />
              </div>

              <div>
                <Label htmlFor="category" className="text-sm">
                  {t('share.category')} <span className="text-destructive">*</span>
                </Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger className="mt-1.5 bg-secondary border-0">
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

              <div>
                <Label htmlFor="description" className="text-sm">{t('share.description')}</Label>
                <Textarea
                  id="description"
                  placeholder={t('share.descriptionPlaceholder')}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="mt-1.5 bg-secondary border-0"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-sm">{t('share.averageTime')}</Label>
                  <div className="mt-1.5">
                    <TimeInput value={time} onChange={setTime} />
                  </div>
                </div>

                <div>
                  <Label className="text-sm">{t('share.difficulty')}</Label>
                  <Select value={formData.difficulty} onValueChange={(value) => setFormData({ ...formData, difficulty: value })}>
                    <SelectTrigger className="mt-1.5 bg-secondary border-0">
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
            </div>
          </section>

          {/* Documents */}
          <section className="bg-card rounded-xl p-4 space-y-3">
            <div>
              <h2 className="font-semibold text-foreground">{t('share.documentsSection')}</h2>
              <p className="text-xs text-muted-foreground mt-0.5">{t('share.documentsDesc')}</p>
            </div>
            <DocumentsList documents={documents} onDocumentsChange={setDocuments} />
          </section>

          {/* Process Steps */}
          <section className="bg-card rounded-xl p-4 space-y-3">
            <div>
              <h2 className="font-semibold text-foreground">{t('share.processSection')}</h2>
              <p className="text-xs text-muted-foreground mt-0.5">{t('share.processDesc')}</p>
            </div>
            <StepsEditor steps={steps} onStepsChange={setSteps} />
          </section>

          {/* Fees & Tips */}
          <section className="bg-card rounded-xl p-4 space-y-4">
            <h2 className="font-semibold text-foreground">{t('share.additionalSection')}</h2>
            
            <div>
              <Label className="text-sm">{t('share.fees')}</Label>
              <div className="mt-1.5">
                <FeesInput value={fees} onChange={setFees} />
              </div>
            </div>

            <div>
              <Label htmlFor="tips" className="text-sm">{t('share.tips')}</Label>
              <Textarea
                id="tips"
                placeholder={t('share.tipsPlaceholder')}
                value={formData.tips}
                onChange={(e) => setFormData({ ...formData, tips: e.target.value })}
                rows={3}
                className="mt-1.5 bg-secondary border-0"
              />
            </div>
          </section>

          {/* Custom Fields */}
          <section className="bg-card rounded-xl p-4 space-y-3 border border-dashed border-border">
            <div>
              <h2 className="font-semibold text-foreground">{t('share.customFields')}</h2>
              <p className="text-xs text-muted-foreground mt-0.5">{t('share.customFieldsDesc')}</p>
            </div>
            <CustomFieldInput fields={customFields} onFieldsChange={setCustomFields} />
          </section>

          {/* Submit */}
          <div className="flex gap-3 pt-2">
            <Button type="submit" className="flex-1 h-12 rounded-xl">
              <Send className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t('share.submit')}
            </Button>
            <Button 
              type="button" 
              variant="secondary" 
              className="h-12 rounded-xl px-6"
              onClick={() => navigate("/")}
            >
              {t('share.cancel')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShareExperience;
