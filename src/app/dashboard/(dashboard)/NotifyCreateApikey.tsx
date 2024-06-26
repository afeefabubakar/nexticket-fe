'use client';

import {
  AccessContext,
  IAccessContext,
} from '@/components/providers/AccessContextProvider';
import React, { useContext, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { X } from 'lucide-react';

const NotifyCreateApikey = () => {
  const { userData } = useContext<IAccessContext>(AccessContext);

  const localShowNotify: string | null = window.localStorage.getItem(
    `nexticket-showNotifyApikey-${userData?.id}`
  );
  const [showNotify, setShowNotify] = useState<boolean>(
    localShowNotify === null ? true : localShowNotify === 'true'
  );

  const handleDontShowAgain = () => {
    setShowNotify(false);
    window.localStorage.setItem(
      `nexticket-showNotifyApikey-${userData?.id}`,
      'false'
    );
  };

  return (
    showNotify && (
      <section className='max-w-3xl mb-8 mx-auto relative flex flex-col gap-2 rounded-2xl border border-border p-4 bg-secondary/15'>
        <Button
          variant={'ghost'}
          onClick={() => setShowNotify(false)}
          className='absolute top-3 right-3 !p-1 h-auto hover:bg-inherit'
        >
          <X aria-label='Close reminder to create API key' />
        </Button>
        <h5>Generate your API key</h5>
        <p>
          If this is your first time using nexticket, you will need to create an
          API key which is required to access the nexticket&apos;s API.
        </p>
        <p>
          You can find the settings under the &quot;Settings&quot; tab after
          clicking on your profile image in the top right corner or you can{' '}
          <Link
            href='/dashboard/settings'
            className='text-link'
          >
            click here
          </Link>
          .
        </p>

        <div>
          <Button
            variant={'outline'}
            onClick={handleDontShowAgain}
            className='mt-4 whitespace-pre-line shrink self-end'
          >
            I understand, don&apos;t show again
          </Button>
          <Button
            asChild
            className='mt-4 whitespace-pre-line shrink self-end'
          >
            <Link href='/dashboard/settings'>Create API Key</Link>
          </Button>
        </div>
      </section>
    )
  );
};

export default NotifyCreateApikey;
