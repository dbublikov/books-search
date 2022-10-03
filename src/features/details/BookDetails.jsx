import { Info } from './Info';
import { Loader } from '../../components/Loader';
import { useDetails } from '../../hooks/use-details';

export const BookDetails = ({ id }) => {
  const { status, error, currentBook } = useDetails(id);

  return (
    <>
      {status === 'loading' && <Loader pos={true} />}
      {error && <Loader>Can't fetch the book info =(</Loader>}
      {currentBook && <Info id={id} {...currentBook.volumeInfo} />}
    </>
  );
};
