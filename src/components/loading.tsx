import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-8 border-gray-900 border-solid border-t-transparent"></div>
    </div>
  );
};

export default Loader;
