const FIREBASE_DOMAIN = "https://quote-http-fa000-default-rtdb.firebaseio.com";
export const requestQuote = async ({ quote, requestConfig, quoteId }) => {
  try {
    const res = await fetch(
      `${FIREBASE_DOMAIN}/quotes${quoteId ? `/${quoteId}` : ""}.json`,
      {
        method: requestConfig?.method ? requestConfig.method : "GET",
        body: quote ? JSON.stringify(quote) : null,
        headers: requestConfig?.headers ? requestConfig.headers : {},
      }
    );

    if (!res.ok) {
      if (requestConfig?.method === "POST") {
        throw new Error("Could not create quote.");
      } else {
        throw new Error("Could not fetch quote.");
      }
    }

    const data = await res.json();

    if (requestConfig?.method !== "POST" && !quoteId && data) {
      const dataArr = Object.entries(data);
      const transformedQuotes = dataArr.map((cur) => ({
        id: cur[0],
        ...cur[1],
      }));

      return transformedQuotes;
    }

    return data;
  } catch (err) {
    throw err.message;
  }
};

export const requestComment = async ({ comment, quoteId, requestConfig }) => {
  try {
    const res = await fetch(`${FIREBASE_DOMAIN}/comments/${quoteId}.json`, {
      method: requestConfig?.method ? requestConfig.method : "GET",
      body: comment ? JSON.stringify(comment) : null,
      headers: requestConfig?.headers ? requestConfig.headers : {},
    });

    if (!res.ok) {
      if (requestConfig && requestConfig.method === "POST") {
        throw new Error("Could not comment.");
      } else {
        throw new Error("Could not fetch comment.");
      }
    }

    const data = await res.json();

    if (requestConfig?.method !== "POST" && data) {
      const dataArr = Object.entries(data);
      const transformedComments = dataArr.map((cur) => ({
        id: cur[0],
        comment: cur[1],
      }));

      return transformedComments;
    }

    return data;
  } catch (err) {
    throw err.message;
  }
};
