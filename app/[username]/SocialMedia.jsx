import Image from 'next/image';
import React from 'react'

function SocialMedia({userDetailsG}) {

    const datasocial = [
        {
          id: 1,
          icon: "/Icons/wts.svg",
          alt: "WhatsApp",
          link: userDetailsG.whatsapp,
        },
        {
          id: 8,
          icon: "/Icons/link.svg",
          alt: "LinkedIn",
          link: userDetailsG.Linkedin,
        },
        {
          id: 9,
          icon: "/Icons/github.svg",
          alt: "GitHub",
          link: userDetailsG.github,
        },
        {
          id: 11,
          icon: "/Icons/tele.svg",
          alt: "Telegram",
          link: userDetailsG.Telegram,
        },
        {
          id: 2,
          icon: "/Icons/messenger.svg",
          alt: "Messenger",
          link: userDetailsG.messenger,
        },
        {
          id: 6,
          icon: "/Icons/ins.svg",
          alt: "Instagram",
          link: userDetailsG.instagram,
        },
        {
          id: 7,
          icon: "/Icons/twit.svg",
          alt: "Twitter",
          link: userDetailsG.Twitter,
        },
        {
          id: 10,
          icon: "/Icons/yt.svg",
          alt: "YouTube",
          link: userDetailsG.Youtube,
        },
        {
          id: 3,
          icon: "/Icons/reddit.svg",
          alt: "Reddit",
          link: userDetailsG.reddit,
        },
        {
          id: 4,
          icon: "/Icons/twitch.svg",
          alt: "Twitch",
          link: userDetailsG.twitch,
        },
        { id: 5, icon: "/Icons/fb.svg", alt: "Facebook", link: userDetailsG.fb },
        {
          id: 12,
          icon: "/Icons/snap.svg",
          alt: "Snapchat",
          link: userDetailsG.snapchat,
        },
      ];
  return (
    <div className="flex flex-wrap gap-4 justify-center my-1 ">
              {datasocial
                .filter((social) => social.link)
                .map((social, i) => (
                  <a
                    key={i}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex hover:scale-105 items-center justify-center bg-gray-100 hover:bg-gray-200 px-2 py-1.5 rounded-md shadow-md transition duration-300"
                  >
                    <Image
                      src={social.icon}
                      alt={social.alt}
                      width={22}
                      height={22}
                    />
                    {/* <span className="ml-2 text-gray-800 font-medium">{social.alt}</span> */}
                  </a>
                ))}
            </div>
  )
}

export default SocialMedia