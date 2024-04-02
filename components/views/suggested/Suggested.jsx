import React from "react";
import Item from "./Item";

const Suggested = () => {
  return (
    <div className="grid grid-cols-4 gap-4 m-3 p-5 bg-slate-200 rounded-lg">
      <Item title="Ultralearning" description="Learn everything" content="Authors notes" link="ultralearning.com"/>
      <Item title="Ultralearning" description="Learn everything" content="Authors notes" link="ultralearning.com"/>
      <Item title="Ultralearning" description="Learn everything" content="Authors notes" link="ultralearning.com"/>
      <Item title="Ultralearning" description="Learn everything" content="Authors notes" link="ultralearning.com"/>
      <Item title="Ultralearning" description="Learn everything" content="Authors notes" link="ultralearning.com"/>
      <Item title="Ultralearning" description="Learn everything" content="Authors notes" link="ultralearning.com"/>
      <Item title="Ultralearning" description="Learn everything" content="Authors notes" link="ultralearning.com"/>
    </div>
  );
};

export default Suggested;
