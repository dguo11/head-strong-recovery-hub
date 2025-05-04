
import React, { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { FileUp, File, X, Loader2 } from 'lucide-react';

interface DocumentReaderProps {
  onFileUpload: (file: File) => void;
  onTextExtracted: (text: string) => void;
  currentFile: File | null;
}

export function DocumentReader({ onFileUpload, onTextExtracted, currentFile }: DocumentReaderProps) {
  const [extracting, setExtracting] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file type - accept PDF, DOC, DOCX, TXT
    const validTypes = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, DOC, DOCX, or TXT file.",
        variant: "destructive",
      });
      return;
    }
    
    // Check file size - limit to 10MB
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "File size should be less than 10MB.",
        variant: "destructive",
      });
      return;
    }

    onFileUpload(file);
    extractTextFromFile(file);
  };

  const extractTextFromFile = async (file: File) => {
    setExtracting(true);
    try {
      // For this demo, we'll only handle text files
      // In a real app, we would use libraries like pdf.js for PDFs
      if (file.type === 'text/plain') {
        const text = await file.text();
        onTextExtracted(text);
      } else {
        // Simulate PDF processing with a timeout
        // In a real app, use pdf.js or similar library
        setTimeout(() => {
          // Generate sample text for demonstration
          const mockText = `This patient presents with symptoms of recurring headaches, particularly in the frontal region, and reports sensitivity to light and sound. Patient also notes occasional dizziness and short-term memory issues. Sleep has been disrupted with difficulty staying asleep. These symptoms began approximately 3 weeks ago following a fall during recreational sports.`;
          onTextExtracted(mockText);
          setExtracting(false);
        }, 1500);
      }
    } catch (error) {
      console.error('Error extracting text:', error);
      toast({
        title: "Text extraction failed",
        description: "There was a problem reading the document. Please try another file.",
        variant: "destructive",
      });
      setExtracting(false);
    }
  };

  const clearFile = () => {
    onFileUpload(null as any);
    onTextExtracted('');
  };

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onFileUpload(file);
      extractTextFromFile(file);
    }
  }, [onFileUpload]);

  return (
    <div>
      {!currentFile ? (
        <div
          onDragOver={onDragOver}
          onDrop={onDrop}
          className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors"
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <FileUp className="h-10 w-10 text-muted-foreground" />
            <h3 className="font-medium text-lg mt-2">Upload Document</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop your file here or click to browse
            </p>
            <Button asChild>
              <label>
                Browse Files
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="sr-only"
                  accept=".pdf,.doc,.docx,.txt"
                />
              </label>
            </Button>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-muted p-2 rounded-md">
                <File className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium truncate max-w-[180px] sm:max-w-xs">
                  {currentFile.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(currentFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={clearFile} disabled={extracting}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          {extracting && (
            <div className="flex items-center justify-center mt-4 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Extracting text...
            </div>
          )}
        </div>
      )}
    </div>
  );
}
