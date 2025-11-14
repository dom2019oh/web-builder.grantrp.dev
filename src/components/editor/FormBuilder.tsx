import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, Save } from "lucide-react";
import { toast } from "sonner";

interface FormField {
  id: string;
  type: "text" | "email" | "tel" | "textarea" | "select" | "checkbox";
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

interface FormBuilderProps {
  onSave: (formConfig: any) => void;
}

export const FormBuilder = ({ onSave }: FormBuilderProps) => {
  const [formName, setFormName] = useState("Contact Form");
  const [fields, setFields] = useState<FormField[]>([
    {
      id: "1",
      type: "text",
      label: "Name",
      placeholder: "Your name",
      required: true,
    },
  ]);

  const addField = () => {
    const newField: FormField = {
      id: Date.now().toString(),
      type: "text",
      label: "New Field",
      placeholder: "",
      required: false,
    };
    setFields([...fields, newField]);
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map(f => (f.id === id ? { ...f, ...updates } : f)));
  };

  const removeField = (id: string) => {
    if (fields.length === 1) {
      toast.error("Form must have at least one field");
      return;
    }
    setFields(fields.filter(f => f.id !== id));
  };

  const handleSave = () => {
    onSave({
      name: formName,
      fields,
      style: "default",
    });
    toast.success("Form saved!");
  };

  return (
    <Card className="glass glass-glow p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Form Builder</h3>
        <Button onClick={handleSave} size="sm" className="glass glass-glow">
          <Save className="w-4 h-4 mr-2" />
          Save Form
        </Button>
      </div>

      <div>
        <Label>Form Name</Label>
        <Input
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          className="glass"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Form Fields</Label>
          <Button onClick={addField} size="sm" variant="outline" className="glass">
            <Plus className="w-4 h-4 mr-2" />
            Add Field
          </Button>
        </div>

        {fields.map((field, index) => (
          <Card key={field.id} className="glass p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Field {index + 1}</span>
              <Button
                onClick={() => removeField(field.id)}
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Type</Label>
                <Select
                  value={field.type}
                  onValueChange={(value: any) => updateField(field.id, { type: value })}
                >
                  <SelectTrigger className="glass h-8 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass glass-glow">
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="tel">Phone</SelectItem>
                    <SelectItem value="textarea">Textarea</SelectItem>
                    <SelectItem value="select">Select</SelectItem>
                    <SelectItem value="checkbox">Checkbox</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={(e) => updateField(field.id, { required: e.target.checked })}
                  className="rounded"
                />
                <Label className="text-xs">Required</Label>
              </div>
            </div>

            <div>
              <Label className="text-xs">Label</Label>
              <Input
                value={field.label}
                onChange={(e) => updateField(field.id, { label: e.target.value })}
                className="glass h-8 text-sm"
              />
            </div>

            {field.type !== "checkbox" && (
              <div>
                <Label className="text-xs">Placeholder</Label>
                <Input
                  value={field.placeholder || ""}
                  onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                  className="glass h-8 text-sm"
                />
              </div>
            )}
          </Card>
        ))}
      </div>
    </Card>
  );
};
