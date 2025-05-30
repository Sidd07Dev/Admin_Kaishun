import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Helmet } from "react-helmet-async";

const initialImages = [
  { id: 1, url: "https://source.unsplash.com/random/800x600?1" },
  { id: 2, url: "https://source.unsplash.com/random/800x600?2" },
  { id: 3, url: "https://source.unsplash.com/random/800x600?3" },
];

const Gallery = () => {
  const [images, setImages] = useState(initialImages);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const newImage = {
        id: Date.now(),
        url: reader.result,
      };
      setImages([newImage, ...images]);
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this image?")) {
      setImages(images.filter((img) => img.id !== id));
    }
  };

  return (
    <section className="p-6">
         <Helmet>
      <title>Gallery | Kaishun Institute Of Study</title>
      <meta name="description" content="See photos of coaching events, toppers, and daily classes at SS Coaching Centre." />
      <meta name="keywords" content="coaching gallery, student success, events, achievements, Kaishun photos" />
    </Helmet>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Gallery</h2>
        <label className="flex items-center gap-2 cursor-pointerbg-blue-600 text-white  bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">
          <Plus />
          <span className="hidden sm:inline">Upload Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {images.map((img) => (
          <Card
            key={img.id}
            className="relative overflow-hidden border hover:shadow-lg transition"
          >
            <img
              src={img.url}
              alt="Gallery"
              className="w-full h-64 object-cover"
            />
            <button
              onClick={() => handleDelete(img.id)}
              className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1 rounded-full shadow"
              title="Delete"
            >
              <Trash2 className="w-5 h-5 text-red-500" />
            </button>
          </Card>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center mt-10 text-gray-500">No images found.</div>
      )}
    </section>
  );
};

export default Gallery;
