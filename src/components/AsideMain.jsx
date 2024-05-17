import React, { useState } from "react";

const AsideMain = ({}) => {
  return (
    <aside class="h-screen w-16 flex flex-col space-y-10 items-center justify-center relative bg-gray-500 text-white">
      <div class="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
        <svg
          focusable="false"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class=" NMm5M"
        >
          <path d="M12 3L4 9v12h16V9l-8-6zm6 16h-3v-6H9v6H6v-9l6-4.5 6 4.5v9z"></path>
        </svg>{" "}
      </div>

      <div class="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
        <svg
          focusable="false"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class=" NMm5M"
        >
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"></path>
        </svg>{" "}
      </div>

      <div class="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
        <svg
          focusable="false"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class=" NMm5M"
        >
          <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"></path>
        </svg>
      </div>
    </aside>
  );
};

export default AsideMain;
