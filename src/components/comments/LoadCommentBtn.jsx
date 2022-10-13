import React from "react";
import { Link, useParams } from "react-router-dom";

const LoadCommentBtn = () => {
  const { id } = useParams();
  return (
    <div className="centered">
      <Link className="btn--flat" to={`/quotes/${id}/comments`}>
        Load Comments
      </Link>
    </div>
  );
};

export default LoadCommentBtn;
