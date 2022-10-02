import styled from 'styled-components';
import Select from 'react-select';

export const CustomSelect = styled(Select).attrs({
  styles: {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: '#eee',
      color: 'var(--colors-text)',
      borderRadius: '5px',
      border: '1px solid #ddd',
      height: '40px',
      // boxShadow: 'none'
    }),
    menu: (provided) => ({
      ...provided,
      background: '#eee',
    }),
    menuList: (provided) => ({
      ...provided,
      margin: 0,
      padding: 0,
    }),
    option: (provided, state) => ({
      ...provided,
      cursor: 'pointer',
      color: 'var(--colors-text)',
      width: 'auto',
      // backgroundColor: state.isSelected ? 'yellow' : '#eee',
      // '&:hover': {
      //   backgroundColor: 'lightgrey',
      // },
    }),
  },
})`
  /* min-width: 180px; */
  width: 100%;
  border-radius: var(--radii);
  font-family: var(--family);
  border: none;

  @media (min-width: 767px) {
    width: 230px;
  }
`;
