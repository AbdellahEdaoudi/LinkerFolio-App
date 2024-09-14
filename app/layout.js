import { Inter, Prompt } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";
import { Toaster } from "../components/ui/sonner"
import { MyProvider } from "./Context/MyContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NextAuthProvider from "./providers/NextAuthProvider";
import {Metadata} from "./data/metadata"

const inter = Inter({ subsets: ['latin'] });
const prompt = Prompt({ subsets: ['latin'], weight: '400' });

export const metadata = Metadata ;
export default function RootLayout({ children }) {
  return (
      <html className="scroll-smooth" lang="en">
      <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
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
        </body>
      </html>
  );
}
