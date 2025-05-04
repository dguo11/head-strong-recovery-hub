/**
 * Organized categories of concussion symptoms for the application
 */

export interface SymptomOption {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  description?: string;
  isRedFlag?: boolean;
}

// Main symptom categories
export const SYMPTOM_CATEGORIES = [
  "Physical",
  "Cognitive",
  "Emotional",
  "Sleep",
  "Behavioral",
  "Other"
] as const;

export type SymptomCategory = typeof SYMPTOM_CATEGORIES[number];

// All symptoms organized by category
export const SYMPTOMS: SymptomOption[] = [
  // Physical Symptoms
  { id: "headache", name: "Headache", category: "Physical" },
  { id: "dizziness", name: "Dizziness or light headedness", category: "Physical" },
  { id: "balance-problems", name: "Balance problems", category: "Physical" },
  { id: "blurred-vision", name: "Blurred vision", category: "Physical", subcategory: "Vision" },
  { id: "double-vision", name: "Double vision", category: "Physical", subcategory: "Vision" },
  { id: "eye-strain", name: "Eye strain", category: "Physical", subcategory: "Vision" },
  { id: "light-sensitivity", name: "Sensitivity to bright light", category: "Physical", subcategory: "Vision" },
  { id: "distance-judgment", name: "Trouble judging distances", category: "Physical", subcategory: "Vision" },
  { id: "vision-change", name: "Change in vision generally", category: "Physical", subcategory: "Vision" },
  { id: "noise-sensitivity", name: "Sensitivity to noise", category: "Physical", subcategory: "Hearing" },
  { id: "tinnitus", name: "Ringing in the ears", category: "Physical", subcategory: "Hearing" },
  { id: "hearing-problems", name: "Problems hearing", category: "Physical", subcategory: "Hearing" },
  { id: "fatigue", name: "Fatigue or low energy", category: "Physical" },
  { id: "weakness", name: "Weakness", category: "Physical" },
  { id: "nausea", name: "Nausea", category: "Physical" },
  { id: "neck-pain", name: "Neck pain", category: "Physical", isRedFlag: true },
  { id: "general-pain", name: "General pain", category: "Physical" },

  // Cognitive Symptoms
  { id: "attention-problems", name: "Difficulties with attention or concentration", category: "Cognitive" },
  { id: "processing-speed", name: "Processing speed issues", category: "Cognitive" },
  { id: "learning-difficulties", name: "Learning difficulties", category: "Cognitive" },
  { id: "memory-problems", name: "Memory problems or forgetfulness", category: "Cognitive" },
  { id: "executive-function", name: "Executive function problems", category: "Cognitive" },
  { id: "mental-state-change", name: "Alteration in mental state", category: "Cognitive" },
  { id: "confusion", name: "Confusion", category: "Cognitive" },
  { id: "disorientation", name: "Disorientation", category: "Cognitive" },
  { id: "slowed-thinking", name: "Slowed thinking", category: "Cognitive" },
  { id: "foggy-feeling", name: "Feeling in a fog or dazed", category: "Cognitive" },
  { id: "word-finding", name: "Difficulty finding words", category: "Cognitive" },
  { id: "general-cognition", name: "Impaired cognition generally", category: "Cognitive" },

  // Emotional Symptoms
  { id: "emotional", name: "Feeling more emotional", category: "Emotional" },
  { id: "sadness", name: "Sadness", category: "Emotional" },
  { id: "nervousness", name: "Nervousness or anxiety", category: "Emotional" },
  { id: "worry", name: "Excessive worry", category: "Emotional" },
  { id: "stress", name: "Feeling stressed out", category: "Emotional" },
  { id: "tension", name: "Tension", category: "Emotional" },
  { id: "overwhelmed", name: "Feeling overwhelmed", category: "Emotional" },
  { id: "irritability", name: "Irritability", category: "Emotional" },
  { id: "anger", name: "Anger or frustration", category: "Emotional" },
  { id: "not-yourself", name: "Feeling not yourself", category: "Emotional" },
  { id: "mood-disturbances", name: "Disturbances in mood", category: "Emotional" },

  // Sleep Symptoms
  { id: "insomnia", name: "Insomnia", category: "Sleep" },
  { id: "hypersomnia", name: "Hypersomnia (excessive sleeping)", category: "Sleep" },
  { id: "sleep-apnea", name: "Sleep apnea", category: "Sleep" },
  { id: "poor-sleep", name: "Poor sleep maintenance", category: "Sleep" },
  { id: "early-awakening", name: "Early awakening", category: "Sleep" },
  { id: "delayed-sleep", name: "Delayed sleep onset", category: "Sleep" },
  { id: "circadian-changes", name: "Alterations in circadian cycle", category: "Sleep" },
  { id: "increased-sleep", name: "Sleeping more than usual", category: "Sleep" },
  { id: "drowsiness", name: "Drowsiness", category: "Sleep" },
  { id: "falling-asleep", name: "Problems falling asleep", category: "Sleep" },
  { id: "staying-asleep", name: "Problems staying asleep", category: "Sleep" },

  // Behavioral Symptoms
  { id: "behavioral-changes", name: "Behavioral changes", category: "Behavioral" },
  { id: "lability", name: "Emotional lability", category: "Behavioral" },
  { id: "agitation", name: "Agitation", category: "Behavioral" },

  // Other Potential Indicators
  { id: "consciousness-loss", name: "Loss of consciousness", category: "Other", isRedFlag: true },
  { id: "amnesia", name: "Post-traumatic amnesia", category: "Other" },
  { id: "delusions", name: "Delusions", category: "Other" },
  { id: "hallucinations", name: "Hallucinations", category: "Other" },
  { id: "perceptual-issues", name: "Perceptual disturbances", category: "Other" },
  { id: "confabulation", name: "Confabulation", category: "Other" },
  { id: "convulsions", name: "Convulsions", category: "Other", isRedFlag: true },
  { id: "worsening-headaches", name: "Worsening headaches", category: "Other", isRedFlag: true },
  { id: "repeated-vomiting", name: "Repeated vomiting", category: "Other", isRedFlag: true }
];

// Get symptoms by category
export const getSymptomsByCategory = (category: SymptomCategory): SymptomOption[] => {
  return SYMPTOMS.filter(symptom => symptom.category === category);
};

// Get red flag symptoms
export const getRedFlagSymptoms = (): SymptomOption[] => {
  return SYMPTOMS.filter(symptom => symptom.isRedFlag === true);
};

// Format the symptom name for display with red flag indicator if needed
export const formatSymptomName = (symptom: SymptomOption): string => {
  return symptom.isRedFlag ? `${symptom.name} ⚠️` : symptom.name;
};
