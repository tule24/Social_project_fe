import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/styles/index.css'
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { RouterProvider } from 'react-router-dom'
import { SocialProvider } from '@/context'
import router from '@/routes'
import 'react-toastify/dist/ReactToastify.css'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql'
})

const authLink = setContext((_, { headers }) => {
  const token = JSON.parse(localStorage.getItem('accessToken'))
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <SocialProvider>
      <RouterProvider router={router} />
    </SocialProvider>
  </ApolloProvider>
)
