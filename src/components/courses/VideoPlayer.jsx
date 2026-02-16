import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const VideoPlayer = ({ lectureId }) => {
  const [lecture, setLecture] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!lectureId) return;

    const fetchLecture = async () => {
      try {
        setLoading(true);

        const { data } = await api.get(`/lecture/${lectureId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setLecture(data.lecture);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLecture();
  }, [lectureId]);

  if (!lectureId) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Select a lecture to start watching
      </div>
    );
  }

  if (loading) {
    return <p>Loading video...</p>;
  }

  return (
    <div className="w-full max-w-5xl mx-auto">

      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">
        {lecture?.title}
      </h2>

      {/* Responsive Vimeo Player */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
        <iframe
          key={lectureId}
          src={lecture?.video}
          className="absolute top-0 left-0 w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={lecture?.title}
          
        ></iframe>
      </div>

      {/* Description */}
      <p className="mt-4 text-white text-sm sm:text-base">
        {lecture?.description}
      </p>
    </div>
  );
};

export default VideoPlayer;


