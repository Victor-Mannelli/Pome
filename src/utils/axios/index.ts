import axios from "axios";
import nookies from "nookies";
import { AnimeData } from "../Interfaces";

export const api = axios.create({ baseURL: process.env.BASE_URL });

export const animeApi = axios.create({ baseURL: process.env.NEXT_PUBLIC_ANIME });

export const apiAuth = axios.create({
  baseURL: process.env.BASE_URL,
  withCredentials: false,
  headers: {
    Authorization: `Bearer ${nookies.get(null, "token").token}`,
  },
});

export async function GraphqlRequestFunction({ id, page }: { id?: number, page?: number }) {
  let variables;
  id !== undefined ? variables = { id } : variables = { page }
 
  let query = "";
  id !== undefined ? ( 
    query = `
      query ($id: Int) { # Define which variables will be used in the query (id)
        Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
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
    ` 
  ) : (
    query = `
      query ($page: Int) {
        Page (page: $page, perPage: 20) {
          pageInfo {
            currentPage
            hasNextPage
          }
          media {
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
    `
  )

  try {
    const { data } = await axios.post('https://graphql.anilist.co', { query, variables }, { 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'Authorization': 'Bearer G075tn5iqPZIJxS8CpUUbo1WlYrXpkQfejxCIZ29'
      }
    });
    return data.data.Page
  } catch (error) {
    console.log(error)
  }
};
