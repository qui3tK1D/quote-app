import { Fragment } from "react";
import { useSearchParams } from "react-router-dom";
import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortingType = searchParams.get("sort") === "asc";

  const sortedQuotes = sortQuotes(props.quotes, sortingType);

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button
          onClick={() => {
            setSearchParams({ sort: sortingType ? "desc" : "asc" });
          }}
        >
          Sort {sortingType ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
