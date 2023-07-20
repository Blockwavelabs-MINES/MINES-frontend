import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const TwtMetaTagPage = () => {

  useEffect(() => {
    window.location.href = "/";
  }, [])

  return (  
    <>
      <Helmet>
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image:src"
          content="https://github.com/ziptalk/3tree-frontend/assets/99077953/93e23ac0-5d5f-4f9e-91f3-3ba8f1980a98"
        />
        <meta name="twitter:title" content="3TREE" />
        <meta
          name="twitter:description"
          content="소셜계정만으로 간편하게 송금하기"
        />
      </Helmet>
    </>
  );
}
 
export default TwtMetaTagPage;