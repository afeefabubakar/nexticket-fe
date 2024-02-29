import AvatarMenu from '@/components/shared/AvatarMenu';
import ParliamentSideBar from './(root)/ParliamentSideBar';

const ParliamentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex bg-white'>
      <ParliamentSideBar />
      <main className='w-[calc(100vw-200px)] px-[24px] py-[16px] overflow-y-auto'>
        {children}
      </main>
      <AvatarMenu className='!absolute top-4 right-6' />
    </div>
  );
};

export default ParliamentLayout;
