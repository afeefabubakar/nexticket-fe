import { getOrganization, getUserAccount } from '@/app/dashboard/actions';
import AccessContextProvider from './AccessContextProvider';
import AccessExpiredProvider from './AccessExpiredProvider';
import OrganizationContextProvider from './OrganizationContextProvider';
import React from 'react';

const Providers = async ({ children }: { children: React.ReactNode }) => {
  const getUserAccountResponse = await getUserAccount();
  const getOrganizationResponse = getUserAccountResponse.data.data
    ?.organization_id
    ? await getOrganization()
    : { ok: false, data: null };

  return (
    <AccessContextProvider userAccountRes={getUserAccountResponse}>
      <AccessExpiredProvider
        open={
          !getUserAccountResponse.ok &&
          getUserAccountResponse.data.statusCode === 401
        }
      >
        <OrganizationContextProvider organizationRes={getOrganizationResponse}>
          {children}
        </OrganizationContextProvider>
      </AccessExpiredProvider>
    </AccessContextProvider>
  );
};

export default Providers;
