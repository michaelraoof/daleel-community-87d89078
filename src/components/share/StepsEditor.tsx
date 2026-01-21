import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X, GripVertical, ArrowUp, ArrowDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Step {
  id: string;
  content: string;
}

interface StepsEditorProps {
  steps: Step[];
  onStepsChange: (steps: Step[]) => void;
}

export const StepsEditor = ({ steps, onStepsChange }: StepsEditorProps) => {
  const { t, isRTL } = useLanguage();
  const [newStep, setNewStep] = useState("");

  const addStep = () => {
    if (newStep.trim()) {
      const step: Step = {
        id: Date.now().toString(),
        content: newStep.trim(),
      };
      onStepsChange([...steps, step]);
      setNewStep("");
    }
  };

  const removeStep = (id: string) => {
    onStepsChange(steps.filter((s) => s.id !== id));
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    const newSteps = [...steps];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < steps.length) {
      [newSteps[index], newSteps[newIndex]] = [newSteps[newIndex], newSteps[index]];
      onStepsChange(newSteps);
    }
  };

  const updateStep = (id: string, content: string) => {
    onStepsChange(steps.map((s) => (s.id === id ? { ...s, content } : s)));
  };

  return (
    <div className="space-y-3">
      {/* Steps list */}
      {steps.length > 0 && (
        <div className="space-y-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex items-start gap-2 p-3 bg-background rounded-lg border border-border/50 group"
            >
              <div className="flex flex-col items-center gap-1 pt-1">
                <GripVertical className="w-4 h-4 text-muted-foreground opacity-50" />
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  {index + 1}
                </span>
              </div>
              <Input
                value={step.content}
                onChange={(e) => updateStep(step.id, e.target.value)}
                className="flex-1 border-0 bg-transparent p-0 h-auto focus-visible:ring-0 text-sm"
              />
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => moveStep(index, 'up')}
                  disabled={index === 0}
                  className="h-6 w-6 p-0"
                >
                  <ArrowUp className="w-3 h-3" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => moveStep(index, 'down')}
                  disabled={index === steps.length - 1}
                  className="h-6 w-6 p-0"
                >
                  <ArrowDown className="w-3 h-3" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeStep(step.id)}
                  className="h-6 w-6 p-0 text-destructive"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add new step */}
      <div className="flex gap-2">
        <Input
          placeholder={t('share.addStepPlaceholder')}
          value={newStep}
          onChange={(e) => setNewStep(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addStep())}
          className="flex-1 text-sm"
        />
        <Button
          type="button"
          size="sm"
          onClick={addStep}
          disabled={!newStep.trim()}
        >
          <Plus className={`w-4 h-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
          {t('share.addStep')}
        </Button>
      </div>
    </div>
  );
};
