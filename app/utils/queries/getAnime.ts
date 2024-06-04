import { gql } from "@apollo/client";

export const getAnimeQuery = gql`
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
