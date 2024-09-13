import { useState } from "react";
import SocialIcons from "../Icons/Social-Icons";
import { FixedAlert } from "../CommonComponents/Alert";

const SocialMediaShareModal = ({ handleClose, wineName, mediaType }) => {
  const [isCopiedMessage, setIsCopiedMessage] = useState("");

  const url = encodeURI(window.location.href);
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url); // Copy the URL to clipboard
      setIsCopiedMessage("Copied Link");
      console.log(url);
      // Set a timeout to clear the message after 500ms
      setTimeout(() => setIsCopiedMessage(""), 1000);
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };
  return (
    <div className="fixed z-20 inset-0 bg-black bg-opacity-50 flex justify-center items-center animate-fadeInQuick">
      <div className="bg-slate-700 w-[80vw] lg:w-96 h-60 p-6 relative rounded-lg shadow-lg flex flex-col items-center justify-between gap-12">
        <span
          onClick={handleClose}
          className="absolute right-2 top-0 text-xl text-gray-100 cursor-pointer"
        >
          x
        </span>{" "}
        <h2
          id="modal-text"
          className="text-2xl mb-0 text-gray-100 font-serif text-center"
        >
          Share to Social Media
        </h2>
        <div className="flex flex-col justify-center w-full">
          <SocialIcons mediaType={mediaType} wineName={wineName} width={`full`} />
               {/* copy link */}
               <div
            onClick={handleCopyLink}
            className="border border-gray-700 w-48 mb-12 mx-auto text-gray-100 text-xl p-3 text-center rounded-md hover:bg-gray-700  transition-colors duration-200 cursor-pointer"
          >
            copy link
          </div>
        </div>
      </div>
      {isCopiedMessage && <FixedAlert success message={'Copied Link'} />}

    </div>
  );
};
export default SocialMediaShareModal;
