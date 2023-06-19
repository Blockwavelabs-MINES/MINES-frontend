import { atom } from "recoil";

//트위터 연동 시 스낵바를 띄우기 위한 상태 관리.
export const twitterJustConnectedState = atom({
  key: "twitterJustConnectedState",
  default: false,
});
