import { MailCheck, MapPin, Phone } from 'lucide-react'
import React from 'react'

function LoadingPagetranslate({bgcolorp,language}) {
    const datamodul = [
        {name : "🔷 Profile" , data:"" },
        {name : "💼 Services" , data:"" },
        {name : "🎓 Education" , data:"" },
        {name : "⭐ Experience" , data:"" },
        {name : "💡 Skills" , data:"" },
        {name : "🌍 Languages" , data:"" },
      ]
  return (
    <div className={` ${language === "ar" ? 'list-disc-rtl' : 'list-disc-ltr'} ${bgcolorp} flex items-start justify-center   pt-4 pb-96 `}>
        <div className="w-[800px] mx-4 relative  bg-slate-50 px-4 md:px-8 pt-4 pb-8 rounded-lg border-2 shadow-lg">
            {/* Image Profile and info user */}
           <div className=" border flex flex-col pb-6 md:flex-row md:items-start items-center mb-4 p-4 bg-white rounded-lg shadow-md">
           <div className="border-4  border-green-600 shadow-lg  rounded-full overflow-hidden mb-4 md:mb-0 md:mr-6 duration-500">
                   <div
                     width={140}
                     height={0}
                     src={"/prifil Loading.png"}
                     alt="Profile Image"
                     className="object-cover bg-gray-300 animate-pulse w-32 h-32  cursor-pointer"
                     />
                     </div>
               <div className={`${language === "ar" && "mr-4"} flex flex-col md:items-start items-center justify-center`}>
                 <h1 className="font-bold text-2xl w-72 h-10 rounded-lg bg-gray-300 animate-pulse">
                 </h1>
                 <div className="text-gray-600 md:flex items-center md:justify-start justify-center   md:gap-2 mt-1">
                   <div className='flex items-center gap-3'>
                   @<div className="bg-gray-300 animate-pulse rounded-lg w-40 h-5">
                   </div>
                   </div>
                    <div className='flex items-center gap-2'>
                    <MapPin  width={18} style={{ color: "red" }} />
                    <div className="bg-gray-300 animate-pulse rounded-lg w-28 h-5">
                    </div>
                    </div>

                 </div>
                   <div className='flex items-center gap-1 my-1'>
                   <Phone width={18} style={{ color: "green" }} />َ
                   <div className="bg-gray-300 animate-pulse rounded-lg w-40 h-5">
                   </div>
                   </div>
                 
                
                 {/* Social Media */}
                    <div className="flex flex-wrap gap-4 justify-center my-2 ">
                      {[1,2,3,4,5,6].map((_,i) => (
                          <div key={i} className='w-10 h-10 bg-gray-300 animate-pulse rounded-lg'>

                          </div>
                        ))}
                  </div>
               </div>
           </div>
           {/* Setting  */}
           <nav className={`${language === "ar" ? 'list-disc-rtl md:left-24 left-7 top-10' : 'list-disc-ltr md:right-24 right-7 top-10'} grid grid-cols-1 md:grid-cols-2 absolute  md:gap-5 duration-300 gap-4`}>
                <div className='w-10 h-10 rounded-lg bg-gray-300 animate-pulse'></div>
                <div className='w-10 h-10 rounded-lg bg-gray-300 animate-pulse'></div>
                <div className='w-10 h-10 rounded-lg bg-gray-300 animate-pulse'></div>
                <div className='w-10 h-10 rounded-lg bg-gray-300 animate-pulse'></div>
              </nav>
           <div className='w-full h-10 bg-gray-300 animate-pulse rounded-lg'>
           </div>
           <div className='flex flex-wrap gap-2 justify-center'>
            {[1,2,3,4,5].map((_,i)=>{
                return(
                    <div key={i} className='w-32 h-10 bg-gray-300 animate-pulse rounded-lg my-3'>

                    </div>
                )
            })}
           </div>
           <div className=''>
            {datamodul.map((dt,i)=>{
                return(
                    <div key={i} className='w-full  px-3 py-2  bg-gray-100 border border-gray-400 animate-puls rounded-lg my-3'>
                        <div className='bg-gray-300   rounded-lg h-6 w-36 font-bold text-xl'></div>
                        <ul className={`list-disc ml-6 ${language === "ar" && "mr-4"} mt-2`}>
                            <li className='bg-gray-300 w-full h-6 mb-2 animate-pulse rounded-md'></li>
                            <p className='bg-gray-300 w-full h-6 mb-2 animate-pulse rounded-md'></p>
                            <p className='bg-gray-300 w-full h-6 mb-2 animate-pulse rounded-md'></p>
                        </ul>
                    </div>
                )
            })}
           </div>
    
        </div>
    </div>
  )
}

export default LoadingPagetranslate