import { Button } from "@/components/ui/button";
import Nav from "@/components/ui/nav";
import React from "react";
import ReviewIcon from "@/assets/review.svg";
import UTALogo from "@/assets/UTALogo.png";
import { useNavigate } from "react-router-dom";
// import Car from "@/components/ui/lp_carousel";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/register"); // Navigate to the "/register" page
  };

  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
      <Nav />
      <div className="w-full mx-auto px-8 xl:max-w-[1320]">
        <div className="flex flex-wrap items-center -mx-4">
          {/*  TEST! Carousel added to the left */}
          <div className="w-full lg:w-2/4 px-40 py-20 lg:order-2 relative">
            {/* Adjusted margin */}
            <img src={ReviewIcon} alt="Review" />
            {/* <Car /> */}
          </div>
          <div className="w-full lg:w-2/4 px-10 py-20">
            <h1 className="font-semibold text-4xl md:text-5xl leading-tight md:leading-tight mb-10">
              All the information <br />
              All in one place <br />
            </h1>
            <p className="font-semibold text-base">
              Discover the secret to acing your classes with CourseQuery! <br />
              Find out how this innovative tool empowers students to
              effortlessly <br /> craft their dream schedules by providing
              insights into the best professors - because the right professor
              can make all the difference!
            </p>
            <div className="mt-4">
              {/* just to move the button down*/}
              <Button variant={"outline2"} onClick={handleSignUpClick}>
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
      <footer
        className="absolute bottom-0 w-full text-center py-2"
        style={{ backgroundColor: "#241338", color: "white" }}
      >
        <div className="flex justify-center items-center">
          <img src={UTALogo} alt="UTA Logo" className="h-8 inline-block mr-8" />
          <div className="inline-block mr-8">|</div>
          <div className="inline-block mr-8">Mavericks</div>
          <div className="inline-block mr-8">|</div>
          <div className="inline-block">Senior Design</div>
        </div>
      </footer>
    </div>
  );
}
