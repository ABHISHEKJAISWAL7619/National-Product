import Updateinput from "@/components/atoms/Updateinput";
import React from "react";

const Compositionprogram = () => {
  return (
    <div className="bg-white p-6">
      <h1 className="font-inter font-bold text-[32px] leading-[40px] tracking-[0px] mt-5 mb-5">
       Composition
      </h1>

     
      <div className="max-w-[940px]">
        <div className="flex flex-wrap gap-5">
          <Updateinput label="Date" type="date" placeholder="12/10/2025" />
           <Updateinput label="Batch No" type="text" placeholder="151" />
        </div>

      
        <div className="flex flex-wrap gap-5">
         
          <Updateinput label="Name" type="text" placeholder="Name 01" />
        </div>
        </div>
    </div>
  );
};

export default Compositionprogram;


