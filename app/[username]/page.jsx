import React from 'react'
import GetUserByUsername from './GetUserByUsername';

export async function generateMetadata({ params }) {
      const SERVER_URL = "https://linkerfolio-server.vercel.app";
      // const SERVER_URL = "http://localhost:9999";
  try {

    const response = await fetch(`${SERVER_URL}/user/${params.username}`, {
      next: {
        revalidate: 60 * 10,
      },
    });
    
    const user = await response.json();

    return {
      title: `${user.fullname ? `${user.fullname} | LinkerFolio` : `LinkerFolio`}`,
      description: user.bio,
      // icons: {
      //   icon: user.urlimage,
      // },
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return {
      title: 'ChatFlow',
      description: 'Failed to fetch user data',
    };
  }
}

function page({params}) {
  return (
    <div>
      <GetUserByUsername params={params} />
    </div>
  )
}

export default page