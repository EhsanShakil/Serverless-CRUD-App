// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method

const faunadb = require("faunadb"),
  q = faunadb.query;

exports.handler = async (event, context) => {
  try {
    var client = new faunadb.Client({
      secret: "fnAECCbbi6ACDcQkeuKs-Kfj2IAFAmZ3vPukaud5",
    });

    var result = await client
      .query(
        q.Map(
          q.Paginate(q.Documents(q.Collection("post"))),
          q.Lambda("X", q.Get(q.Var("X")))
        )
      )
      .then((ret) => ret)
      .catch((err) => console.error("Error: %s", err));

    return {
      statusCode: 200,
      body: JSON.stringify(result.data),

      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
