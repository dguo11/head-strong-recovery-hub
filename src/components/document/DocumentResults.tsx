
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Save } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DocumentAnalysisResult } from '@/pages/DocumentAnalyzer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface DocumentResultsProps {
  results: DocumentAnalysisResult;
  onSaveToProfile: () => void;
}

export function DocumentResults({ results, onSaveToProfile }: DocumentResultsProps) {
  const { extractedSymptoms, recommendations, redFlags, documentSummary } = results;
  
  // Organize symptoms by category
  const symptomsByCategory = extractedSymptoms.reduce((acc: Record<string, typeof extractedSymptoms>, symptom) => {
    if (!acc[symptom.possibleCategory]) {
      acc[symptom.possibleCategory] = [];
    }
    acc[symptom.possibleCategory].push(symptom);
    return acc;
  }, {});

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analysis Results</CardTitle>
        <CardDescription>
          Identified symptoms and recommendations based on document content
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {documentSummary && (
          <div>
            <h3 className="font-medium text-lg mb-2">Document Summary</h3>
            <p className="text-sm text-muted-foreground">{documentSummary}</p>
          </div>
        )}

        {redFlags.length > 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Important Health Notice</AlertTitle>
            <AlertDescription>
              <p className="mb-2">Some symptoms found in the document may require immediate medical attention:</p>
              <ul className="list-disc ml-5 space-y-1">
                {redFlags.map((flag, index) => (
                  <li key={index}>{flag}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <div>
          <h3 className="font-medium text-lg mb-2">Detected Symptoms</h3>
          <Accordion type="multiple" className="w-full">
            {Object.entries(symptomsByCategory).map(([category, symptoms]) => (
              <AccordionItem key={category} value={category}>
                <AccordionTrigger className="text-left">
                  <span>{category} Symptoms ({symptoms.length})</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pt-2">
                    {symptoms.map((symptom, index) => (
                      <div key={index} className="p-3 bg-muted/50 rounded-md">
                        <div className="font-medium flex items-center">
                          {symptom.name}
                          {redFlags.includes(symptom.name) && (
                            <AlertTriangle className="ml-2 h-4 w-4 text-destructive" />
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Estimated severity: {symptom.severity}/5
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div>
          <h3 className="font-medium text-lg mb-2">Recommendations</h3>
          <Alert className="bg-healing-50 text-healing-800 border-healing-200">
            <AlertTitle>Recovery Suggestions</AlertTitle>
            <AlertDescription>
              <ul className="list-disc ml-5 mt-2 space-y-1">
                {recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
          <p className="text-sm text-muted-foreground mt-2">
            Always consult with a healthcare professional for medical advice.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onSaveToProfile} className="w-full">
          <Save className="mr-2 h-4 w-4" />
          Save Symptoms to My Profile
        </Button>
      </CardFooter>
    </Card>
  );
}
