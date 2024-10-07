import React, { useState, useRef } from 'react';
import { FiPlus } from "react-icons/fi";

const ImageUpload = () => {
    const [image, setImage] = useState(null);
    const [hovered, setHovered] = useState(false);
    const fileInputRef = useRef(null);
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
  
    const triggerFileInput = () => {
      fileInputRef.current.click();
    };
  
    const removeImage = () => {
      setImage(null);
    };
  
    return (
      <div
        className={`relative flex items-center justify-center w-full h-full rounded-lg overflow-hidden ${image ? '' : 'border-dashed border-2 border-black'}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {!image ? (
          <button
            onClick={triggerFileInput}
            className="flex items-center gap-2  hover:text-black bg-transparent"
          >
            <FiPlus size={20}/>
            <span className="text-[14px] font-normal">Upload Image </span>
          </button>
        ) : (
          <>
            <img
              src={image}
              alt="Uploaded"
              className="w-full h-full object-cover rounded-lg cursor-pointer"
              onClick={triggerFileInput}
            />
            {hovered && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={triggerFileInput}
                  className="text-[14px] font-normal text-white "
                >
                  Change Cover
                </button>
                
              </div>
            )}
          </>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
      </div>
    );
  };

export default ImageUpload;
