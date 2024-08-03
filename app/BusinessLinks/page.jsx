'use client';
import React, { useContext, useState, useEffect } from 'react';
import { CirclePlus, Link, X } from 'lucide-react';
import { MyContext } from '../Context/MyContext';
import axios from 'axios';
import { toast } from "sonner";

function EditUserLinks() {
  const { SERVER_URL, EmailUser,userDetails} = useContext(MyContext);
  const [user,setUser]=useState("")
  useEffect(()=>{
    const filt = userDetails.find(fl=>fl.email === EmailUser)
    setUser(filt)
  },[])
  const [userLinks, setUserLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [loadingt, setLoadingt] = useState(false);
  const [namelink, setNamelink] = useState('');
  const [link, setLink] = useState('');
  const [Add, setAdd] = useState(true);

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/links`)
      .then((res) => {
        const links = res.data;
        const sortedLinks = links.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setUserLinks(sortedLinks);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [SERVER_URL]);

  useEffect(() => {
    if (userLinks) {
      setLoading(false);
    }
  }, [userLinks]);

  const AddLink = async (e) => {
    e.preventDefault();
    setLoadingt(true);

    try {
      const response = await axios.post(`${SERVER_URL}/links`, {
        useremail: EmailUser,
        namelink,
        link
      });
      console.log('Link added:', response.data);
      setUserLinks(Links => [response.data.data, ...Links]);
      toast("Link added successfully!");
      setTimeout(() => setMessage(""), 2000);
      setLink('');
      setNamelink('');
    } catch (error) {
      console.error('There was an error adding the link!', error);
      setMessage('Failed to add link.');
    } finally {
      setLoadingt(false);
    }
  };

  return (
    <div className={`${user.bgcolorp} pt-4 pb-96 flex justify-center`}>
      {/* UserLinks */}
      <section className='p-4 rounded-lg bg-gray-100 w-[700px] mx-3 text-gray-800'>
        <div className='flex items-center justify-around mb-4'>
          <p className='text-3xl font-semibold text-gray-900'>Links</p>
          <p onClick={() => setAdd(!Add)} className='border p-2 rounded-full cursor-pointer bg-gradient-to-r from-teal-500 to-teal-700 text-white'>
            {Add ? <CirclePlus /> : <X />}
          </p>
        </div>
        {/* Add Links */}
        <div className={`${Add ? "opacity-0 max-h-0" : "max-h-48"} overflow-hidden transition-all duration-500 max-w-md mx-auto p-4 bg-white rounded-lg `}>
          <form onSubmit={AddLink} className="space-y-4">
            <div>
              <input
                type="text"
                value={namelink}
                onChange={(e) => setNamelink(e.target.value)}
                required
                placeholder='URL Name'
                className="mt-1 w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              />
            </div>
            <div>
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
                placeholder='URL'
                className="mt-1 bg-gray-50 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              />
            </div>
            <button
              disabled={loadingt}
              type="submit"
              className="w-full bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition duration-300"
            >
              {loadingt ? <><i className="fa fa-spinner fa-spin"></i></> : "Add Link"}
            </button>
          </form>
        </div>
        {message && <p className="mt-4 text-green-600 text-center">{message}</p>}
        {/* Links */}
        <div className='p-2 space-y-3'>
          {loading ? (
            <p className="flex bg-white justify-center py-28 items-start text-8xl">
              <i className="fa fa-spinner fa-spin"></i>
            </p>
          ) :
            userLinks
              .filter(fl => fl.useremail === EmailUser)
              .map((lnk, i) => (
                <a href={lnk.link} target='_blank' key={i} className='flex border border-gray-300 shadow-md duration-300 hover:bg-gray-50 pl-4 items-center gap-4 rounded-lg p-2'>
                  <p className='p-2 border border-gray-300 rounded-full text-teal-600'>
                    <Link />
                  </p>
                  <p className='whitespace-nowrap'>{lnk.namelink}</p>
                </a>
              ))
          }
        </div>
      </section>
    </div>
  );
}

export default EditUserLinks;
