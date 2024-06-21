export type UsersAnimeData = {
  id: number;
  user_id: number;
  anime_id: number;
  status: string;
  score: number;
  progress: number;
  rewatches: number;
  start_date: string;
  finish_date: string | null;
  favorite: boolean;
};

export type AnimeData = {
  Page: AnimeCatalogData;
};
export type AnimeCatalogData = {
  media: SingleAnimeData[];
  pageInfo: PageInfo;
};
export type SingleAnimeData = {
  id: number;
  title: {
    romaji: string;
    english: string;
    native: string;
  };
  type: string;
  format: string;
  status: string;
  description: string;
  startDate: {
    year: number;
    month: number;
    day: number;
  };
  endDate: {
    year: number;
    month: number;
    day: number;
  };
  season: string;
  episodes: number;
  duration: number;
  chapters: number;
  volumes: number;
  source: string;
  trailer: {
    id: number;
    site: string;
    thumbnail: string;
  };
  updatedAt: number;
  coverImage: {
    extraLarge: string;
    large: string;
    medium: string;
  };
  bannerImage: string;
  genres: string[];
  synonyms: string[] | string;
  averageScore: number;
  popularity: number;
  favourites: number;
  tags: AnimeTags[];
  characters: {
    nodes: {
      id: number;
      name: {
        full: string;
      };
      image: {
        large: string;
        medium: string;
      };
      gender: string;
      description: string;
      dateOfBirth: {
        year: number;
        month: number;
        day: number;
      };
      age: number;
      bloodType: string;
      favourites: number;
    };
  };
  isAdult: boolean;
  nextAiringEpisode: {
    id: number;
    timeUntilAiring: number;
    episode: number;
  };
};
export type PageInfo = {
  currentPage: number;
  hasNextPage: boolean;
};

// export type SingleAnimeDataForSlug = {
//   id: number;
//   anime_id: number;
//   title: {
//     romaji: string;
//     english: string;
//     native: string;
//   };
//   status: string;
//   description: string;
//   startDate: {
//     year: number;
//     month: number;
//     day: number;
//   };
//   endDate: {
//     year: number | null;
//     month: number | null;
//     day: number | null;
//   };
//   episodes: string;
//   chapters: number | null;
//   volumes: number | null;
//   coverImage: {
//     extraLarge: string;
//     large: string;
//     medium: string;
//   };
//   bannerImage: string;
//   genres: string[];
//   tags: AnimeTags[];
//   averageScore: number;
//   nextAiringEpisode: {
//     id: number;
//     episode: number;
//     timeUntilAiring: number;
//   };
//   trailer: {
//     id: string;
//     site: string;
//     thumbnail: string;
//   };
//   UserAnimeList?: {
//     id: number;
//     user_id: number;
//     anime_id: number;
//     status: string;
//     score: number;
//     progress: number;
//     rewatches: number;
//     start_date: string;
//     finish_date: string | null;
//     favorite: boolean;
//   };
// };
export type AnimeTags = {
  id: number;
  name: string;
  description: string;
  isAdult: boolean;
  category: string;
};

export type AnimeUserStatus = {
  id?: number;
  anime_id?: number;
  status: string;
  score?: number;
  progress?: number;
  rewatches?: number;
  startDate?: string;
  finishDate?: string;
  favorite: boolean;
};

export type User = {
  user_id: string;
  username: string;
  email: string;
  banner: string;
  avatar: string;
};

export type FilterType = {
  status: 'FINISHED' | 'RELEASING' | 'NOT_YET_RELEASED' | 'CANCELLED' | 'HIATUS';
  search: string;
  id_not_in?: number[];
  genres: string | null;
  year: number;
};
