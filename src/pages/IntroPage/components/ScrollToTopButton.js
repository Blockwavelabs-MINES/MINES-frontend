import { useState, useEffect } from "react";

import { ArrowUpIcon } from "assets/icons";
import { IconButton } from "components/button";

import styled from "styled-components";

const Container = styled.div`
  position: sticky;
  float: right;
  z-index: 50;
  bottom: 110px;
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
        <IconButton
          onClick={scrollToTop}
          type="secondary"
          styles="outlined"
          states="default"
          size="xs"
          icon={ArrowUpIcon}
          shadow
        />
      }
    </Container>
  );
}
 
export default ScrollToTopButton;