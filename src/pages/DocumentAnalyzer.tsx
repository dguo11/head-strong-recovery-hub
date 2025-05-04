
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileUp, Loader2, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DocumentReader } from '@/components/document/DocumentReader';
import { DocumentResults } from '@/components/document/DocumentResults';
import { LlmService } from '@/services/LlmService';
import { useUser } from '@/context/UserContext';

type AnalysisStatus = 'idle' | 'uploading' | 'analyzing' | 'complete';

export interface DocumentAnalysisResult {
  extractedSymptoms: {
    name: string;
    severity: number;
    possibleCategory: string;
  }[];
  recommendations: string[];
  redFlags: string[];
  documentSummary: string;
}

function DocumentAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [documentText, setDocumentText] = useState<string>('');
  const [status, setStatus] = useState<AnalysisStatus>('idle');
  const [analysisResults, setAnalysisResults] = useState<DocumentAnalysisResult | null>(null);
  const { toast } = useToast();
  const { addSymptom } = useUser();

  const handleFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
    setStatus('uploading');
    
    // Reset previous results
    setAnalysisResults(null);
    setDocumentText('');
  };

  const handleTextExtracted = (text: string) => {
    setDocumentText(text);
    setStatus('idle');
    toast({
      title: "Document loaded successfully",
      description: `Extracted ${text.length} characters from document.`,
    });
  };

  const analyzeDocument = async () => {
    if (!documentText) {
      toast({
        title: "No document text",
        description: "Please upload and extract text from a document first.",
        variant: "destructive",
      });
      return;
    }

    setStatus('analyzing');
    try {
      const results = await LlmService.analyzeDocumentText(documentText);
      setAnalysisResults(results);
      setStatus('complete');
      toast({
        title: "Analysis complete",
        description: `Found ${results.extractedSymptoms.length} potential symptoms.`,
      });
    } catch (error) {
      console.error('Error analyzing document:', error);
      toast({
        title: "Analysis failed",
        description: "There was a problem analyzing the document. Please try again.",
        variant: "destructive",
      });
      setStatus('idle');
    }
  };

  const saveToProfile = () => {
    if (!analysisResults) return;
    
    analysisResults.extractedSymptoms.forEach(symptom => {
      addSymptom({
        name: symptom.name,
        severity: symptom.severity,
        notes: `From document analysis. Category: ${symptom.possibleCategory}`,
      });
    });
    
    toast({
      title: "Symptoms saved",
      description: `${analysisResults.extractedSymptoms.length} symptoms have been added to your profile.`,
    });
  };

  return (
    <Layout>
      <div className="container py-6 px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-medium text-brand-800">Document Analyzer</h1>
          <p className="text-muted-foreground mt-1">
            Upload medical documents to identify symptoms and treatment recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Document</CardTitle>
              <CardDescription>
                Upload a medical document, such as doctor's notes or medical reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DocumentReader 
                onFileUpload={handleFileUpload} 
                onTextExtracted={handleTextExtracted}
                currentFile={file}
              />
              
              {documentText && (
                <div className="mt-4">
                  <Button 
                    onClick={analyzeDocument}
                    disabled={status === 'analyzing'}
                    className="w-full"
                  >
                    {status === 'analyzing' ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing Document...
                      </>
                    ) : (
                      <>
                        <FileText className="mr-2 h-4 w-4" />
                        Analyze Document
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {analysisResults && (
            <DocumentResults 
              results={analysisResults}
              onSaveToProfile={saveToProfile}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default DocumentAnalyzer;
