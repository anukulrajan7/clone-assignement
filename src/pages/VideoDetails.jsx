import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getAuth } from "../hooks/useAuth";
import { ThumbsUp, ThumbsDown, ListPlus, Video } from "lucide-react";
import { VideoInteractionContext } from "../context/VideoActionContext";
const VideoDetails = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    likeVideo,
    dislikeVideo,
    toggleSaveVideo,
    isLiked,
    isDisliked,
    isSaved,
  } = useContext(VideoInteractionContext);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const data = await getVideoById(videoId);
        setVideo(data?.video_details);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [videoId]);

  const toggleLike = () => {
    likeVideo(video?.id);
  };

  const toggleDislike = () => {
    dislikeVideo(video?.id);
  };

  const toggleSave = () => toggleSaveVideo(video);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (!video) return <div className="text-center mt-10">Video not found</div>;
  const youtubeId = new URL(video.video_url).searchParams.get("v");

  return (
    <div className="md:max-w-[80%] w-full mx-auto space-y-4 p-4 hover:bg-[#f2f2f2] text-gray-800 dark:text-white  px-5 md:px-16 py-8">
      <div className="aspect-w-16 h-[300px] md:h-[450px] w-full  aspect-h-9">
        <iframe
          className="w-full h-full object-contain"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title={video.title}
          frameBorder="0"
          allowFullScreen
        />
      </div>

      <h1 className="text-xl font-bold">{video.title}</h1>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
        <span>
          {video.view_count} views • {video.published_at}
        </span>
        <div className="flex space-x-6 text-base">
          <button
            onClick={toggleLike}
            className={`flex items-center gap-2 hover:text-blue-500 ${isLiked(video.id) && "text-blue-500"}`}
          >
            <ThumbsUp size="16" />
            <span>Like</span>
          </button>

          <button
            onClick={toggleDislike}
            className={`flex items-center gap-2 hover:text-red-500 ${isDisliked(video.id) && "text-red-500"}`}
          >
            <ThumbsDown size="16" />
            <span>Dislike</span>
          </button>

          <button
            onClick={toggleSave}
            className={`flex items-center gap-2 hover:text-green-500 ${isSaved(video?.id) && "text-green-500"}`}
          >
            <ListPlus size="16" />
            <span>{isSaved(video?.id) ? "Saved" : "Save"}</span>
          </button>
        </div>
      </div>

      <hr className="border-gray-300 dark:border-gray-700" />

      <div className="flex items-start space-x-4">
        <img
          src={video.channel.profile_image_url}
          alt="channel"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="font-semibold">{video.channel.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {video.channel.subscriber_count} subscribers
          </p>
          <p className="mt-2">{video.description}</p>
        </div>
      </div>
    </div>
  );
};

const getVideoById = async (id) => {
  const { token } = getAuth();
  if (!token) return;
  const res = await fetch(`/api/videos/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Video not found");
  return await res.json();
};

export default VideoDetails;
