import React, { useState } from "react";
import axios from "axios";
import { Icons } from "@/components/icons";
import Nav from "@/components/ui/nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
    <div className="flex flex-col min-h-screen">
      {/* Purple section now wraps content more tightly */}
      <div className="bg-purple-700 w-full">
        <Nav />
        <div className="text-center text-2xl font-semibold text-white py-4">
          Edit Profile
        </div>
        <div className="flex justify-center py-10">
          <Avatar
            style={{
              marginBottom: "20px",
              width: "100px",
              height: "100px",
              border: "4px solid white",
              borderRadius: "50%",
            }}
          >
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Bottom section with white background for form */}
      <div className="flex-grow bg-white w-full py-10 px-4">
        <div className="w-full max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
          <div className="w-full max-w-md grid gap-4">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="johnsmith@gmail.com" />

            <Label htmlFor="current-password">Current Password</Label>
            <Input type="password" id="current-password" placeholder="********" />

            <Label htmlFor="new-password">New Password</Label>
            <Input type="password" id="new-password" placeholder="" />

            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input type="password" id="confirm-password" placeholder="" />

            <Button variant="secondary">Update</Button>
          </div>
        </div>
      </div>
    </div>
  );
}