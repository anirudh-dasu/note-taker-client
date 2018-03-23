import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BatchHttpLink } from 'apollo-link-batch-http'

export default class Client {
  constructor(initialState) {
    this.apolloClient = new ApolloClient({
      link: new BatchHttpLink({ url: 'http://localhost:3000/graphql', batchMax: 5, batchInterval: 5 }),
      cache: new InMemoryCache().restore(initialState),
      ssrForceFetchDelay: 100
    })
  }
}
