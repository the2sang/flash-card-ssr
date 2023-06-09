"use client"
import Card from "@/components/Card";
import useCards from "@/hook/useCards";
import React, {FC, useState} from "react";
import {TMemoryCard, TMemoryCards} from "@/types/types";

interface CardProps {
  param: number
}

const MyCards: FC<CardProps> = ({param})  => {
  const { data, isLoading, error } = useCards<TMemoryCards>(param)

  // https://www.debuggr.io/react-map-of-undefined/
  const cards : TMemoryCards = data?.list.map((card: TMemoryCard) => {
    return <Card card={card} key={card.id} />;
  });

  const loading = <div className="loading">학습 내용 가져오는 중.....(Need to Start API Server)</div>;

  // navigation in cards
  const [current, setCurrent] = useState(0);
  function previousCard() {
    setCurrent(current - 1);
  }
  function nextCard() {
    setCurrent(current + 1);
  }

  // @ts-ignore
  return (
    <div>
      {/* number of cards */}
      {data && data?.list.length > 0 ? (
        <div className="cardNumber">
          Card {current + 1} of {data.list.length}
        </div>
      ) : (
        ""
      )}
      {/* /number of cards */}

      {/* render cards */}
      {data && data?.list.length > 0 ? cards[current] : loading}
      {/* /render cards */}

      {/* render nav buttons */}
      <div className="nav">
        {current > 0 ? (
          <button onClick={previousCard}>Previous card</button>
        ) : (
          <button className="disabled" disabled>
            Previous card
          </button>
        )}
        {current < data?.list.length - 1 ? (
          <button onClick={nextCard}>Next card</button>
        ) : (
          <button className="disabled" disabled>
            Next card
          </button>
        )}
        {/* /render nav buttons */}
      </div>
    </div>
  );
}

export default MyCards