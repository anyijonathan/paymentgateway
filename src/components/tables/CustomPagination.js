import "./index.css";
import { Pagination } from "@mui/material";

const CustomPagination = (props) => {
  const handleChangePage = (event, newPage) => {
    props.paginationHandler(newPage);
  };
  const prevHandler = () => {
    props.paginationHandler(props.page - 1);
  };

  const nextHandler = () => {
    props.paginationHandler(props.page + 1);
  };

  return (
    <div className="custom-pagination">
      <button
        disabled={props.page === 1}
        className="prev-button"
        onClick={prevHandler}
      >
        Previous
      </button>
      <Pagination
        className="numbering"
        color="primary"
        count={props.totalPages}
        page={props.page}
        onChange={handleChangePage}
        hidePrevButton
        hideNextButton
      />
      <button
        disabled={props.page === props.totalPages}
        className="next-button"
        onClick={nextHandler}
      >
        Next
      </button>
    </div>
  );
};

export default CustomPagination;
