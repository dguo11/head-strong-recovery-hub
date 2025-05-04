
import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/context/UserContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function SymptomChart() {
  const { userData } = useUser();
  
  const chartData = useMemo(() => {
    const symptomCounts: Record<string, number> = {};
    
    // Count symptoms by name
    userData.symptoms.forEach(symptom => {
      if (symptomCounts[symptom.name]) {
        symptomCounts[symptom.name] += 1;
      } else {
        symptomCounts[symptom.name] = 1;
      }
    });
    
    // Convert to array format for chart
    return Object.entries(symptomCounts).map(([name, count]) => ({
      name,
      count,
    }));
  }, [userData.symptoms]);
  
  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Symptom Summary</CardTitle>
          <CardDescription>Track your symptoms over time</CardDescription>
        </CardHeader>
        <CardContent className="h-[240px] flex items-center justify-center">
          <p className="text-muted-foreground text-center">
            No symptoms tracked yet.<br />
            Add symptoms to see your data here.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Symptom Summary</CardTitle>
        <CardDescription>Frequency of reported symptoms</CardDescription>
      </CardHeader>
      <CardContent className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: -10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#0ea5e9" name="Occurrences" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
