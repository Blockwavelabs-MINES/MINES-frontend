// import { store, useGlobalState } from "state-pool";
import TypographyEn from "./typographyEn";
import TypographyKo from "./typographyKo";

const Typography = () => {
    // const [language, setLanguage] = useGlobalState("language");
    const language = { lang: "en", id: 1 };
    // const language = { lang: "ko", id: 0 };

  if (language.lang === "en") {
    return TypographyEn;
  } else {
    return TypographyKo;
  }
};

export default Typography();
