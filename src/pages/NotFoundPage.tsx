
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <Layout>
      <div className="container py-16 px-4 text-center">
        <h1 className="text-4xl font-bold text-brand-800 mb-4">Page Not Found</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Button asChild>
          <Link to="/">Return to Dashboard</Link>
        </Button>
      </div>
    </Layout>
  );
}

export default NotFoundPage;
