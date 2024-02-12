import React, { FunctionComponent } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import SearchIcon from "@/assets/search.svg";
import ReviewIcon from "@/assets/review.svg";
import SchedIcon from "@/assets/sched.svg";

interface CarProps {}

const Car: FunctionComponent<CarProps> = () => {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={SearchIcon} alt="Search" />
          <span className="font-semibold text-base">
            Simple Type In Your Classes
          </span>{" "}
        </CarouselItem>
        <CarouselItem
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={ReviewIcon} alt="Review" />
          <span className="font-semibold text-base">
            Explore Professor Ratings
          </span>{" "}
        </CarouselItem>
        <CarouselItem
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={SchedIcon} alt="Schedule" />
          <span className="font-semibold text-base">
            Optimize Your Schedule
          </span>{" "}
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Car;
