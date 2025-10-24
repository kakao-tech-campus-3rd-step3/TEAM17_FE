import { Router } from '@/router/Router';
import { AuthProvider } from '@/contexts/Authprovider';
import ErrorBoundary from '@/components/common/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ErrorBoundary>
  );
}
