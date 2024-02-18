import React, { useState } from "react";
import axios from "axios";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [URL] = useState("http://localhost:8080/api/v1/auth/login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(URL, {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      console.log("Registration successful", token);
      // Navigate to another page or show a success message here
      navigate("/dashboard");
      setIsLoading(false); // Stop loading on success
    } catch (err) {
      console.error(err);
      setError(true);
      setIsLoading(false); // Stop loading on error
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center flowy-bg">
      <div className="absolute top-12 right-12"></div>

      {/* Main content */}
      <div className="flex items-start justify-center w-full max-w-4xl mx-4 space-x-8">
        <Card className="flex-1">
          <form onSubmit={handleSubmit}>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Edit Your Profile</CardTitle>
              <CardDescription>
                Enter in a new email and password
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <Label htmlFor="email">New Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com" // the users email {email}
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="grid gap-2 my-4">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <Label htmlFor="password">Confirm Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              {isLoading ? (
                <Button type="button" disabled className="w-full">
                  Loading...
                </Button>
              ) : (
                <Button type="submit" className="w-full">
                  Confirm Changes
                </Button>
              )}
              {error ? (
                <Alert variant="destructive">
                  <AlertCircle className="h-2 w-2" />
                  <AlertTitle>Invalid email or password</AlertTitle>
                </Alert>
              ) : (
                // <Alert variant="default">
                //   <AlertTitle>
                //     Your profile has successfuly been edited!
                //   </AlertTitle>
                //   <AlertDescription>{/* text */}</AlertDescription>
                // </Alert>
                <></>
              )}
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
