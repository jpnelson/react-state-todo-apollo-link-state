import * as React from "react";
import * as ReactDOM from "react-dom";

// Apollo dependencies
import { compose, ApolloProvider, graphql } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { withClientState } from "apollo-link-state";
import { InMemoryCache } from "apollo-cache-inmemory";

import { resolvers } from "./resolvers";
import { typeDefs } from "./typedefs";
import { getTodosQuery } from "./query";
import {
  addTodoMutation,
  markTodoDoneMutation,
  markTodoNotDoneMutation
} from "./mutation";

import Input from "./components/Input";
import List from "./components/List";

// apollo-link-state needs to know about the default state,
// which is passed down into the apollo-link-state instantiation below.
const defaultState = {
  items: []
};

class App extends React.Component {
  constructor(props) {
    super(props);

    // We bind `this` to the handlers
    // See https://reactjs.org/docs/handling-events.html
    this.handleCreate = this.handleCreate.bind(this);
    this.itemClick = this.itemClick.bind(this);
  }

  // handleCreate is passed down to the input below, and is called with the text of
  // the item we want to create
  handleCreate(text) {
    this.props.AddTodoMutation({ variables: { text } });
  }

  // Called when an item is clicked, passed down into the items themselves
  itemClick(id, done) {
    if (done) {
      // This prop (and also the one below) are given to the component by
      // `graphql`, which is a higher order component from `react-apollo`.
      // (https://reactjs.org/docs/higher-order-components.html)
      // We paramterize by the id of the item we want to mark as done/not done.
      this.props.MarkTodoDoneMutation({ variables: { id } });
    } else {
      this.props.MarkTodoNotDoneMutation({ variables: { id } });
    }
  }

  render() {
    // Similar to the mutations above, we are given a special prop, "GetTodosQuery",
    // which tells us the state of our query. The component will rerender when
    // the state changes, because we are being given this data by react-apollo as a
    // prop.
    const query = this.props.GetTodosQuery;

    // Even though we have a default state, briefly at the start, we may still
    // be in the "loading" state. Being in this state means that we haven't received
    // any data yet (we might display "loading", rather than this empty list)
    const items = query.loading ? [] : query.items;

    return (
      <div>
        <Input onCreate={this.handleCreate} />
        <List
          title="To do"
          items={items.filter(item => !item.done)}
          onItemClick={this.itemClick}
        />
        <List
          title="Done"
          items={items.filter(item => item.done)}
          onItemClick={this.itemClick}
        />
      </div>
    );
  }
}

const cache = new InMemoryCache();

// Here we instantiate the ApolloClient. This is given to the ApolloProvider below,
// and uses our "in memory cache" (created above). The apollo client normally
// manages network requests, but with apollo-link-state, we can manage local state.
const client = new ApolloClient({
  cache,
  // withClientState tells the apollo client to fetch from the in memory cache,
  // rather than from the network or elsewhere.
  // see https://www.apollographql.com/docs/link/index.html
  link: withClientState({ resolvers, default: defaultState, cache, typeDefs })
});

// `compose` here simply aggregates the many higher order components we have, and
// maps the results onto different props of App. `AppContainer` is the component
// that has all of these props filled out.
const AppContainer = compose(
  graphql(getTodosQuery, { name: "GetTodosQuery" }),
  graphql(addTodoMutation, { name: "AddTodoMutation" }),
  graphql(markTodoDoneMutation, { name: "MarkTodoDoneMutation" }),
  graphql(markTodoNotDoneMutation, { name: "MarkTodoNotDoneMutation" })
)(App);

ReactDOM.render(
  <ApolloProvider client={client}>
    <AppContainer />
  </ApolloProvider>,
  document.getElementById("app")
);
