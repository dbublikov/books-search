import styled from 'styled-components';

const Wrapper = styled.article`
  border-radius: var(--radii);
  background-color: var(--colors-ui-base);
  box-shadow: var(--shadow);
  cursor: pointer;
  overflow: hidden;

  &:hover {
    &> :first-child {
      transform: scaleX(1.05);
    }
  }
`;

const CardImage = styled.img`
  display: block;
  width: 100%;
  padding: 1rem;
  box-shadow: var(--shadow);
  transform: scaleX(1);
  transition: transform 1s;
`;

const CardBody = styled.div`
  padding: 1rem 1.5rem 2rem;
`;

const CardTitle = styled.h3`
  margin: 0.5rem 0;
  font-size: var(--fs-md);
  font-weight: var(--fw-bold);
`;

const CardGenre = styled.h5`
  margin: 0;
  color: var(--colors-grey);
`;
const CardAuthors = styled.h5`
  margin: 0;
  font-size: var(--fs-sm);
  font-weight: var(--fw-bold);
`;

export const Card = ({ id, authors, categories, title, onClick }) => {

  // console.log('id: ', id)
  const imgUrl = `https://books.google.com/books/publisher/content/images/frontcover/${id}?fife=w270`;

  return (
    <Wrapper onClick={onClick}>
      <CardImage src={imgUrl} alt={title} />
      <CardBody>
        <CardGenre>{(categories) ? categories[0].toUpperCase() : 'N/A'}</CardGenre>
        <CardTitle>{(title.length > 80) ? title.slice(0, 80)+'...' : title}</CardTitle>
        <CardAuthors>
          {(authors && authors.length > 4)
            ? authors.slice(0, 4).join(', ')+'...'
            : (authors) ? authors.join(', ') : 'N/A'}
        </CardAuthors>
      </CardBody>
    </Wrapper>
  );
};
