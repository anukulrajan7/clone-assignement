import { useEffect, useState } from "react";
import { TrendingVideoCard } from "../components/Card";

import { getAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Trending = () => {
  const [videosContent, setVideosContent] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fetchVideosContent = async () => {
    const { token } = getAuth();
    if (!token) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/videos/trending`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setVideosContent(data?.videos || []);
    } catch (err) {
      console.error("❌ Failed to fetch videos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideosContent();
  }, []); // Not including searchText to avoid API call on every keystroke

  return (
    <div className="main-content px-4 py-6 ">
      {isLoading ? (
        <div className="flex justify-center items-center h-[70vh] w-full">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin dark:border-blue-400"></div>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Loading videos...
            </p>
          </div>
        </div>
      ) : videosContent.length > 0 ? (
        <div className="grid grid-cols-1 w-full gap-6 mt-6 md:max-h-[70vh] px-6">
          {videosContent.map((video) => (
            <TrendingVideoCard
              key={video.id}
              onClick={() => navigate(`/video/${video?.id}`)}
              thumbnail={video?.thumbnail_url}
              avatar={video.channel?.profile_image_url}
              title={video.title}
              thu
              channel={video.channel?.name}
              views={`${video.view_count} views`}
              date={new Date(video.published_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
          No videos found.
        </p>
      )}
    </div>
  );
};

export default Trending;
