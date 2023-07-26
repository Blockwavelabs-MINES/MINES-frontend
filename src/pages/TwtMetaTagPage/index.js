import TwitterCard from "components/metatags/TwitterCard";
import { useEffect } from "react";

const TwtMetaTagPage = () => {

  useEffect(() => {
    window.location.href = "/";
  }, [])

  return (  
    <>
      <TwitterCard
        title={"3TREE "}
        description={"소셜계정만으로 간편하게 송금하기 "}
        image={"https://i.ibb.co/RSPsgsm/Twitter-Receive.png?123"}
      />
    </>
  );
}
 
export default TwtMetaTagPage;