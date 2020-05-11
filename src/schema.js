const typeDefs = `
  type Chat {
    id: Int!
    from: String!
    message: String!
  }

  type User {
    id: String
    name: String
    hex: String
  }

  type Query {
    chats: [Chat]
    users: [User]
  }

  type Mutation {
    sendMessage(from: String!, message: String!): Chat
    userJoined(name: String): User    
  }

  type Subscription {
    messageSent: Chat
    onlineUsers: User
  }
`

module.exports = typeDefs