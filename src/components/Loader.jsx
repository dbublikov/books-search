import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 0 auto;
  ${(props) => props.pos && 'padding: 20vh 0;'};
`;

const Heading = styled.h3`
  text-align: center;
`;

export const Spinner = styled.div`
  border: 5px solid lavender;
  border-top: 5px solid royalblue;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 0.8s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Loader = ({ pos, children }) => {
  return (
    <Wrapper pos={pos}>
      {children ? <Heading>{children}</Heading> : <Spinner data-testid="spinner"/>}
    </Wrapper>
  );
};




