# Social Frontend
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white) ![Apollo-GraphQL](https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql)

## Menu 
- [Install & run](#install--run)
- [Setup main](#main)
- [Main features](#main-features)
## Install & run
`yarn install`: install dependencies in package.json  
`yarn dev`: run app in development env  
`yarn start`: run app in product env
## Main
#### `http`
```js
let httpLink = new HttpLink({ uri: 'https://social-be.onrender.com/graphql' })
```
#### `ws`
```js
const wsLink = new GraphQLWsLink(createClient({
  url: 'wss://social-be.onrender.com/graphql',
  connectionParams: {
    headers: {
      authorization: `Bearer ${cookies.get('refreshToken')}`
    }
  }
}))
```
#### `auth`
```js
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('accessToken')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
})
```
#### `refreshToken`
```js
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
```
#### `errorLink`
```js
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
```
#### `splitLink & client`
```js
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
```
## Main features
#### `Home`
![home](https://res.cloudinary.com/dy6zbixol/image/upload/v1680915956/portfolio/social-0_uxdd03.png "home")
#### `Friend`
![friend](https://res.cloudinary.com/dy6zbixol/image/upload/v1680915956/portfolio/social-4_tgmyzi.png "friend")
#### `Chat`
![bigchat](https://res.cloudinary.com/dy6zbixol/image/upload/v1680915956/portfolio/social-2_pd6zt8.png "bigchat")
![minichat](https://res.cloudinary.com/dy6zbixol/image/upload/v1680915956/portfolio/social-1_m9ativ.png "minichat")
#### `Post`
![post](https://res.cloudinary.com/dy6zbixol/image/upload/v1680941858/createpost_xhweso.png "post")
![post](https://res.cloudinary.com/dy6zbixol/image/upload/v1680915957/portfolio/social-5_h0b2cb.png "post")
![post](https://res.cloudinary.com/dy6zbixol/image/upload/v1680942431/comment_oeyqp8.png "post")
#### `Profile`
![profile](https://res.cloudinary.com/dy6zbixol/image/upload/v1680941981/profile_dlyclt.png "profile")
![profile](https://res.cloudinary.com/dy6zbixol/image/upload/v1680942062/user_q46f6z.png "profile")
![profile](https://res.cloudinary.com/dy6zbixol/image/upload/v1680942146/ava_ctkxkr.png "profile")
#### `Login`
![login](https://res.cloudinary.com/dy6zbixol/image/upload/v1680915956/portfolio/social-6_nprhfs.png "login")
![login](https://res.cloudinary.com/dy6zbixol/image/upload/v1680942336/register_ymzhm3.png "login")
