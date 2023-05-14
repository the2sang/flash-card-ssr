"use client"

import React, {useEffect, useState} from "react";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import AddMemoryCard from "@/components/MemoryCard/AddMemoryCard";
import {QueryClientProvider} from "@tanstack/react-query";
import {QueryClient} from "@tanstack/query-core";
import MemoryCardPageList from "@/components/MemoryCard/MemoryCardNewList";

type Props = {
}

const queryClient = new QueryClient();

//async function MainCategoryPage({}: Props) {
const MemoryCardPage = () => {

  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [])

    return ( mounted &&
        <div>
            <div style={{ justifyContent: "center", padding: "10px"}}>
                <h1 className='text-2xl font-bold'>문제 관리</h1>
            </div>
            <div className="justify-center">
                <QueryClientProvider client={queryClient}>
                    <MemoryCardPageList  />
                  <AddMemoryCard />
                    <ReactQueryDevtools initialIsOpen />
                </QueryClientProvider>
            </div>
        </div>
    )
}

export default MemoryCardPage