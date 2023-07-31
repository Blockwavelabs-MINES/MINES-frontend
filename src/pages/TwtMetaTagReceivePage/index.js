import TwitterCard from "components/metatags/TwitterCard";
import { useEffect } from "react";

/*
*   수금피드 메타태그 페이지
*/
const TwtMetaTagReceivePage = () => {

  useEffect(() => {
    window.location.href = "/";
  }, [])

  return (  
    <>
      <TwitterCard
        title={"3TREE."}
        description={"소셜계정만으로 간편하게 송금하기."}
        image={"https://i.ibb.co/RSPsgsm/Twitter-Receive.png?124"}
      />
    </>
  );
}
 
export default TwtMetaTagReceivePage;