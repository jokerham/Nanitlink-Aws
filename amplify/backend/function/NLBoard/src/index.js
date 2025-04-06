/* Amplify Params - DO NOT EDIT
	API_AWSNANITELINK_BOARDTABLE_ARN
	API_AWSNANITELINK_BOARDTABLE_NAME
	API_AWSNANITELINK_CATEGORYTABLE_ARN
	API_AWSNANITELINK_CATEGORYTABLE_NAME
	API_AWSNANITELINK_COMMENTTABLE_ARN
	API_AWSNANITELINK_COMMENTTABLE_NAME
	API_AWSNANITELINK_GRAPHQLAPIENDPOINTOUTPUT
	API_AWSNANITELINK_GRAPHQLAPIIDOUTPUT
	API_AWSNANITELINK_GRAPHQLAPIKEYOUTPUT
	API_AWSNANITELINK_MEDIATABLE_ARN
	API_AWSNANITELINK_MEDIATABLE_NAME
	API_AWSNANITELINK_POSTTABLE_ARN
	API_AWSNANITELINK_POSTTABLE_NAME
	API_AWSNANITELINK_TAGTABLE_ARN
	API_AWSNANITELINK_TAGTABLE_NAME
	AUTH_AWSNANITELINKD053666D_USERPOOLID
	ENV
	FUNCTION_NLMEMBER_NAME
	REGION
Amplify Params - DO NOT EDIT */
const { headers } = require('./headers');
const { listBoardPost } = require('./listBoardPost');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
	console.log(`EVENT: ${JSON.stringify(event)}`);
  try {
    const pathParameters = event.pathParameters || {};
		const queryStringParameters = event.queryStringParameters || {};
    const boardId = pathParameters.boardId;
		const page = parseInt(queryStringParameters.page) || 1;
		const rowsPerPage = parseInt(queryStringParameters.rowsPerPage) || 10;
    const httpMethod = event.httpMethod;
    
    switch (httpMethod) {
      case 'GET':
        return await listBoardPost(boardId, page, rowsPerPage);
			default:
				return {
					statusCode: 405,
					headers,
					body: JSON.stringify({ error: 'Method Not Allowed' })
				};
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
