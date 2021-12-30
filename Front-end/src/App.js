import "./App.css";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";

import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import ConstantsList from "./resources/constants"; 

// Instantiate required constructor fields
const cache = new InMemoryCache();
const link = createHttpLink({
  uri: ConstantsList.BACKEND_URI,
});

const defaultOptions = {
  watchQuery: {
    fetchPolicy: ConstantsList.WATCH_QUERY.FETCH_POLICY,
    errorPolicy: ConstantsList.WATCH_QUERY.ERROR_POLICY,
  },
  query: {
    fetchPolicy: ConstantsList.QUERY.FETCH_POLICY,
    errorPolicy: ConstantsList.QUERY.ERROR_POLICY,
  },
  mutate: {
    errorPolicy: ConstantsList.MUTATE.ERROR_POLICY,
  },
};

const client = new ApolloClient({
  link: link,
  cache: cache,
  name: ConstantsList.CLIENT.NAME,
  version: ConstantsList.CLIENT.VERSION,
  queryDeduplication: false,
  defaultOptions,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Ninja's Reading List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
