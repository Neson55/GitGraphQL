import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import "./index.css"
import { ApolloProvider } from "@apollo/client"
import client from "./apollo/clinet"
import { store } from "./app/store"
import { Provider } from "react-redux"

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
