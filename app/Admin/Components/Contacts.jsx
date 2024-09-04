"use client";
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { MyContext } from '../../Context/MyContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/ui/alert-dialog"

function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { SERVER_URL_V } = useContext(MyContext);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${SERVER_URL_V}/contacts`);
        setContacts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchContacts();
  }, [SERVER_URL_V]);

  const Delete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this contact?");
    
    if (confirmDelete) {
      try {
        await axios.delete(`${SERVER_URL_V}/contacts/${id}`);
        setContacts(contacts.filter(contact => contact._id !== id));
      } catch (err) {
        setError(err);
      }
    }
  };

  if (loading) return (
    <div className="flex justify-center items-start py-16 h-screen bg-gray-100">
      <i className="fa fa-spinner fa-spin text-4xl text-blue-500"></i>
    </div>
  );
  if (error) return (
    <div className="flex justify-center items-center h-screen bg-gray-100 text-red-500">
      <p>Error: {error.message}</p>
    </div>
  );

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Contacts</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-50 border border-gray-200 rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              {["Id", "Email", "Number", "Message", "Actions"].map(header => (
                <th key={header} className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contacts.map(contact => (
              <tr key={contact._id}>
                <td className="px-4 py-2 text-sm text-gray-700">{contact.iduser}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{contact.email}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{contact.phoneNumber}</td>
                <AlertDialog>
                 <AlertDialogTrigger>
                 <td className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 hover:rounded-md">Open Message</td>
                 </AlertDialogTrigger>
                 <AlertDialogContent>
                   <AlertDialogHeader>
                     <AlertDialogTitle>Message :</AlertDialogTitle>
                     <AlertDialogDescription>
                     <div className='overflow-y-auto max-h-72'>{contact.message}</div>
                     </AlertDialogDescription>
                   </AlertDialogHeader>
                   <AlertDialogFooter>
                     <AlertDialogCancel>Cancel</AlertDialogCancel>
                     {/* <AlertDialogAction>Continue</AlertDialogAction> */}
                   </AlertDialogFooter>
                 </AlertDialogContent>
                </AlertDialog>
                <td className="px-4 py-2 text-sm text-right">
                  <button 
                    onClick={() => Delete(contact._id)} 
                    className="text-white p-1 rounded-md bg-red-500 hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContactsPage;
