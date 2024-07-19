import { gql } from "@apollo/client";


export const LIST_REPO = gql`
query GetRepositoriesForUser($login: String!, $first: Int!, $after: String) {
  github: repositoryOwner(login: $login) {
    url
    login
    avatarUrl
    repositories(first : $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          description
          languages(first:100){
            nodes{name}
          }
          name
          stargazers {
            totalCount
          }
          defaultBranchRef {
            target {
              ... on Commit {
                history(first: 1) {
                  edges {
                    node {
                      committedDate
                    }
                  }
                }
              }
            }
          }
          url          
        }
      }
    }
  }
}
`