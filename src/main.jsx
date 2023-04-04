import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/styles/index.css'
import { RouterProvider } from 'react-router-dom'
import { SocialProvider } from '@/context'
import router from '@/routes'
import 'react-toastify/dist/ReactToastify.css'
import { ApolloProvider } from '@apollo/client'
import { client } from './ApolloProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <SocialProvider>
      <RouterProvider router={router} />
    </SocialProvider>
  </ApolloProvider>
)
