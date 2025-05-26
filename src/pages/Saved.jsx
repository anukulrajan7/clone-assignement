import { useContext } from "react";
import { VideoInteractionContext } from "../context/VideoActionContext";
import { useNavigate } from "react-router-dom";
import { TrendingVideoCard } from "../components/Card";

const SavedVideos = () => {
  const { savedVideos } = useContext(VideoInteractionContext);
  const navigate = useNavigate();

  const isEmpty = !savedVideos || savedVideos.length === 0;

  if (isEmpty) {
    return (
      <div className="p-10 flex w-full flex-col justify-center items-center text-center">
        <img
          src="/img/nxt-watch-no-saved-videos-img.png"
          alt="No saved videos"
          className="max-h-[500px] w-auto"
        />
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg font-medium">
          There is nothing saved yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1  gap-6 mt-6 px-6 w-full">
      {savedVideos.map((video) => (
        <TrendingVideoCard
          key={video.id}
          onClick={() => navigate(`/video/${video.id}`)}
          thumbnail={video.thumbnail_url}
          avatar={video.channel?.profile_image_url}
          title={video.title}
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
  );
};

export default SavedVideos;
