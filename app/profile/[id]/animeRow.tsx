import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { SingleAnimeData, UsersAnimeData } from '@/utils';
import Image from 'next/image';

export function AnimeRow({ router, animeData, anime }: { router: AppRouterInstance; animeData: SingleAnimeData[]; anime: UsersAnimeData }) {
  return (
    <div
      key={anime.anime_id}
      className="grid grid-cols-[6%_58.72%_11%_11%_13.28%] px-3 py-1 w-full items-center hover:bg-second rounded-md cursor-pointer text-sm"
      onClick={() => router.push(`/anime/${anime.anime_id}`)}
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.15) 0px -30px 60px -12px inset',
      }}
    >
      <Image
        alt="animeCover"
        src={animeData.find((animeData) => animeData.id === anime.anime_id).coverImage.medium}
        className="h-[4rem] rounded-sm"
        width={1920}
        height={1080}
      />
      <h3 className="pl-5 break-all cursor-pointer"> {animeData.find((animeData) => animeData.id === anime.anime_id).title.romaji} </h3>
      <h3 className="text-center cursor-pointer"> {anime.score} </h3>
      <h3 className="text-center cursor-pointer"> {anime.progress} </h3>
      <h3 className="text-center cursor-pointer"> {anime.status} </h3>
    </div>
  );
}
