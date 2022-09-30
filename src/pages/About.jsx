import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

import { Button } from '../components/Buttons';
import { AboutInfo } from '../components/AboutInfo';

export const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button onClick={() => navigate(-1)}>
        <IoArrowBack /> Back
      </Button>
      <AboutInfo />
    </>
  );
};
