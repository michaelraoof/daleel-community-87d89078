import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/contexts/LanguageContext";

export const LanguageSwitch = () => {
  const { language, setLanguage, t } = useLanguage();

  const handleToggle = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
      <span className={`text-sm font-medium ${language === 'ar' ? 'text-white' : 'text-white/60'}`}>
        عربي
      </span>
      <Switch
        checked={language === 'en'}
        onCheckedChange={handleToggle}
        className="data-[state=checked]:bg-white/30 data-[state=unchecked]:bg-white/30"
      />
      <span className={`text-sm font-medium ${language === 'en' ? 'text-white' : 'text-white/60'}`}>
        EN
      </span>
    </div>
  );
};
