import GenerateApikey from './GenerateApikey';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'nexticket | Settings',
};

const Settings = () => {
  return (
    <div>
      <h1 className='tw-mb-8'>Settings</h1>

      <div className='tw-space-y-3'>
        <hr />
        <GenerateApikey />
        <hr />
      </div>
    </div>
  );
};

export default Settings;