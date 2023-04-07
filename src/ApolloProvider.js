import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import promiseToObservable from './helper/promiseToObservable'
import { createClient } from 'graphql-ws'
import { REFRESHTOKEN } from '@/graphql'
import Cookies from 'universal-cookie'

const cookies = new Cookies()
let httpLink = new HttpLink({ uri: 'https://social-be.onrender.com/graphql' })
const wsLink = new GraphQLWsLink(createClient({
  url: 'wss://social-be.onrender.com/graphql',
  connectionParams: {
    headers: {
      authorization: `Bearer ${cookies.get('refreshToken')}`
    }
  }
}))

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('accessToken')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
})
const refreshToken = async () => {
  try {
    const rfToken = cookies.get('refreshToken')
    const { data } = await client.mutate({ mutation: REFRESHTOKEN, variables: { refreshToken: rfToken } })
    const { token, refreshToken } = data?.refreshToken
    localStorage.setItem('accessToken', token)
    cookies.set("refreshToken", refreshToken, {
      expires: new Date(Date.now() + 60 * 60 * 24 * 1000)
    })
    return `Bearer ${token}`
  } catch (error) {
    localStorage.clear()
    cookies.remove('refreshToken')
    window.location.href = '/login'
    throw error
  }
}
const errorLink = onError(({ forward, graphQLErrors, networkError = {}, operation, response }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err.message) {
        case "jwt expired":
          if (operation.operationName === 'refreshToken') return
          return promiseToObservable(refreshToken()).flatMap(token => {
            const oldHeaders = operation.getContext().headers
            operation.setContext({
              headers: {
                ...oldHeaders,
                authorization: token,
              },
            })
            return forward(operation)
          })
      }
    }
  }
})

httpLink = errorLink.concat(authLink).concat(httpLink)

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

export const cache = new InMemoryCache

export const client = new ApolloClient({
  link: splitLink,
  cache: cache
})
