import React, { useState } from 'react'
import './SearchBarStyles.css'
import { AppDispatch } from '../../globalState/store';
import { useAppDispatch, useAppSelector } from '../../globalState/stateHooks';
import { setSearchText } from '../../globalState/gif-search-slice';

// React key name for both the return key and enter key
const RETURN_KEY_NAME = 'Enter';

function SearchBar() {

  const dispatch: AppDispatch = useAppDispatch();

  const searchText: string = useAppSelector(state => state.gifSearch.searchText);

  const [localSearchText, setLocalSearchText] = useState<string>(searchText);

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === RETURN_KEY_NAME) {
      triggerSearch();
    }
  };

  const triggerSearch = () => {
    dispatch(setSearchText(localSearchText));
  };

  return (
    <div className="search-bar-container">
      <input className="search-box" value={localSearchText} type="text" onChange={(e) => setLocalSearchText(e.target.value)} onKeyPress={onKeyPress}/>
      <button className="search-button" onClick={triggerSearch}>Search</button>
    </div>
  )
}

export default SearchBar;
