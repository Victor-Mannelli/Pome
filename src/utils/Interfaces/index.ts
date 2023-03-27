import { useRouter } from "next/router";

export interface LoginHandler {
  email: string;
  password: string;
  router: ReturnType<typeof useRouter>;
}
export interface LoginFetchData {
  email: string,
  password: string,
  confirmPassword: string,
}
export interface SignupFetchData {
  email: string,
  password: string,
  confirmPassword: string,
  userBanner: string,
}

export interface AnimeInfo {
  data: {
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
}
