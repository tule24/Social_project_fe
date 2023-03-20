import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/styles/index.css'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { RouterProvider } from 'react-router-dom'
import router from '@/routes'
import 'react-toastify/dist/ReactToastify.css'
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
      <RouterProvider router={router} />
  </ApolloProvider>
)
