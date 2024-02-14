import React from "react";
import Nav from "@/components/ui/nav";
import ContactUsForm from "@/components/ui/contactusform";

export default function ContactUs() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
      <Nav />
      <div style={{ textAlign: "center", paddingTop: "20px" }}>
        <h1 className="font-semibold text-2xl">Connect with Us </h1>
        <div className="mt-4"></div> <ContactUsForm />
      </div>
    </div>
  );
}
