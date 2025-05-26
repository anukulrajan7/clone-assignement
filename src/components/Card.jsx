import { memo } from "react";
export const VideoCard = memo(
  ({ thumbnail, avatar, title, channel, views, date, onClick }) => {
    return (
      <div
        onClick={onClick}
        className={` w-full md:max-w-[360px] hover:bg-[#f2f2f2] dark:hover:bg-[#272727] rounded-lg overflow-hidden transition-colors duration-300 `}
      >
        {/* Thumbnail */}
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-[200px] object-cover rounded-t-lg"
        />

        {/* Content */}
        <div className="flex p-4">
          {/* Avatar */}
          <img
            src={avatar}
            alt={channel}
            className="w-10 h-10 rounded-full mr-4 flex-shrink-0"
          />

          {/* Text Content */}
          <div className="flex flex-col">
            <h2 className="text-sm font-medium leading-snug mb-1 line-clamp-2">
              {title}
            </h2>
            <p className="text-sm text-[#606060] dark:text-[#aaa]">{channel}</p>
            <div className="text-sm text-[#606060] dark:text-[#aaa] mt-1 flex gap-3">
              <span>{views}</span>
              <span>{date}</span>
            </div>
          </div>
        </div>
      </div>
    );
  },
  (prev, next) => prev.title === next.title,
);

export const TrendingVideoCard = memo(
  ({ thumbnail, title, channel, views, date, onClick }) => {
    return (
      <div
        onClick={onClick}
        className={` w-full  md:max-h-[450px] hover:bg-[#f2f2f2] dark:hover:bg-[#272727]
 flex flex-col md:flex-row  justify-center md:justify-start items-center  rounded-lg overflow-hidden transition-colors duration-300 `}
      >
        {/* Thumbnail */}
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-[250px] md:max-w-[400px] object-cover rounded-t-lg"
        />

        {/* Content */}
        <div className="flex p-4">
          {/* Text Content */}
          <div className="flex flex-col ">
            <h2 className="md:text-2xl text-lg font-medium leading-snug mb-1 line-clamp-2">
              {title}
            </h2>
            <p className="text-sm text-[#606060] dark:text-[#aaa]">{channel}</p>
            <div className="text-sm text-[#606060] dark:text-[#aaa] mt-1 flex gap-3">
              <span>{views}</span>
              <span>{date}</span>
            </div>
          </div>
        </div>
      </div>
    );
  },
  (prev, next) => prev.title === next.title,
);

export const GamingCard = memo(
  ({ thumbnail, views, title, onClick }) => {
    return (
      <div
        onClick={onClick}
        className={` w-full  md:max-w-[360px] hover:bg-[#f2f2f2] p-4 dark:hover:bg-[#272727] rounded-lg overflow-hidden transition-colors duration-300 `}
      >
        {/* Thumbnail */}
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-[400px] object-cover rounded-t-lg"
        />

        <div className="flex flex-col py-2 items-start">
          <h2 className="text-2xl font-medium leading-snug mb-1 line-clamp-2 text-center">
            {title}
          </h2>

          <div className="text-sm text-[#606060] dark:text-[#aaa] mt-1 flex gap-3">
            <span>{views}</span> Worldwide
          </div>
        </div>
      </div>
    );
  },
  (prev, next) => prev.title === next.title,
);
