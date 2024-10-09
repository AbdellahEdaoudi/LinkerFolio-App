'use client';
import React, { useContext, useState, useEffect } from 'react';
import {Link, X, Edit3, Trash2 } from 'lucide-react';
import { MyContext } from '../Context/MyContext';
import axios from 'axios';
import { toast } from "sonner";
import CreateProfile from '../Components/CreateProfile';
import LoadChatPage from '../Components/Loading/LoadChatPage/LoadChatPage';
import ParticleComponent  from "../Components/ParticleComponent"
import DOMPurify from 'dompurify';
import WarningModal from "./Pages/WarningModal"

function EditUserLinks() {
  const {SERVER_URL_V, EmailUser,userDetails,userLinks, setUserLinks} = useContext(MyContext);
  const [loading, setLoading] = useState(true);
  const [loadingt, setLoadingt] = useState(false);
  const [namelink, setNamelink] = useState('');
  const [link, setLink] = useState('');
  const [Add, setAdd] = useState(true);
  const [editLinkId, setEditLinkId] = useState(null);





  useEffect(() => {
    if (userLinks) {
      setLoading(false);
    }
  }, [userLinks]);


  const AddLink = async (e) => {
    e.preventDefault();
    setLoadingt(true);
    const regex = /<script.*?>.*?<\/script>|<iframe.*?>.*?<\/iframe>|javascript:|eval\(|alert\(|document\.cookie|window\.location|<a\s+href=["']?javascript:.*?["']?/i;

    if (regex.test(link) || regex.test(namelink)) {
      setLoadingt(false);
        document.getElementById('my_modal_2').showModal();
        return;
    }
    
     try {
      const sanitizedLink = DOMPurify.sanitize(link);
      const response = await axios.post(`${SERVER_URL_V}/links`, {
        useremail: EmailUser,
        namelink,
        link:sanitizedLink
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` 
        }
      });
      // console.log('Link added:', response.data);
      setUserLinks(prevLinks => [response.data.data, ...prevLinks]);
      // toast("Link added successfully!");
      setLink('');
      setNamelink('');
    } catch (error) {
      console.error('There was an error adding the link!', error);
      toast.error('Failed to add link.');
    } finally {
      setLoadingt(false);
    }
  };
  
  const UpdateLink = async (e) => {
    e.preventDefault();
    setLoadingt(true);
    const regex = /<script.*?>.*?<\/script>|<iframe.*?>.*?<\/iframe>|javascript:|eval\(|alert\(|document\.cookie|window\.location|<a\s+href=["']?javascript:.*?["']?/i;

    if (regex.test(link) || regex.test(namelink)) {
      setLoadingt(false);
        document.getElementById('my_modal_2').showModal();
        return;
    }
  
    try {
      const sanitizedLink = DOMPurify.sanitize(link);
      const response = await axios.put(`${SERVER_URL_V}/links/${editLinkId}`, {
        namelink,
        link: sanitizedLink
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` 
        }
      });
      console.log('Link updated:', response.data);
      setUserLinks(prevLinks => 
        prevLinks.map(item => (item._id === editLinkId ? response.data.data : item))
      );
      // toast("Link updated successfully!");
      setEditLinkId(null);
      setLink('');
      setNamelink('');
    } catch (error) {
      console.error('There was an error updating the link!', error);
      toast.error('Failed to update link.');
    } finally {
      setLoadingt(false);
    }
  };
  
  const DeleteLink = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this link?");
    
    if (confirmDelete) {
      try {
        await axios.delete(`${SERVER_URL_V}/links/${id}`, {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` 
          }
        });
        setUserLinks(prevLinks => prevLinks.filter(item => item._id !== id));
        setEditLinkId(null);
        setNamelink('');
        setLink('');
        // toast("Link deleted successfully!");
      } catch (error) {
        console.error('There was an error deleting the link!', error);
        toast.error('Failed to delete the link.');
      }
    }
  };
  

  if (!userDetails || userDetails.length === 0) {
    return <LoadChatPage />;
  }
  const filt = userDetails.find((fl) => fl.email === EmailUser);
  if (!filt) {
    return <CreateProfile />;
  }

  
  

  const EditLink = (lnk) => {
    setEditLinkId(lnk._id);
    setNamelink(lnk.namelink);
    setLink(lnk.link);
    setAdd(false);
  };
  
  return (
    <div className={` pt-4 pb-12 flex justify-center`}>
<ParticleComponent bgcolor={"bg-gradient-to-r from-gray-950 via-teal-950 to-gray-900"} />
{/* UserLinks */}
      <section className='p-4 rounded-lg bg-gray-100 w-[110vh] mx-3 text-gray-800 z-10'>
        <div className='flex items-center justify-around mb-4'>
          <p className='text-3xl font-semibold text-gray-900'>Business Links</p>
          <p onClick={() => {setEditLinkId(false)
            setNamelink("")
            setLink("")
          }} className='border p-2 rounded-full cursor-pointer bg-gray-700 hover:bg-gray-800 duration-300 g-gradient-to-r from-teal-500 to-teal-700 text-white'>
            <X />
          </p>
        </div>
        {/* Add or Update Links */}
        <div className={` max-w-md mx-auto p-4 bg-white rounded-lg `}>
          <form onSubmit={editLinkId ? UpdateLink : AddLink} className="space-y-4">
            <div>
              <input
                type="text"
                value={namelink}
                onChange={(e) => setNamelink(e.target.value)}
                required
                maxLength={50}
                placeholder='Name'
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
              className="w-full bg-teal-5 bg-sky-700 text-white px-4 py-2 rounded hover:bg-teal-600 transition duration-300"
            >
              {loadingt ? <><i className="fa fa-spinner fa-spin"></i></> : editLinkId ? "Update" : "Add Link"}
            </button>
          </form>
          <WarningModal />
        </div>
        {/* Links */}
        <div className='p-2 space-y-3 grid grid-cols-1'>
          {(!userLinks && userLinks.length === 0) ? (
            <div className='space-y-3 mt-3'>
              {[1,2,3,4].map((mp,i)=>{
                return(
                  <div key={i} className='w-full h-16 bg-gray-400 animate-pulse rounded-lg'>

                  </div>
                )
              })}
            </div>
          ) :
            userLinks
              .filter(fl => fl.useremail === EmailUser)
              .map((lnk, i) => (
                <div key={i} className='flex justify-between ring-1 items-center  p-2 border rounded-md'>
                  <div className=' flex items-center gap-3'>
                  <p className='p-2 border border-gray-300 rounded-full text-teal-600'>
                     <Link />
                   </p>
                   <p className='text-xs md:text-sm break-all mr-3'>{lnk.namelink}</p>
                  </div>
                  <div className=' flex space-x-3'>
                   <button onClick={() =>{EditLink(lnk);window.scrollTo(0, 0);}} 
                   className='text-blue-500 border p-1 rounded-full ring-1'>
                     <Edit3 />
                   </button>
                   <button onClick={() => DeleteLink(lnk._id)} 
                   className='text-red-500 border p-1 rounded-full ring-1'>
                     <Trash2 />
                   </button>
                   </div>
                   </div>
              ))
          }
        </div>
      </section>
    </div>
  );
}

export default EditUserLinks;
