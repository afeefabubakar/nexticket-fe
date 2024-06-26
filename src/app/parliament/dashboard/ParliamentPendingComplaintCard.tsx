import { FaRegFlag } from 'react-icons/fa';
import Link from 'next/link';
import React from 'react';
import { getTicketsSummary } from './api';

const ParliamentPendingComplaintCard = async ({
  searchParams,
}: {
  searchParams: { period_end?: string };
}) => {
  const ticketSummary = await getTicketsSummary(searchParams.period_end || '');

  return (
    <div className='border w-1/2 rounded'>
      <div className='w-full flex items-center justify-between px-6 py-4'>
        <div className='flex flex-col gap-4'>
          <div>Pending complaint</div>
          <div>
            {(ticketSummary?.ok &&
              ticketSummary.data.data.complaint?.total_awaiting_reply_count) ||
              0}
          </div>
        </div>
        <div className='w-[64px] h-[64px] rounded-full flex items-center justify-center'>
          <FaRegFlag
            size={24}
            className='text-warning'
          />
        </div>
      </div>
      <div className='w-full flex items-center justify-center border-t border-lineSecondary py-4'>
        <Link href='/parliament/complaint?status=AWAITING_REPLY'>
          <div className='text-primary underline cursor-pointer text-sub1 hover:text-primaryHover'>
            View all
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ParliamentPendingComplaintCard;
