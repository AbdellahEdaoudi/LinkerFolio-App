import React, { useContext } from 'react';
import { MyContext } from '../Context/MyContext';

function UserLinks() {
  const { userLinks, EmailUser } = useContext(MyContext);

  return (
    <div className="flex flex-col gap-4 p-4 max-w-4xl mx-auto">
      {userLinks
        .filter(fl => fl.useremail === EmailUser)
        .map((lnk, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-6 hover:bg-gray-100 transition duration-300">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{lnk.namelink}</h3>
            <a href={lnk.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {lnk.link}
            </a>
          </div>
        ))}
    </div>
  );
}

export default UserLinks;
