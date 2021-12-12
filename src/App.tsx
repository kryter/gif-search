import React from 'react'
import './App.css'
import SearchBar from './components/searchBar/SearchBar';
import SearchResults from './components/searchResults/SearchResults';

function App() {

  return (
    <div className="app">
      <header className="app-header">
        <SearchBar />
      </header>
      <div className="app-content">
        <SearchResults />
      </div>
    </div>
  )
}

export default App;
