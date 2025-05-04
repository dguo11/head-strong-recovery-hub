
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { useForm } from 'react-hook-form';
import { useUser } from '@/context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { LlmService } from '@/services/LlmService';
import { Loader2 } from 'lucide-react';
import { SYMPTOMS, SYMPTOM_CATEGORIES, SymptomCategory, formatSymptomName } from '@/utils/symptomCategories';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FormValues {
  name: string;
  customSymptom: string;
  category: SymptomCategory;
  severity: number;
  notes: string;
  freeText?: string;
}

function SymptomTracker() {
  const { addSymptom } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isUsingFreeText, setIsUsingFreeText] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<SymptomCategory>("Physical");
  const [isCustomSymptom, setIsCustomSymptom] = useState(false);
  
  const form = useForm<FormValues>({
    defaultValues: {
      name: '',
      customSymptom: '',
      category: "Physical",
      severity: 3,
      notes: '',
      freeText: '',
    },
  });
  
  const onSubmit = async (data: FormValues) => {
    if (isUsingFreeText && data.freeText) {
      setIsAnalyzing(true);
      
      try {
        const results = await LlmService.analyzeSymptomText(data.freeText);
        
        // Add each extracted symptom
        results.extractedSymptoms.forEach((symptom: any) => {
          addSymptom({
            name: symptom.name,
            severity: symptom.severity,
            notes: `${data.notes ? data.notes + '\n' : ''}Category: ${symptom.possibleCategory}`,
          });
        });
        
        toast({
          title: "Symptoms recorded",
          description: `${results.extractedSymptoms.length} symptoms recorded from your description.`,
        });
        
        if (results.redFlags && results.redFlags.length > 0) {
          toast({
            title: "Important Health Notice",
            description: "Some of your symptoms may require medical attention. Please consult a healthcare provider.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error analyzing symptoms:', error);
        toast({
          title: "Error analyzing symptoms",
          description: "Please try again or enter symptoms manually.",
          variant: "destructive",
        });
      } finally {
        setIsAnalyzing(false);
        navigate('/');
      }
    } else {
      // Add the single manually entered symptom
      const symptomName = isCustomSymptom ? data.customSymptom : data.name;
      
      addSymptom({
        name: symptomName,
        severity: data.severity,
        notes: `${data.notes}\nCategory: ${data.category}`,
      });
      
      toast({
        title: "Symptom recorded",
        description: `${symptomName} has been added to your symptoms.`,
      });
      
      navigate('/');
    }
  };
  
  // Filter symptoms by selected category
  const filteredSymptoms = SYMPTOMS.filter(symptom => symptom.category === selectedCategory);
  
  return (
    <Layout>
      <div className="container py-6 px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-medium text-brand-800">Track Symptoms</h1>
          <p className="text-muted-foreground mt-1">
            Record your current symptoms to monitor your recovery
          </p>
        </div>
        
        <div className="flex justify-center mb-4">
          <div className="flex gap-2">
            <Button
              variant={isUsingFreeText ? "outline" : "default"}
              onClick={() => setIsUsingFreeText(false)}
            >
              Manual Entry
            </Button>
            <Button
              variant={isUsingFreeText ? "default" : "outline"}
              onClick={() => setIsUsingFreeText(true)}
            >
              Describe Symptoms
            </Button>
          </div>
        </div>
        
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>
              {isUsingFreeText ? "Describe Your Symptoms" : "Record a Symptom"}
            </CardTitle>
            <CardDescription>
              {isUsingFreeText
                ? "Tell us how you're feeling in your own words"
                : "Enter the details of your current symptom"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {isUsingFreeText ? (
                  <FormField
                    control={form.control}
                    name="freeText"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Symptom Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="For example: My head is throbbing, especially on the left side. Light makes it worse. I also feel a bit dizzy when I stand up."
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <>
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Symptom Category</FormLabel>
                          <Select 
                            onValueChange={(value) => {
                              field.onChange(value);
                              setSelectedCategory(value as SymptomCategory);
                              form.setValue('name', '');
                            }} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {SYMPTOM_CATEGORIES.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category} Symptoms
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Symptom</FormLabel>
                          <div className="flex items-center mb-2">
                            <Button
                              type="button"
                              variant="link"
                              className="p-0 h-auto text-sm text-muted-foreground"
                              onClick={() => setIsCustomSymptom(!isCustomSymptom)}
                            >
                              {isCustomSymptom ? "Select from list" : "Enter custom symptom"}
                            </Button>
                          </div>
                          
                          {isCustomSymptom ? (
                            <FormField
                              control={form.control}
                              name="customSymptom"
                              render={({ field }) => (
                                <FormControl>
                                  <Input placeholder="Enter symptom name" {...field} />
                                </FormControl>
                              )}
                            />
                          ) : (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a symptom" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {filteredSymptoms.map((symptom) => (
                                  <SelectItem key={symptom.id} value={symptom.name}>
                                    {formatSymptomName(symptom)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="severity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Severity (1-5)</FormLabel>
                          <div className="pt-2">
                            <div className="flex justify-between text-xs text-muted-foreground mb-2">
                              <span>Mild</span>
                              <span>Moderate</span>
                              <span>Severe</span>
                            </div>
                            <FormControl>
                              <Slider
                                min={1}
                                max={5}
                                step={1}
                                defaultValue={[field.value]}
                                onValueChange={(vals) => field.onChange(vals[0])}
                              />
                            </FormControl>
                          </div>
                          <div className="text-center mt-2">
                            Selected: <span className="font-medium">{field.value}</span>/5
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="E.g., Triggered after looking at screens for too long"
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="sm:flex-1"
                    onClick={() => navigate('/')}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="sm:flex-1"
                    disabled={isAnalyzing || (
                      isUsingFreeText 
                        ? !form.getValues('freeText') 
                        : (
                          isCustomSymptom 
                            ? !form.getValues('customSymptom')
                            : !form.getValues('name')
                        )
                    )}
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Save Symptom"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

export default SymptomTracker;
