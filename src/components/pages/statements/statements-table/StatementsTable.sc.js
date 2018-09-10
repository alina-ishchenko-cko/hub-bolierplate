import styled from 'react-emotion';

export const StatementsTableContainer = styled('div')`
  display: flex;
  flex-direction: unset;
  flex-wrap: wrap;
  width: 100%;
  margin-left: 160px;

  @media (min-width: 1280px) and (max-width: 1440px) {
    margin-left: 120px;
  }
`;

// need an illusion to do the cool scroll bit
export const StatementsTableBottomIllusion = styled('div')`
  position: static;
  width: 100vw;
  height: 45px;
  background: purple;
`;
