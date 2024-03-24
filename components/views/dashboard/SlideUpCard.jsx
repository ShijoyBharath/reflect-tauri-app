import React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Atom } from "lucide-react";

const SlideUpCard = ({habit, description}) => {
  return (
    <Drawer>
      <DrawerTrigger>
        <div className="flex gap-3 items-center">
          <Atom size={40} />
          <div className="flex flex-col items-start">
            <CardTitle>{habit}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Stats for {habit}</DrawerTitle>
          <DrawerDescription>For this 12 Week Year, you have completed : 55%</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Awesome</Button>
          <DrawerClose>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SlideUpCard;
