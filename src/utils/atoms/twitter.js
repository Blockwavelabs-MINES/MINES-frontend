import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

//트위터 연동 시 스낵바를 띄우기 위한 상태 관리.
export const twitterJustConnectedState = atom({
  key: "twitterJustConnectedState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
