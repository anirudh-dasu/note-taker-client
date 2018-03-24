/* eslint no-underscore-dangle:0 */

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { setContext } from 'apollo-link-context'

export default class Client {
  constructor() {
    const link = new BatchHttpLink({
      uri: 'http://localhost:4000/graphql',
      batchMax: 5,
      batchInterval: 5
    })

    const authLink = setContext((_, { headers }) => {
      const token = localStorage.getItem('note-taker-token')
      return {
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token}` : ''
        }
      }
    })

    this.apolloClient = new ApolloClient({
      link: authLink.concat(link),
      cache: new InMemoryCache({
        dataIdFromObject: object => `${object.__typename}${object.id}`
      })
    })
  }

  get client() {
    return this.apolloClient
  }
}
