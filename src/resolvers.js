import gql from "graphql-tag";

export const resolvers = {
  Query: {
    items: (_a, _b, { cache }) => cache.items || []
  },
  Mutation: {
    addTodo: (_, { text }, { cache }) => {
      const query = gql`
        query GetTodos {
          items @client {
            id
            text
            done
          }
        }
      `;
      const previous = cache.readQuery({ query });

      // To ensure that the ID is unique, when get the maximum id that already exists,
      // and add 1 to it (see below)
      const maxId = previous.items.reduce(
        (maxId, todo) => Math.max(todo.id, maxId),
        -1
      );

      const newItem = {
        id: maxId + 1,
        text,
        done: false,
        __typename: "TodoItem"
      };

      const data = {
        items: previous.items.concat([newItem])
      };
      cache.writeData({ data });
      return newItem;
    },
    markTodoDone: (_, variables, { cache }) => {
      const id = `TodoItem:${variables.id}`;
      const fragment = gql`
        fragment completeTodo on TodoItem {
          done
        }
      `;
      const todo = cache.readFragment({ fragment, id });
      const data = { ...todo, done: true };
      cache.writeData({ id, data });
      return null;
    },
    markTodoNotDone: (_, variables, { cache }) => {
      const id = `TodoItem:${variables.id}`;
      const fragment = gql`
        fragment completeTodo on TodoItem {
          done
        }
      `;
      const todo = cache.readFragment({ fragment, id });
      const data = { ...todo, done: false };
      console.log({ id, data });
      cache.writeData({ id, data });
      return null;
    }
  }
};
