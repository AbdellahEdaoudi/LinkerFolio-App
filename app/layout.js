import { Inter, Prompt } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";
import { Toaster } from "../components/ui/sonner"
import { MyProvider } from "./Context/MyContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NextAuthProvider from "./providers/NextAuthProvider";
import {Metadata} from "./data/metadata"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ['latin'] });
const prompt = Prompt({ subsets: ['latin'], weight: '400' });

export const metadata = Metadata ;
export default function RootLayout({ children }) {
  return (
      <html className="scroll-smooth" lang="en">
      <head>
      <meta name="google-adsense-account" content="ca-pub-2614061557764113" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2614061557764113"
        crossorigin="anonymous">
     </script>
      </head>
        <body className={`${prompt.className} min-h-screen scrollbar-none bg-gray-800 g-gradient-to-r from-blue-500 to-purple-500`}>
        <NextAuthProvider>
          <MyProvider>
            <div className="sticky top-0 z-50 ">
          <Navbar />
          </div>
            {children}
        </MyProvider>
        </NextAuthProvider>
          <Toaster />
          <ToastContainer />
        <Analytics />
        </body>
      </html>
  );
}
