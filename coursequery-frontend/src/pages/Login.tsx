import React, { useState } from 'react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Logic for logging in the user
    console.log('Logged in Email:', email);
    console.log('Logged in Password:', password);
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center flowy-bg">
      {/* Other UI elements like the header or navigation can go here */}

      {/* Login form */}
      <div className="flex items-start justify-center w-full max-w-4xl mx-4 space-x-8">
        <Card className="flex-1">
          <form onSubmit={handleSubmit}>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>Enter your email and password to log in.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
              <div className="flex justify-center">
                <Button variant="outline">
                  <Icons.google className="mr-2 h-4 w-4" />
                    Google
                  </Button>
              </div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Log in
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
