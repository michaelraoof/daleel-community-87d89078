import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X, GripVertical } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CustomField {
  id: string;
  label: string;
  value: string;
}

interface CustomFieldInputProps {
  fields: CustomField[];
  onFieldsChange: (fields: CustomField[]) => void;
}

export const CustomFieldInput = ({ fields, onFieldsChange }: CustomFieldInputProps) => {
  const { t, isRTL } = useLanguage();
  const [newLabel, setNewLabel] = useState("");
  const [newValue, setNewValue] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const addField = () => {
    if (newLabel.trim() && newValue.trim()) {
      const newField: CustomField = {
        id: Date.now().toString(),
        label: newLabel.trim(),
        value: newValue.trim(),
      };
      onFieldsChange([...fields, newField]);
      setNewLabel("");
      setNewValue("");
      setIsAdding(false);
    }
  };

  const removeField = (id: string) => {
    onFieldsChange(fields.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-3">
      {/* Existing custom fields */}
      {fields.length > 0 && (
        <div className="space-y-2">
          {fields.map((field) => (
            <div
              key={field.id}
              className="flex items-center gap-2 p-3 bg-background rounded-lg border border-border/50 group"
            >
              <GripVertical className="w-4 h-4 text-muted-foreground opacity-50" />
              <Badge variant="secondary" className="font-medium">
                {field.label}
              </Badge>
              <span className="flex-1 text-sm text-foreground">{field.value}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeField(field.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Add new field form */}
      {isAdding ? (
        <div className="p-4 bg-background rounded-lg border border-primary/30 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              placeholder={t('share.customFieldLabel')}
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              className="text-sm"
            />
            <Input
              placeholder={t('share.customFieldValue')}
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="text-sm"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addField())}
            />
          </div>
          <div className="flex gap-2">
            <Button type="button" size="sm" onClick={addField} disabled={!newLabel.trim() || !newValue.trim()}>
              {t('share.addField')}
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => setIsAdding(false)}>
              {t('share.cancel')}
            </Button>
          </div>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setIsAdding(true)}
          className="w-full border-dashed"
        >
          <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {t('share.addCustomField')}
        </Button>
      )}
    </div>
  );
};
