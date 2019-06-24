const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
const SLACK_URL = process.env.SLACK_URL;
let apiGWResponse;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    try {
        // const ret = axios(url);
        apiGWResponse = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello world',
                // location: ret.data.trim()
            })
        }

        const options = {
            text: "Message from slack bot!!",
        };

        await axios.post(SLACK_URL, JSON.stringify(options))
        .then((response) => {
            console.log('SUCCEEDED: Sent slack webhook: \n', response.data);
        })
        .catch((error) => {
            console.log('FAILED: Send slack webhook', error);
        });
    } catch (err) {
        console.log(err);
        return err;
    }

    return apiGWResponse
};
