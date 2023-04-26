import { createStore, useGlobalState } from "state-pool";

const store = createStore();

store.setState("language", { lang: "ko", id: 0 });
const LanguageList = ["ko", "en"];

const LanguageHeader = () => {
  const [language, setLanguage] = useGlobalState("language");

  const languageSwitchOnClick = () => {
    var nextIdx = (language.id + 1) % LanguageList.length;
    setLanguage({ lang: LanguageList[nextIdx], id: nextIdx });
  };
  return <button onClick={languageSwitchOnClick}>Switch Language</button>;
};

export default LanguageHeader;
