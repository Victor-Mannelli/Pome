import axios from "axios";
import nookies from "nookies";

export const api = axios.create({ baseURL: process.env.BASE_URL });

export const animeApi = axios.create({ baseURL: process.env.NEXT_PUBLIC_ANIME });

export const apiAuth = axios.create({
  baseURL: process.env.BASE_URL,
  withCredentials: false,
  headers: {
    Authorization: `Bearer ${nookies.get(null, "token").token}`,
  },
});

// relations {
//   edges: [MediaEdge]
//   nodes: [Media]
//   pageInfo: PageInfo
// }

export async function GraphqlRequestFunction({ id }: { id?: number }) {

  let variables = {
    id
  };

  // let pageQuery = `
  //   Page {
  //     Media {
  //       id
  //       title {
  //         romaji
  //         english
  //         native
  //       }
  //       type {
  //         ANIME
  //         MANGA
  //       }
  //       format {
  //         TV
  //         TV_SHORT
  //         MOVIE
  //         SPECIAL
  //         OVA
  //         ONA
  //         MUSIC
  //         MANGA
  //         NOVEL
  //         ONE_SHOT
  //       }
  //       status {
  //         FINISHED
  //         RELEASING
  //         NOT_YET_RELEASED
  //         CANCELLED
  //         HIATUS
  //       }
  //       description
  //       startDate
  //       endDate
  //       season {
  //         WINTER
  //         SPRING
  //         SUMMER
  //         FALL
  //       }
  //       seasonYear
  //       seasonInt
  //       episodes
  //       duration
  //       chapters
  //       volumes
  //       source {
  //         ORIGINAL
  //         MANGA
  //         LIGHT_NOVEL
  //         VISUAL_NOVEL
  //         VIDEO_GAME
  //         OTHER
  //         NOVEL
  //         DOUJINSHI
  //         ANIME
  //         WEB_NOVEL
  //         LIVE_ACTION
  //         GAME
  //         COMIC
  //         MULTIMEDIA_PROJECT
  //         PICTURE_BOOK
  //       }
  //       hashtag
  //       trailer {
  //         id
  //         site
  //         thumbnail
  //       }
  //       updatedAt
  //       coverImage {
  //         extraLarge
  //         large
  //         medium
  //       }
  //       bannerImage
  //       genres
  //       synonyms 
  //       averageScore
  //       meanScore
  //       popularity
  //       trending
  //       favourites
  //       tags {
  //         id
  //         name
  //         description
  //         category
  //         rank
  //         isGeneralSpoiler
  //         isMediaSpoiler
  //         isAdult
  //         userId
  //       }
  //       characters {
  //         id
  //         name
  //         image
  //         description
  //         gender
  //         dateOfBirth
  //         age
  //         bloodType
  //         isFavourite
  //         favourites
  //       }
  //       isAdult
  //       nextAiringEpisode {
  //         id
  //         airingAt
  //         timeUntilAiring
  //         episode
  //         mediaId
  //         media
  //       }
  //       airingSchedule {
  //         id
  //         airingAt
  //         timeUntilAiring
  //         episode
  //       }
  //       streamingEpisodes {
  //         title
  //         thumbnail
  //         url
  //         site
  //       }
  //     } 
  //   }
  // `
  let query = `
    query ($id: Int) { # Define which variables will be used in the query (id)
      Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
        id
        title {
          romaji
          english
          native
        }
        type {
          ANIME
          MANGA
        }
        format {
          TV
          TV_SHORT
          MOVIE
          SPECIAL
          OVA
          ONA
          MUSIC
          MANGA
          NOVEL
          ONE_SHOT
        }
        status {
          FINISHED
          RELEASING
          NOT_YET_RELEASED
          CANCELLED
          HIATUS
        }
        description
        startDate
        endDate
        season {
          WINTER
          SPRING
          SUMMER
          FALL
        }
        seasonYear
        seasonInt
        episodes
        duration
        chapters
        volumes
        source {
          ORIGINAL
          MANGA
          LIGHT_NOVEL
          VISUAL_NOVEL
          VIDEO_GAME
          OTHER
          NOVEL
          DOUJINSHI
          ANIME
          WEB_NOVEL
          LIVE_ACTION
          GAME
          COMIC
          MULTIMEDIA_PROJECT
          PICTURE_BOOK
        }
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
          rank
          isGeneralSpoiler
          isMediaSpoiler
          isAdult
          userId
        }
        characters {
          id
          name
          image
          description
          gender
          dateOfBirth
          age
          bloodType
          isFavourite
          favourites
        }
        isAdult
        nextAiringEpisode {
          id
          airingAt
          timeUntilAiring
          episode
          mediaId
          media
        }
        airingSchedule {
          id
          airingAt
          timeUntilAiring
          episode
        }
        streamingEpisodes {
          title
          thumbnail
          url
          site
        }
      }
    }
  `;

  // if (id) {
    axios
      .post('https://graphql.anilist.co', { query, variables }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // 'Authorization': 'Bearer G075tn5iqPZIJxS8CpUUbo1WlYrXpkQfejxCIZ29'
        }
      })
      .then(response => {
        console.log(response.data);
        return (response.data);
      })
      .catch(error => {
        console.error(error);
      })
  // } else {
  //   axios
  //     .post('https://graphql.anilist.co', { pageQuery }, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json',
  //         // 'Authorization': 'Bearer G075tn5iqPZIJxS8CpUUbo1WlYrXpkQfejxCIZ29'
  //       }
  //     })
  //     .then(response => {
  //       console.log(response.data);
  //       return (response.data);
  //     })
  //     .catch(error => {
  //       alert('Error, check console');
  //       console.error(error);
  //     })
  // }
}
