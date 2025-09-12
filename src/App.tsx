import { Router } from '@/router/Router';
import { AuthProvider } from '@/contexts/Authprovider';

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
