import styled from 'styled-components';
import parse from 'html-react-parser';

import { Button } from '../../components/Buttons';

const Wrapper = styled.section`
  margin-top: 3rem;
  width: 100%;
  display: grid;
  grid-template-columns: 100%;
  gap: 1rem;

  @media (min-width: 767px) {
    grid-template-columns: minmax(100px, 300px) 1fr;
    /* align-items: center; */
    gap: 1.5rem;
  }
  @media (min-width: 1024px) {
    grid-template-columns: minmax(300px, 400px) 1fr;
  }
`;

const ImgWrapper = styled.div`
  /* height: 60vh; */

  @media (min-width: 767px) {
    margin: 0 auto;
  }
`;

const Image = styled.img`
  display: block;
  width: 100%;
  /* height: 60vh; */
  padding: 0;

  @media (min-width: 767px) {
    padding: 1rem;
  }
`;

const Title = styled.h3`
  margin: 1rem 0 0;
  font-weight: var(--fw-bold);
`;

const Genre = styled.h5`
  margin: 0.5rem 0 1rem;
  font-size: var(--fs-sm);
  color: var(--colors-grey);
`;

const Authors = styled.h5`
  margin: 1rem 0 0;
`;

const BookDetails = styled.h5`
  margin: 0.2rem 0;
`;

const Description = styled.div`
  margin: 1rem 0;
  width: 100%;
`;

const Links = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  margin: 2rem auto;
`;

const InfoLink = styled.a`
  text-decoration: none;
  color: var(--color-text);
`;


export const Info = (props) => {
  const {
    authors, publisher, publishedDate, printedPageCount,
    categories, description, title, id, previewLink, infoLink } = props;

  // console.log('props: ', props)

  // console.log('previewLink: ', previewLink)
  // console.log('infoLink: ', infoLink)

  const imgUrl = `https://books.google.com/books/publisher/content/images/frontcover/${id}?fife=w480-h960`;

  return (
    <Wrapper>
      <ImgWrapper>
        <Image src={imgUrl} alt={title}/>
      </ImgWrapper>
      <div>
        <Title>{title}</Title>
        <Genre>{(categories) ? categories[0] : 'N/A'}</Genre>
        <Authors>{(authors) ? authors.join(', ') : 'N/A'}</Authors>
        <BookDetails>{publisher}, {publishedDate}, {printedPageCount} pages</BookDetails>
        <Description>{(description) ? parse(description) : 'N/A'}</Description>
        <Links>
          <InfoLink href={previewLink} target="_blank" rel="noreferrer">
            <Button>Preview</Button>
          </InfoLink>
          <InfoLink href={infoLink} target="_blank" rel="noreferrer">
            <Button>Info</Button>
          </InfoLink>
        </Links>
      </div>
    </Wrapper>
  );
};
