'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { refreshToken } from '@/app/(auth)/actions';

export interface IAccessContext {
  openAccessExpired: boolean;
  // eslint-disable-next-line
  setOpenAccessExpired: (value: React.SetStateAction<boolean>) => void;
}

export const AccessContext = React.createContext({} as IAccessContext);

const AccessExpired = ({
  open,
  message = '',
  children,
}: {
  open: boolean;
  message?: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const [openAccessExpired, setOpenAccessExpired] =
    React.useState<boolean>(false);
  const [refreshTokenError, setRefreshTokenError] = React.useState<string>('');
  const handleRefreshToken = async () => {
    const response = await refreshToken();
    setOpenAccessExpired(!response.ok);
    if (!response.ok) {
      setRefreshTokenError(response.data.message);
    }
  };

  // Dialog can only appear after the component is mounted to prevent hydration error.
  React.useEffect(() => {
    if (/not verified/g.test(message)) {
      router.replace('/verify?email=' + message.split(' ')[0]);
      return;
    }
    setOpenAccessExpired(open);
  }, [router, message, open]);

  return (
    <Dialog open={openAccessExpired}>
      <DialogContent disableClose className='!tw-z-index-99'>
        <DialogHeader>
          <DialogTitle>Access Expired</DialogTitle>
          <DialogDescription>
            {refreshTokenError
              ? 'Failed to refresh token, please try to login again'
              : 'Your access has expired, please refresh your token'}
          </DialogDescription>
        </DialogHeader>
        {refreshTokenError && (
          <p className='tw-text-red-500'>{refreshTokenError}</p>
        )}

        {refreshTokenError ? (
          <Button
            asChild
            onClick={() =>
              pathname === '/login' ? setOpenAccessExpired(false) : null
            }
          >
            <Link replace href={'/login'}>
              Login
            </Link>
          </Button>
        ) : (
          <Button onClick={handleRefreshToken}>Refresh</Button>
        )}
      </DialogContent>

      <AccessContext.Provider
        value={{ openAccessExpired, setOpenAccessExpired }}
      >
        {children}
      </AccessContext.Provider>
    </Dialog>
  );
};

export default AccessExpired;
