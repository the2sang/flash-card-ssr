import {QueryClient, useQuery, useQueryClient} from "@tanstack/react-query";
import React, {useState} from "react";
import {MemoryCard, MemoryCards} from "@/types";
import Card from "@/components/Card";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {fetchData} from "@/app/memoryCards/page";

type ParamProps = {
  param: number;
}
export function Cards() {

  const queryClient: QueryClient = useQueryClient();

  const [param, setParam]
    = React.useState<ParamProps | number>(1);

  const [flashcarddata, setFlashcarddata] = useState<MemoryCard[]>([]);


  const { status, data, error, isFetching, isPreviousData} = useQuery<MemoryCards>({
    queryKey: ['cards', param],
    queryFn: () => fetchData(param as ParamProps),
    keepPreviousData: true,
    staleTime: 2000,
  });

  React.useEffect(() => {
    if (!isPreviousData && data?.hasMore) {
      queryClient.prefetchQuery({
        queryKey: ['cards', param + 1],
        queryFn: () => fetchData(param + 1),
      })
    }
  }, [data, isPreviousData, param, queryClient])

  console.log(data);


  const [current, setCurrent] = useState<number>(0);
  function previousCard() {
    setCurrent(current - 1);
  }
  function nextCard() {
    setCurrent(current + 1);
  }

  const loading = <div className="loading">Loading flashcard content...</div>;

  // ---> start
  return (
    <div>
      { isFetching ? (
        <div>Loading...</div>
      ) : status === 'error' ? (
        <div>Error: { error.message}</div>
      ) : (
        // `data` will either resolve to the latest page's data
        // or if fetching a new page, the last successful page's data

        <div>
          <div key={data.code}>
            {data.list.map((card) => (
              <Card card={card} key={card.id} />
            ))}
            {/*<Card card={data.list} key={data.list.id} />*/}
          </div>

          {/*{data.cards.map(( card ) => (*/}
          {/*    <Card card={card} key={card.id} />*/}
          {/*))}*/}
        </div>
      )}

      {/*<div>*/}
      {/*  /!* number of cards *!/*/}
      {/*  {data && data.list.length > 0 ? (*/}
      {/*    <div className="cardNumber">*/}
      {/*      Card {current + 1} of {data.list.length}*/}
      {/*    </div>*/}
      {/*  ) : (*/}
      {/*    ""*/}
      {/*  )}*/}
      {/*  /!* /number of cards *!/*/}

      {/*  /!* render cards *!/*/}
      {/*  {data && data.list.length > 0 ? cards[current] : loading}*/}
      {/*  /!* /render cards *!/*/}

      {/*  /!* render nav buttons *!/*/}
      {/*  <div className="nav">*/}
      {/*    {current > 0 ? (*/}
      {/*      <button onClick={previousCard}>Previous card</button>*/}
      {/*    ) : (*/}
      {/*      <button className="disabled" disabled>*/}
      {/*        Previous card*/}
      {/*      </button>*/}
      {/*    )}*/}
      {/*    {current < data.list.length - 1 ? (*/}
      {/*      <button onClick={nextCard}>Next card</button>*/}
      {/*    ) : (*/}
      {/*      <button className="disabled" disabled>*/}
      {/*        Next card*/}
      {/*      </button>*/}
      {/*    )}*/}
      {/*    /!* /render nav buttons *!/*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div className="justify-center flex display p-5">
        <div>Current Page: {param + 1}</div>
        <button className="btn btn-active btn-primary mr-10"
          onClick={() => setParam((old) => Math.max(old - 1, 0))}
          disabled={param === 0}
        >
          Previous Page
        </button>{' '}
        <button className="btn btn-active btn-primary"
          onClick={() => {
            setParam((old) => (data?.hasMore ? old + 1 : old))
          }}
          disabled={isPreviousData || !data?.hasMore}
        >
          Next Page
        </button>
        {
          // Since the last page's data potentially sticks around between page requests,
          // we can use `isFetching` to show a background loading
          // indicator since our `status === 'loading'` state won't be triggered
          isFetching ? <span> Loading...</span> : null
        }{' '}
      </div>

      <ReactQueryDevtools initialIsOpen />
    </div>
  )
}