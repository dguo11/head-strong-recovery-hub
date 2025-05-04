
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export function Header() {
  const location = useLocation();
  const isOnboarding = location.pathname.includes('/onboarding');
  
  return (
    <header className="bg-white border-b border-brand-100 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-brand-700 font-semibold text-xl">HeadStrong</div>
          <div className="hidden sm:block ml-2 text-sm text-muted-foreground">Recovery Hub</div>
        </div>
        
        {!isOnboarding && (
          <nav>
            <Button variant="ghost" asChild size="sm">
              <Link to="/" className="flex items-center gap-1">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
