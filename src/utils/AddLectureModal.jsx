import { useState, useEffect } from "react";
import api from "../api/axios";

const AddLectureModal = ({ courseId, onClose, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // 🔒 Body scroll lock
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !video) {
      alert("Title and Video URL are required");
      return;
    }

    try {
      setLoading(true);

      await api.post(
        `/course/${courseId}`,
        { title, description, video },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Lecture added successfully ✅");
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to add lecture ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 px-4">
      
      {/* MODAL BOX */}
      <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6 relative animate-fadeIn">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl font-bold text-gray-500 hover:text-black"
        >
          ×
        </button>

        <h2 className="text-2xl font-semibold mb-5 text-center">
          Add New Lecture
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Lecture Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring"
          />

          <textarea
            placeholder="Lecture Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring"
          />

          <input
            type="text"
            placeholder="Video URL (YouTube / CDN)"
            value={video}
            onChange={(e) => setVideo(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring"
          />

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 border py-2 rounded-lg font-semibold"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-1/2 bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800"
            >
              {loading ? "Saving..." : "Add Lecture"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddLectureModal;
