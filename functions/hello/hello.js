// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method

const faunadb = require("faunadb"),
  q = faunadb.query;

exports.handler = async (event, context) => {
  try {
    var client = new faunadb.Client({
      secret: "fnAECCbbi6ACDcQkeuKs-Kfj2IAFAmZ3vPukaud5",
    });
    var result = await client.query(
      q.Get(q.Ref(q.Collection("post"), "290614922582163981"))
    );
    console.log("Document retrived from Container in Database: " + result.data);

    return {
      statusCode: 200,
      body: JSON.stringify({
        name: `${result.data.name}`,
        age: `${result.data.age}`,
      }),

      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
