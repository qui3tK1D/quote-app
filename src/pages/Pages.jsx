import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import AllQuotes from "./AllQuotes";
import Quote from "./Quote";
import AddQuote from "./AddQuote";
import LoadCommentBtn from "../components/comments/LoadCommentBtn";
import Comments from "../components/comments/Comments";

const Pages = () => {
  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      <Route path="/" element={<Navigate to="/quotes" />} />

      {/* same but oldschool way */}
      {/* <Route path="quotes" element={<AllQuotes />} />
      <Route path="quotes/quote" element={<Quote />} /> */}

      {/* now we can have nested route */}
      <Route path="quotes">
        <Route index element={<AllQuotes />} />
        <Route path=":id" element={<Quote />}>
          <Route index element={<LoadCommentBtn />} />
          <Route path="comments" element={<Comments />} />
        </Route>
      </Route>

      <Route path="new-quote" element={<AddQuote />} />
    </Routes>
  );
};

export default Pages;
