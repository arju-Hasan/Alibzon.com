import React from 'react';
import Home from '../Home/Home/Home';
import Navbar from '../Component/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Component/Footer/Footer';

const RootLayout = () => {
    return (
       <div className='min-h-screen flex flex-col'>
        <Navbar />

        {/* Main content */}
        <main className='flex-grow'>
          <Outlet />
        </main>

        <Footer />
      </div>
    );
};

export default RootLayout;