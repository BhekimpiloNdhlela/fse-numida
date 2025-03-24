import "bootstrap/dist/css/bootstrap.min.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import App from "./App.tsx";

// TODO: please add the GraphQL URI to the .env file, becuase of time I will not be able to do that
// https://vite.dev/guide/env-and-mode.html
// Access the GraphQL URI from the .env file
// if (!import.meta.env.REACT_APP_GRAPHQL_URI) {
//   console.error("GraphQL URI is not defined in the environment variables.");
// }

const client = new ApolloClient({
  uri: "http://localhost:2024/graphql",
  cache: new InMemoryCache(),
});

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </StrictMode>
  );
}