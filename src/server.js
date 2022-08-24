const { ApolloServer, gql } = require("apollo-server");
const fs = require("fs");
const path = require("path");

// HackerNewsの1つ1つの投稿
let links = [
  {
    id: "link-0",
    description: "GraphQL チュートリアルをUdemyで学ぶ",
    url: "www.udemy-graphql-tutorial.com",
  }
]

// ApolloServerを立ち上げるためにはスキーマの定義とリゾルバ関数が必要

// リゾルバ関数
// 定義した型に対して実体を設定するのがリゾルバ
const resolvers = {
  Query: {
    info: () => "HackerNewsクローン",
    feed: () => links,
  },

  Mutation: {
    post: (parent, args) => {
      let idCount = links.length;

      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };

      links.push(link);
      return link;
    }
  }
}

// ApolloServerをインスタンス化して使用する
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers
});

server
  .listen()
  .then(({ url }) => console.log(`${url}でサーバーを起動中・・・`));
