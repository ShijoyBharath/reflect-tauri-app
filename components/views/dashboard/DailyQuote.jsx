"use client";
import React, { useState, useEffect } from "react";
import { Quote } from "lucide-react";
import quotes from "./quotes.json";

const DailyQuote = () => {
  const [quote, setQuote] = useState({ quote: "", author: "" });

  useEffect(() => {
    // Select a random quote when the component mounts
    const today = new Date();
    // Calculate a unique index based on the current date
    const index =
      Math.abs(today.getDate() * today.getMonth() * today.getFullYear()) %
      quotes.length;
    // const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[index];
    setQuote(randomQuote);
  }, []);

  return (
    <div className="flex flex-col gap-4 m-4 p-9 bg-white rounded-lg">
      <Quote />
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
        {quote["quote"]}
      </h1>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        - {quote["author"]}
      </h4>
    </div>
  );
};

export default DailyQuote;
