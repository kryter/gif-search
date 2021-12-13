import React from 'react'
import _debounce from 'underscore-es/debounce';
import './SearchResultsStyles.css'
import useGifLoader from '../../api/useGifLoader';

const SCROLL_HEIGHT_TO_REQUEST_PROPORTION = 3;
const REQUEST_NEXT_PAGE_DEBOUNCE_DELAY_IN_MS = 500;

function SearchResults() {
  const { gifItems, totalCount, isLoading, fetchNextPage } = useGifLoader();

  const debouncedRequestNextPage = _debounce(fetchNextPage, REQUEST_NEXT_PAGE_DEBOUNCE_DELAY_IN_MS);
  const allItemsLoaded = !!(totalCount && gifItems.length >= totalCount);

  const onResultsScroll = (e: React.UIEvent<HTMLElement>) => {
    if (!totalCount || allItemsLoaded) {
      return;
    }

    const clientHeight = e.currentTarget.clientHeight;
    const scrollHeight = e.currentTarget.scrollHeight;
    const scrollTop = e.currentTarget.scrollTop;

    const remainingScrollHeight = scrollHeight - (scrollTop + clientHeight);
    if (remainingScrollHeight < (SCROLL_HEIGHT_TO_REQUEST_PROPORTION * clientHeight)) {
      // We are nearing the bottom of the results, so fetch the next page.
      debouncedRequestNextPage();
    }
  };

  if (gifItems.length === 0 && isLoading) {
    return <div className="search-results-initial-load"><div>Loading...</div></div>;
  }

  if (totalCount === 0) {
    return <div className="search-results-initial-load"><div>No results found.</div></div>;
  }

  return (
    <div className="search-results-scroll-container" onScroll={onResultsScroll}>
      <div className="search-results-container">
        {gifItems && gifItems.map((gifItem) => (
          <div className="search-result-item" key={gifItem.id}>
            <img src={gifItem.imageUrl} alt={gifItem.title} />
          </div>
        ))}
        {!allItemsLoaded && (
          <div className="search-result-load-more"><div>Loading more results...</div></div>
        )}
        {allItemsLoaded && (
          <div className="search-results-loading-complete"><div>{`All ${totalCount} items loaded.`}</div></div>
        )}
      </div>
    </div>
  )
}

export default SearchResults;
