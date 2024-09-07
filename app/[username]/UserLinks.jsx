import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../Context/MyContext";
import { Link } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import axios from "axios";

function UserLinks({ emailuser, language, setLanguage }) {
  const { userLinks, SERVER_URL_V } = useContext(MyContext);
  const [loading, setLoading] = useState(true);
  const [displayLinks, setDisplayLinks] = useState([]);
  const [translations, setTranslations] = useState({});

  // Translate content
  const translateContent = async (content, lang) => {
    try {
      const response = await axios.post(`${SERVER_URL_V}/translate`, {
        textObject: { namelink: content },
        to: lang,
      },{
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` 
        }
      });
      return response.data.translations.namelink;
    } catch (error) {
      console.error("Error translating content:", error);
      return content;
    }
  };

  // Translate static texts
  const translateStaticTexts = async () => {
    if (language) {
      try {
        const response = await axios.post(`${SERVER_URL_V}/translate`, {
          textObject: {
            businessLinks: "Business Links",
            links: "Links",
            noLinks: "No business links available.",
          },
          to: language,
        },{
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` 
          }
        });
        setTranslations(response.data.translations);
      } catch (error) {
        console.error("Error translating static texts:", error);
        setTranslations({
          businessLinks: "Business Links",
          links: "Links",
          noLinks: "No business links available.",
        });
      }
    } else {
      setTranslations({
        businessLinks: "Business Links",
        links: "Links",
        noLinks: "No business links available.",
      });
    }
  };

  // Translate links
  const translateLinks = async () => {
    if (userLinks) {
      if (language) {
        const translated = await Promise.all(
          userLinks
            .filter((fl) => fl.useremail === emailuser)
            .map(async (link) => ({
              ...link,
              namelink: await translateContent(link.namelink, language),
            }))
        );
        setDisplayLinks(translated);
      } else {
        setDisplayLinks(userLinks.filter((fl) => fl.useremail === emailuser));
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    translateLinks();
    translateStaticTexts();
  }, [userLinks, language]);

  return (
    <AlertDialog className="bg-black">
      <AlertDialogTrigger>
        <p className="text-blue-900 hover:cursor-pointer flex items-center justify-center md:justify-start gap-2">
          <Link width={18} />
          {translations.businessLinks || "Business Links"}
        </p>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogDescription>
            <section className="rounded-lg text-black">
              <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4">
                {translations.links || "Links"}
              </h1>
              <div className="p-2 space-y-3 overflow-y-auto scrollbar-non max-h-96">
                <div className="p-2 space-y-3">
                  {loading ? (
                    <div className="flex justify-center items-center min-h-96">
                      <i className="fa fa-spinner fa-spin text-3xl"></i>
                    </div>
                  ) : displayLinks.length > 0 ? (
                    displayLinks.map((lnk, i) => (
                      <a
                        href={lnk.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={i}
                        className={`flex ${language === "ar" && "flex-row-reverse"}  border border-gray-300 shadow-md duration-300 hover:bg-gray-100 pl-3 items-center gap-2 rounded-lg p-2`}
                      >
                        <p className="p-2 border border-gray-300 rounded-full text-teal-600">
                          <Link />
                        </p>
                        <p className="text-sm break-all">{lnk.namelink}</p>
                      </a>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">
                      {translations.noLinks || "No business links available."}
                    </p>
                  )}
                </div>
              </div>
            </section>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default UserLinks;
