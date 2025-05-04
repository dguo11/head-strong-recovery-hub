
import React from 'react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-brand-100 py-4 mt-auto">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>HeadStrong Recovery Hub - Patient Education & Recovery Tool</p>
        <p className="mt-1">© {new Date().getFullYear()} - Always consult healthcare professionals for medical advice</p>
      </div>
    </footer>
  );
}
