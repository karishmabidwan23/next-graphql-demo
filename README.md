# Note
The project development is in progress however, the basic structure and guideline is setup successfully as per requirement.
## Description
This project is a Next.js application that utilizes GraphQL with GitHub's API. It includes scripts for development, building, linting, and generating GraphQL schema and types.

## Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- npm or yarn
- A valid GitHub token with API access

### Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```sh
   cd <project-directory>
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
   or
   ```sh
   yarn install
   ```

## Available Scripts

### Development
```sh
npm run dev
```
Starts the development server using Next.js with Turbopack. Also ensures GraphQL types are generated before startup.

### Build
```sh
npm run build
```
Generates a production build of the application.

### Start
```sh
npm run start
```
Starts the Next.js application in production mode.

### Linting
```sh
npm run lint
```
Runs ESLint to check for code quality and style issues.

### GraphQL Schema Generation
```sh
npm run gen:graphql-schema
```
Introspects the GitHub GraphQL API and saves the schema to `./app/graphql/schema.graphql`.
Requires a valid GitHub token in the `GITHUB_TOKEN` environment variable.

### GraphQL Types Generation
```sh
npm run gen:graphql-types
```
Runs `gen:graphql-schema` followed by `codegen` to generate TypeScript types from the GraphQL schema.

### GraphQL Code Generation
```sh
npm run codegen
```
Uses `graphql-codegen` to generate TypeScript types based on the `codegen.ts` configuration.

## Environment Variables
Ensure you have a `.env.local` file with the following variable set:
```sh
NEXT_PUBLIC_GITHUB_GRAPHQL_URL="https://api.github.com/graphql"
GITHUB_AUTH_TOKEN=your_github_token_here
```
This is required for introspecting the GitHub GraphQL schema.

## License
This project is licensed under [Your License Here].

