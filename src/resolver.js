const chats = []
const users = []

const CHAT_CHANNEL = 'CHAT_CHANNEL'
const USER_CHANNEL = 'USER_CHANNEL'

const resolvers = {
  Query: {
    chats (root, args, context) {
      return chats
    },
    users (root, args, context) {
      return users;
    }
  },
  Mutation: {
    sendMessage (root, { from, message }, { pubsub }) {
      const chat = { id: chats.length + 1, from, message }

      chats.push(chat)
      pubsub.publish('CHAT_CHANNEL', { messageSent: chat })

      return chat
    },
    userJoined(root, { name }, { pubsub }){
      const hex = ['#ff3098', '#fd5750', '#2cb673']
      const uid = require('crypto').randomBytes(10).toString('hex');
      const hexCode = hex[Math.floor(Math.random() * hex.length)]
      const user = { id: uid, name, hex: hexCode}

      users.push(user);
      pubsub.publish('USER_CHANNEL', { onlineUsers: user})

      return user;
    }    
  },
  Subscription: {
    messageSent: {
      subscribe (root, args, { pubsub }) {
        return pubsub.asyncIterator(CHAT_CHANNEL)
      }
    },
    onlineUsers: {
      subscribe (root, args, { pubsub }) {
        return pubsub.asyncIterator(USER_CHANNEL)
      }
    }
  }
}

module.exports = resolvers
