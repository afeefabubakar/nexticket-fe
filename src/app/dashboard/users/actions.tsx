'use server';
import fetchNexticket from '@/lib/customFetch';
import { revalidateTag } from 'next/cache';

export const inviteMembers = async (memberList: {
  email: string;
  role: string;
}) => {
  revalidateTag('pending-members');
  return await fetchNexticket('/organization/invite-member', {
    method: 'POST',
    body: { memberList },
    options: {
      cache: 'no-store',
    },
  });
};

export const getPendingMembers = async () => {
  return await fetchNexticket(
    '/organization/members?is-verified=false&fields=email&order-email=asc',
    {
      options: {
        next: {
          tags: ['pending-members'],
        },
      },
    }
  );
};