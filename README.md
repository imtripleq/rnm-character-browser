# Dennis' Demo - Rick and Morty Character Browser

Explore and discover characters from the Rick and Morty universe. This demo showcases a dynamic character browser built with Apollo GraphQL and Next.js, featuring detailed profiles, seamless pagination, real-time data fetching, custom character creation, and integration with AWS services such as Cognito, AppSync, DynamoDB, IAM, and Amplify for a full-stack app.

## Features

- Browse Detailed Profiles: Explore in-depth profiles of characters from the Rick and Morty universe.
- Seamless Pagination: Effortlessly navigate through different pages of characters.
- Dynamic Data Fetching: Real-time data fetching using Apollo GraphQL.
- Custom Character Creation: Create and manage your own custom characters.
- User Authentication: Secure authentication using AWS Cognito.
- Serverless Backend: Utilize AWS Lambda for serverless functions and AWS AppSync with DynamoDB for custom character database management.
- Apollo Client Caching: Efficient data caching and state management with Apollo Client.
- Monorepo Structure: Streamline project management and simplify the setup process.

## Live Demo

[https://dennis-rnm.netlify.app](https://dennis-rnm.netlify.app)

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- Yarn or npm

### Backend Setup

1. Clone the repository:

```bash
git clone https://github.com/imtripleq/rnm-character-browser.git

cd rnm-graphql-server
```

2. Create a `.env` file in the root directory of the rnm-graphql-server, copy and paste below to the file (see .env.example):

```bash
PORT=4000
API_URL=https://rickandmortyapi.com/graphql
```

3. Go back to the root folder:

```bash
cd ..
```

### Frontend Setup

1. Go to project folder

```bash
cd rnm-character-browser
```

2. Create a `.env` file in the root directory of the rnm-character-browser, copy and paste below to the file (see .env.example), or reach out to myself for the key:

```bash
NEXT_PUBLIC_APOLLO_CLIENT_URL=http://localhost:4000/graphql
NEXT_PUBLIC_USER_POOL_ID=
NEXT_PUBLIC_APP_CLIENT_ID=
NEXT_PUBLIC_IDENTITY_POOL_ID=
NEXT_PUBLIC_REGION=
```

3. Go back to the root folder:

```bash
cd ..
```

### Running the Application

1. Install all dependencies in the root folder to run both frontend and backend:

```bash
npm install
# or
yarn install
```

2. From the root folder, run the development servers for both frontend and backend:

```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the frontend, and the backend will be running at [http://localhost:4000/graphql](http://localhost:4000/graphql).

## Learn More

### Technologies used

**React**: A JavaScript library for building user interfaces.

**Next.js**: A React framework with hybrid static & server rendering, and route pre-fetching.

**Apollo GraphQL**: A comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL.

**Tailwind CSS**: A utility-first CSS framework for rapid UI development.

**Flowbite**: A component library built on top of Tailwind CSS that provides pre-designed components.

**AWS Cognito**: Secure user authentication and authorization.

**AWS Lambda**: Serverless computing service for backend functions.

**AWS AppSync**: Managed GraphQL service for real-time data querying.

**DynamoDB**: Managed NoSQL database for custom character storage.

**Serverless Framework**: Framework for building and deploying serverless applications on AWS.
