import { useNavigate, useParams } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

import { Button } from '../components/Buttons';
import { BookDetails } from '../features/details/BookDetails';

export const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <Button onClick={() => navigate(-1)}>
        <IoArrowBack /> Back
      </Button>
      <BookDetails id={id} />
    </div>
  );
};
