
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { Demographic, useUser } from '@/context/UserContext';

interface DemographicsFormProps {
  onNext: () => void;
}

export function DemographicsForm({ onNext }: DemographicsFormProps) {
  const { userData, setUserDemographics } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<Demographic>({
    defaultValues: userData.demographics,
  });
  
  const onSubmit = (data: Demographic) => {
    setIsSubmitting(true);
    
    // Simulate network delay
    setTimeout(() => {
      setUserDemographics(data);
      setIsSubmitting(false);
      onNext();
    }, 500);
  };
  
  return (
    <Card className="w-full max-w-lg mx-auto animate-enter">
      <CardHeader>
        <CardTitle className="text-center text-2xl text-brand-700">Let's get to know you</CardTitle>
        <CardDescription className="text-center">
          This information helps personalize your recovery journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age Range</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select age range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="under-18">Under 18</SelectItem>
                      <SelectItem value="18-24">18-24</SelectItem>
                      <SelectItem value="25-34">25-34</SelectItem>
                      <SelectItem value="35-44">35-44</SelectItem>
                      <SelectItem value="45-54">45-54</SelectItem>
                      <SelectItem value="55-64">55-64</SelectItem>
                      <SelectItem value="65+">65 or older</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Age can affect recovery timelines and symptoms
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="non-binary">Non-binary</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Research shows gender can influence recovery patterns
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="injuryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>When did your concussion occur?</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormDescription>
                    Tracking recovery from the injury date helps monitor progress
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="injuryCause"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How did your concussion happen?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select cause" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="sports">Sports-related</SelectItem>
                      <SelectItem value="vehicle">Vehicle accident</SelectItem>
                      <SelectItem value="fall">Fall or slip</SelectItem>
                      <SelectItem value="assault">Physical assault</SelectItem>
                      <SelectItem value="work">Work-related injury</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The cause may influence specific recovery strategies
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="previousConcussions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Have you had previous concussions?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">This is my first</SelectItem>
                      <SelectItem value="1">Yes, 1 previous</SelectItem>
                      <SelectItem value="2-3">Yes, 2-3 previous</SelectItem>
                      <SelectItem value="4+">Yes, 4 or more</SelectItem>
                      <SelectItem value="unsure">Unsure</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Multiple concussions may require different recovery approaches
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Continue to Symptoms"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
