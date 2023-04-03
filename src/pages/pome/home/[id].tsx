import Filter from "@/components/models/filter";
import PageHandler from "@/components/pageHandler";
import { Stars } from "@/components/stars";
import { animeApi } from "@/utils/axios";
import { AnimeData } from "@/utils/Interfaces";
import { NextPageContext } from "next";
import { useRouter } from "next/router";

export default function Home({ data }: { data: AnimeData }) {
  const router = useRouter();
  console.log(data);

  const moc = [
    {
      id: 1,
      image: "https://i.pinimg.com/736x/67/4d/27/674d274d9292e24e5a3800134fbe702f.jpg"
    },
    {
      id: 2,
      image: "https://i.pinimg.com/736x/67/4d/27/674d274d9292e24e5a3800134fbe702f.jpg"
    },
    {
      id: 3,
      image: "https://i.pinimg.com/736x/67/4d/27/674d274d9292e24e5a3800134fbe702f.jpg"
    }
  ]

  return (
    <div className="flex m-7 gap-5">
      <div className="h-full flex flex-col w-[73%] rounded-xl p-5">
        <div className="h-[8%]">
          <Filter onChange={(e) => console.log(e.target.value)} />
        </div>
        <h1 className="py-4 text-center"
          onClick={() => router.push("/pome/releases")}
        > Airing </h1>
        <div className="w-full flex flex-wrap gap-5 overflow-auto">
          {data.media.map((e: any) => (
            <div
              className="xl:w-[48.9%] w-full h-80 bg-third rounded-xl p-4 flex cursor-pointer"
              onClick={() => router.push(`/pome/anime/${e.id}`)}
              key={e.id}
            >
              <img
                className="h-full w-40 rounded-xl"
                src={e.coverImage.extraLarge}
                alt="anime_image"
              />
              <div className="pl-5 h-full flex flex-col">
                <h1 className="cursor-pointer"> {e.title.romaji} </h1>
                {e.averageScore ? <Stars score={e.averageScore} /> : null}
                <h3 className="cursor-pointer pb-3"> {e.startDate.year} </h3>
                <h3 className="cursor-pointer h-2/3 overflow-auto"> {e.description} </h3>
              </div>
            </div>
          ))}
          <PageHandler 
            currentPage={data.pageInfo.currentPage} 
            hasNextPage={data.pageInfo.hasNextPage} 
            route="home" 
          />
        </div>
      </div>
      <div className="bg-third w-[27%] h-fit rounded-xl px-8 pb-10">
        <h1 className="font-bold py-5"> You are following </h1>
        <div className="w-full flex flex-wrap gap-4 overflow-auto">
          {moc.map((e: any) => (
            <div
              className="w-32 h-40 bg-fifth rounded-xl p-2 bg-cover"
              style={{ backgroundImage: `url(${e.image})` }}
              key={e.id}
            >
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  let variables = {
    page: Number(context.query.id)
  }
  const query = `
    query ($page: Int) {
      Page (page: $page, perPage: 20) {
        pageInfo {
          currentPage
          hasNextPage
        }
        media (status: RELEASING, startDate_greater: 2023, type: ANIME) {
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
  try {
    let { data } = await animeApi.post("", { query, variables }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    data = data.data.Page

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
