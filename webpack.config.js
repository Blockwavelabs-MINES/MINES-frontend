const path = require("path");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin"); // 설치한 모듈을 가져온다.
module.exports = {
  entry: path.resolve(__dirname, "app.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  watch: true,

  // 추가 부분
  plugins: [
    new BrowserSyncPlugin({
      host: "localhost", //localhost로 사용
      port: 3000, //포트 3000을 사용  (이미 사용중이면 1씩 증가된 포트로 사용)
      files: ["./dist/*.html"], //해당 경로 내 html 파일이 자동으로 동기화 (이 부분이 없으면 html파일 변경사항은 자동 동기화 안됨)
      server: { baseDir: ["dist"] }, // server의 Base 디렉토리를 dist로 지정
    }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
  ],
};
