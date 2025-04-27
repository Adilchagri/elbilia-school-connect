
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { InfoIcon, Loader2 } from 'lucide-react';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

interface AuthFormValues {
  email: string;
  password: string;
  fullName?: string;
}

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const { signIn, signUp, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<AuthFormValues>({
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
    }
  });

  const handleSubmit = async (values: AuthFormValues) => {
    try {
      if (isLogin) {
        await signIn(values.email, values.password);
        toast({
          title: "Success",
          description: "You have successfully logged in.",
        });
        navigate('/');
      } else {
        if (!values.fullName) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Please enter your full name.",
          });
          return;
        }
        await signUp(values.email, values.password, values.fullName);
        toast({
          title: "Success",
          description: "Account created successfully. Please check your email for verification.",
        });
        
        // In a development environment, we can automatically log in after signup
        // This is just for demonstration purposes
        try {
          await signIn(values.email, values.password);
          navigate('/');
        } catch (innerError: any) {
          // Silent catch - user will need to verify email first
          console.log("User needs to verify email before logging in");
        }
      }
    } catch (error: any) {
      console.error("Auth error:", error.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Authentication failed. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </h2>
        </div>
        
        <Alert className="bg-blue-50 border-blue-200">
          <InfoIcon className="h-4 w-4 text-blue-600" />
          <AlertTitle>Demo credentials</AlertTitle>
          <AlertDescription>
            Email: admin@elbilia.com<br />
            Password: password123
          </AlertDescription>
        </Alert>

        <Form {...form}>
          <form className="mt-8 space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="rounded-md shadow-sm space-y-4">
              {!isLogin && (
                <div>
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input
                    id="full-name"
                    {...form.register('fullName')}
                    type="text"
                    placeholder="John Doe"
                  />
                </div>
              )}
              <div>
                <Label htmlFor="email-address">Email address</Label>
                <Input
                  id="email-address"
                  {...form.register('email')}
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="example@email.com"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  {...form.register('password')}
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isLogin ? 'Signing in...' : 'Signing up...'}
                  </>
                ) : (
                  isLogin ? 'Sign in' : 'Sign up'
                )}
              </Button>
            </div>
          </form>
        </Form>
        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-blue-600 hover:text-blue-500"
            disabled={isLoading}
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
