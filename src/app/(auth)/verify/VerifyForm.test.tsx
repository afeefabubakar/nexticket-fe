import { render, screen } from '@testing-library/react';
import { AppRouterContextProviderMock } from '@/components/test/RouterContextProviderMock';
import VerifyForm from './VerifyForm';
import { useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => {
  return {
    ...jest.requireActual('next/navigation'),
    useSearchParams: jest.fn(),
  };
});
(useSearchParams as jest.Mock).mockReturnValue({ has: jest.fn() });

describe('VerifyForm', () => {
  it('should render with correct fields', () => {
    const push = jest.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <VerifyForm />
      </AppRouterContextProviderMock>
    );

    const tokenInput = screen.getByPlaceholderText('Please enter your token');

    expect(tokenInput).toBeInTheDocument();
  });

  it('should render with correct labels', () => {
    const push = jest.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <VerifyForm />
      </AppRouterContextProviderMock>
    );

    const tokenLabel = screen.getByText('Token');

    expect(tokenLabel).toBeInTheDocument();
  });

  it('should have a submit button', () => {
    const push = jest.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <VerifyForm />
      </AppRouterContextProviderMock>
    );

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  });
});
