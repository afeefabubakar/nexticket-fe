'use server';

import fetchNexticket from '@/lib/customFetch';

export const handleResponseCookies = (setCookie: string[]) => {
  if (setCookie.length > 0) {
    const { cookies } = require('next/headers');
    const cookieStore = cookies();

    setCookie.forEach((cookie: string) => {
      const cookieValue = cookie.split(';');

      const [tokenLabel, token] = cookieValue[0].split('=');
      const [, path] = cookieValue[1].split('=');
      const [, expires] = cookieValue[2].split('=');

      cookieStore.set(tokenLabel, token, {
        path,
        expires: new Date(expires),
        httpOnly: true,
        sameSite: 'strict',
      });

      cookieStore.set(`${tokenLabel}_expires`, expires, {
        path,
        expires: new Date(expires),
        httpOnly: true,
        sameSite: 'strict',
      });
    });
  }
};

export const refreshToken = async () => {
  const { cookies } = require('next/headers');
  const cookieStore = cookies();

  if (!cookieStore.has('refresh_token')) {
    return;
  }

  return await fetchNexticket('/auth/refresh', {
    useToken: false,
    method: 'POST',
    options: {
      headers: {
        Authorization: `Bearer ${cookieStore.get('refresh_token')?.value}`,
      },
    },
  });
};

export const logoutUser = async () => {
  const { cookies } = require('next/headers');
  const cookieStore = cookies();

  const response = await fetchNexticket('/auth/logout', {
    options: { cache: 'no-store' },
  });
  

  if (!response.ok) {
    return response;
  }

  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');
  return response;
};