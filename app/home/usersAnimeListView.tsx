"use client"

import { FollowedAnimeSkeleton } from "@/components";
import { UsersAnimeList } from "@/utils";
import { useEffect } from "react";
// import { useEffect } from "react";

export function UsersAnimeListView({ usersAnimeList, router }: {
  usersAnimeList: UsersAnimeList[] | null;
  router: any;
}) {

  useEffect(() => {
    
    window.addEventListener('resize', function() {
      calculatePadding();
    });
  
    return () => {
      window.removeEventListener('resize', function() {
        calculatePadding();
      });
    }
  }, [])
  

  
  // window.addEventListener('load', function() {
  //   calculatePadding();
  // });
  
  function calculatePadding() {
    var flexContainer: any = document.getElementById('wrapper-container');
    var children = flexContainer?.children;
    console.log(flexContainer)
    console.log(children)
    var childWidth = children[0].offsetWidth; // Assuming all children have the same width
    var containerWidth = flexContainer.offsetWidth;
    var numChildrenPerRow = Math.floor(containerWidth / (childWidth + 20)); // 20px is the gap between children
    
    var totalWidth = numChildrenPerRow * (childWidth + 20); // Total width of children in a row
    var padding = (containerWidth - totalWidth) / 2;
  
    flexContainer.style.paddingLeft = padding + 'px';
  }

  return (
    <div className="flex lg:flex-col gap-5 lg:w-2/5 w-full h-fit rounded-md">
      <div className="flex flex-col bg-third w-full gap-4 rounded-md overflow-auto">
        <h1 className="font-bold text-center pt-5"> You are following </h1>
        <div className="wrapper-container">
          {usersAnimeList ?
            usersAnimeList.length > 0 ? usersAnimeList.map((e: UsersAnimeList) => (
              <div
                className="flex flex-col justify-end w-32 h-40 bg-fifth rounded-md bg-cover cursor-pointer hover:shadow-black hover:shadow-inner"
                onClick={() => router.push(`/pome/animes/${e.anime.anime_id}`)}
                style={{ backgroundImage: `url(${e.anime.cover_image})` }}
                key={e.anime.anime_id}
              >
                {/* <div className='flex flex-col justify-center items-center h-fit w-full bg-black bg-opacity-50 rounded-b-md border-b-8 border-signature cursor-default'>
                {e.anime.next_airing_episode.episode - 1 - e.progress > 0 ?
                  <div className='flex items-center gap-5'>
                    <BiMinus
                      className='text-white text-xl cursor-pointer hover:text-eigth'
                      onClick={(event) => {
                        event.stopPropagation();
                        updateFollowedAnime({ progress: e.progress - 1, animeId: e.anime.anime_id, toggle, setToggle })
                      }}
                    />
                    <h3 className='text-white'> {e.anime.next_airing_episode.episode - 1 - e.progress} </h3>
                    <BiPlus
                      className='text-white text-xl cursor-pointer hover:text-eigth'
                      onClick={(event) => {
                        event.stopPropagation();
                        updateFollowedAnime({ progress: e.progress + 1, animeId: e.anime.anime_id, toggle, setToggle })
                      }}
                    />
                  </div>
                  : null
                }
                <h3 className={`text-white ${e.anime.next_airing_episode.episode - 1 - e.progress > 0 ? '' : 'py-1'}`}>
                  {
                    Math.floor(e.anime.next_airing_episode.timeUntilAiring / 86400)
                  }d {
                    Math.floor((e.anime.next_airing_episode.timeUntilAiring % 86400) / 3600)
                  }h {
                    Math.floor((e.anime.next_airing_episode.timeUntilAiring % 3600) / 60)
                  }m
                </h3>
              </div> */}
              </div>
            )) :
              <div className='w-full h-fit p-5 rounded-md bg-third'>
                {/* <div className='w-32 h-fit bg-fifth rounded-md bg-cover cursor-pointer hover:shadow-black hover:shadow-inner'> */}
                <p className='text-center'> You are not following any anime yet <br /> open their pages and start following!</p>
              </div>
            : <FollowedAnimeSkeleton />
          }
        </div>
      </div>
    </div>
  )
}