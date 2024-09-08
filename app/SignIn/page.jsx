"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Page = () => {
  const { data, status } = useSession();
  const Router = useRouter();
  if (data) {
    Router.push("/");
  }
  return (
    <div className="bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 min-h-screen flex items-start justify-center py-3">
      <div className="flex flex-col-reverse md:flex-row w-full mx-4 md:max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
        
        {/* Marketing Text */}
        <div className="w-full md:w-1/2 p-7 flex flex-col justify-center bg-gray-100">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4 text-center">
            🚀 Welcome to LinkerFolio 🚀 <br /> Your Ultimate Digital Hub!
          </h1>
          <p className="text-gray-800 mb-6 leading-relaxed">
            LinkerFolio is an innovative application that showcases your resume and social media links in a professional and seamless manner, enhancing your digital presence and simplifying the process of sharing your personal information.
            <br />
            ✨ <strong>Distinguished Resume:</strong> Present yourself in the best light with a stylish design that clearly and attractively displays your experience, skills, and education. This will help you stand out from the competition and speed up the job application process, making it easier for companies to find your information and contact you quickly.
            <br />
            ✨ <strong>Social Link Management:</strong> Centralize all your social media links in one place for easy access and sharing with the world. This saves you time and makes it simpler and faster to share your information.
            <br />
            ✨ <strong>Download and Share QR Code:</strong> Automatically get a QR code for your personal page, which you can download and share for easy access to your resume and social media links via smartphones. This simplifies communication with others and streamlines your job application process anytime, anywhere.
            <br />
            ✨ <strong>Automatic Translation:</strong> Share your resume with others, who can then translate it into major languages such as English, French, Arabic, Spanish, German, Chinese, Japanese, Russian, and Portuguese, making it easier for a global audience to understand your resume.
            <br />
            ✨ <strong>Social Communication:</strong> Connect with your friends within the app, facilitating direct and secure interactions in a professional environment.
            <br />
            ✨ <strong>Customizable Background Colors:</strong> Choose from a variety of background colors to personalize the look of your resume page.
          </p>
          <p className="text-gray-800 mb-6 leading-relaxed">
            🎯 <strong>LinkerFolio's Goal:</strong> LinkerFolio aims to simplify the process of displaying your resume and social media links in one place, making it easier for you to manage your digital identity. LinkerFolio is designed to help you present yourself professionally and attractively, and to make your personal information easily accessible to contacts or potential employers. Our goal is to enhance your career opportunities and enable you to build a strong and influential digital presence that attracts opportunities and attention from around you.
          </p>
        </div>
        
        {/* Sign-in Buttons */}
        <div className="w-full md:w-1/2 p-8 flex flex-col pt-10  bg-gradient-to-r from-blue-500 to-teal-400">
          <button
            onClick={()=>signIn("google", {redirect:true, callbackUrl:`/`})}
            className="w-full flex items-center justify-center px-6 py-3 bg-white text-black border border-gray-300 rounded-lg shadow-lg transition-transform transform hover:scale-105 mb-4 hover:bg-gray-100"
          >
            <Image src={"/Icons/google.svg"} width={28} height={28} alt="Google Logo" />
            <span className="ml-3 text-lg font-semibold">Sign in with Google</span>
          </button>
          <button
            onClick={()=>signIn("linkedin", {redirect:true, callbackUrl:`/`})}
            className="hidden w-full fle items-center justify-center px-6 py-3 bg-blue-800 text-white border border-blue-900 rounded-lg shadow-lg transition-transform transform hover:scale-105 mb-4 hover:bg-blue-700"
          >
            <Image src={"/Icons/link.svg"} width={28} height={28} className="bg-white rounded-lg ring-1" alt="LinkedIn Logo" />
            <span className="ml-3 text-lg font-semibold">Sign in with LinkedIn</span>
          </button>
          <button
            onClick={() => signIn("github")}
            className="w-full flex items-center mb-5 justify-center px-6 py-3 bg-gray-800 text-white border border-gray-900 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-700"
          >
            <Image src={"/Icons/github.svg"} width={28} height={28} alt="GitHub Logo" />
            <span className="ml-3 text-lg font-semibold">Sign in with GitHub</span>
          </button>

          <div>
            <Image
            className="rounded-lg"
            src={"/Mark_Linkerfolio/Mark_Linkerfolio.png"} width={800} height={100} alt="LinkerFolioAbdellah" />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Page;
