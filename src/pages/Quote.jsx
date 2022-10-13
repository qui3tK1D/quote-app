import React, { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import Loading from "../components/UI/Loading";
import useHttp from "../hooks/use-http";
import { requestQuote } from "../lib/api";

const Quote = () => {
  const { status, data, sendRequest } = useHttp(requestQuote);
  const { id } = useParams();

  useEffect(() => {
    sendRequest({ quoteId: id });
  }, [id]);

  if (!data && status === "completed") {
    return <NoQuotesFound />;
  }

  return (
    <div>
      {data && status === "completed" && (
        <HighlightedQuote text={data.text} author={data.author} />
      )}
      <Loading status={status} />
      <Outlet />
    </div>
  );
};

export default Quote;
