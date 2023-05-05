"use client";

import React, { useState } from "react";
import {MemoryCard} from "@/types";

interface MemoryCardProps {
  card: MemoryCard
}

export default function Card({ card }: MemoryCardProps) {
  const [side, setSide] = useState<boolean>();

  function handleClick() {
    console.log("clicked!");
    setSide(!side);
    console.log(side);
  }
  return (
    <div className={`card ${side ? "side" : ""}`} onClick={handleClick}>
      <small>
        <p className="flex justify-center text-black-500 font-semibold">문제 {card.id}</p>

      </small>
      {/* {side ? card.fields.side1 : card.fields.side2} */}
      <div className="front">
          <p className="text-left" >{card.question}</p>
          <br/>
          <p className="text-left">1. {card.num1}</p>
          <p className="text-left">2. {card.num2}</p>
          <p className="text-left">3. {card.num3}</p>
          <p className="text-left">4. {card.num4}</p>
      </div>
      <div className="back">
          <p className="text-left"> 정답 {card.rightAnswerNum}</p>
      </div>
    </div>
  );
}
