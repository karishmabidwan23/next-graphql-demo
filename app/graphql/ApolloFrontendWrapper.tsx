"use client";

import { HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { GLOBAL_ENV_CONFIG } from "../config/global-env-config";

/**
 * 
 * This client can be improved.
 * I put it here for demonstration however we should not use it directly since we should not provide our
 * auth token to frontend.
 */
function makeClient() {
  const httpLink = new HttpLink({
    uri: GLOBAL_ENV_CONFIG.gitGraphqlUrl,
    fetchOptions: { cache: "no-store" },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}