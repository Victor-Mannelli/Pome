import { AnimeCatalogData, FilterType } from "@/utils/types";
import { Dispatch, SetStateAction } from "react";
import { animeApi } from "@/utils/axios";

export async function getAnimes({ setAnimeData, setFailed, setLoading, quantity, page, filter }: {
  setAnimeData: Dispatch<SetStateAction<AnimeCatalogData | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setFailed: Dispatch<SetStateAction<boolean>>;
  quantity: number;
  filter?: FilterType;
  page: any;
}) {
  const variables = {
    page: page || 1,
    year: Number(new Date().getFullYear() + '0000'),
    status: filter.status,
    id_not_in: filter.id_not_in,
  };
  const query = `
    query ($page: Int, $year: FuzzyDateInt, $status: MediaStatus, $id_not_in: [Int]) {
      Page (page: $page, perPage: ${quantity}) {
        pageInfo {
          currentPage
          hasNextPage
        }
        media (status: $status, startDate_greater: $year, type: ANIME, format: TV, isAdult: false${filter.search.length > 0 ? `, search: ` + filter.search : ""}, id_not_in: $id_not_in) {
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
    .catch(() => {
      setFailed(true)
    })
    .finally(() => setLoading(false));
}
