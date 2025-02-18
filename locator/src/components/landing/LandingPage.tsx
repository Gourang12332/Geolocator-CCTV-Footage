'use client'

import * as React from 'react'
import Hero from './Hero'
import { useState } from 'react'

const people = [
  {
    name: "Person 1",
    photo: "/ashmit.jpg",
  },
  {
    name: "Person 2",
    photo: "/BhavnaPhoto.jpg",
  },
  {
    name: "Person 3",
    photo: "/ayushphoto.jpg",
  },
  {
    name: "Person 4",
    photo: "/Gourang.jpg",
  },
];

const AboutUs = () => {
  return (
    <div className="h-screen w-screen bg-white" id="blue">
      <div className="container h-full mx-auto flex flex-col items-center py-16 px-4">
        <h2 className="mt-16 mb-4 text-5xl font-bold text-gray-800">About Us</h2>
        <p className="mb-16 text-lg text-gray-600">
          We specialize in providing real-time tracking solutions using advanced multi-camera feature detection and scalable systems.
        </p>

        {/* Image Gallery */}
        <div className="flex justify-center gap-8 flex-wrap">
          {people.map((person, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="h-60 w-60 rounded-lg overflow-hidden shadow-xl transform transition-transform duration-300 hover:scale-105">
                <img
                  src={person.photo}
                  alt={person.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-4 text-lg font-semibold text-center text-gray-800">{person.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



export default function LandingPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('image_file', selectedImage); // 'file' is the key expected by the API for the file upload
  
      try {
        // Replace with your actual API URL
        const response = await fetch('https://reqres.in/api/upload', {
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error('Failed to upload image');
        }
  
        const responseData = await response.json();
        console.log('Image uploaded successfully:', responseData);
  
        // You can display a success message or take other actions based on the response
        alert('Image uploaded successfully!');
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image. Please try again.');
      }
    } else {
      alert('Please select an image to upload.');
    }
  };

  return (
    <>
      <main className="flex flex-col items-center justify-center">
        {/* Hero Section */}
        <div className="container">
          <Hero />
        </div>

        {/* Track Section */}
        <div className="h-screen bg-gray-100 w-screen" id="red">
          <div className="container h-full mx-auto flex flex-col items-center mt-32">
            <h2 className="mb-4 text-5xl font-bold text-gray-800">
              Track Individuals
            </h2>
            <p className="mb-6 text-lg text-gray-600">
              Upload an image to track and locate individuals across multiple CCTV cameras.
            </p>

            {/* Image Upload Section */}
            <div className="flex flex-col items-center justify-center gap-6 w-1/2">
              <label
                htmlFor="imageUpload"
                className="flex justify-center items-center h-80 w-full cursor-pointer rounded-lg border-2 border-dashed border-blue-600 bg-white p-6 text-center shadow-md hover:border-blue-500 hover:bg-gray-50"
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="h-60 w-60 rounded-lg object-cover "
                  />
                ) : (
                  <div className='flex flex-col justify-center items-center h-full'>
                    <p className="text-gray-500 text-xl">Click to upload an image</p>
                    <p className="text-sm text-gray-400 ">(JPG, PNG, or JPEG)</p>
                  </div>
                )}
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="rounded-full bg-blue-600 px-8 py-3 text-white shadow-md transition-colors hover:bg-blue-700"
              >
                Upload and Track
              </button>
            </div>
          </div>
        </div>

        {/* About Us Section */}
        <AboutUs />
      </main>
    </>
  )
}