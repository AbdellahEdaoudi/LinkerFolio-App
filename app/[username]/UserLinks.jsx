
import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../Context/MyContext';
import { Link } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function UserLinks({emailuser}) {
  const { userLinks} = useContext(MyContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userLinks) {
      setLoading(false);
    }
  }, [userLinks]);


  return (
    <AlertDialog className="bg-black">
      <AlertDialogTrigger>
      <p  className="text-blue-900 hover:cursor-pointer flex items-center justify-center md:justify-start gap-2 mt-1">
      <Link width={18}  />Business Links
     </p>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogDescription >
          {/* UserLinks */}
          <section className=' rounded-lg  text-black'>
              <h1 className='text-3xl font-semibold  text-center text-gray-800 mb-4'>Links</h1>
              <div className="p-2 space-y-3 overflow-y-auto scrollbar-non max-h-96">
              {/* Links */}
             <div className='p-2 space-y-3'>
               {loading ? (
                <div className="flex justify-center items-center min-h-96">
                  <i className="fa fa-spinner fa-spin text-3xl"></i>
                </div>
              ) : (
                userLinks.filter(fl => fl.useremail === emailuser).length > 0 ? (
                  userLinks
                    .filter(fl => fl.useremail === emailuser)
                    .map((lnk, i) => (
                      <a href={lnk.link} target='_blank' rel='noopener noreferrer' key={i} className='flex border border-gray-300 shadow-md duration-300 hover:bg-gray-100 pl-3 items-center gap-2 rounded-lg p-2'>
                        <p className='p-2 border border-gray-300 rounded-full text-teal-600'>
                          <Link />
                        </p>
                        <p className='text-sm break-all'>{lnk.namelink}</p>
                      </a>
                    ))
                ) : (
                  <p className="text-center text-gray-500">No business links available.</p>
                )
              )}
              
             </div>
            </div>
            </section>
          {/* UserLinks */}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/* <AlertDialogAction>Continue</AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default UserLinks;
