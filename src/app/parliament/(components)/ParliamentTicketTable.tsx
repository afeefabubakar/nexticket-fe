'use client';

import {
  FetchReturn,
  GetQuery,
  PaginatedParliamentTickets,
  ParliamentTickets,
} from '@/lib/types';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ParliamentEmptyState from './ParliamentEmptyState';
import ParliamentTableBottom from './ParliamentTableBottom';
import ParliamentTicketingPagination from './ParliamentTicketingPagination';
import { queriesBuilder } from '@/lib/utils';

const ParliamentTicketTable = ({
  ticketData,
}: {
  ticketData: FetchReturn<GetQuery<PaginatedParliamentTickets>>;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerCurrentPage, setRowsPerCurrentPage] = useState<number>(10);

  useEffect(() => {
    if (searchParams.has('page') && searchParams.has('per-page')) {
      setCurrentPage(parseInt(searchParams.get('page') as string));
      setRowsPerCurrentPage(parseInt(searchParams.get('per-page') as string));
    }
  }, [searchParams]);

  useEffect(() => {
    router.replace(
      `${pathname}${queriesBuilder(
        { page: currentPage, 'per-page': rowsPerCurrentPage },
        searchParams
      )}`
    );
  }, [currentPage, pathname, rowsPerCurrentPage, router, searchParams]);

  const handleRowClick = (ticketID: string) => {
    router.push(`${pathname}/${ticketID}`);
  };
  return (
    <table className='min-w-full '>
      <thead>
        <tr className='bg-baseBg'>
          <th
            scope='col'
            className='py-3.5 pl-4 pr-3 text-left text-body1  text-textSecondary sm:pl-6 md:pl-3'
          >
            ID
          </th>
          <th
            scope='col'
            className='py-3.5 px-3 text-left text-body1  text-textSecondary'
          >
            Requested on
          </th>
          <th
            scope='col'
            className='py-3.5 px-3 text-left text-body1  text-textSecondary'
          >
            Title
          </th>
          <th
            scope='col'
            className='py-3.5 px-3 text-left text-body1  text-textSecondary w-[150px]'
          >
            Status
          </th>
        </tr>
      </thead>
      <tbody className='divide-y divide-lineSecondary'>
        {/* normal state */}
        {ticketData.ok &&
          ticketData.data.data.data.map(
            (item: ParliamentTickets, index: number) => (
              <tr
                onClick={() => handleRowClick(`${item.id}`)}
                key={index}
                className='cursor-pointer'
              >
                <td className='whitespace-nowrap py-4 pl-4 pr-3 text-body1 text-textPrimary sm:pl-6 md:pl-3'>
                  {item.id}
                </td>
                <td className='whitespace-nowrap py-4 px-3 text-body1 text-textPrimary'>
                  {new Date(item.created_at).toString().split('GMT')[0]}
                </td>
                <td className='whitespace-nowrap py-4 px-3 text-body1 text-textPrimary'>
                  {item.title}
                </td>
                <td className='whitespace-nowrap py-4 px-3 text-body1 text-textPrimary flex items-center gap-2'>
                  <span>
                    {item.ticket_status === 'COMPLETED' && (
                      <div className='w-[10px] h-[10px] rounded-full bg-positive'></div>
                    )}
                    {item.ticket_status === 'PENDING' && (
                      <div className='w-[10px] h-[10px] rounded-full bg-warning'></div>
                    )}
                    {item.ticket_status === 'AWAITING_REPLY' && (
                      <div className='w-[10px] h-[10px] rounded-full bg-waitingColor'></div>
                    )}
                    {item.ticket_status === 'REJECTED' && (
                      <div className='w-[10px] h-[10px] rounded-full bg-negative'></div>
                    )}
                  </span>
                  <span>{item.ticket_status.split('_').join(' ')}</span>
                </td>
              </tr>
            )
          )}
        {/* error state */}
        {((ticketData.ok && ticketData.data.data.data.length === 0) ||
          !ticketData.ok) && (
          <tr>
            <td colSpan={4}>
              <ParliamentEmptyState />
            </td>
          </tr>
        )}
      </tbody>
      <tfoot>
        {ticketData.ok && ticketData?.data.data.data.length !== 0 && (
          <tr>
            <td colSpan={4}>
              <ParliamentTicketingPagination
                count={ticketData?.data.data.meta.total}
                lastPage={ticketData?.data.data.meta.lastPage}
                pages={currentPage}
                rows={rowsPerCurrentPage}
                setPages={setCurrentPage}
                setRows={setRowsPerCurrentPage}
                from={
                  ticketData?.data.data.meta.currentPage * rowsPerCurrentPage -
                  rowsPerCurrentPage +
                  1
                }
                to={
                  ticketData?.data.data.meta.currentPage ===
                  ticketData?.data.data.meta.lastPage
                    ? ticketData?.data.data.meta.total
                    : ticketData?.data.data.meta.currentPage *
                      rowsPerCurrentPage
                }
              />
            </td>
          </tr>
        )}
        {!ticketData.ok ||
          (ticketData.ok && ticketData.data.data.data.length === 0 && (
            <tr>
              <td colSpan={4}>
                <ParliamentTableBottom />
              </td>
            </tr>
          ))}
      </tfoot>
    </table>
  );
};

export default ParliamentTicketTable;
