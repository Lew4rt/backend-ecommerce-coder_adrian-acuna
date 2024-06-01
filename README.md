## Environment Variables
### Template
NODE_ENV= \
MONGODB_CONNECTION_STRING= \
DATABASE_NAME= \
GITHUB_CLIENT_ID= \
GITHUB_CLIENT_SECRET= \
ENCRYPTION_KEY=

### Explanation
**NODE_ENV**: Specify the environment in which the application is running. \
**MONGODB_CONNECTION_STRING**: Holds the connection string used by the application to connect to a MongoDB database. \
**DATABASE_NAME**: Declare the name of the database within the MongoDB cluster. \
**GITHUB_CLIENT_ID**: Part of OAuth authentication with GitHub. It represents the client ID provided by GitHub when you register your application with their OAuth service \
**GITHUB_CLIENT_SECRET**: Also part of OAuth authentication with GitHub. It represents the client secret provided by GitHub when you register your application. \
**ENCRYPTION_KEY**: Stores a key used for encryption and decryption within the application. \

## Step by step
**-Modify .env** \
**-$ npm init** \
To run on development: \
**-$ npm start** \
To run on test: \
**-$ npm test** \
