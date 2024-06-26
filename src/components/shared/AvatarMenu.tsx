'use client';

import {
  AccessContext,
  IAccessContext,
} from '../providers/AccessContextProvider';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useContext, useState } from 'react';
import { Button } from '../ui/button';
import ConfirmLogout from './ConfirmLogout';
import Link from 'next/link';
import ThemeButton from './ThemeButton';
import { cn } from '@/lib/utils';

const AvatarMenu = ({ className }: { className?: string }) => {
  const { userData } = useContext<IAccessContext>(AccessContext);
  const [confirmingLogout, setConfirmingLogout] = useState(false);

  return (
    <>
      <ConfirmLogout open={confirmingLogout} setOpen={setConfirmingLogout} />
      <Popover>
        <PopoverTrigger
          data-testid='avatar-menu'
          className={cn('hover:cursor-pointer', className)}
          asChild
        >
          <Avatar>
            <AvatarImage src='' /> {/* TODO: add user avatar */}
            <AvatarFallback className='bg-secondary'>
              {userData?.username?.slice(0, 1).toUpperCase() || '?'}
            </AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className='relative'>
          <span className='inline-block text-sm max-w-52'>
            {userData?.username || 'Not found'}{' '}
          </span>

          {userData?.role !== 'PARLIAMENT_ADMIN' && (
            <ThemeButton
              variant='ghost'
              className='absolute top-4 right-4 !p-0.5 h-auto'
            />
          )}

          <hr className='my-2' />
          <nav className='flex flex-col gap-1'>
            <Button variant={'ghost'} asChild>
              <Link
                href={`${
                  userData?.role === 'PARLIAMENT_ADMIN' ? '/parliament' : ''
                }/dashboard/settings`}
              >
                Settings
              </Link>
            </Button>
            <Button variant={'ghost'} asChild>
              <Link
                href={`${
                  userData?.role === 'PARLIAMENT_ADMIN' ? '/parliament' : ''
                }/dashboard/account`}
              >
                Account
              </Link>
            </Button>
            <Button
              variant={'destructive'}
              onClick={() => setConfirmingLogout(true)}
            >
              Logout
            </Button>
          </nav>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default AvatarMenu;
