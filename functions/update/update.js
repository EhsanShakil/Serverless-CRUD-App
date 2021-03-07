// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method

const faunadb = require("faunadb"),
  q = faunadb.query;

exports.handler = async (event, context) => {
  try {
    // Only allow POST
    if (event.httpMethod !== "DELETE") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    let reqObj = JSON.parse(event.body);

    console.log("SERVER", reqObj);

    var client = new faunadb.Client({
      secret: "fnAECCbbi6ACDcQkeuKs-Kfj2IAFAmZ3vPukaud5",
    });

    // console.log("Entry Created and Inserted in Container: " + result.ref.id);
    const result = await client.query(
      q.Update(q.Ref(q.Collection("FirstCrud"), reqObj.id), {
        data: { name: reqObj.name, age: reqObj.age },
      })
    );
    // console.log("RESULT", result);
    // return result;
    return {
      statusCode: 200,
      body: JSON.stringify(result),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
