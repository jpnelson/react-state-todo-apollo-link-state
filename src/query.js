import gql from "graphql-tag";

// The @client directive tells apollo that this query should occur on the
// client side only.
export const getTodosQuery = gql`
  {
    items @client {
      id
      done
      text
    }
  }
`;
