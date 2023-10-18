import './App.css';
import { useState, useContext } from 'react';
import Pagination from './components/Pagination'
import { PaginationContext, PaginationContextProvider } from './components/PaginationContext';

function PageStatus() {
  const { page, setPage } = useContext(PaginationContext);

  return (
    <p className='center'>
      Page: {page}
    </p>
  );
}

function App() {
  const [pageSize, setPageSize] = useState(15);
  const [boundaryCount, setBoundaryCount] = useState(2);
  const [middleCount, setMiddleCount] = useState(5);
  const [totalElementsCount, setTotalElementsCount] = useState(1500);

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max); 

  return (
    <PaginationContextProvider>
      <PageStatus />
      <div className='paginationForm'>
        <form id='paginationForm'>
          <div>
            <label htmlFor='middleCount'>middleCount:</label>
            <input id="middleCount" type="number" min="3" max="10" value={middleCount} onChange={e => setMiddleCount(clamp(e.target.value, 3, 10))} />
          </div>
          <div>
            <label htmlFor='boundaryCount'>boundaryCount:</label>
            <input id='boundaryCount' type="number" min="2" max="10" value={boundaryCount} onChange={e => setBoundaryCount(clamp(e.target.value, 2, 10))} />
          </div>
          <div>
            <label htmlFor='pageSize'>pageSize:</label>
            <input id='pageSize' type="number" min="1" value={pageSize} onChange={e => setPageSize(Math.max(e.target.value, 1))} />
          </div>
          <div>
            <label htmlFor='totalElementsCount'>totalElementsCount:</label>
            <input id='totalElementsCount' type="number" min="1" value={totalElementsCount} onChange={e => setTotalElementsCount(Math.max(e.target.value, 1))} />
          </div>
        </form>
      </div>
      <Pagination pageSize={pageSize} totalElementsCount={totalElementsCount} boundaryCount={boundaryCount} middleCount={middleCount} /> 
    </PaginationContextProvider>
  );
}

export default App;
