import React, { useEffect } from "react";
import Loading from "../components/UI/Loading";
import { toast } from "react-hot-toast";
import useHttp from "../hooks/use-http";
import { useNavigate } from "react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";
import { requestQuote } from "../lib/api";

const AddQuote = () => {
  const navigate = useNavigate();
  const { sendRequest, status, error } = useHttp(requestQuote);

  useEffect(() => {
    if (status === "completed") {
      toast.success("Successfully added a quote!");
      navigate("/quotes");
    }
    if (status === "failed" && error) {
      toast.error(error);
    }
  }, [status, navigate, error]);

  const onAddQuote = (newQuote) => {
    sendRequest({
      quote: newQuote,
      requestConfig: {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      },
    });
  };
  return (
    <>
      <QuoteForm onAddQuote={onAddQuote} />
      <Loading status={status} />
    </>
  );
};

export default AddQuote;
