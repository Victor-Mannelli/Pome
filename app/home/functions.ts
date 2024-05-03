import { AnimeData, UsersAnimeList } from "@/utils";
import { Dispatch, SetStateAction } from "react";
import { animeApi, api } from "@/utils/axios";

export async function getAnimes({ setAnimeData, setFailed, setLoading, quantity, page, filter }: {
  setAnimeData: Dispatch<SetStateAction<AnimeData | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setFailed: Dispatch<SetStateAction<boolean>>;
  quantity: number;
  filter?: string;
  page: any;
}) {
  const variables = {
    page: page || 1,
    year: Number(new Date().getFullYear() + '0000'),
  };
  const query = `
    query ($page: Int, $year: FuzzyDateInt) {
      Page (page: $page, perPage: ${quantity}) {
        pageInfo {
          currentPage
          hasNextPage
        }
        media (status: RELEASING, startDate_greater: $year, type: ANIME, format: TV, isAdult: false${filter ? `, search: "${filter}"` : ""} ) {
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
    }
  `;

  setLoading(true);
  animeApi
    .post('', { query, variables }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      }
    })
    .then((e) => {
      setAnimeData(e.data.data.Page)
      setFailed(false);
    })
    .catch(() => setFailed(true))
    .finally(() => setLoading(false));
}

export async function getUsersAnimeList({ setUsersAnimeList, setLoading, setFailed }: {
  setUsersAnimeList: Dispatch<SetStateAction<UsersAnimeList[] | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setFailed: Dispatch<SetStateAction<boolean>>;
}) {
  setLoading(true);
  api
    .get('/animes/userlist')
    .then((e) => setUsersAnimeList(e.data))
    .catch((e) => { setFailed(true); console.log(e, "user_animelist_error"); })
    .finally(() => setLoading(false));
}
