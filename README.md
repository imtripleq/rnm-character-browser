# Dennis' Demo - Rick and Morty Character Browser

Explore and discover characters from the Rick and Morty universe. This demo showcases a dynamic character browser built with Apollo GraphQL and Next.js, featuring detailed profiles, seamless pagination, and real-time data fetching.

## Features

- Browse detailed profiles of Rick and Morty characters.
- Seamless pagination to navigate through different pages of characters.
- Dynamic data fetching using Apollo GraphQL.

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

# Go to graphql server folder
cd rnm-graphql-server
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory of the rnm-graphql-server, copy and paste below to the file (see .env.example):

```bash
PORT=4000
API_URL=https://rickandmortyapi.com/graphql
```

4. Go back to the root folder:

```bash
cd ..
```

### Frontend Setup

1. Go to project folder

```bash
cd rnm-character-browser
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory of the rnm-character-browser, copy and paste below to the file (see .env.example):

```bash
NEXT_PUBLIC_APOLLO_CLIENT_URL=http://localhost:4000/graphql
```

4. Go back to the root folder:

```bash
cd ..
```

### Running the Application

1. Install concurrently in the root folder to run both frontend and backend:

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
