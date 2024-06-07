import { FilterType } from '@/utils';
import { gql } from '@apollo/client';

export const getAnimesVariables = ({ quantity, page, filter }: { filter: FilterType; quantity: number; page: number }) => {
  return {
    search: filter.search,
    genre: filter.genres,
    page: page || 1,
    year: filter.status === 'RELEASING' ? Number(new Date().getFullYear() + '0000') : filter.year == null ? 0 : Number(filter.year + '0000'),
    quantity,
    id_not_in: filter.id_not_in || [],
    status_in: filter.status ? [filter.status] : ['FINISHED', 'RELEASING', 'NOT_YET_RELEASED', 'CANCELLED', 'HIATUS'],
  };
};

export const getAnimesQuery = gql`
  query ($page: Int, $year: FuzzyDateInt, $status_in: [MediaStatus], $id_not_in: [Int], $quantity: Int, $search: String, $genre: String) {
    Page(page: $page, perPage: $quantity) {
      pageInfo {
        currentPage
        hasNextPage
      }
      media(
        status_in: $status_in
        startDate_greater: $year
        type: ANIME
        format: TV
        isAdult: false
        search: $search
        id_not_in: $id_not_in
        genre: $genre
      ) {
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
