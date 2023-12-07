// here we will create that function which will help to send the api request


const { Configuration ,OpenAIApi }=require('openai');
const configuration =new Configuration({apiKey:'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'});


const openai=new OpenAIApi(configuration);


export async function sendMsgToDoctorGPT(message) {
    try {
      // Encode the message for the URL
      const encodedMessage = encodeURIComponent(message);
  
      // Define the API endpoint with the encoded message
      const apiUrl = `http://localhost:8000/model?prompt=${encodedMessage}`;
  
      // Make a GET request to the API
      const response = await fetch(apiUrl);
  
      // Check if the request was successful (status code 200)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Parse the response JSON
      const data = await response.json();
  
      // Do something with the data (you can return it or process it further)
      console.log('API Response:', data);
  
      return data;
    } catch (error) {
      // Handle errors
      console.error('Error sending message to OpenAI:', error);
      throw error; // Optional: rethrow the error if needed
    }
  }

//
// curl https://api.openai.com/v1/chat/completions \
//   -H "Content-Type: application/json" \
//   -H "Authorization: Bearer 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" \
//   -d '{
//     "model": "gpt-3.5-turbo",
//     "messages": [
//       {
//         "role": "system",
//         "content": "You are a helpful assistant."
//       },
//       {
//         "role": "user",
//         "content": "Who won the world series in 2020?"
//       },
//       {
//         "role": "assistant",
//         "content": "The Los Angeles Dodgers won the World Series in 2020."
//       },
//       {
//         "role": "user",
//         "content": "Where was it played?"
//       }
//     ]
//   }'