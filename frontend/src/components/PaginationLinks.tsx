// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import { IMeta, ILink } from "../modals/modal";

interface IMetaProps {
  onPageClick: (link: ILink) => void;
  meta: IMeta;
}
const PaginationLinks: React.FC<IMetaProps> = ({meta, onPageClick}) => {

  const onClick = (e: React.FormEvent, link: ILink) => {
    e.preventDefault();
    if (link.url === null) return;
    onPageClick(link);
  }
  return (
    <>
      <div className="flex items-center justify-between border-gray-200 bg-white px-4 py-3 sm:px-6 shadow-md mt-4">
        <div className="flex flex-1 justify-between sm:hidden">
          <a
            onClick={e => onClick(e, meta.links[0])}
            href="#"
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            onClick={e => onClick(e, meta.links[meta.links.length - 1])}
            href="#"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{meta?.from}</span> to <span className="font-medium">{meta?.to}</span> of{' '}
              <span className="font-medium">{meta?.total}</span> results
            </p>
          </div>
          <div>
            <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-xs">
              {meta?.links.map((link, index) => {
                return (
                  <a
                    href="#"
                    className={
                      `relative inline-flex items-center px-4 py-2 text-sm focus:z-20 font-semibold ${link?.active ? 'z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' : 'ring-gray-300 ring-inset hover:bg-gray-50 focus:outline-offset-0'} text-gray-900 ring-1` + (index === 0 ? ' rounded-l-md' : '') + (index === meta.links.length - 1 ? ' rounded-r-md' : '')
                    }
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    onClick={e => onClick(e, link)}
                    key={index}
                  >
                  </a>
                )
              })}
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaginationLinks;