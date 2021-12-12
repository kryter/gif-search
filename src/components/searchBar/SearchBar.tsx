import React, { useState } from 'react'
import './SearchBarStyles.css'

function SearchBar() {

  return (
    <div className="search-bar-container">
      <input className="search-box"/>
      <button className="search-button">Search</button>
    </div>
  )
}

export default SearchBar;
