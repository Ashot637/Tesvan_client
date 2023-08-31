import React, { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import './pagination.scss';
import { setPage } from '../../redux/slices/devicesSlice';

const Pagination = () => {
  const dispatch = useDispatch();
  const { brandId, activeFilters, minPrice, page, maxPrice, pagination } = useSelector(
    (state) => state.devices,
  );

  useEffect(() => {
    if (page !== 1) {
      dispatch(setPage(1));
    }
  }, [brandId, activeFilters, minPrice, maxPrice]);

  return (
    <>
      {!!pagination && (
        <ReactPaginate
          className="pagination"
          breakLabel="..."
          nextLabel=">"
          onPageChange={(e) => {
            window.scrollTo({
              top: 100,
              behavior: 'smooth',
            });
            dispatch(setPage(e.selected + 1));
          }}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          pageCount={10}
          previousLabel="<"
          forcePage={page - 1}
        />
      )}
    </>
  );
};

export default Pagination;
