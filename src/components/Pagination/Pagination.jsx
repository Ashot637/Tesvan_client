import React from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import './pagination.scss';
import { setPage } from '../../redux/slices/devicesSlice';

const Pagination = () => {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.devices);

  return (
    <ReactPaginate
      className="pagination"
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => dispatch(setPage(e.selected + 1))}
      pageRangeDisplayed={2}
      pageCount={2}
      previousLabel="<"
      forcePage={page - 1}
    />
  );
};

export default Pagination;
