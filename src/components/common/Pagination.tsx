import { Button } from "@headlessui/react";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/16/solid";

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  itemsPerPage: number;
  items: any[];
}

export function Pagination({
  page,
  setPage,
  itemsPerPage,
  items,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center space-x-4">
      <Button
        className="btn btn-primary btn-square btn-xs"
        onClick={() => setPage(1)}
        disabled={page === 1}
        title="First Page"
      >
        <ChevronDoubleLeftIcon className="size-2/3" />
      </Button>
      <Button
        className="btn btn-primary btn-square btn-xs"
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page === 1}
        title="Previous Page"
      >
        <ChevronLeftIcon className="size-2/3" />
      </Button>
      <span className="text-base">{page}</span>
      <Button
        className="btn btn-primary btn-square btn-xs"
        onClick={() => setPage(page + 1)}
        disabled={page === Math.ceil(items.length / itemsPerPage)}
        title="Next Page"
      >
        <ChevronRightIcon className="size-2/3" />
      </Button>
      <Button
        className="btn btn-primary btn-square btn-xs"
        onClick={() => setPage(Math.ceil(items.length / itemsPerPage))}
        disabled={page === Math.ceil(items.length / itemsPerPage)}
        title="Last Page"
      >
        <ChevronDoubleRightIcon className="size-2/3" />
      </Button>
    </div>
  );
}
