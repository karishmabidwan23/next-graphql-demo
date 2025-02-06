import { QueryOptions } from "@apollo/client";
import { query } from "../graphql/ApolloServerClient"

interface UseGetQueryResult<TResult> {
    data?: TResult;
    error?: Error;
}

export async function fetchQuery<TResult, TVariable>(
    gqlQuery: QueryOptions<TVariable, TResult>
  ): Promise<UseGetQueryResult<TResult>> {
    let data, error;
    try {
      data = await query<TResult, TVariable>(gqlQuery)
    } catch(err) {
      error=new Error("Something went wrong."+err);
    }
  
    return { data: data?.data, error };
  }