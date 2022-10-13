import React, { useEffect } from "react";
import QuoteList from "../components/quotes/QuoteList";
import Loading from "../components/UI/Loading";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import useHttp from "../hooks/use-http";
import { requestQuote } from "../lib/api";

const AllQuotes = () => {
  const { sendRequest, data, status, error } = useHttp(requestQuote);

  useEffect(() => {
    sendRequest({});
  }, []);
  return (
    <>
      {data && <QuoteList quotes={data} />}
      {!data && status === "completed" && <NoQuotesFound />}
      {!data && status === "failed" && <p className="centered">{error} :(</p>}
      <Loading status={status} />
    </>
  );
};

export default AllQuotes;
