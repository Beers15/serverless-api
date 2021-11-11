const dynamoose = require('dynamoose');

exports.handler = async (event) => {
  const widgetsSchema = new dynamoose.Schema({
    'id': String,
    'name': String,
    'purpose': String
  });
  
  const widgetsTable = dynamoose.model('Widgets', widgetsSchema);

  let data = null;
  let status = 500;

  try {
    let id = event.queryStringParameters && event.queryStringParameters.id;
    if(id) {
      let res = await widgetsTable.query("id").eq(id).exec();
      data = res[0];
      console.log("Data: ", data);
    } else {
      data = await widgetsTable.scan().exec();
    }
    status = 200; 
  } catch(err) {
    data = new Error(err);
    status = 400;
  }

  const response = {
      statusCode: status,
      body: JSON.stringify(data),
  };
  return response;
};
