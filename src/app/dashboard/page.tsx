import { FetchReturn } from '@/lib/customFetch';
import { Metadata } from 'next';
import PageTitle from '@/components/shared/PageTitle';
import TicketPriority from './(dashboard)/TicketPriority';
import TicketTotal from './(dashboard)/TicketTotal';
import TicketTypes from './(dashboard)/TicketTypes';
import dynamic from 'next/dynamic';
import { getTickets } from './actions';

const NotifyCreateApikey = dynamic(
  () => import('./(dashboard)/NotifyCreateApikey'),
  {
    ssr: false,
  }
);

export const metadata: Metadata = {
  title: 'nexticket | Dashboard',
};

const Dashboard = async () => {
  const getTicketsResponse: FetchReturn = await getTickets();

  return (
    <>
      <PageTitle title='Dashboard' />

      <NotifyCreateApikey />
      <div className='tw-flex tw-flex-col tw-gap-2 tw-flex-wrap'>
        <TicketTotal getTicketsResponse={getTicketsResponse} />
        <div className='tw-flex tw-flex-col md:tw-flex-row tw-gap-2'>
          <TicketTypes getTicketsResponse={getTicketsResponse} />
          <TicketPriority getTicketsResponse={getTicketsResponse} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
