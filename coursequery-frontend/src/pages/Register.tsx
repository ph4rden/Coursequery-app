import React, { useState } from "react";
import axios from "axios";
import { Icons } from "@/components/icons";
import { Button } from "../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Register() {
    const navigate = useNavigate();
    const [URL] = useState("http://localhost:8080/api/v1/auth/register");
    const [role] = useState("user");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

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
        setIsLoading(true); // Start loading

        try {
            const response = await axios.post(URL, {
                name,
                email,
                password,
                role,
            });
            const { token } = response.data;
            localStorage.setItem("token", token);
            console.log("Registration successful", token);
            // Navigate to another page or show a success message here
            navigate("/dashboard");
            setIsLoading(false); // Stop loading on success
        } catch (err) {
            console.error(err);
            setError("Failed to create account");
            setIsLoading(false); // Stop loading on error
        }
    };

    return (
        <div className="relative min-h-screen flex justify-center items-center flowy-bg">
            <div className="absolute top-12 right-12">
                <Button
                    variant="ghost"
                    className="text-2xl active:bg-cqLightPurple"
                    onClick={() => navigate("/login")}
                >
                    Login
                </Button>
            </div>

            {/* Main content */}
            <div className="flex items-start justify-center w-full max-w-4xl mx-4 space-x-8">
                <Card className="flex-1">
                    <form onSubmit={handleSubmit}>
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl">
                                Create an account
                            </CardTitle>
                            <CardDescription>
                                Enter your email below or use Google to create your account
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
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={handleNameChange}
                                />
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
                                    Creating account...
                                </Button>
                            ) : (
                                <Button type="submit" className="w-full">
                                    Create account
                                </Button>
                            )}
                            {password.length < 6 ? (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-2 w-2" />
                                    <AlertTitle>Password must be at least 6 characters</AlertTitle>
                                </Alert>
                            ) : (
                                <></>
                            )}
                            {name === '' ? (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-2 w-2" />
                                    <AlertTitle>Enter your name</AlertTitle>
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
