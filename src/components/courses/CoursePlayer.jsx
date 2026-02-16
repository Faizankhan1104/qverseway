// CoursePlayer.jsx - COMPLETE CODE WITH PROGRESS

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../../api/axios";
import VideoPlayer from "./VideoPlayer";

const CoursePlayer = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === "admin";

  const [lectures, setLectures] = useState([]);
  const [selectedLectureId, setSelectedLectureId] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const token = localStorage.getItem("token");

  // Fetch lectures
  const fetchLectures = async () => {
    try {
      const { data } = await api.get(`/lectures/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLectures(data.lectures);
      if (data.lectures?.length) setSelectedLectureId(data.lectures[0]._id);
    } catch (error) {
      console.error("Error fetching lectures:", error);
    }
  };

  // Fetch progress
  const fetchProgress = async () => {
    try {
      const { data } = await api.get(`/user/progress?course=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProgress(data);
    } catch (error) {
      console.error("Error fetching progress:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLectures();
    if (!isAdmin) {
      fetchProgress();
    } else {
      setLoading(false);
    }
  }, [id]);

  // Mark lecture as complete
  const markLectureComplete = async (lectureId) => {
    try {
      await api.post(
        `/user/progress?course=${id}&lectureId=${lectureId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Refresh progress
      fetchProgress();
    } catch (error) {
      console.error("Error marking lecture complete:", error);
    }
  };

  const deleteLecture = async (lectureId) => {
    if (!window.confirm("Delete lecture?")) return;
    try {
      await api.delete(`/lecture/${lectureId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchLectures();
    } catch (error) {
      console.error("Error deleting lecture:", error);
    }
  };

  // Check if lecture is completed
  const isLectureCompleted = (lectureId) => {
    return progress?.progress?.completedLectures?.includes(lectureId);
  };

  return (
    <div className="min-h-screen bg-[#1B5047] text-white flex flex-col lg:flex-row pt-20">
      
      {/* Mobile Header */}
      <div className="lg:hidden p-4 bg-white text-black flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <span className="font-semibold">Course Lectures</span>
          {!isAdmin && progress && (
            <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">
              {Math.round(progress.courseProgressPercentage)}%
            </span>
          )}
        </div>
        <button 
          onClick={() => setShowSidebar(!showSidebar)}
          className="bg-[#1B5047] text-white px-4 py-2 rounded-lg text-sm"
        >
          {showSidebar ? "Hide" : "Show"}
        </button>
      </div>

      {/* Sidebar */}
      <aside 
        className={`lg:w-1/4 bg-[#0d3d34] border-r border-white/10 overflow-y-auto ${
          showSidebar ? "block" : "hidden"
        } lg:block`}
        style={{ maxHeight: "calc(100vh - 80px)" }}
      >
        {/* Progress Header - Only for Students */}
        {!isAdmin && (
          <div className="p-4 sm:p-6 bg-gradient-to-r from-emerald-600 to-emerald-700 border-b border-white/10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-base sm:text-lg">Your Progress</h3>
              <span className="text-xl sm:text-2xl">📊</span>
            </div>
            
            {loading ? (
              <div className="text-sm text-white/80">Loading progress...</div>
            ) : progress ? (
              <>
                <div className="mb-2">
                  <div className="flex justify-between text-xs sm:text-sm mb-1">
                    <span>Completed</span>
                    <span className="font-bold">
                      {progress.completedLectures}/{progress.allLectures}
                    </span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2 sm:h-3 overflow-hidden">
                    <div
                      className="bg-yellow-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${progress.courseProgressPercentage}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-yellow-400">
                  {Math.round(progress.courseProgressPercentage)}%
                </p>
              </>
            ) : (
              <p className="text-sm text-white/80">No progress data available</p>
            )}
          </div>
        )}

        {/* Lectures Header */}
        <div className="p-4 font-bold border-b border-white/10 bg-[#1B5047]">
          <div className="flex items-center justify-between">
            <span className="text-sm sm:text-base">All Lectures</span>
            <span className="text-xs bg-white/10 px-2 py-1 rounded">
              {lectures.length} lectures
            </span>
          </div>
        </div>

        {/* Lectures List */}
        <div className="overflow-y-auto">
          {lectures.map((lec, i) => {
            const isCompleted = isLectureCompleted(lec._id);
            const isSelected = selectedLectureId === lec._id;

            return (
              <div
                key={lec._id}
                className={`p-3 sm:p-4 border-b border-white/10 transition-all ${
                  isSelected
                    ? "bg-yellow-400/20 border-l-4 border-l-yellow-400"
                    : "hover:bg-white/5"
                }`}
              >
                <div
                  onClick={() => setSelectedLectureId(lec._id)}
                  className="cursor-pointer"
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    {/* Lecture Number/Status */}
                    <div className="flex-shrink-0">
                      {!isAdmin && isCompleted ? (
                        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs sm:text-sm">✓</span>
                        </div>
                      ) : (
                        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-white/10 rounded-full flex items-center justify-center text-xs sm:text-sm">
                          {i + 1}
                        </div>
                      )}
                    </div>

                    {/* Lecture Title */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm sm:text-base font-medium truncate ${
                        isSelected ? "text-yellow-400" : "text-white"
                      }`}>
                        {lec.title}
                      </p>
                      {!isAdmin && isCompleted && (
                        <p className="text-xs text-green-400 mt-1">Completed ✓</p>
                      )}
                    </div>

                    {/* Play Icon */}
                    {isSelected && (
                      <div className="flex-shrink-0 text-yellow-400 text-lg sm:text-xl">
                        ▶
                      </div>
                    )}
                  </div>
                </div>

                {/* Admin Delete Button */}
                {isAdmin && (
                  <button
                    onClick={() => deleteLecture(lec._id)}
                    className="mt-2 text-red-400 hover:text-red-300 text-xs sm:text-sm font-medium transition-colors"
                  >
                    🗑️ Delete Lecture
                  </button>
                )}

                {/* Mark Complete Button - Only for Students */}
                {!isAdmin && !isCompleted && isSelected && (
                  <button
                    onClick={() => markLectureComplete(lec._id)}
                    className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm py-1.5 sm:py-2 rounded-lg font-medium transition-colors"
                  >
                    ✓ Mark as Complete
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {selectedLectureId ? (
          <div>
            <VideoPlayer 
              lectureId={selectedLectureId} 
              onComplete={() => markLectureComplete(selectedLectureId)}
            />
            
            {/* Progress Info Below Video - Only for Students */}
            {!isAdmin && progress && (
              <div className="mt-6 bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
                <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                  <span>📈</span> Course Progress
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <p className="text-xs sm:text-sm text-gray-300 mb-1">Completed</p>
                    <p className="text-2xl sm:text-3xl font-bold text-green-400">
                      {progress.completedLectures}
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <p className="text-xs sm:text-sm text-gray-300 mb-1">Remaining</p>
                    <p className="text-2xl sm:text-3xl font-bold text-yellow-400">
                      {progress.allLectures - progress.completedLectures}
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <p className="text-xs sm:text-sm text-gray-300 mb-1">Total</p>
                    <p className="text-2xl sm:text-3xl font-bold text-blue-400">
                      {progress.allLectures}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400 text-lg">Select a lecture to start</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CoursePlayer;