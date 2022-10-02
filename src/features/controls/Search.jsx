import styled from 'styled-components';

const StyledInput = styled.input.attrs({
  type: 'text',
  placeholder: 'Search for a book...',
})`
  /* width: 65%; */
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  height: 40px;
  padding: 20px;
  background-color: #eee;
  border: 1px solid #ddd;
  border-radius: 5px;
  /* z-index: 2; */

  &:hover {
    outline: 1px solid rgb(180, 180, 180);
  }

  &:focus {
    outline: 2px solid rgb(68, 130, 248);
  }

  &:active {
    background-color: inherit;
  }

  @media (min-width: 425px) {
    width: 65%;
  }
`;

export const Search = ({ search, setSearch }) => {
  return (
    <StyledInput
      name="search_input"
      aria-label="search_input"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};
