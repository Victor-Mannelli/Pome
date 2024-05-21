export type UsersAnimelist = {
  id: number,
  user_id: number,
  anime_id: number,
  status: string,
  score: number,
  progress: number,
  rewatches: number,
  start_date: string,
  finish_date: string | null,
  favorite: boolean,
  anime: {
    cover_image: string,
  }
}

export type AnimeCatalogData = {
  media: SingleAnimeData[],
  pageInfo: PageInfo,
}
export type SingleAnimeData = {
  id: number,
  title: {
    romaji: string,
    english: string,
    native: string,
  },
  type: string,
  format: string,
  status: string
  description: string,
  startDate: {
    year: number,
    month: number,
    day: number,
  },
  endDate: {
    year: number,
    month: number,
    day: number,
  },
  season: string,
  episodes: number,
  duration: number,
  chapters: number,
  volumes: number,
  source: string,
  trailer: {
    id: number,
    site: string,
    thumbnail: string,
  },
  updatedAt: number,
  coverImage: {
    extraLarge: string,
    large: string,
    medium: string,
  },
  bannerImage: string,
  genres: string[],
  synonyms: string[] | string,
  averageScore: number,
  popularity: number,
  favourites: number,
  tags: {
    id: number,
    name: string,
    description: string,
    category: string,
    isAdult: boolean,
  }[],
  characters: {
    nodes: {
      id: number,
      name: {
        full: string,
      },
      image: {
        large: string,
        medium: string,
      },
      gender: string,
      description: string,
      dateOfBirth: {
        year: number,
        month: number,
        day: number,
      },
      age: number,
      bloodType: string,
      favourites: number,
    }
  }
  isAdult: boolean,
  nextAiringEpisode: {
    id: number
    timeUntilAiring: number,
    episode: number
  }
}
export type PageInfo = {
  currentPage: number,
  hasNextPage: boolean,
}

export type SingleAnimeDataForSlug = {
  id: number,
  anime_id: number,
  title: string,
  status: string,
  description: string,
  start_date: number,
  end_date: number | null,
  episodes: string,
  chapters: number | null,
  volumes: number | null,
  cover_image: string,
  banner_image: string,
  genres: string[],
  tags: string[],
  average_score: number,
  next_airing_episode: {
    id: number,
    episode: number,
    timeUntilAiring: number
  },
  trailer_id: number,
  trailer_site: string,
  trailer_thumbnail: string,
  UserAnimeList?: {
    id: number,
    user_id: number,
    anime_id: number,
    status: string,
    score: number,
    progress: number,
    rewatches: number,
    start_date: string,
    finish_date: string | null,
    favorite: boolean,
  }
}
export type AnimeUserStatus = {
  anime_id: number,
  status: string,
  score?: number;
  progress?: number;
  rewatches?: number,
  startDate?: string,
  finishDate?: string,
  favorite: boolean,
}

// export type AnimeInfoData = {
//   data: AnimeInfo[]
// }
// export type AnimeInfo = {
//   title: string,
//   score: number,
//   images: {
//     jpg: {
//       image_url: string,
//       large_image_url: string,
//       small_image_url: string,
//     },
//   },
//   mal_id: number,
//   genres: {
//     mal_id: number,
//     name: string,
//   }[],
//   year: number,
//   background: string,
//   synopsis: string,
//   trailer: {
//     embed_url: string,
//     images: {
//       image_url: string,
//     },
//     url: string,
//     youtube_id: string
//   }
// }
// export type AnimeData = {
//   media: SingleAnimeData[]
//   pageInfo: {
//     currentPage: number,
//     hasNextPage: boolean
//   }
// }

//   userData: {
//     user_id: number,
//     username: string,
//   }
// }
// export type UsersList = {
//   user_id: number,
//   username: string
// }[];
// export type FriendRequests = {
//   friend_request_id: number,
//   requester_id: number,
//   requested_id: number,
// }

// export type AnimeUserStatus = {
//   anime_id: number,
//   status: string,
//   score: number,
//   progress: number,
//   favorite: boolean,
//   rewatches: number,
//   startDate: string,
//   finishDate: string,
// }

// export type UsersAnimeList = {
//   anime: {
//     anime_id: number,
//     title: string,
//     status: string,
//     average_score: number,
//     banner_image: string,
//     cover_image: string,
//     description: string,
//     start_date: number
//     end_date: number,
//     episodes: number
//     genres: string[]
//     volumes: string,
//     next_airing_episode: {
//       episode: number,
//       timeUntilAiring: number
//     }
//   }
//   anime_id: number,
//   status: string,
//   score: number,
//   progress: number,
//   favorite: boolean,
//   rewatches: number,
//   start_date: Date,
//   finish_date: Date,
// }

