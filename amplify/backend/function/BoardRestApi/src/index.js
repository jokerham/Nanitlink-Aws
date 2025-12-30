/* Amplify Params - DO NOT EDIT
	API_MEMBERRESTAPI_APIID
	API_MEMBERRESTAPI_APINAME
	API_NANITLINKAWS_ACTIVITYLOGTABLE_ARN
	API_NANITLINKAWS_ACTIVITYLOGTABLE_NAME
	API_NANITLINKAWS_ARTICLETABLE_ARN
	API_NANITLINKAWS_ARTICLETABLE_NAME
	API_NANITLINKAWS_BOARDTABLE_ARN
	API_NANITLINKAWS_BOARDTABLE_NAME
	API_NANITLINKAWS_CATEGORYTABLE_ARN
	API_NANITLINKAWS_CATEGORYTABLE_NAME
	API_NANITLINKAWS_COMMENTTABLE_ARN
	API_NANITLINKAWS_COMMENTTABLE_NAME
	API_NANITLINKAWS_GRAPHQLAPIENDPOINTOUTPUT
	API_NANITLINKAWS_GRAPHQLAPIIDOUTPUT
	API_NANITLINKAWS_GRAPHQLAPIKEYOUTPUT
	API_NANITLINKAWS_MEDIATABLE_ARN
	API_NANITLINKAWS_MEDIATABLE_NAME
	API_NANITLINKAWS_POSTTABLE_ARN
	API_NANITLINKAWS_POSTTABLE_NAME
	API_NANITLINKAWS_TAGTABLE_ARN
	API_NANITLINKAWS_TAGTABLE_NAME
	AUTH_NANITLINKAWSD5EDFAB0_USERPOOLID
	ENV
	FUNCTION_MEMBERRESTAPI_NAME
	REGION
Amplify Params - DO NOT EDIT */

const { headers } = require('./headers');
const { listBoardPost } = require('./listBoardPost');
const { createBoardPost } = require('./createBoardPost');
const { deleteBoardPost } = require('./deleteBoardPost');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
  try {
    const pathParameters = event.pathParameters || {};
    const queryStringParameters = event.queryStringParameters || {};
    const boardId = pathParameters.id;
    const page = parseInt(queryStringParameters.page) || 1;
		const rowsPerPage = parseInt(queryStringParameters.rowsPerPage) || 10;
		const category = queryStringParameters.category;
    const httpMethod = event.httpMethod;
    
    switch (httpMethod) {
      case 'GET':
        return await listBoardPost(boardId, page, rowsPerPage, category);
			case 'POST':
				return await createBoardPost(event);
			case 'DELETE':
				return await deleteBoardPost(event);
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
