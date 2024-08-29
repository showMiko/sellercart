import React from "react";

const ImageGallery = () => {
  return (
    <div className="m-2 md:m-10">
      <div className="flex justify-center mt-16 flex-col items-center">
        <h1 className="text-3xl md:text-5xl p-2 tracking-loose mb-2">
          You Can Expect to Find...
        </h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="grid gap-4">
          <div className="relative group">
            <img
              className="h-auto max-w-full rounded-lg transition duration-300 ease-in-out"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
              alt=""
            />
            <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
              <span className="text-lg font-bold">Your Text Here</span>
            </div>
          </div>


          <div className="relative group">
            <img
              className="h-auto max-w-full rounded-lg transition duration-300 ease-in-out"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg"
              alt=""
            />
            <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
              <span className="text-lg font-bold">Your Text Here</span>
            </div>
          </div>
          <div className="relative group">
            <img
              className="h-auto max-w-full rounded-lg duration-300 ease-in-out"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg"
              alt=""
            />
            <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
              <span className="text-lg font-bold">Your Text Here</span>
            </div>
          </div>
        </div>
        <div className="grid gap-4 ">
          <div className="relative group">
            <img
              className="h-auto max-w-full rounded-lg transition duration-300 ease-in-out"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg"
              alt=""
            />
            <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
              <span className="text-lg font-bold">Your Text Here</span>
            </div>
          </div>
          <div className="relative group">
            <img
              className="h-auto max-w-full rounded-lg transition duration-300 ease-in-out"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg"
              alt=""
            />
            <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
              <span className="text-lg font-bold">Your Text Here</span>
            </div>
          </div>
          <div className="relative group">
            <img
              className="h-auto max-w-full rounded-lg transition duration-300 ease-in-out"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg"
              alt=""
            />
            <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
              <span className="text-lg font-bold">Your Text Here</span>
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="relative group">
            <img
              className="h-auto max-w-full rounded-lg transition duration-300 ease-in-out"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg"
              alt=""
            />
            <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
              <span className="text-lg font-bold">Your Text Here</span>
            </div>
          </div>
          <div className="relative group">
            <img
              className="h-auto max-w-full rounded-lg transition duration-300 ease-in-out"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg"
              alt=""
            />
            <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
              <span className="text-lg font-bold">Your Text Here</span>
            </div>
          </div>
          <div className="relative group">
            <img
              className="h-auto max-w-full rounded-lg transition duration-300 ease-in-out"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg"
              alt=""
            />
            <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
              <span className="text-lg font-bold">Your Text Here</span>
            </div>
          </div>
        </div>
        <div className="grid gap-4 ">
          <div className="relative group">
            <img
              className="h-auto max-w-full rounded-lg transition duration-300 ease-in-out"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg"
              alt=""
            />
            <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
              <span className="text-lg font-bold">Your Text Here</span>
            </div>
          </div>
          <div className="relative group">
            <img
              className="h-auto max-w-full rounded-lg transition duration-300 ease-in-out"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg"
              alt=""
            />
            <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
              <span className="text-lg font-bold">Your Text Here</span>
            </div>
          </div>
          <div className="relative group">
            <img
              className="h-auto max-w-full rounded-lg transition duration-300 ease-in-out"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg"
              alt=""
            />
            <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
              <span className="text-lg font-bold">Your Text Here</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
