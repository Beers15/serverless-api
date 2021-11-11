const dynamoose = require('dynamoose');
const { v4: uuidv4 } = require('uuid');

exports.handler = async (event) => {
  const jsonBody = JSON.parse(event.body);

  const widgetsSchema = new dynamoose.Schema({
    'id': String,
    'name': String,
    'purpose': String
  });
  
  const widgetsTable = dynamoose.model('Widgets', widgetsSchema);

  let data = null;
  let status = 500;

  try {
    let id = uuidv4();
    let widget = new widgetsTable({ id, ...jsonBody});
    data = await widget.save();
    status = 200;

  } catch(err) {
    status = 400;
    console.log("!!!", err);
    data = new Error(err);
  }

  const response = {
    statusCode: status,
    body: JSON.stringify(data),
  };
  return response;
};