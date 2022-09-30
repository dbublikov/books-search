import styled from 'styled-components';

const InfoText = styled.div`
  margin: 3rem auto;
  width: 70%;
  text-align: center;
  font-size: var(--fs-md);
  `;

export const NotFound = () => {
  return <InfoText>Ooops, this page doesn't exist!!!</InfoText>;
};
