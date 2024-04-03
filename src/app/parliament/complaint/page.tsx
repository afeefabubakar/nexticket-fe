import { FetchReturn, GetQuery, PaginatedParliamentTickets } from '@/lib/types';
import { STATUS_OPTIONS, TIME_OPTIONS } from '@/lib/constants';
import ParliamentFilter from '../(components)/ParliamentFilter';
import ParliamentSearch from '../(components)/ParliamentSearch';
import ParliamentTicketTable from '../(components)/ParliamentTicketTable';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';
import { getComplaintTickets } from './api';

export default async function Complaint({
  searchParams,
}: {
  searchParams: {
    period_end?: string;
    status?: string;
    search?: string;
    page?: number;
    'per-page'?: number;
  };
}) {
  const complaintTickets: FetchReturn<GetQuery<PaginatedParliamentTickets>> =
    await getComplaintTickets({
      perPage: searchParams['per-page'],
      ...searchParams,
    });

  return (
    <div>
      <h4>Complaint</h4>

      <main className='flex  flex-col items-center justify-between py-16 '>
        <div className='w-full'>
          <div className='flex items-center justify-between'>
            <div className='flex gap-4'>
              <Suspense fallback={<Skeleton className='w-full h-[6.5rem]' />}>
                <ParliamentFilter
                  paramKey='status'
                  options={STATUS_OPTIONS}
                />
              </Suspense>
              <Suspense fallback={<Skeleton className='w-full h-[6.5rem]' />}>
                <ParliamentFilter
                  paramKey='period_end'
                  options={TIME_OPTIONS}
                />
              </Suspense>
            </div>
            <Suspense>
              <ParliamentSearch />
            </Suspense>
          </div>
          <div className='mt-8 flex flex-col overflow-x-hidden'>
            <div className=' sm:-mx-6 lg:-mx-8'>
              <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                <Suspense fallback={<Skeleton className='w-full h-full' />}>
                  <ParliamentTicketTable ticketData={complaintTickets} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
