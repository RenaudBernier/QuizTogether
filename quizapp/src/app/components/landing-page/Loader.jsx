import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center flex-col gap-4 z-50 bg-black bg-opacity-50">
      <div className="w-16 h-16 border-4 border-t-4 border-gray-300 border-t-indigo-500 rounded-full animate-spin"></div>
      <h4 className='text-black bg-white py-2 px-4 rounded-xl'>Please wait while we set everything up for you :)</h4>
    </div>
  );
};

export default Loader;