const jwt = require("jsonwebtoken");
const APP_SECRET = "GraphQL-is-aw3some";

// トークンを複合するための関数
function getTokenPayload(token) {
  // トークン化されたものの前の情報(user.id)を複合する。
  return jwt.verify(token, APP_SECRET)
}

// ユーザーIDを取得するための関数
function getUserId(req, authToken) {
  if (req) {
    // ヘッダーを確認します。認証権限の確認
    const authHeader = req.headers.authorization;
    // 権限無し
    if (!authHeader) {
      const { userId } = getTokenPayload(authToken)
      return userId
    }

    // 権限有り
    const token = authHeader.replace("Bearer", "");
    if (!token) {
      throw new Error("トークンが見つかりませんでした");
    }
    // そのトークンを複合する
    const { userId } = getTokenPayload(token);
    return userId;
  }
  throw new Error("認証権限がありません");
}

module.exports = {
  APP_SECRET,
  getUserId
}
