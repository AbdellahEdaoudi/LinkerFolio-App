"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TranslatedPage() {
  const [userDetailsG, setUserDetailsG] = useState(null);
  const [language, setLanguage] = useState(''); // Default language
  const [translatedDetails, setTranslatedDetails] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const {CLIENT_URL,SERVER_URL_V,userLinks,EmailUser}=useContext(MyContext);

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true); // Set loading true when starting to fetch data
      try {
        const response = await axios.get(`${SERVER_URL_V}/user/abdellah_edaoudi`);
        setUserDetailsG(response.data);
        // Translate content
        await translateContent({
          profile : "skills",
          bio: response.data.bio,
          services: response.data.services,
          education: response.data.education,
          skills: response.data.skills,
          languages: response.data.languages,
          experience: response.data.experience,
          country: response.data.country,
          category: response.data.category
        }, language);
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false); // Set loading false after fetching
      }
    };
    fetchUserDetails();
  }, [SERVER_URL_V, language]); // Re-fetch user details when language changes

  // Translate content
  const translateContent = async (content, lang) => {
    try {
      const response = await axios.post(`${SERVER_URL_V}/translate`, {
        textObject: content,
        to: lang
      });
      setTranslatedDetails(response.data.translations);
    } catch (error) {
      console.error('Error translating content:', error);
    }
  };


  return (
    <div className='bg-gray-50 p-6 rounded-lg shadow-lg max-w-3xl mx-auto'>
      <h1 className='text-4xl font-bold mb-4 text-center text-gray-800'>User Profile</h1>
      
      <label htmlFor="language-select" className='block text-lg font-medium mb-4 text-gray-700'>
        Choose Language:
      </label>
      <select
        className='bg-white border border-gray-300 rounded-md p-2 text-lg mb-6 w-full'
        id="language-select"
        value={language}
        onChange={(e)=>{setLanguage(e.target.value);}}
      >
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="zh-CN">Chinese CN</option>
        <option value="zh-TW">Chinese TW</option>
        <option value="hi">Hindi</option>
      </select>

      {loading ? (
        <div className='flex items-center justify-center'>
          <div className='w-12 h-12 border-4 border-gray-200 border-t-transparent border-solid rounded-full animate-spin'></div>
        </div>
      ) : (
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-2xl font-semibold mb-4'>Details</h2>
          <div>
            Ta
            <h1>{translatedDetails ? translatedDetails.profile : "ma khadamch"}</h1>
          </div>
          <div className='space-y-6'>
            {(translatedDetails || userDetailsG) && (
              <>
                {Object.entries(translatedDetails || userDetailsG).map(([key, value]) => (
                  (key === 'bio' || key === 'services' || key === 'education' || key === 'skills' || key === 'languages' || key === 'experience' || key === 'country' || key === 'category') && (
                    <div key={key} className='p-4 border border-gray-300 rounded-lg bg-gray-50'>
                      <h3 className='text-xl font-medium text-gray-800 capitalize'>{key}:</h3>
                      <p className='text-gray-600'>{value}</p>
                    </div>
                  )
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TranslatedPage;
