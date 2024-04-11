"use client";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import useDashboardStore from "@/components/dashboardStore";

const ThankYou = () => {
  const { refreshDashboard, setRefreshDashboard } = useDashboardStore();

  return (
    <div>
      <DialogHeader className="flex justify-center items-center text-center">
        <DialogTitle>Thank you trying Reflect!</DialogTitle>
        <DialogDescription>
          I wish you all the best for your adventures!
        </DialogDescription>
        <Carousel className="w-full max-w-xs">
          <CarouselContent>
            <CarouselItem className="flex justify-center items-center text-center p-5 text-base">
              <div>
                This app is inspired by the book - The 12 Week Year.
                <br />
                We all have goals and we want to achieve them. As simple as this
                concept is, it's just not possible without hardship and most
                people are not up for this.
                <br />
                You, are different. <br />
              </div>
            </CarouselItem>
            <CarouselItem className="flex justify-center items-center text-center p-5 text-base">
              <div>
                I won't be explaining the entirety of the book, but the thing is
                that keeping track of habits won't really get you to where you
                want.
                <br />
                It's amazing that you have good habits, but it is crucial to
                your journey that you create habits and work towards things that
                truly progress you.
                <br />
                The things that really matter are for you to decide.
              </div>
            </CarouselItem>
            <CarouselItem className="flex flex-col gap-5 justify-center items-center text-center p-5 text-base">
              <div>
                Where you want to be in your life the next decade, you must
                decide now. To get there, you need to focus on things that get
                you there in the next 3 years. To complete this, you need to
                plan every day, for every day must move you one step closer to
                your weekly goal.
                <br />
                Your weekly goals come together to achieve the 12 Week Year
                Goal.
              </div>
              <Button
                className="flex gap-2 w-full"
                onClick={() => {
                  localStorage.setItem("helper", 1);
                  setRefreshDashboard(1);
                }}
              >
                <Heart />
                Let's go!
              </Button>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </DialogHeader>
    </div>
  );
};

export default ThankYou;
