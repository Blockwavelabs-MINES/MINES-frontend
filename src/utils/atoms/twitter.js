import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

//트위터 연동 시 스낵바를 띄우기 위한 상태 관리.
export const twitterJustConnectedState = atom({
  key: "twitterJustConnectedState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

//수령 링크 접속 후 연동 페이지 접속했을 때 리다이렉트하기 위한 상태 관리.
export const receiveLinkState = atom({
  key: "receiveLinkState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

//게시된 트위터 링크.
export const twitterLinkState = atom({
  key: "twitterLInkState",
  default: null,
});

//CheckSendModal에서 아이디 보여주기.
export const twitterIdState = atom({
  key: "twitterIdState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

// 송금->소셜연동->송금 리다이렉트 플로우를 위한 state
export const sendSocialConnectState = atom({
  key: "sendSocialConnectState",
  default: false,
  effects_UNSTABLE: [persistAtom]
})