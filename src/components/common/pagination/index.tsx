import { MouseEventHandler } from 'react';
import style from './Pagination.module.scss';

export type PaginationProps = {
    nextAction: MouseEventHandler<HTMLButtonElement>;
    prevAction: MouseEventHandler<HTMLButtonElement>;
    currentPage: number;
    totalPages: number;
}

export function Pagination(props: PaginationProps) {
  const { nextAction, prevAction, currentPage, totalPages } = props;

  return (
    <div className="text-center space-x-2">
      <button type="button" className={style.button} onClick={prevAction} disabled={currentPage === 1}>Prev</button>
      <span>{currentPage} of {totalPages}</span>
      <button type="button" className={style.button} onClick={nextAction} disabled={currentPage >= totalPages}>Next</button>
    </div>
  );
}
