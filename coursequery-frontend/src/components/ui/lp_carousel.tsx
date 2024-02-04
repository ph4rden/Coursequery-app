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
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Simply Type In Your Courses
        </CarouselItem>
        <CarouselItem
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Explore Professor Ratings
        </CarouselItem>
        <CarouselItem
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Optimize Your Schedule
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Car;
