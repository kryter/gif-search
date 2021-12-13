import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GifSearchState {
  searchText: string;
  isSearchActive: boolean;
}

const initialState: GifSearchState = {
  searchText: 'Amelia Earhart',
  isSearchActive: false
};

const gifSearchSlice = createSlice({
  name: 'gifSearch',
  initialState,
  reducers: {
    setSearchText(state: GifSearchState, action: PayloadAction<string>) {
      state.searchText = action.payload;
      state.isSearchActive = true;
    }
  }
});

export const { setSearchText } = gifSearchSlice.actions;
export default gifSearchSlice.reducer;
