import React from "react";
import { Quote } from "lucide-react";

const DailyQuote = () => {
  return (
    <div className="flex flex-col gap-4 m-4 p-9 bg-white rounded-lg">
      <Quote />
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        This too shall pass.
      </h1>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        - Unknown
      </h4>
    </div>
  );
};

export default DailyQuote;
