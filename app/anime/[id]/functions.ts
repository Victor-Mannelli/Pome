import { AnimeUserStatus, SingleAnimeDataForSlug } from "@/utils/types"
import { Dispatch, SetStateAction, useContext } from "react";
import { TokenContext, animeApi, api } from "@/utils";
import { toast } from "react-toastify";

export async function getAnimeDataForSlug({ animeId, setData, setFailed, setLoading }: {
  setData: Dispatch<SetStateAction<SingleAnimeDataForSlug>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setFailed: Dispatch<SetStateAction<boolean>>;
  animeId: string;
}) {
  let userLogged = true;

  setLoading(true);
  api
    .get(`/animes/${animeId}`)
    .then((e) => {
      setData(e.data);
      setFailed(false);
      return;
    })
    .catch(() => {
      userLogged = false;
    })
    .finally(() => userLogged && setLoading(false));

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
  console.log(userLogged)

  if (!userLogged) {
    animeApi
      .post('', { query, variables }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
      .then((e) => {
        console.log(e.data.data.Media, "fu")
        setData(e.data.data.Media)
      })
      .finally(() => setLoading(false));
  }
}

export function maximizeTrailer({ toggle, setToggle }: {
  setToggle: Dispatch<SetStateAction<boolean>>;
  toggle: boolean;
}) {
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
      if (AnimeData) return setData(AnimeData);
      return
    })
    .catch((e) => setFailed(true))
    .finally(() => setLoading(false));
}

export async function removeAnimeFromUserAnimelist(animeId: number) {
  api
    .delete(`/animelist/${animeId}`)
    .then(() => toast.success("Anime deleted from your list"))
    .catch(() => toast.error("An error has occured"))
}

export async function addAnimeToUserAnimelist({ animeUserStats, setLoading, setFailed, setData, setShowAnimeSettings }: {
  setData: Dispatch<SetStateAction<SingleAnimeDataForSlug | null>>;
  setShowAnimeSettings: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setFailed: Dispatch<SetStateAction<boolean>>;
  animeUserStats: AnimeUserStatus;
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
      toast.success("Anime status updated!")
    })
    .catch(() => { setFailed(true); toast.error("Error on updating") })
    .finally(() => setLoading(false));
}
