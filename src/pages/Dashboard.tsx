
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RecoveryToolCard } from '@/components/recovery/RecoveryToolCard';
import { SymptomChart } from '@/components/recovery/SymptomChart';
import { FeedbackDialog } from '@/components/feedback/FeedbackDialog';
import { Activity, Book, CheckCircle, ListTodo, MessageSquare, FileText, Timer, User, FileUp } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { Navigate, useNavigate } from 'react-router-dom';

function Dashboard() {
  const { userData } = useUser();
  const navigate = useNavigate();
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState({ id: '', name: '' });
  
  // If onboarding is not complete, redirect to onboarding
  if (!userData.onboardingComplete) {
    return <Navigate to="/onboarding" />;
  }
  
  const handleStrategyFeedback = (id: string, name: string) => {
    setSelectedStrategy({ id, name });
    setFeedbackOpen(true);
  };
  
  const recoveryStrategies = [
    {
      id: 'strategy-1',
      name: 'Rest Periods',
      description: 'Schedule regular short rest breaks throughout your day.',
      tips: [
        'Aim for 15-20 minute breaks every 1-2 hours',
        'Find a quiet, comfortable place',
        'Close your eyes if it helps reduce symptoms',
      ],
    },
    {
      id: 'strategy-2',
      name: 'Hydration Reminders',
      description: 'Stay well-hydrated to support brain recovery.',
      tips: [
        'Drink 8-10 glasses of water daily',
        'Limit caffeine and alcohol',
        'Set regular reminders to drink water',
      ],
    },
    {
      id: 'strategy-3',
      name: 'Screen Time Management',
      description: 'Reduce eye strain and sensory overload from screens.',
      tips: [
        'Use night mode or blue light filters',
        'Follow the 20-20-20 rule: every 20 minutes, look 20 feet away for 20 seconds',
        'Take frequent breaks from screens',
      ],
    },
  ];
  
  const recoveryTools = [
    {
      title: "Document Analyzer",
      description: "Analyze medical documents for symptoms",
      icon: <FileUp className="h-5 w-5" />,
      onClick: () => navigate('/documents'),
    },
    {
      title: "My Personal Recovery Tools",
      description: "Personalized recovery strategies and tools",
      icon: <CheckCircle className="h-5 w-5" />,
      onClick: () => navigate('/tools/recovery'),
    },
    {
      title: "Questions for My Doctor",
      description: "Prepare for your next medical appointment",
      icon: <MessageSquare className="h-5 w-5" />,
      onClick: () => navigate('/tools/doctor-questions'),
    },
    {
      title: "Activity Monitoring Log",
      description: "Track your daily activities and symptoms",
      icon: <Activity className="h-5 w-5" />,
      onClick: () => navigate('/tools/activity-log'),
    },
    {
      title: "Headache Diary",
      description: "Record headache patterns and triggers",
      icon: <Timer className="h-5 w-5" />,
      onClick: () => navigate('/tools/headache-diary'),
    },
    {
      title: "Mood Tracker",
      description: "Monitor emotional well-being during recovery",
      icon: <User className="h-5 w-5" />,
      onClick: () => navigate('/tools/mood-tracker'),
    },
    {
      title: "Provider Information",
      description: "Store medical and rehabilitation contacts",
      icon: <Book className="h-5 w-5" />,
      onClick: () => navigate('/tools/providers'),
    },
    {
      title: "Medication List",
      description: "Track your medications and schedules",
      icon: <ListTodo className="h-5 w-5" />,
      onClick: () => navigate('/tools/medications'),
    },
    {
      title: "My Personal Notes",
      description: "Keep journal entries about your recovery",
      icon: <FileText className="h-5 w-5" />,
      onClick: () => navigate('/tools/notes'),
    },
  ];
  
  return (
    <Layout>
      <div className="container py-6 px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-medium text-brand-800">Recovery Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Track your progress and access recovery tools
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Welcome Back</CardTitle>
              <CardDescription>
                Your concussion recovery journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p>
                  Recovery is a gradual process. Use the tools and resources here to support your journey back to health.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => navigate('/symptoms/track')}>
                  Track New Symptoms
                </Button>
                <Button variant="outline" onClick={() => navigate('/education')}>
                  Learn About Concussions
                </Button>
                <Button variant="outline" onClick={() => navigate('/documents')}>
                  <FileUp className="mr-2 h-4 w-4" />
                  Analyze Medical Documents
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <SymptomChart />
        </div>
        
        <div className="mb-10">
          <h2 className="text-xl font-medium mb-4">Recovery Strategies</h2>
          <Tabs defaultValue="strategy-1">
            <TabsList className="mb-4">
              {recoveryStrategies.map(strategy => (
                <TabsTrigger key={strategy.id} value={strategy.id}>
                  {strategy.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {recoveryStrategies.map(strategy => (
              <TabsContent key={strategy.id} value={strategy.id}>
                <Card>
                  <CardHeader>
                    <CardTitle>{strategy.name}</CardTitle>
                    <CardDescription>{strategy.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-medium mb-2">Tips:</h4>
                    <ul className="list-disc pl-6 space-y-1 mb-4">
                      {strategy.tips.map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                    
                    <Button 
                      variant="outline" 
                      onClick={() => handleStrategyFeedback(strategy.id, strategy.name)}
                    >
                      Was this helpful?
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        <div>
          <h2 className="text-xl font-medium mb-4">Recovery Tools</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recoveryTools.map((tool) => (
              <RecoveryToolCard
                key={tool.title}
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                onClick={tool.onClick}
              />
            ))}
          </div>
        </div>
      </div>
      
      <FeedbackDialog
        open={feedbackOpen}
        onOpenChange={setFeedbackOpen}
        strategyId={selectedStrategy.id}
        strategyName={selectedStrategy.name}
      />
    </Layout>
  );
}

export default Dashboard;
