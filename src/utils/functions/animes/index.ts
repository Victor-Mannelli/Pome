import { animeApi, api } from '@/utils/axios';
import { useRouter } from 'next/router';

export async function getAnimes({ quantity, page }: { quantity: number, page: number }) {
  const Router = useRouter();
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
  try {
    let { data } = await animeApi.post('', { query, variables }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    return data = data.data.Page;
  } catch (error) {
    Router.push('/pome/login')
  }
}

export function populateDb(id: number) {
  api.post('/animes/populate', { id });
}
