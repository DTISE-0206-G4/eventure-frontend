import { FC } from "react";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TransactionsRequest } from "@/types/transaction";
interface PaginationProps {
  paginationParams: TransactionsRequest;
  page: number;
  totalPage: number;
  sendDataToParent: (params: TransactionsRequest) => void;
  setPage: (page: number) => void;
}
const Pagination: FC<PaginationProps> = ({
  paginationParams,
  page,
  totalPage,
  sendDataToParent,
  setPage,
}) => {
  //   const { isLoading, error, transactions, params, setParams } = useTransactions(
  //     accessToken,
  //     paginationParams
  //   );

  //   if (isLoading) return <div>Loading...</div>;
  //   if (error || !transactions) return <div>Error</div>;

  const renderedItems = [];
  const handleClick = (page: number) => {
    const newParams = {
      ...paginationParams,
      start: (page - 1) * paginationParams.length,
    };
    sendDataToParent(newParams);
    setPage(page);
  };
  const handlePrevClick = () => {
    if (page > 1) {
      handleClick(page - 1);
    }
  };
  const handleNextClick = () => {
    if (page < totalPage) {
      handleClick(page + 1);
    }
  };

  for (let i = 0; i < totalPage; i++) {
    if (i == page - 1) {
      const item = (
        <a
          onClick={() => handleClick(i + 1)}
          href="#"
          aria-current="page"
          className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
        >
          {i + 1}
        </a>
      );
      renderedItems.push(<li key={i}>{item}</li>);
    } else {
      const item = (
        <a
          onClick={() => handleClick(i + 1)}
          href="#"
          aria-current="page"
          className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-slate-gray  bg-white border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
        >
          {i + 1}
        </a>
      );
      renderedItems.push(<li key={i}>{item}</li>);
    }
  }

  return (
    <>
      <li>
        <a
          onClick={handlePrevClick}
          href="#"
          className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Previous</span>
          <FontAwesomeIcon
            className="w-[15px] h-[15px] shrink-0 text-slate-gray"
            icon={faChevronLeft}
          />
        </a>
      </li>
      {renderedItems}
      <li>
        <a
          onClick={handleNextClick}
          href="#"
          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Next</span>
          <FontAwesomeIcon
            className="w-[15px] h-[15px] shrink-0 text-slate-gray"
            icon={faChevronRight}
          />
        </a>
      </li>
    </>
  );
};

export default Pagination;
