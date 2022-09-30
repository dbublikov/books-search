import styled from 'styled-components';

const Wrapper = styled.section`
  width: 100%;
  padding: 2rem 0;

  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;

  @media (min-width: 424px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;

    /* padding: 1.5rem 0; */
  }

  @media (min-width: 767px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;

    /* padding: 2.5rem 0; */
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }
`;

export const List = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};
