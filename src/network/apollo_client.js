import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BatchHttpLink } from 'apollo-link-batch-http'

export default class Client {
  constructor() {
    this.apolloClient = new ApolloClient({
      link: new BatchHttpLink({
        uri: 'http://localhost:4000/graphql',
        batchMax: 5,
        batchInterval: 5
      }),
      cache: new InMemoryCache()
    })
  }

  get client() {
    return this.apolloClient
  }
}
