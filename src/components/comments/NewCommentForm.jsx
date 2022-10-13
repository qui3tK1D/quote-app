import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import useHttp from "../../hooks/use-http";
import { requestComment } from "../../lib/api";
import Loading from "../UI/Loading";
import classes from "./NewCommentForm.module.css";

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const { sendRequest, status, error } = useHttp(requestComment);

  const { onAddComment } = props;
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (status === "completed" && !error) {
      toast.success("Successfully added a comment!");
      onAddComment();
    }
  }, [error, status, onAddComment]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    // optional: Could validate here

    // send comment to server
    sendRequest({
      comment: commentTextRef.current.value,
      quoteId: props.quoteId,
      requestConfig: {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      },
    });
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      {status !== "pending" && (
        <div className={classes.actions}>
          <button className="btn">Add Comment</button>
        </div>
      )}
    </form>
  );
};

export default NewCommentForm;
