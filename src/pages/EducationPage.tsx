
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

function EducationPage() {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="container py-6 px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-medium text-brand-800">Concussion Education</h1>
          <p className="text-muted-foreground mt-1">
            Learn about concussions and recovery
          </p>
        </div>
        
        <Tabs defaultValue="basics" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="basics">Concussion Basics</TabsTrigger>
            <TabsTrigger value="recovery">Recovery Process</TabsTrigger>
            <TabsTrigger value="myths">Common Myths</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basics">
            <Card>
              <CardHeader>
                <CardTitle>Understanding Concussions</CardTitle>
                <CardDescription>The essentials about concussion injuries</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-lg mb-2">What is a Concussion?</h3>
                  <p>
                    A concussion is a mild traumatic brain injury (mTBI) caused by a bump, blow, or jolt to the head that disrupts normal brain function. It can also occur when the head and brain move rapidly back and forth, causing the brain to bounce or twist inside the skull.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Signs and Symptoms</h3>
                  <p className="mb-2">Concussions can affect various aspects of your health:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Physical:</strong> Headache, nausea, dizziness, balance problems, sensitivity to light or noise</li>
                    <li><strong>Cognitive:</strong> Difficulty thinking clearly, feeling slowed down, concentration problems, memory issues</li>
                    <li><strong>Emotional:</strong> Irritability, sadness, anxiety, mood changes</li>
                    <li><strong>Sleep:</strong> Sleeping more or less than usual, trouble falling asleep</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">When to Seek Emergency Care</h3>
                  <p className="mb-2">Seek immediate medical attention if you experience:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>One pupil larger than the other</li>
                    <li>Extreme drowsiness or inability to wake up</li>
                    <li>Worsening headache that does not go away</li>
                    <li>Slurred speech, weakness, numbness</li>
                    <li>Repeated vomiting or nausea</li>
                    <li>Convulsions or seizures</li>
                    <li>Unusual behavior or increased confusion</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="recovery">
            <Card>
              <CardHeader>
                <CardTitle>The Recovery Journey</CardTitle>
                <CardDescription>What to expect during concussion recovery</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-lg mb-2">Recovery Timeline</h3>
                  <p>
                    Most people recover from a concussion within 7-10 days, but recovery can take weeks or even months for some individuals. Each concussion is unique, and recovery time varies based on many factors including age, health history, and severity.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Phases of Recovery</h3>
                  <ol className="list-decimal pl-6 space-y-3">
                    <li>
                      <strong>Initial Rest (24-48 hours):</strong>
                      <p>Limit physical and cognitive activity to allow the brain to begin healing.</p>
                    </li>
                    <li>
                      <strong>Gradual Return to Activities:</strong>
                      <p>Slowly reintroduce daily activities while staying below symptom threshold.</p>
                    </li>
                    <li>
                      <strong>Guided Activity Progression:</strong>
                      <p>Increase activity level under medical guidance, monitoring symptoms along the way.</p>
                    </li>
                    <li>
                      <strong>Full Return:</strong>
                      <p>Return to full activities when symptom-free and cleared by healthcare provider.</p>
                    </li>
                  </ol>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Evidence-Based Recovery Strategies</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Balance rest with gradual return to activity</li>
                    <li>Stay hydrated and maintain regular sleep schedules</li>
                    <li>Manage stress through relaxation techniques</li>
                    <li>Follow your healthcare provider's specific recommendations</li>
                    <li>Track your symptoms to identify patterns and triggers</li>
                    <li>Gradually return to cognitive activities like reading or screen time</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="myths">
            <Card>
              <CardHeader>
                <CardTitle>Common Concussion Myths</CardTitle>
                <CardDescription>Setting the record straight on concussion misconceptions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-lg mb-2">Myth: You need to stay awake after a concussion</h3>
                  <p>
                    <strong>Fact:</strong> While you should be monitored initially, sleep is actually beneficial for recovery. You don't need to be kept awake unless specifically instructed by a doctor.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Myth: You must lose consciousness to have a concussion</h3>
                  <p>
                    <strong>Fact:</strong> Less than 10% of concussions involve loss of consciousness. Many people experience a concussion without ever passing out.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Myth: Complete rest until all symptoms resolve</h3>
                  <p>
                    <strong>Fact:</strong> Current guidelines recommend 24-48 hours of initial rest followed by gradual return to activity, staying below the threshold that worsens symptoms.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Myth: Helmets prevent concussions</h3>
                  <p>
                    <strong>Fact:</strong> Helmets reduce the risk of skull fractures and serious brain injuries, but do not eliminate concussion risk, as they don't prevent the brain from moving inside the skull.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Myth: MRI or CT scans can diagnose a concussion</h3>
                  <p>
                    <strong>Fact:</strong> Concussions don't typically show up on standard imaging tests. These tests are used to rule out more serious injuries like bleeding in the brain.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-center">
          <Button onClick={() => navigate('/')}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    </Layout>
  );
}

export default EducationPage;
