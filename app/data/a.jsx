<div className="mb-4">
          <h3 className="text-lg font-semibold">Social Media:</h3>
          <div className="grid grid-cols-3 gap-2">
            {datasocial
              .filter((social) => social.link)
              .map((social) => (
                <a
                  key={social.id}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 p-2 rounded-md transition duration-300"
                >
                  <Image src={social.icon} alt={social.alt} width={25} height={25} />
                  <span>{social.alt}</span>
                </a>
              ))}
          </div>
        </div>
const datasocial = [
    { id: 1, icon: '/Icons/wts.svg', alt: 'WhatsApp', link: userDetails.whatsapp },
    { id: 8, icon: '/Icons/link.svg', alt: 'LinkedIn', link: userDetails.Linkedin },
    { id: 9, icon: '/Icons/github.svg', alt: 'GitHub', link: userDetails.github },
    { id: 11, icon: '/Icons/tele.svg', alt: 'Telegram', link: userDetails.Telegram },
    { id: 2, icon: '/Icons/messenger.svg', alt: 'Messenger', link: userDetails.messenger },
    { id: 6, icon: '/Icons/ins.svg', alt: 'Instagram', link: userDetails.instagram },
    { id: 7, icon: '/Icons/twit.svg', alt: 'Twitter', link: userDetails.Twitter },
    { id: 10, icon: '/Icons/yt.svg', alt: 'YouTube', link: userDetails.Youtube },
    { id: 3, icon: '/Icons/reddit.svg', alt: 'Reddit', link: userDetails.reddit },
    { id: 4, icon: '/Icons/twitch.svg', alt: 'Twitch', link: userDetails.twitch },
    { id: 5, icon: '/Icons/fb.svg', alt: 'Facebook', link: userDetails.fb },
    { id: 12, icon: '/Icons/snap.svg', alt: 'Snapchat', link: userDetails.snapchat },
  ];