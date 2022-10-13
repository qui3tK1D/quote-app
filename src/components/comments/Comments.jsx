import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { requestComment } from "../../lib/api";
import Loading from "../UI/Loading";
import CommentsList from "../comments/CommentsList";
import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const { sendRequest, data, status, error } = useHttp(requestComment);
  const { id } = useParams();

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  useEffect(() => {
    sendRequest({ quoteId: id, requestConfig: {} });
  }, [id]);

  const addedCommentHandler = useCallback(() => {
    sendRequest({ quoteId: id, requestConfig: {} });
  }, [id]);

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm quoteId={id} onAddComment={addedCommentHandler} />
      )}
      <Loading status={status} />
      {data && status === "completed" && <CommentsList comments={data} />}
      {!data && status === "completed" && (
        <p className="centered">No Comments were added yet!</p>
      )}
      {!data && status === "failed" && <p className="centered">{error} :(</p>}
    </section>
  );
};

export default Comments;
