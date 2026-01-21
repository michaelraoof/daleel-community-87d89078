import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X, FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Document {
  id: string;
  name: string;
  required: boolean;
}

interface DocumentsListProps {
  documents: Document[];
  onDocumentsChange: (documents: Document[]) => void;
}

export const DocumentsList = ({ documents, onDocumentsChange }: DocumentsListProps) => {
  const { t, isRTL } = useLanguage();
  const [newDoc, setNewDoc] = useState("");
  const [isRequired, setIsRequired] = useState(true);

  const addDocument = () => {
    if (newDoc.trim()) {
      const doc: Document = {
        id: Date.now().toString(),
        name: newDoc.trim(),
        required: isRequired,
      };
      onDocumentsChange([...documents, doc]);
      setNewDoc("");
      setIsRequired(true);
    }
  };

  const removeDocument = (id: string) => {
    onDocumentsChange(documents.filter((d) => d.id !== id));
  };

  const toggleRequired = (id: string) => {
    onDocumentsChange(
      documents.map((d) =>
        d.id === id ? { ...d, required: !d.required } : d
      )
    );
  };

  return (
    <div className="space-y-3">
      {/* Document list */}
      {documents.length > 0 && (
        <div className="space-y-2">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border/50 group"
            >
              <FileText className="w-4 h-4 text-primary" />
              <span className="flex-1 text-sm text-foreground">{doc.name}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  doc.required
                    ? 'bg-destructive/10 text-destructive'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {doc.required ? t('share.required') : t('share.optional')}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => toggleRequired(doc.id)}
                className="text-xs h-6 px-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {t('share.toggleRequired')}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeDocument(doc.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Add new document */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1 relative">
          <Input
            placeholder={t('share.addDocumentPlaceholder')}
            value={newDoc}
            onChange={(e) => setNewDoc(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDocument())}
            className="text-sm"
          />
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
            <Checkbox
              checked={isRequired}
              onCheckedChange={(checked) => setIsRequired(checked as boolean)}
            />
            {t('share.markRequired')}
          </label>
          <Button
            type="button"
            size="sm"
            onClick={addDocument}
            disabled={!newDoc.trim()}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
