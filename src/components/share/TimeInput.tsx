import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

interface TimeInputProps {
  value: { amount: string; unit: string };
  onChange: (value: { amount: string; unit: string }) => void;
}

export const TimeInput = ({ value, onChange }: TimeInputProps) => {
  const { t } = useLanguage();

  return (
    <div className="flex gap-2">
      <Input
        type="number"
        min="0"
        placeholder="0"
        value={value.amount}
        onChange={(e) => onChange({ ...value, amount: e.target.value })}
        className="w-20 text-center"
      />
      <Select
        value={value.unit}
        onValueChange={(unit) => onChange({ ...value, unit })}
      >
        <SelectTrigger className="w-28">
          <SelectValue placeholder={t('share.selectUnit')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="minutes">{t('share.minutes')}</SelectItem>
          <SelectItem value="hours">{t('share.hours')}</SelectItem>
          <SelectItem value="days">{t('share.days')}</SelectItem>
          <SelectItem value="weeks">{t('share.weeks')}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
