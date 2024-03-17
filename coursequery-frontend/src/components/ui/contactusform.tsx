import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ContactUsForm() {
  return (
    <div className="bg-white border-2 border-gray-300 dark:border-gray-700 p-4 rounded-md shadow-md space-y-8 mx-auto max-w-md">
      <div className="space-y-2">
        <p className="text-gray-500 dark:text-gray-400">
          Please fill the below form, and we will get back to you as soon as
          possible.
        </p>
      </div>
      <div className="space-y-4">
        <div className="flex space-x-4">
          <div className="space-y-2 flex-1 text-left">
            <Label
              className="text-gray-600 dark:text-gray-400"
              htmlFor="firstName"
            >
              First Name
            </Label>
            <Input
              className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              id="firstName"
            />
          </div>
          <div className="space-y-2 flex-1 text-left">
            <Label
              className="text-gray-600 dark:text-gray-400"
              htmlFor="lastName"
            >
              Last Name
            </Label>
            <Input
              className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              id="lastName"
            />
          </div>
        </div>
        <div className="space-y-2 text-left">
          <Label className="text-gray-600 dark:text-gray-400" htmlFor="email">
            Email Address*
          </Label>
          <Input
            className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
            id="email"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-600 dark:text-gray-400" htmlFor="message">
            What can we help you with?
          </Label>
          <Textarea
            className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
            id="message"
          />
        </div>
        <Button
          className="w-full bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
          type="submit"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
