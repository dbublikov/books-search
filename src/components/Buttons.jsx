import styled from 'styled-components';
import { IoSearchOutline } from 'react-icons/io5';

export const Button = styled.button`
  padding: 0 1rem;
  background-color: var(--colors-ui-base);
  box-shadow: var(--shadow-hover);
  line-height: 2.5;
  border-radius: var(--radii);

  border: none;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  color: var(--color-text);
  cursor: pointer;

  &:hover {
    box-shadow: var(--shadow);
  }
`;

// new markup
export const SearchImg = styled(IoSearchOutline)`
  display: block;
  width: 1.6rem;
  height: 1.6rem;
  margin: 0;
  padding: 0;

`;

export const SubButton = styled.button`
  display: block;
  height: 38px;
  border: 0;
  border-radius: 5px;
  padding: 0 8px;
  position: absolute;
  z-index: 1;
  top: 4.6%;
  /* right: 17.8%; */
  right: 0.5%;
  background-color: inherit;
  cursor: pointer;

  &:hover {
    /* outline: 2px solid #ddd; */
    background-color: #ddd;
  }

  &:focus {
    outline: 2px solid rgb(68, 130, 248);
    background-color: #ddd;
  }

  @media (min-width: 425px) {
    right: 17.8%;
  }
`;

export const SubmitButton = styled.button`
  /* position: absolute;
  top: 50;
  right: 0; */
  display: block;
  margin-left: 10px;
  background-color: turquoise;
  color: #fff;
  font-size: 0.9rem;
  border: 0;
  border-radius: 5px;
  height: 40px;
  padding: 0 20px;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

export const LoadMoreButton = styled.button`
  display: block;
  margin: 0 auto;
  background-color: yellowgreen;
  color: #fff;
  font-size: 0.9rem;
  border: 0;
  border-radius: 5px;
  height: 40px;
  padding: 0 20px;
  cursor: pointer;
  /* box-sizing: border-box; */
  &:hover {
    opacity: 0.9;
  }
`;
