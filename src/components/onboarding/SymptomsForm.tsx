
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Loader2, AlertTriangle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { LlmService } from '@/services/LlmService';
import { useUser } from '@/context/UserContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface SymptomsFormProps {
  onComplete: () => void;
}

interface FormValues {
  symptomDescription: string;
}

export function SymptomsForm({ onComplete }: SymptomsFormProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any | null>(null);
  const { addSymptom, completeOnboarding } = useUser();
  
  const form = useForm<FormValues>({
    defaultValues: {
      symptomDescription: '',
    },
  });
  
  const onSubmit = async (data: FormValues) => {
    setIsAnalyzing(true);
    try {
      const results = await LlmService.analyzeSymptomText(data.symptomDescription);
      setAnalysisResults(results);
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleConfirm = () => {
    if (analysisResults) {
      // Add each extracted symptom to the user's data
      analysisResults.extractedSymptoms.forEach((symptom: any) => {
        addSymptom({
          name: symptom.name,
          severity: symptom.severity,
          notes: `Category: ${symptom.possibleCategory}`,
        });
      });
    }
    
    // Complete onboarding
    completeOnboarding();
    onComplete();
  };
  
  return (
    <Card className="w-full max-w-lg mx-auto animate-enter">
      <CardHeader>
        <CardTitle className="text-center text-2xl text-brand-700">Tell us about your symptoms</CardTitle>
        <CardDescription className="text-center">
          Describe how you're feeling in your own words
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!analysisResults ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="symptomDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Symptoms Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="For example: I've been having headaches, especially in bright light. I also feel dizzy when I stand up too quickly, and I'm more tired than usual."
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isAnalyzing || !form.getValues('symptomDescription')}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Symptoms...
                  </>
                ) : (
                  "Analyze My Symptoms"
                )}
              </Button>
            </form>
          </Form>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-lg mb-2">Detected Symptoms</h3>
              <div className="space-y-2">
                {analysisResults.extractedSymptoms.map((symptom: any, index: number) => (
                  <div key={index} className="p-3 bg-muted rounded-md">
                    <div className="font-medium flex items-center">
                      {symptom.name}
                      {analysisResults.redFlags && analysisResults.redFlags.includes(symptom.name) && (
                        <AlertTriangle className="ml-2 h-4 w-4 text-destructive" />
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Estimated severity: {symptom.severity}/5 • Category: {symptom.possibleCategory}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {analysisResults.redFlags && analysisResults.redFlags.length > 0 && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Important Health Notice</AlertTitle>
                <AlertDescription>
                  Some of your symptoms may require immediate medical attention. Please consider consulting a healthcare provider promptly.
                </AlertDescription>
              </Alert>
            )}
            
            <Separator />
            
            <div>
              <h3 className="font-medium text-lg mb-2">Recommendations</h3>
              <Alert className="bg-healing-50 text-healing-800 border-healing-200">
                <AlertTitle>Recovery Suggestions</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    {analysisResults.recommendations.map((rec: string, index: number) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
              <p className="text-sm text-muted-foreground mt-2">
                Always consult with a healthcare professional for medical advice.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button 
                variant="outline" 
                className="sm:flex-1"
                onClick={() => setAnalysisResults(null)}
              >
                Go Back & Edit
              </Button>
              <Button 
                className="sm:flex-1"
                onClick={handleConfirm}
              >
                Confirm & Continue
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
