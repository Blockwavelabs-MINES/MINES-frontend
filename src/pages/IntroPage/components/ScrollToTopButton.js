import { ArrowUpIcon } from "assets/icons";
import { IconButton } from "components/button";

import styled from "styled-components";
import mq from "../../../utils/style/Responsive";
import { useState } from "react";
import { useEffect } from "react";

const Container = styled.div`
  position: fixed;
  z-index: 50;
  bottom: 110px;
  right: 10%;

  ${mq[0]} {  // 320
    right: 10%;
  }
  ${mq[1]} { // 375
    right: 10%;
  }
  ${mq[2]} { // 425
    right: 8%;
  }
  ${mq[3]} { // 768
    right: 15%;
  }
  ${mq[4]} { // 1024
    right: 23.5%;
  }
  ${mq[5]} { // 1441
    right: 31%;
  }
  ${mq[6]} { // 2560
    right: 39.5%;
  }
`;

const StyledIconButton = styled(IconButton)`
  box-shadow: 0px 13px 40px 0px rgba(39, 49, 70, 0.12);
`;

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > window.innerHeight) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    }

    window.addEventListener('scroll', handleShowButton)
    return () => {
      window.removeEventListener('scroll', handleShowButton)
    }
  }, [])

  const scrollToTop = () => {
    if (!window.scrollY) return;
  
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (  
    <Container>
      {showButton && 
        <StyledIconButton
          onClick={scrollToTop}
          type="secondary"
          styles="outlined"
          states="default"
          size="xs"
          icon={ArrowUpIcon}
        />
      }
    </Container>
  );
}
 
export default ScrollToTopButton;