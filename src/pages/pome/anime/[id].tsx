import GenresList from "@/components/genres";
import { Stars } from "@/components/stars";
import { animeApi } from "@/utils/axios";
import { SingleAnimeData } from "@/utils/Interfaces";
import { NextPageContext } from "next";
// import { useRouter } from "next/router";
// import { BiUpArrow } from "react-icons/bi";

export default function AnimePage({ data }: { data: SingleAnimeData }) {
  console.log(data);
  return (
    <div className={`flex flex-col items-center gap-5 pb-7 ${data.bannerImage ? "" : "mt-56"}`}>
      {data.bannerImage ? (
         <div 
         className={`w-full h-[22rem] bg-cover`}
         style={{backgroundImage: `url(${data.bannerImage})`}}
       > </div>
      ) : null}
      <div className="h-1/2 w-full rounded-xl flex gap-2 px-5">
        <div className="relative w-[19rem] h-64 flex flex-col justify-end items-center">
          <img
            className="absolute top-[-10rem] rounded-xl w-[80%] h-[23rem]"
            src={data.coverImage.extraLarge}
            alt="pfp"
          />
          <div className="bg-seventh w-[80%] h-9 rounded-md cursor-pointer">

          </div>
        </div>
        <div className="w-[75%] flex flex-col gap-3">
          <div className="w-full pl-2">
            <h1 className="font-bold text-3xl"> {data.title.romaji} </h1>
          </div>
          <div className="w-full">
            <div className="bg-seventh h-9 rounded-xl flex items-center px-3 mb-2">
              {data.averageScore ? <Stars score={data.averageScore} /> : null}
            </div>
            {data.genres ? <GenresList genres={data.genres} /> : null}
          </div>
        </div>
      </div>
      <div className="bg-sixth rounded-xl w-[98%] p-5">
        <h1 className="text-3xl font-bold pb-3"> Sinopse </h1>
        <p className="text-2xl"> {data.description} </p>
      </div>
      {data.trailer && data.trailer.site === "youtube" ? (
        <div className="bg-sixth rounded-xl w-[98%] p-5">
          <h1 className="text-3xl font-bold pb-3"> Trailer </h1>
          <div className="flex justify-center"> 
            <iframe
              className="h-[25rem] w-[40rem]"
              src={`https://www.youtube.com/embed/${data.trailer.id}`}
              allowFullScreen
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  let variables = {
    id: Number(context.query.id)
  }
  let query = `
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
  `
  try {
    let { data } = await animeApi.post("", { query, variables }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    data = data.data.Media

    return {
      props: {
        data
      },
    };
  } catch (error) {
    return {
      redirect: { destination: "/", permanent: false }
    }
  }
}
