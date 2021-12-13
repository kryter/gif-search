import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const GIPHY_API_KEY = 'PASTE_YOUR_KEY_HERE';

interface APIGifImage {
  url: string;
  height: string;
  width: string;
}

export interface APIGifItem {
  id: string;
  title: string;
  images: {
    fixed_height: APIGifImage
  };
}

interface APIGifPagination {
  count: number;
  offset: number;
  total_count: number;
}

interface APIGifPageData {
  data: APIGifItem[];
  pagination: APIGifPagination
}

interface GifPageRequest {
  searchText: string;
  offset: number;
  limit: number;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://api.giphy.com/v1'
  }),
  endpoints(builder) {
    return {
      fetchGifs: builder.query<APIGifPageData, GifPageRequest>({
        query(gifPageRequest: GifPageRequest) {
          return `/gifs/search?api_key=${GIPHY_API_KEY}&q=${gifPageRequest.searchText}&offset=${gifPageRequest.offset}&limit=${gifPageRequest.limit}`;
        },
      }),
    };
  },
});

export const { useFetchGifsQuery } = apiSlice;