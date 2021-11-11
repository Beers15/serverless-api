const dynamoose = require('dynamoose');

exports.handler = async (event) => {
  const jsonBody = JSON.parse(event.body);

  const widgetsSchema = new dynamoose.Schema({
    'id': String,
    'name': String,
    'purpose': String
  });
  
  const widgetsTable = dynamoose.model('Widgets', widgetsSchema);

  let data = null;
  let statusCode = 500;

  try {
    let id = event.queryStringParameters && event.queryStringParameters.id;
    data = await widgetsTable.update({id: id}, {...jsonBody});
    statusCode = 200;
  } catch(err) {
    const response = {
      status: statusCode,
      body: err.message,
    }
    return response;
  }

  const response = {
      status: statusCode,
      body: JSON.stringify(data),
  };
  return response;
};
