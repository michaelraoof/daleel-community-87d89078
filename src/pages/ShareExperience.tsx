import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Send, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { FormSection } from "@/components/share/FormSection";
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

  // Form state
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
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent py-8 px-4 relative">
        <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'}`}>
          <LanguageSwitch />
        </div>

        <div className="max-w-3xl mx-auto">
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
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-white/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">
              {t('share.title')}
            </h1>
          </div>
          <p className="text-white/90">
            {t('share.subtitle')}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information Section */}
            <FormSection
              title={t('share.basicInfoSection')}
              description={t('share.basicInfoDesc')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="serviceTitle" className="flex items-center gap-1">
                    {t('share.serviceTitle')}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="serviceTitle"
                    placeholder={t('share.serviceTitlePlaceholder')}
                    value={formData.serviceTitle}
                    onChange={(e) => setFormData({ ...formData, serviceTitle: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="institution" className="flex items-center gap-1">
                    {t('share.institution')}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="institution"
                    placeholder={t('share.institutionPlaceholder')}
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">{t('share.location')}</Label>
                  <Input
                    id="location"
                    placeholder={t('share.locationPlaceholder')}
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="flex items-center gap-1">
                    {t('share.category')}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">{t('share.description')}</Label>
                <Textarea
                  id="description"
                  placeholder={t('share.descriptionPlaceholder')}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>{t('share.averageTime')}</Label>
                  <TimeInput value={time} onChange={setTime} />
                </div>

                <div className="space-y-2">
                  <Label>{t('share.difficulty')}</Label>
                  <Select value={formData.difficulty} onValueChange={(value) => setFormData({ ...formData, difficulty: value })}>
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
            </FormSection>

            {/* Documents Section */}
            <FormSection
              title={t('share.documentsSection')}
              description={t('share.documentsDesc')}
            >
              <DocumentsList documents={documents} onDocumentsChange={setDocuments} />
            </FormSection>

            {/* Process Section */}
            <FormSection
              title={t('share.processSection')}
              description={t('share.processDesc')}
            >
              <StepsEditor steps={steps} onStepsChange={setSteps} />
            </FormSection>

            {/* Additional Information Section */}
            <FormSection
              title={t('share.additionalSection')}
              description={t('share.additionalDesc')}
            >
              <div className="space-y-2">
                <Label>{t('share.fees')}</Label>
                <FeesInput value={fees} onChange={setFees} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tips">{t('share.tips')}</Label>
                <Textarea
                  id="tips"
                  placeholder={t('share.tipsPlaceholder')}
                  value={formData.tips}
                  onChange={(e) => setFormData({ ...formData, tips: e.target.value })}
                  rows={3}
                />
              </div>
            </FormSection>

            {/* Custom Fields Section */}
            <Card className="border-dashed">
              <CardContent className="pt-6">
                <div className="space-y-1 mb-4">
                  <h3 className="text-lg font-semibold text-foreground">{t('share.customFields')}</h3>
                  <p className="text-sm text-muted-foreground">{t('share.customFieldsDesc')}</p>
                </div>
                <CustomFieldInput fields={customFields} onFieldsChange={setCustomFields} />
              </CardContent>
            </Card>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button type="submit" size="lg" className="flex-1 sm:flex-none px-8">
                <Send className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t('share.submit')}
              </Button>
              <Button type="button" variant="outline" size="lg" onClick={() => navigate("/")}>
                {t('share.cancel')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShareExperience;
