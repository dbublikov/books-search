import styled from 'styled-components';

const Description = styled.div`
  margin: 3rem auto;
  width: 70%;
  text-align: center;
  font-size: var(--fs-md);
  `;


export const AboutInfo = () => {
  return (
    <Description>
      Hello visitors! The web-app makes use of the Google Books API to search for books
      and list the results. Type in a few keywords, adjust filters and press ENTER &crarr; to see how it works.
    </Description>
  );
};
