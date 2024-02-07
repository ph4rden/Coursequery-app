import React from 'react';

const RegistrationLoginPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-color-2 to-color-6">
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="flex flex-col bg-white p-8 rounded shadow-md w-[25%]">
          <h2 className="mb-5 text-xl font-semibold text-color-1 text-center">Login</h2>
          <input type="email" placeholder="Email" className="mb-4 p-3 rounded border-color-2" />
          <input type="password" placeholder="Password" className="mb-6 p-3 rounded border-color-2" />
          <button className="bg-color-3 hover:bg-color-4 text-color-2 font-bold py-2 px-4 rounded">
            Login
          </button>
          <button className="mt-4 bg-color-5 hover:bg-color-6 text-color-1 font-bold py-2 px-4 rounded">
            Sign Up Here
          </button>
          <h2 className="mb-5 mt-8 text-2xl font-bold text-color-1 text-center">Coursequery</h2>
        </div>
      </div>
    </div>
  );
};

export default RegistrationLoginPage;
