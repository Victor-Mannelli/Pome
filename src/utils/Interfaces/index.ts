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
export interface ProfileData {
  data: {
    username: string
  }
}

export interface User {
  user_id: number,
  email: string,
  username: string
}
