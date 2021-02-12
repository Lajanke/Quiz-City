import { ApolloClient, NormalizedCacheObject, ApolloProvider } from "@apollo/client";
import { Component } from "react";
import { RecoilRoot } from 'recoil';
import "./App.css";
import Header from "./Components/Header";
import { cache } from "./cache";
import InputCountry from "./Components/InputCountry";

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri:
    "http://api.everbase.co/graphql?apikey=40d6bde1-a8eb-42cf-97fd-90335542d0be",
});

class App extends Component {
  render() {
    return (
      <RecoilRoot >
      <ApolloProvider client={client}>
        <Header />
        <InputCountry />
      </ApolloProvider>
      </RecoilRoot>
    );
  }
}

export default App;
