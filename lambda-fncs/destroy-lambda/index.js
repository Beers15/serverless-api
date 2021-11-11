const dynamoose = require('dynamoose');

exports.handler = async (event) => {
  let id = event.queryStringParameters && event.queryStringParameters.id;

  const widgetsSchema = new dynamoose.Schema({
    'id': String,
    'name': String,
    'purpose': String
  });
    
  const widgetsTable = dynamoose.model('Widgets', widgetsSchema);

  let statusCode = 500;
  let resBody = null;

  try {
    let res = await widgetsTable.delete({id: id});

    resBody = JSON.stringify(res);
    statusCode = 200;
  } catch(err) {
    statusCode = 400;
    resBody = err.message
  }

  const response = {
    status: statusCode,
    body = resBody
  };
  return response
};
