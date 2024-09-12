import React, { useContext, useRef } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import QRCode from "qrcode.react";
import { MyContext } from "../Context/MyContext";
import { QrCode } from "lucide-react";

function QrcodeProfile({ userDetailsG,path}) {
  const { CLIENT_URL } = useContext(MyContext);
  const qrCodeRef = useRef(null);

  const DownloadQRCode = () => {
    if (qrCodeRef.current) {
      const canvas = qrCodeRef.current.querySelector("canvas");
      if (canvas) {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `${userDetailsG.fullname}.Linkerfolio.png`;
        link.click();
      }
    }
  };

  const ShareQRCode = () => {
    if (navigator.share && qrCodeRef.current) {
      const canvas = qrCodeRef.current.querySelector("canvas");
      if (canvas) {
        canvas.toBlob((blob) => {
          const file = new File(
            [blob],
            `${userDetailsG.username}.Linkerfolio.png`,
            { type: "image/png" }
          );
          navigator
            .share({
              files: [file],
              title: "QR Code",
              text: "Check out this QR Code!",
            })
            .catch((error) => console.error("Sharing failed", error));
        });
      }
    } else {
      alert("Your browser doesn't support the Web Share API.");
    }
  };

  const ShareLink = () => {
    const url = `${CLIENT_URL}${path}`;

    if (navigator.share) {
      navigator
        .share({
          url: url,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      alert("Share not supported on this browser");
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <span className="flex gap-2 border p-2 rounded-full w-10 cursor-pointer hover:text-red-700 hover:scale-110 duration-200  ">
            <QrCode />
          </span>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>QR Code Profile</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="flex flex-col justify-center items-center  ">
                <div className={`mb-6 hidden`} ref={qrCodeRef}>
                  <QRCode
                    value={`${CLIENT_URL}${path}`}
                    size={500}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    renderAs="canvas"
                    includeMargin={true}
                    level="H"
                    imageSettings={
                      "/LinkefolioLogo.png"
                        ? {
                            src: "/LinkefolioLogo.png",
                            x: undefined,
                            y: undefined,
                            height: 80,
                            width: 80,
                            excavate: true,
                          }
                        : {}
                    }
                  />
                </div>
                <div className="border-2 rounded-md ">
                  <QRCode
                    id="qrcode"
                    value={`${CLIENT_URL}${path}`}
                    size={200}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    renderAs="canvas"
                    includeMargin={true}
                    level="H"
                    imageSettings={
                      "/LinkefolioLogo.png"
                        ? {
                            src: "/LinkefolioLogo.png",
                            x: undefined,
                            y: undefined,
                            height: 50,
                            width: 50,
                            excavate: true,
                          }
                        : {}
                    }
                  />
                </div>
                <div className="flex flex-row gap-3 mt-4">
                  <button
                    className="p-2 bg-blue-300 rounded-md my-2 text-black font-medium"
                    onClick={DownloadQRCode}
                  >
                    Download QrCode
                  </button>
                  <button
                    className="p-2 bg-green-300 rounded-md my-2 text-black font-medium"
                    onClick={ShareQRCode}
                  >
                    Share Qrcode
                  </button>
                  <button
                    className="p-2 bg-green-300 rounded-md my-2 text-black font-medium"
                    onClick={ShareLink}
                  >
                    Share Link
                  </button>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            {/* <AlertDialogAction>Continue</AlertDialogAction> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default QrcodeProfile;
