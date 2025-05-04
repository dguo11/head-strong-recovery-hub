
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';

interface FeedbackDialogProps {
  open: boolean;
  strategyId: string;
  strategyName: string;
  onOpenChange: (open: boolean) => void;
}

export function FeedbackDialog({
  open,
  strategyId,
  strategyName,
  onOpenChange,
}: FeedbackDialogProps) {
  const [notes, setNotes] = useState('');
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const { addRecoveryFeedback } = useUser();
  const { toast } = useToast();
  
  const handleSubmit = () => {
    if (helpful === null) return;
    
    addRecoveryFeedback({
      strategyId,
      helpful,
      notes,
    });
    
    toast({
      title: "Feedback submitted",
      description: "Thank you for helping us improve recovery strategies",
    });
    
    // Reset form
    setNotes('');
    setHelpful(null);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rate this strategy</DialogTitle>
          <DialogDescription>
            Was "{strategyName}" helpful for your recovery?
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex gap-3 my-3">
          <Button
            variant={helpful === true ? "default" : "outline"}
            className={helpful === true ? "bg-healing-500" : ""}
            onClick={() => setHelpful(true)}
          >
            Yes, it was helpful
          </Button>
          <Button
            variant={helpful === false ? "default" : "outline"}
            onClick={() => setHelpful(false)}
          >
            No, not helpful
          </Button>
        </div>
        
        <div className="mt-2">
          <label className="text-sm font-medium mb-1 block">
            Additional comments (optional)
          </label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What worked well or could be improved?"
            className="h-24"
          />
        </div>
        
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={helpful === null}>
            Submit Feedback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
