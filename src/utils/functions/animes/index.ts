import { AnimeData, UserFollowingAnime } from '@/utils/interfaces';
import { Dispatch, SetStateAction } from 'react';
import { animeApi, api } from '@/utils/axios';

export async function getAnimes({ quantity, page, setData }: {
  setData: Dispatch<SetStateAction<AnimeData>> | any;
  quantity: number;
  page: any;
}) {
  const variables = {
    page: page || 0,
    year: Number(new Date().getFullYear() + '0000'),
  };
  const query = `
    query ($page: Int, $year: FuzzyDateInt) {
      Page (page: $page, perPage: ${quantity}) {
        pageInfo {
          currentPage
          hasNextPage
        }
        media (status: RELEASING, startDate_greater: $year, type: ANIME, format: TV, isAdult: false) {
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
  animeApi
    .post('', { query, variables }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      }
    })
    .then((e) => {
      setData(e.data.data.Page)
    })
    .catch((e) => console.log(e, 'error'))
}

export function populateDb(id: number) {
  api.post('/animes/populate', { id });
}

export function updateFollowedAnime({ animeId, progress, toggle, setToggle }: {
  setToggle: Dispatch<SetStateAction<boolean>>
  progress: number;
  animeId: number,
  toggle: boolean;
}) {
  api.patch('/animes/updateProgress', { animeId, progress });
  setToggle(!toggle);
}

export function getAnimesUserList(setUserFollowedAnimes: Dispatch<SetStateAction<UserFollowingAnime[]>>) {
  api
    .get('/animes/userlist')
    .then((e) => setUserFollowedAnimes(e.data))
    .catch((e) => console.log(e))
}