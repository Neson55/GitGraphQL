import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from "@apollo/client";
import { token } from "./key";


type Headers = {
    [key: string]: string;
};
// Create an HTTP link with the GitHub GraphQL API endpoint
const httpLink =  new HttpLink({
    uri: "https://api.github.com/graphql",
});


// Create an Apollo Link with the required authorization header
const authLink = new ApolloLink((operation, forward) => {
    
    operation.setContext(({ headers }: { headers: Headers }) => ({
        headers: {
            ...headers,
            authorization: `Bearer ${token}`,
        },
    }));

    return forward(operation);
});

// Combine the auth link and the HTTP link
const link = ApolloLink.from([authLink, httpLink]);

// Set up the Apollo Client with the combined link and cache
const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

export default client;


