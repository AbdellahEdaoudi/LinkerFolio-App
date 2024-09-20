import React from "react";

function LUserList() {
  return (
    <section className="">
      <input
        type="search"
        placeholder="Search by Name or Email"
        className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white focus:outline-none"
      />
      {/* Users List */}
      <div className="text-lg  border-yellow-500 font-bold mb-4 sticky top-0 border-b py-1 text-white z-10">
          Friends
      </div>

      <div className="space-y-2 ">
      {[1,2,3,4,5,6].map((mp,i)=>{
        return(
          <div key={i} className="flex items-center gap-2 animate-pulse  bg-gray-400 p-2 md:p-1 rounded-md opacity-25">
        <div className="w-12 h-12 flex-shrink-0 bg-gray-500 rounded-full">
        </div>
        <div className="space-y-2">
          <p className="w-48 h-4 bg-gray-500 rounded-md"></p>
          <p className="w-44 h-3 bg-gray-500 rounded-md"></p>
        </div>
      </div>
        )
      })}
      </div>
    </section>
  );
}

export default LUserList;
