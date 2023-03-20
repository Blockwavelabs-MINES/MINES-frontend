// import { store, useGlobalState } from "state-pool";
import React, { useState } from "react";
import TypographyEn from "./typographyEn";
import TypographyKo from "./typographyKo";

const Typography = () => {
  let language = localStorage.getItem("language");
  if (!language) {
    language = { lang: "en" };
  }

  if (language.lang === "en") {
    console.log(language.lang);
    return TypographyEn;
  } else {
    console.log(language.lang);
    return TypographyKo;
  }
};

export default Typography();
