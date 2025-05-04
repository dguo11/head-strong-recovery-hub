
// This is a mock service for LLM functionality
// In a real application, this would connect to an actual LLM API

type SymptomAnalysisResult = {
  extractedSymptoms: {
    name: string;
    severity: number;
    possibleCategory: string;
  }[];
  recommendations: string[];
};

export const LlmService = {
  analyzeSymptomText: async (text: string): Promise<SymptomAnalysisResult> => {
    // This is where we would normally send the text to an LLM API
    // For this demo, we'll implement a basic keyword detection system
    
    // Wait a short time to simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const lowerText = text.toLowerCase();
    const extractedSymptoms = [];
    const recommendations = [];
    
    // Check for common concussion symptoms in the text
    if (lowerText.includes('headache') || lowerText.includes('head pain') || lowerText.includes('head ache')) {
      extractedSymptoms.push({
        name: 'Headache',
        severity: 3,
        possibleCategory: 'Pain',
      });
      recommendations.push('Consider rest in a dark, quiet room for headache relief');
    }
    
    if (lowerText.includes('dizzy') || lowerText.includes('dizziness') || lowerText.includes('room spinning')) {
      extractedSymptoms.push({
        name: 'Dizziness',
        severity: 3,
        possibleCategory: 'Balance',
      });
      recommendations.push('Avoid sudden movements and stay hydrated');
    }
    
    if (lowerText.includes('nausea') || lowerText.includes('feel sick') || lowerText.includes('want to throw up')) {
      extractedSymptoms.push({
        name: 'Nausea',
        severity: 2,
        possibleCategory: 'Digestive',
      });
      recommendations.push('Try eating small, bland meals and staying hydrated');
    }
    
    if (lowerText.includes('sensitive to light') || lowerText.includes('light hurts') || lowerText.includes('photosensitiv')) {
      extractedSymptoms.push({
        name: 'Light Sensitivity',
        severity: 3,
        possibleCategory: 'Sensory',
      });
      recommendations.push('Wear sunglasses indoors if needed and reduce screen time');
    }
    
    if (lowerText.includes('tired') || lowerText.includes('fatigue') || lowerText.includes('no energy') || lowerText.includes('exhausted')) {
      extractedSymptoms.push({
        name: 'Fatigue',
        severity: 2,
        possibleCategory: 'Energy',
      });
      recommendations.push('Prioritize regular sleep and take brief naps if needed');
    }
    
    if (lowerText.includes('focus') || lowerText.includes('concentrate') || lowerText.includes('attention')) {
      extractedSymptoms.push({
        name: 'Difficulty Concentrating',
        severity: 2,
        possibleCategory: 'Cognitive',
      });
      recommendations.push('Try breaking tasks into smaller steps and take frequent breaks');
    }
    
    if (lowerText.includes('memory') || lowerText.includes('forget') || lowerText.includes('remembering')) {
      extractedSymptoms.push({
        name: 'Memory Issues',
        severity: 2,
        possibleCategory: 'Cognitive',
      });
      recommendations.push('Use notes or a journal to track important information');
    }
    
    if (lowerText.includes('balance') || lowerText.includes('coordination') || lowerText.includes('clumsy')) {
      extractedSymptoms.push({
        name: 'Balance Problems',
        severity: 3,
        possibleCategory: 'Physical',
      });
      recommendations.push('Be careful on stairs and consider using handrails');
    }
    
    if (lowerText.includes('noise') || lowerText.includes('loud') || lowerText.includes('sound')) {
      extractedSymptoms.push({
        name: 'Noise Sensitivity',
        severity: 2,
        possibleCategory: 'Sensory',
      });
      recommendations.push('Use earplugs or noise-canceling headphones in loud environments');
    }
    
    if (lowerText.includes('sad') || lowerText.includes('depress') || lowerText.includes('down')) {
      extractedSymptoms.push({
        name: 'Low Mood',
        severity: 2,
        possibleCategory: 'Emotional',
      });
      recommendations.push('Talk to someone you trust about your feelings');
    }
    
    // Add some default recommendations
    if (recommendations.length === 0) {
      recommendations.push('Continue to monitor your symptoms and report any changes to your doctor');
      recommendations.push('Make sure to get adequate rest and stay hydrated');
    }
    
    // If no symptoms were detected
    if (extractedSymptoms.length === 0) {
      extractedSymptoms.push({
        name: 'Unspecified Symptoms',
        severity: 1,
        possibleCategory: 'Other',
      });
    }
    
    return {
      extractedSymptoms,
      recommendations,
    };
  },
};
