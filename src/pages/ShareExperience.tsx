import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ShareExperience = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
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
        title: "Missing Information",
        description: "Please fill in the required fields (Service Title, Institution, and Category).",
        variant: "destructive",
      });
      return;
    }

    // Simulate successful submission
    toast({
      title: "Experience Shared Successfully!",
      description: "Thank you for contributing to the community. Your experience will help others.",
    });

    // Navigate back to home after a short delay
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Share Your Experience
          </h1>
          <p className="text-white/90">
            Help others by sharing your experience with this service or errand.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Service Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="serviceTitle">Service Title *</Label>
                    <Input
                      id="serviceTitle"
                      placeholder="e.g., Passport Renewal"
                      value={formData.serviceTitle}
                      onChange={(e) => setFormData({...formData, serviceTitle: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="institution">Institution/Authority *</Label>
                    <Input
                      id="institution"
                      placeholder="e.g., Ministry of Interior - Passport Office"
                      value={formData.institution}
                      onChange={(e) => setFormData({...formData, institution: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Nasr City, Cairo"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Government">Government</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Legal">Legal</SelectItem>
                        <SelectItem value="Banking">Banking</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="averageTime">Average Time</Label>
                    <Input
                      id="averageTime"
                      placeholder="e.g., 2-3 hours"
                      value={formData.averageTime}
                      onChange={(e) => setFormData({...formData, averageTime: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select value={formData.difficulty} onValueChange={(value) => setFormData({...formData, difficulty: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the service..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fees">Fees</Label>
                  <Input
                    id="fees"
                    placeholder="e.g., 365 EGP"
                    value={formData.fees}
                    onChange={(e) => setFormData({...formData, fees: e.target.value})}
                  />
                </div>

                {/* Required Documents */}
                <div className="space-y-4">
                  <Label>Required Documents</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a required document..."
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
                          className="ml-2 hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="process">Process/Steps</Label>
                  <Textarea
                    id="process"
                    placeholder="Describe the step-by-step process you followed..."
                    value={formData.process}
                    onChange={(e) => setFormData({...formData, process: e.target.value})}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tips">Tips & Advice</Label>
                  <Textarea
                    id="tips"
                    placeholder="Any helpful tips or advice for others..."
                    value={formData.tips}
                    onChange={(e) => setFormData({...formData, tips: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="flex gap-4 pt-6">
                  <Button type="submit" size="lg" className="px-8">
                    Share Experience
                  </Button>
                  <Button type="button" variant="outline" size="lg" onClick={() => navigate("/")}>
                    Cancel
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