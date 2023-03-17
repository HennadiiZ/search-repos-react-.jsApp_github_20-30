import './App.css';
import React, { useState, useEffect } from 'react';
import ReposList from './components/ReposList/ReposList';
import SearchInput from './UI/SearchInput/SearchInput';
import Pagination from './UI/Pagination/Pagination';
import { fetchRepos } from './_store/data-context'; 
import { useSelector, useDispatch } from 'react-redux';
import Spinner from './UI/Spinner/Spinner';


function App() {
  const repos = useSelector((state) => state.repos);
  const isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchRepos('react'));
  }, [dispatch]);
 
  // ----------------------------------------------------- pagination
  const [currentPage, setCurrentPage] = useState(1);
  const SHOW_ITEMS_PER_PAGE = 3;

  const renderItems = (currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return repos.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const displayedItems = renderItems(currentPage, SHOW_ITEMS_PER_PAGE);
  // ----------------------------------------------------- pagination

  const findRepoHandler = (query) => {
    if (query) {
      dispatch(fetchRepos(query.toLowerCase()));
    } else {
      dispatch(fetchRepos('react'));
    }
  };


  let reposList = null;
  
  if (isLoading) {
    reposList = <div className='msg_wrapper'><Spinner /></div>;
  } else if (repos.length > 0) {
    reposList = <ReposList repos={displayedItems} />;
  } else {
    reposList = <div className='msg_wrapper'><p>По Вашому запиту не знайдено жодного репозиторія.</p></div>;
  }

  return (
    <div className="app">
      <SearchInput onSearch={findRepoHandler}/>
      {reposList}
      <Pagination
        currentPage={currentPage}
        itemsPerPage={SHOW_ITEMS_PER_PAGE}
        totalItems={repos.length}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;