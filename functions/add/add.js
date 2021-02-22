// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method

const faunadb = require("faunadb"),
  q = faunadb.query;

exports.handler = async (event, context) => {
  try {
    // Only allow POST
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    let reqObj = JSON.parse(event.body);

    var client = new faunadb.Client({
      secret: "fnAECCbbi6ACDcQkeuKs-Kfj2IAFAmZ3vPukaud5",
    });

    var result = await client.query(
      q.Create(q.Collection("post"), {
        data: { name: reqObj.name, age: reqObj.age },
      })
    );

    console.log("Entry Created and Inserted in Container: " + result.ref.id);

    return {
      statusCode: 200,
      body: JSON.stringify({
        id: `${result.ref.id}`,
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
