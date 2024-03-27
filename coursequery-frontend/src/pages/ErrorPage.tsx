import { useRouteError } from "react-router-dom";

interface PageError {
    statusText?: string;
    message?: string;
  }

  export default function ErrorPage() {
    const error = useRouteError() as PageError; 
    console.error(error);
  
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
          <h1 className="text-3xl font-bold mb-4">Oops!</h1>
          <p className="mb-2">Sorry, an unexpected error has occurred.</p>
          <p className="italic">
            {error.statusText || error.message || "An unknown error occurred."}
          </p>
        </div>
      );
  }