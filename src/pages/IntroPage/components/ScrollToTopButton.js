import { ArrowUpIcon } from "assets/icons";
import { IconButton } from "components/button";

import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  bottom: 110px;
  z-index: 1000;
  margin: 0px 0px 0px auto;
`;

const scrollToTop = () => {
  if (!window.scrollY) return;

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const ScrollToTopButton = () => {
  return (  
    <Container>
      <IconButton
        onClick={scrollToTop}
        type="secondary"
        styles="outlined"
        states="default"
        size="xs"
        icon={ArrowUpIcon}
      />
    </Container>
  );
}
 
export default ScrollToTopButton;