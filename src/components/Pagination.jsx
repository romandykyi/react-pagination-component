import './Pagination.css'
import { useContext, useEffect } from 'react';
import { PaginationContext } from './PaginationContext';

function Pagination({pageSize = 25, boundaryCount = 2, middleCount = 5, totalElementsCount}) {
    const { page, setPage } = useContext(PaginationContext);
    const pagesCount = Math.ceil(totalElementsCount / pageSize);

    // Clamp page
    useEffect(() => {
        setPage(Math.min(Math.max(page, 1), pagesCount));
      }, [pageSize, totalElementsCount]);

    const previousPage = () => {
        setPage((p) => p - 1);
    };

    const moveToPage = (page) => {
        setPage((_p) => page);
    };

    const nextPage = () => {
        setPage((p) => p + 1);
    };

    // Add a range of page buttons
    const addPageButtons = (start, end) => {
        for (let i = start; i <= end; i++) {
            const clName = i == page ? 'selected' : 'page';
            paginationElements.push(<button key={i} className={clName} onClick={() => moveToPage(i)}>{i}</button>);
        }
    };

    // Add '...' button
    const addThreeDotsButtons = (key) => {
        paginationElements.push(<button key={key} disabled>...</button>);
    };

    // Add next/previous button
    const addNavigationButton = (key, enabled, content, onClick) => {
        if (enabled) {
            paginationElements.push(<button key={key} className='page navigation' onClick={onClick}>{content}</button>);
        } else {
            paginationElements.push(<button key={key} className='navigation' disabled>{content}</button>);
        }
    };

    const paginationElements = [];

    // Previous button
    addNavigationButton('previous-page-button', page > 1, '<', previousPage);

    // Middle buttons
    const maxPagesVisible = boundaryCount * 2 + middleCount + 2;
    const maxBoundaryPagesVisible = boundaryCount + middleCount + 1;
    if (pagesCount <= maxPagesVisible) {
        // All buttons can be displayed
        addPageButtons(1, pagesCount);
    } else if (page < maxBoundaryPagesVisible) {
        // Display [first buttons + middle buttons], ... [last buttons]
        addPageButtons(1, maxBoundaryPagesVisible);
        addThreeDotsButtons('right-three-dots-pagination');
        addPageButtons(pagesCount - boundaryCount + 1, pagesCount);
    } else if (page > pagesCount - maxBoundaryPagesVisible + 1) {
        // Display [first buttons], ... [middle buttons + last buttons]
        addPageButtons(1, boundaryCount);
        addThreeDotsButtons('left-three-dots-pagination');
        addPageButtons(pagesCount - maxBoundaryPagesVisible + 1, pagesCount);
    } else {
        // Display [first buttons], ... [middle buttons], ... [last buttons]
        addPageButtons(1, boundaryCount);
        addThreeDotsButtons('left-three-dots-pagination');
        const offset = (middleCount - 1) / 2;
        const start = page - Math.floor(offset);
        const end = page + Math.ceil(offset);
        addPageButtons(start, end);
        addThreeDotsButtons('right-three-dots-pagination');
        addPageButtons(pagesCount - boundaryCount + 1, pagesCount);
    }

    // Next button
    addNavigationButton('next-page-button', page < pagesCount, '>', nextPage);

    return (
        <div className='center'>
            <div className='pagination'>
                {paginationElements}
            </div>
        </div>
    );
}

export default Pagination