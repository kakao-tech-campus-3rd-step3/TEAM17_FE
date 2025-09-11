import React from 'react';
import Banner from '@/pages/banner/Banner';
import Category from '@/pages/category/Category';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-4 space-y-3">
        <Banner />
        <Category />
      </main>
    </div>
  );
};

export default HomePage;
