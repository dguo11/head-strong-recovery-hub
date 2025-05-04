
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RecoveryToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
}

export function RecoveryToolCard({
  title,
  description,
  icon,
  onClick,
  className,
}: RecoveryToolCardProps) {
  return (
    <Card className={cn("overflow-hidden card-hover", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-start gap-3">
          <div className="bg-brand-100 p-2 rounded-md text-brand-700">{icon}</div>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="mt-1 line-clamp-2">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2 text-sm text-muted-foreground" />
      <CardFooter>
        <Button variant="ghost" onClick={onClick} className="w-full justify-start text-brand-700">
          Open Tool
        </Button>
      </CardFooter>
    </Card>
  );
}
