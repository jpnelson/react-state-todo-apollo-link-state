// We manually define the types for the top level Query, Mutation,
// and our own type, Todo.
// Manually maintaining these types here can be avoided with a tool like
// https://github.com/apollographql/apollo-codegen, which will
// automatically generate types for you from your queries.
export const typeDefs = `
  type Todo {
    id: Int!
    text: String!
    done: Boolean!
  }
  type Mutation {
    addTodo(text: String!): Todo
    markTodoDone(id: Int!): Todo
    markTodoNotDone(id: Int!): Todo
  }
  type Query {
    todos: [Todo]
  }
`;
