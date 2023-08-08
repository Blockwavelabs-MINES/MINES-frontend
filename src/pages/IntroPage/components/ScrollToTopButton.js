import { ArrowUpIcon } from "assets/icons";
import { IconButton } from "components/button";

import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";

const Container = styled.div`
  position: sticky;
  float: right;
  z-index: 50;
  bottom: 110px;
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