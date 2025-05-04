
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { DemographicsForm } from '@/components/onboarding/DemographicsForm';
import { SymptomsForm } from '@/components/onboarding/SymptomsForm';
import { useUser } from '@/context/UserContext';
import { Navigate } from 'react-router-dom';

export function OnboardingSteps() {
  const { userData } = useUser();
  const [step, setStep] = useState(1);
  
  // If onboarding is already complete, redirect to dashboard
  if (userData.onboardingComplete) {
    return <Navigate to="/" />;
  }
  
  return (
    <Layout>
      <div className="container py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-center text-brand-800">Welcome to HeadStrong</h1>
          <p className="text-center text-muted-foreground mt-2 max-w-lg mx-auto">
            Your personalized concussion recovery companion. Let's set up your profile to help track your recovery journey.
          </p>
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <div className={`rounded-full h-10 w-10 flex items-center justify-center ${
              step === 1 ? 'bg-brand-600 text-white' : 'bg-brand-100 text-brand-500'
            }`}>
              1
            </div>
            <div className={`h-1 w-16 ${
              step > 1 ? 'bg-brand-500' : 'bg-gray-200'
            }`} />
            <div className={`rounded-full h-10 w-10 flex items-center justify-center ${
              step === 2 ? 'bg-brand-600 text-white' : 'bg-brand-100 text-brand-500'
            }`}>
              2
            </div>
          </div>
        </div>
        
        {step === 1 && (
          <DemographicsForm onNext={() => setStep(2)} />
        )}
        
        {step === 2 && (
          <SymptomsForm onComplete={() => {}} />
        )}
      </div>
    </Layout>
  );
}

export default OnboardingSteps;
