import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Search } from './Search';
import { CustomSelect } from './CustomSelect';

import { setCategory, setSearch,  selectControls, setOrderBy } from './controls-slice';
import { loadBooks, clearPagination, selectBooksInfo } from '../books/books-slice';

import { SubButton, SearchImg } from '../../components/Buttons';


const categoriesMap = {
  'all': { value: 'all', label: 'all' },
  'art': { value: 'art', label: 'art' },
  'biography': { value: 'biography', label: 'biography' },
  'computers': { value: 'computers', label: 'computers' },
  'history': { value: 'history', label: 'history' },
  'medical': { value: 'medical', label: 'medical' },
  'poetry': { value: 'poetry', label: 'poetry' },
};

const sortMap = {
  'relevance': { value: 'relevance', label: 'relevance' },
  'newest': { value: 'newest', label: 'newest' },
};

const categoriesOptions = Object.values(categoriesMap);
const sortOptions = Object.values(sortMap);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledForm = styled.form`
  margin: 0 auto;
  width: 100%;
  max-width: 700px;
  padding: 20px;
  background-color: lavender;
  border-radius: 10px;
`;

const StyledSearchBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0 0;
  position: relative;
  z-index: 2;
`;

const StyledFilterRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

const StyledRow = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  margin: 10px 0;

  & label {
    display: none;
  }

  @media (min-width: 767px) {
    label {
      display: block;
      margin-right: 10px;
    }
  }
`;

const Results = styled.h5`
  margin: 1rem auto;
  font-size: var(--fs-sm);
  font-weight: var(--fw-bold);
  color: royalblue;
`;

export const Controls = () => {
  const dispatch = useDispatch();
  const { search, category, orderBy } = useSelector(selectControls);
  const { qty, pagination: { pageTerm } } = useSelector(selectBooksInfo);


  const handleSearch = (str) => {
    dispatch(setSearch(str));
  };

  const handleCat = (cat) => {
    dispatch(setCategory(cat?.value || ''));
  };

  const handleOrderBy = (opt) => {
    dispatch(setOrderBy(opt?.value || ''));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim().length) {
      // console.log('hey, submit clicked!!!');
      dispatch(clearPagination());
      dispatch(loadBooks({ search, category, orderBy }));
      document.activeElement.blur();
    }
  };

  return (
    <Wrapper>
      <StyledForm data-testid="form" onSubmit={handleSubmit}>
        <StyledSearchBar>
          <Search search={search} setSearch={handleSearch} />
          <SubButton type="submit" aria-label="btn_submit"><SearchImg /></SubButton>
        </StyledSearchBar>

        <StyledFilterRow>
          <StyledRow>
            <label id="categories">Categories</label>
            <CustomSelect
              name="categories"
              aria-labelledby="categories"
              options={categoriesOptions}
              defaultValue={category}
              isClearable={false}
              isSearchable={false}
              value={categoriesMap[category]}
              onChange={handleCat}
              components={{ IndicatorSeparator:() => null }}
            />
          </StyledRow>
          <StyledRow>
            <label id="sorting">Sorting&nbsp;by</label>
            <CustomSelect
              name="sorting"
              aria-labelledby="sorting"
              options={sortOptions}
              defaultValue={orderBy}
              isClearable={false}
              isSearchable={false}
              value={sortMap[orderBy]}
              onChange={handleOrderBy}
              components={{ IndicatorSeparator:() => null }}
            />
          </StyledRow>
        </StyledFilterRow>
      </StyledForm>
      {qty && pageTerm && <Results>{qty} results for "{pageTerm}"</Results>}
    </Wrapper>
  );
};
