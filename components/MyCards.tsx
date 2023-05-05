"use client"
import { AnimatePresence, motion } from "framer-motion"
import Card from "@/components/Card";
import useCards from "@/hook/useCards";
import React from "react";

const MyCards = () => {
  const { data, isLoading, error } = useCards()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Something went wrong 😅</div>

  return (
    <motion.div className="my-12 flex  flex-col-reverse">
      <AnimatePresence>
        {data?.list.map((card) => (
          <Card card={card} key={card.id} />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
export default MyCards