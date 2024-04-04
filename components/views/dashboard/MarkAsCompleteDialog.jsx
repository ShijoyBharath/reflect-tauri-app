import React, { useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { PartyPopper } from "lucide-react";

import { invoke } from "@tauri-apps/api/tauri";

const MarkAsCompleteDialog = ({ calendarId }) => {
  const [value, setValue] = useState(10);

  return (
    <div>
      <DialogHeader>
        <DialogTitle>Rate your day</DialogTitle>
        <DialogDescription>Be brutally honest with yourself.</DialogDescription>
      </DialogHeader>
      <div className="flex gap-5 items-end">
        <h1 className="pt-5 scroll-m-20 text-6xl font-extrabold tracking-tight lg:text-5xl">
          {value}/10
        </h1>
        <p className="text-md text-muted-foreground">
          <PartyPopper />
          Perfect!
        </p>
      </div>
      <div className="p-7 m-5">
        <Slider
          defaultValue={[10]}
          max={10}
          step={1}
          onValueChange={(val) => setValue(val[0])}
        />
      </div>
      <DialogFooter>
        <Button
          type="submit"
          onClick={() => [
            toast("Saved your progress!", {
              description: "Sunday, December 03, 2023 at 9:00 AM",
              action: {
                label: "Undo",
                onClick: () => console.log("undo"),
              },
            }),
            invoke("insert_data"),
          ]}
        >
          Save Progress
        </Button>
      </DialogFooter>
    </div>
  );
};

export default MarkAsCompleteDialog;
