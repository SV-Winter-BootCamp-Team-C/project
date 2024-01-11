import Navbar from '@/components/common/Navbar';

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex items-center justify-center p-16 bg-custom-gradient">
      <Navbar>{children}</Navbar>
    </div>
  );
}

export default MainLayout;
