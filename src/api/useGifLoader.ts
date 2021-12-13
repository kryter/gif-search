import { useEffect, useState } from 'react';
import { useAppSelector } from '../globalState/stateHooks';
import { APIGifItem, useFetchGifsQuery } from './gifs-api-slice';

// Use the default page size from the Giphy API.
const PAGE_SIZE = 25;

export interface GifItem {
  id: string;
  title: string;
  imageUrl: string;
}

function useGifLoader() {
  const searchText: string = useAppSelector(state => state.gifSearch.searchText);

  const [gifItems, setGifItems] = useState<GifItem[]>([]);
  const [currentOffset, setCurrentOffset] = useState<number>(0);
  const [nextOffset, setNextOffset] = useState<number>(0);
  const [lastReceivedOffset, setLastReceivedOffset] = useState<number>(-1);
  const [duplicateCount, setDuplicateCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [idToIndex, setIdToIndex] = useState<Record<string, number>>({});

  const { data, isLoading } = useFetchGifsQuery({
    searchText,
    offset: currentOffset,
    limit: PAGE_SIZE
  });

  useEffect(() => {
    // If the last API call just finished loading,
    // update the data.
    if (data && !isLoading && data.pagination.offset === currentOffset && lastReceivedOffset < currentOffset) {

      // The API does not uniquely provide unique entries for each page,
      // so when we compile the results, we omit the duplicates.
      // For example, the query "Amelia Earhart"
      // returns 'Vni0T4VpzvHFQXkqRH' for both index 122 (item 22 in page: count: 25, offset: 100)
      // and for index 129 (item 4 in page: count: 25, offset: 125)
      let newDuplicateCount = 0;

      const itemsFromCurrentPage: GifItem[] = [];
      data.data.forEach((apiGifItem: APIGifItem, index: number) => {
        const existingIndex = idToIndex[apiGifItem.id];
        if (existingIndex) {
          newDuplicateCount += 1;
        } else {
          idToIndex[apiGifItem.id] = index + currentOffset;

          itemsFromCurrentPage.push({
            id: apiGifItem.id,
            title: apiGifItem.title,
            imageUrl: apiGifItem.images.fixed_height.url
          });
        }
      });

      const itemsFromAllPages: GifItem[] = [...gifItems, ...itemsFromCurrentPage];
      setGifItems(itemsFromAllPages);
      setLastReceivedOffset(currentOffset);
      setDuplicateCount(duplicateCount + newDuplicateCount);
      setTotalCount(data.pagination.total_count);
    }
  }, [data, isLoading, currentOffset]);

  useEffect(() => {
    setCurrentOffset(0);
    setNextOffset(0);
    setLastReceivedOffset(-1);
    setDuplicateCount(0);
    setGifItems([]);
    setTotalCount(null);
    setIdToIndex({});
  }, [searchText]);

  useEffect(() => {
    if (!isLoading && currentOffset !== nextOffset) {
      setCurrentOffset(nextOffset);
    }
  }, [nextOffset, currentOffset, isLoading]);

  function fetchNextPage() {
    setNextOffset(currentOffset + PAGE_SIZE);
  }

  return {
    gifItems: gifItems,
    totalCount: totalCount ? totalCount - duplicateCount : 0,
    isLoading: isLoading || currentOffset !== nextOffset,
    fetchNextPage,
  }
}

export default useGifLoader;