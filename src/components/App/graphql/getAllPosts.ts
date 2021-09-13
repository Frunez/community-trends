import gql from "graphql-tag";

const GET_ALL_POSTS = gql`
  query GetAllPosts($count: Int) {
      allPosts(count: $count) {
        createdAt
        likelyTopics {
          label
          likelihood
        }
    }
  }
`;

export default GET_ALL_POSTS;