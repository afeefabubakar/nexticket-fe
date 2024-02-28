'use client';

import { ColumnDef } from '@tanstack/react-table';
import DataTable from '@/components/shared/DataTable';
import { FetchReturn } from '@/lib/customFetch';
import { OrganizationMember } from '@/lib/types';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const MembersTable = ({
  fetchMembersResponse,
  MembersColumn,
}: {
  fetchMembersResponse: FetchReturn;
  MembersColumn: ColumnDef<OrganizationMember>[];
}) => {
  if (!fetchMembersResponse.ok) {
    return (
      <div className='flex flex-col gap-2'>
        <Skeleton className='w-full h-12' />
        <Skeleton className='w-full h-12' />
        <Skeleton className='w-full h-12' />
      </div>
    );
  }
  return (
    <DataTable columns={MembersColumn} data={fetchMembersResponse.data.data} />
  );
};

export default MembersTable;
