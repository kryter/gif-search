import React from 'react'
import './App.css'
import SearchBar from './components/searchBar/SearchBar';
import SearchResults from './components/searchResults/SearchResults';
import { useAppSelector } from './globalState/stateHooks';

function App() {
  const isSearchActive: boolean = useAppSelector(state => state.gifSearch.isSearchActive);

  return (
    <div className="app">
      <header className="app-header">
        <SearchBar />
      </header>
      <div className="app-content">
        {isSearchActive && <SearchResults /> }
      </div>
    </div>
  )
}

export default App;
