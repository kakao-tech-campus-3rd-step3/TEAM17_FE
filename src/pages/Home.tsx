import React from 'react';
import Banner from '@/components/banner/Banner';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-4 space-y-3">
        <Banner />
      </main>
    </div>
  );
};

export default HomePage;
