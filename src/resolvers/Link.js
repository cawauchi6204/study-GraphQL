// 誰によって投稿されたのかのリゾルバ
function postedBy(parent, args, context) {
  return context.prisma.link.findUnique({
    where: { id: parent.id }
  })
    .postedBy()
  // フィールドにつけるときは最後のチェーンで関数をつける必要がある
}

module.exports = {
  postedBy
}
