import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

interface FeesInputProps {
  value: { amount: string; currency: string; note: string };
  onChange: (value: { amount: string; currency: string; note: string }) => void;
}

export const FeesInput = ({ value, onChange }: FeesInputProps) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          type="number"
          min="0"
          placeholder="0"
          value={value.amount}
          onChange={(e) => onChange({ ...value, amount: e.target.value })}
          className="flex-1"
        />
        <Select
          value={value.currency}
          onValueChange={(currency) => onChange({ ...value, currency })}
        >
          <SelectTrigger className="w-24">
            <SelectValue placeholder={t('share.currency')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="EGP">{t('share.egp')}</SelectItem>
            <SelectItem value="USD">{t('share.usd')}</SelectItem>
            <SelectItem value="EUR">{t('share.eur')}</SelectItem>
            <SelectItem value="free">{t('share.free')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Input
        placeholder={t('share.feesNotePlaceholder')}
        value={value.note}
        onChange={(e) => onChange({ ...value, note: e.target.value })}
        className="text-sm"
      />
    </div>
  );
};
