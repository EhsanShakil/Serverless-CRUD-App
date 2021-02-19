const faunadb = require("faunadb");
const q = faunadb.query;

const handler = async (event) => {
  try {
    var client = new faunadb.Client({
      secret: "fnAECCbbi6ACDcQkeuKs-Kfj2IAFAmZ3vPukaud5",
    });
    let result = await client.queryq.Get(
      q.Ref(q.Collection("post"), "290614922582163981")
    );
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello ${result.data.title}` }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
