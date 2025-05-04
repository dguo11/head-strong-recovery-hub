
import { useUser } from '@/context/UserContext';
import { Navigate } from 'react-router-dom';

const Index = () => {
  const { userData } = useUser();
  
  // Redirect based on onboarding status
  if (!userData.onboardingComplete) {
    return <Navigate to="/onboarding" />;
  }
  
  return <Navigate to="/" />;
};

export default Index;
