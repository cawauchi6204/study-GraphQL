const { ApolloServer } = require("apollo-server");
const fs = require("fs");
const path = require("path");

const { PrismaClient } = require("@prisma/client");
const { getUserId } = require("./utils");

// リゾルバ関係のファイル
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Link = require("./resolvers/Link");
const User = require("./resolvers/User");

const prisma = new PrismaClient();

// リゾルバ関数
// 定義した型に対して実体を設定するのがリゾルバ
const resolvers = {
  Query,
  Mutation,
  Link,
  User
}

// ApolloServerをインスタンス化して使用する
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
  // contextはどこでも使うことができるように設定する
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      userId: (req && req.headers.authorization) ? getUserId(req) : null
    }
  }
});

server
  .listen()
  .then(({ url }) => console.log(`${url}でサーバーを起動中・・・`));
