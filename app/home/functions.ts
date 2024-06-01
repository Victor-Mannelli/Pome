import { AnimeCatalogData, FilterType } from "@/utils/types";
import { Dispatch, SetStateAction } from "react";
import { animeApi } from "@/utils/libs/axios";

export async function getAnimes({ setAnimeData, setFailed, setLoading, quantity, page, filter }: {
  setAnimeData: Dispatch<SetStateAction<AnimeCatalogData | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setFailed: Dispatch<SetStateAction<boolean>>;
  quantity: number;
  filter?: FilterType;
  page: any;
}) {
  const variables = {
    search: filter.search,
    genre: filter.genres,
    page: page || 1,
    year: filter.status === "RELEASING"
      ? Number(new Date().getFullYear() + '0000')
      : filter.year == null
        ? 0
        : filter.year + '0000',
    quantity,
    id_not_in: filter.id_not_in,
    status_in: filter.status ? [filter.status] : ["FINISHED", "RELEASING", "NOT_YET_RELEASED", "CANCELLED", "HIATUS"],
  }

  const query = `
    query ($page: Int, $year: FuzzyDateInt, $status_in: [MediaStatus], $id_not_in: [Int], $quantity: Int, $search: String, $genre: String) {
      Page (page: $page, perPage: $quantity) {
        pageInfo {
          currentPage
          hasNextPage
        }
        media (status_in: $status_in, startDate_greater: $year, type: ANIME, format: TV, isAdult: false, search: $search, id_not_in: $id_not_in, genre: $genre) {
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
