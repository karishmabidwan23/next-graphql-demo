import { gql } from "@apollo/client";

export const getRepositoryDetail= gql`
  query getRepositoryDetail(
    $owner: String!
    $name: String!
  ) {
    repository(owner: $owner,name: $name) {
      id
      name
      description
      descriptionHTML
      pushedAt
      projectsUrl
      forkCount
    }
  }
`;
