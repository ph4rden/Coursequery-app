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

export default function LoginPage() {
    const navigate = useNavigate();
    const [URL] = useState("http://localhost:8080/api/v1/auth/login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
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
            <div className="absolute top-12 right-12">
                <Button
                    variant="ghost"
                    className="text-2xl active:bg-cqLightPurple"
                    onClick={() => navigate("/register")}
                >
                    Sign up
                </Button>
            </div>

            {/* Main content */}
            <div className="flex items-start justify-center w-full max-w-4xl mx-4 space-x-8">
                <Card className="flex-1">
                    <form onSubmit={handleSubmit}>
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl">Login</CardTitle>
                            <CardDescription>
                                Enter your email below or use Google to login
                                into your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="flex justify-center">
                                <Button variant="outline">
                                    <Icons.google className="mr-2 h-4 w-4" />
                                    Google
                                </Button>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">
                                        Or continue with
                                    </span>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
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
                        <CardFooter className="flex flex-col space-y-2">
                            {isLoading ? (
                                <Button
                                    type="button"
                                    disabled
                                    className="w-full"
                                >
                                    Loading...
                                </Button>
                            ) : (
                                <Button type="submit" className="w-full">
                                    Login
                                </Button>
                            )}
                            {error ? (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-2 w-2" />
                                    <AlertTitle>Incorrect email or password</AlertTitle>
                                </Alert>
                            ) : (
                                <></>
                            )}
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}
