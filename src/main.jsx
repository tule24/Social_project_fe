import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/styles/index.css'
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { RouterProvider } from 'react-router-dom'
import { SocialProvider } from '@/context'
import { REFRESHTOKEN } from '@/graphql'
import router from '@/routes'
import 'react-toastify/dist/ReactToastify.css'
import promiseToObservable from './helper/promiseToObservable'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

let httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' })
const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:4000/graphql',
  connectionParams: {
    authToken: `Bearer ${localStorage.getItem('accessToken')}`
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
    const rfToken = localStorage.getItem('refreshToken')
    const { data } = await client.mutate({ mutation: REFRESHTOKEN, variables: { refreshToken: rfToken } })
    const { token, refreshToken } = data?.refreshToken
    localStorage.setItem('accessToken', token)
    localStorage.setItem('refreshToken', refreshToken)
    return `Bearer ${token}`
  } catch (error) {
    localStorage.clear()
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

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache
})



ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <SocialProvider>
      <RouterProvider router={router} />
    </SocialProvider>
  </ApolloProvider>
)
