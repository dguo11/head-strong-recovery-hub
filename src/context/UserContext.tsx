
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Demographic = {
  age: string;
  gender: string;
  injuryDate: string;
  injuryCause: string;
  previousConcussions: string;
};

export type Symptom = {
  id: string;
  name: string;
  severity: number;
  notes: string;
  timestamp: string;
};

export type RecoveryFeedback = {
  strategyId: string;
  helpful: boolean;
  notes: string;
  timestamp: string;
};

export type UserData = {
  demographics: Demographic;
  symptoms: Symptom[];
  recoveryFeedback: RecoveryFeedback[];
  onboardingComplete: boolean;
};

type UserContextType = {
  userData: UserData;
  setUserDemographics: (demographics: Demographic) => void;
  addSymptom: (symptom: Omit<Symptom, 'id' | 'timestamp'>) => void;
  updateSymptom: (symptom: Symptom) => void;
  removeSymptom: (id: string) => void;
  addRecoveryFeedback: (feedback: Omit<RecoveryFeedback, 'timestamp'>) => void;
  completeOnboarding: () => void;
  resetData: () => void;
};

const defaultUserData: UserData = {
  demographics: {
    age: '',
    gender: '',
    injuryDate: '',
    injuryCause: '',
    previousConcussions: '',
  },
  symptoms: [],
  recoveryFeedback: [],
  onboardingComplete: false,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData>(() => {
    const savedData = localStorage.getItem('concussionAppUserData');
    return savedData ? JSON.parse(savedData) : defaultUserData;
  });

  const saveData = (data: UserData) => {
    localStorage.setItem('concussionAppUserData', JSON.stringify(data));
    setUserData(data);
  };

  const setUserDemographics = (demographics: Demographic) => {
    const newData = {
      ...userData,
      demographics,
    };
    saveData(newData);
  };

  const addSymptom = (symptom: Omit<Symptom, 'id' | 'timestamp'>) => {
    const newSymptom = {
      ...symptom,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    
    const newData = {
      ...userData,
      symptoms: [...userData.symptoms, newSymptom],
    };
    saveData(newData);
  };

  const updateSymptom = (symptom: Symptom) => {
    const newData = {
      ...userData,
      symptoms: userData.symptoms.map((s) => (s.id === symptom.id ? symptom : s)),
    };
    saveData(newData);
  };

  const removeSymptom = (id: string) => {
    const newData = {
      ...userData,
      symptoms: userData.symptoms.filter((s) => s.id !== id),
    };
    saveData(newData);
  };

  const addRecoveryFeedback = (feedback: Omit<RecoveryFeedback, 'timestamp'>) => {
    const newFeedback = {
      ...feedback,
      timestamp: new Date().toISOString(),
    };
    
    const newData = {
      ...userData,
      recoveryFeedback: [...userData.recoveryFeedback, newFeedback],
    };
    saveData(newData);
  };

  const completeOnboarding = () => {
    const newData = {
      ...userData,
      onboardingComplete: true,
    };
    saveData(newData);
  };

  const resetData = () => {
    saveData(defaultUserData);
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserDemographics,
        addSymptom,
        updateSymptom,
        removeSymptom,
        addRecoveryFeedback,
        completeOnboarding,
        resetData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
