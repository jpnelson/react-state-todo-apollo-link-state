import gql from "graphql-tag";

// The @client directive tells apollo that these mutations should occur on the
// client side only.
export const addTodoMutation = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) @client
  }
`;

export const markTodoDoneMutation = gql`
  mutation MarkTodoDone($id: Int!) {
    markTodoDone(id: $id) @client
  }
`;

export const markTodoNotDoneMutation = gql`
  mutation MarkTodoNotDone($id: Int!) {
    markTodoNotDone(id: $id) @client
  }
`;
