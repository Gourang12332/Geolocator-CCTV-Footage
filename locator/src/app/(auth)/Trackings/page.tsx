'use client';

import React, { useState } from 'react';

export default function Page() {
  const [image, setImage] = useState<File | null>(null);
  const [metadata, setMetadata] = useState({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    if (image) {
      formData.append('image_file', image); // Key must match backend ("image_file")
    }

    try {
      const response = await fetch(' https://cbb4-34-143-180-161.ngrok-free.app/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        console.error('Error response:', await response.json());
        return;
      }

      const data = await response. json();
      console.log(data)
      // Correctly parse metadata from the API response
      if (data && data.metadata) {
        setMetadata(data.metadata);
        console.log(metadata)
      } else {
        console.warn('No metadata found in the response');
        setMetadata({});
      }
    } catch (error) {
      console.error('Error during API call:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="track-theme">
      <h1>Image ID Tracker</h1>

      <div className="upload-section">
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            name="image_file"
            onChange={handleImageChange}
            disabled={loading}
            style={{ marginRight: '20px' }}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </form>
        {image && (
          <div className="image-preview">
            <img src={URL.createObjectURL(image)} alt="Image preview" />
          </div>
        )}
      </div>

      {/* {metadata.length > 0 && (
        <div className="metadata-list">
          <h2>Detected Metadata:</h2>
          <div className="metadata-cards">
          <div className="metadata-card">
          <h3 className="location">📍 {metadata}</h3>
          <p className="id">ID: {metadata}</p>
      </div>
</div>

        </div>
      )} */}

      <style jsx>{`
        .track-theme {
          background-color: #222;
          color: white;
          padding: 20px;
          text-align: center;
          font-family: Arial, sans-serif;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }

        .track-theme h1 {
          font-size: 2.5rem;
          margin-bottom: 20px;
          color: #4caf50;
        }

        .upload-section {
          margin-bottom: 30px;
        }

        .track-theme input[type='file'] {
          background-color: #333;
          border: 1px solid #4caf50;
          padding: 12px;
          color: white;
          border-radius: 5px;
          cursor: pointer;
          margin-bottom: 10px;
        }

        .track-theme button {
          background-color: #4caf50;
          color: white;
          padding: 12px 20px;
          border: none;
          cursor: pointer;
          border-radius: 5px;
          font-size: 1rem;
          transition: background-color 0.3s ease;
        }

        .track-theme button:hover {
          background-color: #388e3c;
        }

        .track-theme button:disabled {
          background-color: #777;
          cursor: not-allowed;
        }

        .image-preview img {
          max-width: 100%;
          margin-top: 20px;
          border-radius: 8px;
        }

        .metadata-list {
          margin-top: 30px;
        }

        .metadata-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
          padding: 0;
          list-style: none;
        }

        .metadata-card {
          background-color: #333;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          text-align: left;
        }

        .metadata-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
        }

        .location {
          font-size: 1.5rem;
          color: #ff5722;
          margin: 0;
        }

        .id {
          margin: 10px 0 0;
          color: #b2b2b2;
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
}
