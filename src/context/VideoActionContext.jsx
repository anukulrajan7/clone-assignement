import { createContext, useState, useCallback } from "react";

export const VideoInteractionContext = createContext();

export const VideoInteractionProvider = ({ children }) => {
  const [likedIds, setLikedIds] = useState(new Set());
  const [dislikedIds, setDislikedIds] = useState(new Set());
  const [savedVideos, setSavedVideos] = useState([]);

  // Like logic
  const likeVideo = useCallback((videoId) => {
    setLikedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) {
        newSet.delete(videoId);
      } else {
        newSet.add(videoId);
        setDislikedIds((prevDislikes) => {
          const dislikes = new Set(prevDislikes);
          // Remove from dislikes
          dislikes.delete(videoId);
          return dislikes;
        });
      }
      return newSet;
    });
  }, []);

  // Dislike logic
  const dislikeVideo = useCallback((videoId) => {
    setDislikedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) {
        // Toggle off
        newSet.delete(videoId);
      } else {
        newSet.add(videoId);
        setLikedIds((prevLikes) => {
          const likes = new Set(prevLikes);
          likes.delete(videoId);
          return likes;
        });
      }
      return newSet;
    });
  }, []);

  // Save logic
  const toggleSaveVideo = useCallback((video) => {
    setSavedVideos((prev) => {
      const exists = prev.find((v) => v.id === video.id);
      if (exists) {
        return prev.filter((v) => v.id !== video.id);
      } else {
        return [...prev, video];
      }
    });
  }, []);

  const isLiked = (id) => likedIds.has(id);
  const isDisliked = (id) => dislikedIds.has(id);
  const isSaved = (id) => savedVideos.some((v) => v.id === id);

  return (
    <VideoInteractionContext.Provider
      value={{
        likedIds,
        dislikedIds,
        savedVideos,
        likeVideo,
        dislikeVideo,
        toggleSaveVideo,
        isLiked,
        isDisliked,
        isSaved,
      }}
    >
      {children}
    </VideoInteractionContext.Provider>
  );
};
