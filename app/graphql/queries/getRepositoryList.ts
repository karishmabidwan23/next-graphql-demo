import { gql } from "@apollo/client";


export const getRepositoryList = gql`
  query getRepositoryList($limit: Int!, $login: String!) {
    repositoryOwner (login: $login) {
        id
        login
        resourcePath
        url
        repositories(first: $limit) {
          nodes {
            id
            name
            url
          }
        }
    }
  }
`;
