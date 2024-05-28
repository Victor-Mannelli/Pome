import { AnimeUserStatus, SingleAnimeDataForSlug } from "@/utils/types"
import { Dispatch, SetStateAction } from "react";
import { animeApi, api } from "@/utils";
import { parseCookies } from "nookies";

export async function getAnimeDataForSlug({ animeId, setData, setFailed, setLoading }: {
  setData: Dispatch<SetStateAction<SingleAnimeDataForSlug>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setFailed: Dispatch<SetStateAction<boolean>>;
  animeId: string;
}) {
  const token = parseCookies(null).token;
  if (token) {
    setLoading(true);
    api
      .get(`/animes/${animeId}`)
      .then((e) => {
        setData(e.data);
        setFailed(false);
        return;
      })
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  } else {
    const variables = {
      id: Number(animeId)
    };
    const query = `
      query ($id: Int) {
        Media (id: $id) {
          id
          title {
            romaji
            english
            native
          }
          type
          format
          status
          description
          startDate {
            year
            month
            day
          }
          endDate {
            year
            month
            day
          }
          season
          episodes
          duration
          chapters
          volumes
          source
          hashtag
          trailer {
            id
            site
            thumbnail
          }
          updatedAt
          coverImage {
            extraLarge
            large
            medium
          }
          bannerImage
          genres
          synonyms 
          averageScore
          meanScore
          popularity
          trending
          favourites
          tags {
            id
            name
            description
            category
            isAdult
          }
          characters {
            nodes {
              id
              name {
                full
              }
              image {
                large
                medium
              }
              gender
              description
              dateOfBirth {
                year
                month
                day
              }
              age
              bloodType
              isFavourite
              favourites
            }
          }
          isAdult
          nextAiringEpisode {
            id
            timeUntilAiring
            episode
          }
        }
      }
    `;
    animeApi
      .post('', { query, variables }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
      .then((e) => {
        setData(e.data.data.Media)
      })
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  }
}

export function maximizeTrailer({ toggle, setToggle }: { setToggle: Dispatch<SetStateAction<boolean>>; toggle: boolean; }) {
  setToggle(!toggle);
  setTimeout(() => {
    if (toggle) return
    scrollBy({
      top: 700, left: 0, behavior: "smooth"
    })
  }, 500);
}

export async function getUniqueUserAnimelist({ setData, animeId, setFailed, setLoading }: {
  setData: Dispatch<SetStateAction<any | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setFailed: Dispatch<SetStateAction<boolean>>;
  animeId: string;
}) {
  setLoading(true);
  api
    .get('/animelist')
    .then((e) => {
      const AnimeData = e.data.find((e: any) => e.anime_id === Number(animeId))
      if (AnimeData) setData(AnimeData)
    })
    .catch(() => setFailed(true))
    .finally(() => setLoading(false));
}

export async function removeAnimeFromUserAnimelist(animeId: number, toast: any) {
  api
    .delete(`/animelist/${animeId}`)
    .then(() =>
      toast({
        title: "Anime deleted from your list",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    )
    .catch(() =>
      toast({
        title: "An error has occured",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    )
}

export async function addAnimeToUserAnimelist({ animeUserStats, setLoading, setFailed, setData, setShowAnimeSettings, toast }: {
  setData: Dispatch<SetStateAction<SingleAnimeDataForSlug | null>>;
  setShowAnimeSettings: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setFailed: Dispatch<SetStateAction<boolean>>;
  animeUserStats: AnimeUserStatus;
  toast: any;
}) {
  setLoading(true);

  const newData = {
    anime_id: animeUserStats.anime_id,
    status: animeUserStats.status,
    start_date: animeUserStats.startDate,
    ...(animeUserStats.score !== 0 && { score: animeUserStats.score }),
    ...(animeUserStats.progress !== 0 && { progress: animeUserStats.progress }),
    ...(animeUserStats.rewatches !== 0 && { rewatches: animeUserStats.rewatches }),
    ...(animeUserStats.finishDate.length !== 0 && { finish_date: animeUserStats.finishDate }),
    ...(animeUserStats.favorite && { favorite: animeUserStats.favorite }),
  }
  api
    .post("/animelist", newData)
    .then((e) => {
      setData(prevState => ({
        ...prevState, UserAnimeList: e.data
      }))
      setShowAnimeSettings(false)
      toast({
        title: "Anime status updated!",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    })
    .catch(() => {
      setFailed(true);
      toast({
        title: "Error on updating",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    })
    .finally(() => setLoading(false));
}
