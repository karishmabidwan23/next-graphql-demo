import { HttpLink } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { GLOBAL_ENV_CONFIG } from "../config/global-env-config";

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: GLOBAL_ENV_CONFIG.gitGraphqlUrl,
        headers: {
          "authorization": "Bearer "+GLOBAL_ENV_CONFIG.gitAuthToken
        }
      }),
    });
  });