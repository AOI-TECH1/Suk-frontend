import { Outlet } from 'react-router-dom';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer'; // Import here

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow bg-gray-50">
        <Outlet />
      </main>
      <Footer /> 
    </div>
  );
};

export default MainLayout;