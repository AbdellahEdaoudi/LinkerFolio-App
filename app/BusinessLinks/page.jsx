'use client';
import React, { useContext, useState, useEffect } from 'react';
import { CirclePlus, Link, X, Edit3, Trash2 } from 'lucide-react';
import { MyContext } from '../Context/MyContext';
import axios from 'axios';
import { toast } from "sonner";

function EditUserLinks() {
  const { SERVER_URL, EmailUser, userDetails } = useContext(MyContext);
  const [user, setUser] = useState("");
  const [userLinks, setUserLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingt, setLoadingt] = useState(false);
  const [namelink, setNamelink] = useState('');
  const [link, setLink] = useState('');
  const [Add, setAdd] = useState(true);
  const [editLinkId, setEditLinkId] = useState(null);

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

  useEffect(() => {
    if (userDetails && userDetails.length > 0) {
      const filt = userDetails.find(fl => fl.email === EmailUser);
      setUser(filt);
    }
  }, [userDetails, EmailUser]);

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

    try {
      const response = await axios.put(`${SERVER_URL}/links/${editLinkId}`, {
        namelink,
        link
      });
      console.log('Link updated:', response.data);
      setUserLinks((Links) =>
        Links.map((item) =>
          item._id === editLinkId ? response.data.data : item
        )
      );
      toast("Link updated successfully!");
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
        await axios.delete(`${SERVER_URL}/links/${id}`);
        setUserLinks((Links) => Links.filter((item) => item._id !== id));
        toast("Link deleted successfully!");
      } catch (error) {
        console.error('There was an error deleting the link!', error);
        toast.error('Failed to delete the link.');
      }
    }
  };
  

  const EditLink = (lnk) => {
    setEditLinkId(lnk._id);
    setNamelink(lnk.namelink);
    setLink(lnk.link);
    setAdd(false);
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
        {/* Add or Update Links */}
        <div className={`${Add ? "opacity-0 max-h-0" : "max-h-48"} overflow-hidden transition-all duration-500 max-w-md mx-auto p-4 bg-white rounded-lg `}>
          <form onSubmit={editLinkId ? UpdateLink : AddLink} className="space-y-4">
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
              {loadingt ? <><i className="fa fa-spinner fa-spin"></i></> : editLinkId ? "Update" : "Add Link"}
            </button>
          </form>
        </div>
        {/* Links */}
        <div className='p-2 space-y-3 grid grid-cols-1'>
          {loading ? (
            <p className="flex justify-center py-24 items-start text-8xl">
              <i className="fa fa-spinner fa-spin"></i>
            </p>
          ) :
            userLinks
              .filter(fl => fl.useremail === EmailUser)
              .map((lnk, i) => (
                <div key={i} className='flex justify-between ring-1 items-center mx-10 p-2 border rounded-md'>
                  <div className=' flex items-center gap-3'>
                  <p className='p-2 border border-gray-300 rounded-full text-teal-600'>
                     <Link />
                   </p>
                   <p className='whitespace-nowrap'>{lnk.namelink}</p>
                  </div>
                  <div className='space-x-5'>
                   <button onClick={() =>{EditLink(lnk);window.scrollTo(0, 0);}} 
                   className='text-blue-500 border p-2 rounded-full ring-1'>
                     <Edit3 />
                   </button>
                   <button onClick={() => DeleteLink(lnk._id)} 
                   className='text-red-500 border p-2 rounded-full ring-1'>
                     <Trash2 />
                   </button>
                   </div>
                   </div>
                // <div key={i} >
                //   <div className='flex border border-gray-300 shadow-md duration-300 hover:bg-gray-50 pl-4 items-center gap-4 rounded-lg p-2'>
                //   
                //   </div>
                //   
                // </div>
              ))
          }
        </div>
      </section>
    </div>
  );
}

export default EditUserLinks;