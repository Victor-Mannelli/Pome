export interface LoginFetchData {
  email: string,
  password: string,
  confirmPassword: string,
}
export interface SignupFetchData {
  email: string,
  username: string,
  password: string,
  confirmPassword: string,
  userBanner: string,
}
export interface AnimeInfoData {
  data: AnimeInfo[]
}
export interface AnimeInfo {
  title: string,
  score: number,
  images: {
    jpg: {
      image_url: string,
      large_image_url: string,
      small_image_url: string,
    },
  },
  mal_id: number,
  genres: {
    mal_id: number,
    name: string,
  }[],
  year: number,
  background: string,
  synopsis: string,
  trailer: {
    embed_url: string,
    images: {
      image_url: string,
    },
    url: string,
    youtube_id: string
  }
}
export interface AnimeData {
  media: {
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
    genres: string[] | string,
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
    },
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
  }[]
  pageInfo: {
    currentPage: number,
    hasNextPage: boolean
  }
}
export interface SingleAnimeData {
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
export interface ChatMessages {
  message: string
}

export interface ToastError {
  data: {
    response: {
      data: {
        message: string
      }
    }
  }
}

export interface User { // being used at Users List for Friend Requests
  user_id: number,
  username: string
}
export interface FriendAsFData { // being used at friends.tsx as the element of the friendlist
  friend: {
    user_id: number,
    username: string;
    // profile_picture: string;
    // timestamp: Date;
    // message: string
  }
}
export interface FriendAsUData { // being used at friends.tsx as the element of the friendlist
  user: {
    user_id: number,
    username: string;
    // profile_picture: string;
    // timestamp: Date;
    // message: string
  }
}
export interface FriendsData { // friends tsx pre fectched data
  friendList: {
    friendshipsAsUser: {
      friend: {
        user_id: number,
        username: string,
      }
    }[]
    friendshipsAsFriend: {
      user: {
        user_id: number,
        username: string,
      }
    }[]
  },
  userData: {
    user_id: number,
    username: string,
  }
}
export interface UsersList {
  user_id: number,
  username: string
}[];
export interface FriendRequests {
  friend_request_id: number,
  requester_id: number,
  requested_id: number,
}

export interface AnimeUserStatsInterface {
  status: string,
  score: number,
  progress: number,
  rewatches: number,
  startDate: Date,
  finishDate: Date | null
}
export interface AnimeUserStatusData extends AnimeUserStatsInterface {
  animeId: number,
  favorite: boolean,
}

export interface ChatMessagesInterface {
  profile_picture: string
  author: {
    username: string,
  },
  author_id: number, // don´t think I need this one
  created_at: string,
  message: string,
  message_id: number,
  receiver: {
    username: string,
  }
  receiver_id: number // don´t think I need this one
}

export interface UserFollowingAnime {
  anime: {
    anime_id: number,
    title: string,
    status: string,
    average_score: number,
    banner_image: string,
    cover_image: string, 
    description: string,
    start_date: number
    end_date: number,
    episodes: number
    genres: string[]
    volumes: string,
    next_airing_episode: {
      episode: number,
      timeUntilAiring: number
    }
  }
  anime_id: number,
  favorite: false,
  finish_date: number,
  progress: number,
  rewatches: number,
  score: number,
  start_date: number,
  status: string,
}

