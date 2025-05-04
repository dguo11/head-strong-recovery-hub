
import { SYMPTOMS } from '@/utils/symptomCategories';

type SymptomAnalysisResult = {
  extractedSymptoms: {
    name: string;
    severity: number;
    possibleCategory: string;
  }[];
  recommendations: string[];
  redFlags: string[];
};

export const LlmService = {
  analyzeSymptomText: async (text: string): Promise<SymptomAnalysisResult> => {
    // This is where we would normally send the text to an LLM API
    // For this demo, we'll implement a keyword detection system based on our symptom categories
    
    // Wait a short time to simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const lowerText = text.toLowerCase();
    const extractedSymptoms = [];
    const recommendations = [];
    const redFlags = [];
    
    // Check for symptoms in our comprehensive list
    for (const symptom of SYMPTOMS) {
      // Simple keyword matching - in a real app, this would be done by an LLM
      const keywords = symptom.name.toLowerCase().split(' ');
      
      // Check if any of the keywords are in the text
      const matchesKeyword = keywords.some(keyword => 
        keyword.length > 3 && lowerText.includes(keyword)
      );
      
      if (matchesKeyword) {
        // Determine severity (1-5) - this would be more sophisticated with an LLM
        const severity = Math.floor(Math.random() * 3) + 2; // Random severity between 2-4
        
        extractedSymptoms.push({
          name: symptom.name,
          severity: severity,
          possibleCategory: symptom.category,
        });
        
        // Check for red flags
        if (symptom.isRedFlag) {
          redFlags.push(symptom.name);
        }
      }
    }
    
    // If no symptoms were detected, add a generic entry
    if (extractedSymptoms.length === 0) {
      extractedSymptoms.push({
        name: 'Unspecified Symptoms',
        severity: 1,
        possibleCategory: 'Other',
      });
    }
    
    // Generate recommendations based on detected symptoms
    if (extractedSymptoms.some(s => s.possibleCategory === 'Physical')) {
      recommendations.push('Consider physical rest and limiting activities that worsen symptoms');
    }
    
    if (extractedSymptoms.some(s => s.name.includes('headache') || s.name.includes('pain'))) {
      recommendations.push('Rest in a quiet, dark room for headache relief');
    }
    
    if (extractedSymptoms.some(s => s.name.includes('dizz') || s.name.includes('balance'))) {
      recommendations.push('Move slowly when changing positions and avoid sudden movements');
    }
    
    if (extractedSymptoms.some(s => s.possibleCategory === 'Sleep')) {
      recommendations.push('Maintain a consistent sleep schedule and create a calm sleep environment');
    }
    
    if (extractedSymptoms.some(s => s.possibleCategory === 'Cognitive')) {
      recommendations.push('Break tasks into smaller steps and take regular breaks');
    }
    
    if (extractedSymptoms.some(s => s.possibleCategory === 'Emotional')) {
      recommendations.push('Practice relaxation techniques like deep breathing or gentle meditation');
    }
    
    // Add general recommendations if specific ones weren't generated
    if (recommendations.length === 0) {
      recommendations.push('Monitor your symptoms and report any changes to your healthcare provider');
      recommendations.push('Get adequate rest and stay hydrated');
    }
    
    // Add warning for red flags
    if (redFlags.length > 0) {
      recommendations.unshift('⚠️ Some symptoms you mentioned may require immediate medical attention. Consider consulting a healthcare provider promptly.');
    }
    
    return {
      extractedSymptoms,
      recommendations,
      redFlags,
    };
  },
};
