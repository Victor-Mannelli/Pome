import { BiPlus, BiMinus } from "@/utils/libs";
import { UsersAnimelist } from "@/utils/types";

export function UsersAnimeListView({ usersAnimeList, router }: {
  usersAnimeList: UsersAnimelist[] | null;
  router: any;
}) {
  return (
    <div className="flex flex-col bg-third rounded-md xl:w-[34rem] lg:w-[17.75rem] md:w-[42.125rem] sm:w-[25.875rem] w-[17.75rem]">
      <h1 className="font-bold text-center pt-5"> You are following </h1>
      <div className="flex flex-wrap p-5 gap-4">
        {usersAnimeList.length > 0 ? usersAnimeList.map((e: UsersAnimelist) => (
          <div
            className="flex flex-col justify-end w-[7.125rem] h-40 bg-fifth rounded-md bg-cover cursor-pointer hover:shadow-black hover:shadow-inner"
            onClick={() => router.push(`/anime/${e.anime_id}`)}
            style={{ backgroundImage: `url(${e.anime.coverImage.extraLarge})` }}
            key={e.anime_id}
          >
            <div className={`flex flex-col justify-center items-center h-fit w-full bg-black bg-opacity-50 rounded-b-md cursor-default
              ${e.anime.nextAiringEpisode.episode - 1 - e.progress > 0 ? "border-b-8 border-signature" : ""}
            `}>
              {e.anime.nextAiringEpisode.episode - 1 - e.progress > 0 ?
                <div className='flex items-center gap-5'>
                  <BiMinus
                    className='text-white text-xl cursor-pointer hover:text-eigth'
                    onClick={(event) => {
                      event.stopPropagation();
                      // updateFollowedAnime({ progress: e.progress - 1, animeId: e.anime.anime_id, toggle, setToggle })
                    }}
                  />
                  <h3 className='text-white'> {e.anime.nextAiringEpisode.episode - 1 - e.progress} </h3>
                  <BiPlus
                    className='text-white text-xl cursor-pointer hover:text-eigth'
                    onClick={(event) => {
                      event.stopPropagation();
                      // updateFollowedAnime({ progress: e.progress + 1, animeId: e.anime.anime_id, toggle, setToggle })
                    }}
                  />
                </div>
                : null
              }
              <h3 className={`text-white ${e.anime.nextAiringEpisode.episode - 1 - e.progress > 0 ? '' : 'py-1'}`}>
                {
                  Math.floor(e.anime.nextAiringEpisode.timeUntilAiring / 86400)
                }d {
                  Math.floor((e.anime.nextAiringEpisode.timeUntilAiring % 86400) / 3600)
                }h {
                  Math.floor((e.anime.nextAiringEpisode.timeUntilAiring % 3600) / 60)
                }m
              </h3>
            </div>
          </div>
        )) : (
          <div className='w-full h-fit p-5 rounded-md bg-third'>
            <p className='text-center'> You are not following any anime yet <br /> open their pages and start following!</p>
          </div>
        )}
      </div>
    </div>
  )
}