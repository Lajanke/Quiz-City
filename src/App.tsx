import { ApolloClient, NormalizedCacheObject, ApolloProvider } from "@apollo/client";
import { Component } from "react";
import "./App.css";
import Header from "./Components/Header";
import QuizSection from "./Components/QuizSection";
import { cache } from "./cache";

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri:
    "http://api.everbase.co/graphql?apikey=40d6bde1-a8eb-42cf-97fd-90335542d0be",
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Header />
        <QuizSection />
      </ApolloProvider>
    );
  }
}

export default App;
