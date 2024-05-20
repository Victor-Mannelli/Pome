import { SingleAnimeDataForSlug } from "@/utils/types"
import { Dispatch, SetStateAction } from "react";
import { animeApi, api } from "@/utils";
import { toast } from "react-toastify";

export async function getAnimeData({ animeId, setData, setFailed, setLoading }: {
  setData: Dispatch<SetStateAction<SingleAnimeDataForSlug>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setFailed: Dispatch<SetStateAction<boolean>>;
  animeId: string;
}) {
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

  setLoading(true);
  animeApi
    .post('', { query, variables }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    .then((e) => {
      setData(e.data.data.Media);
      setFailed(false);
    })
    .catch(() => setFailed(true))
    .finally(() => setLoading(false));
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

export async function addAnimeToUserAnimelist({ animeUserStats, setLoading, setFailed, setUsersAnimeStatus }: {
  setUsersAnimeStatus: Dispatch<SetStateAction<any | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setFailed: Dispatch<SetStateAction<boolean>>;
  animeUserStats: any;
}) {
  setLoading(true);

  const datePattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  const newData = {
    anime_id: animeUserStats.anime_id,
    status: animeUserStats.status,
    ...(animeUserStats.score !== 0 && { score: animeUserStats.score }),
    ...(animeUserStats.progress !== 0 && { progress: animeUserStats.progress }),
    ...(animeUserStats.rewatches !== 0 && { rewatches: animeUserStats.rewatches }),
    start_date: animeUserStats.startDate,
    ...(datePattern.test(animeUserStats.finishDate.toString()) && { finish_date: animeUserStats.finishDate }),
  }
  api
    .post("/animelist", newData)
    .then((e) => {
      console.log(e.data)
      toast.success("Anime status updated!")
    })
    .catch(() => { setFailed(true); toast.error("Error on updating") })
    .finally(() => setLoading(false));
}

export function populateDb(id: number) {
  api.post('/animes/populate', { id });
}