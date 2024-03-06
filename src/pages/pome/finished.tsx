import { GenresList, PageHandler, Stars } from '@/components';
import { AnimeData } from '@/utils/interfaces';
import { animeApi } from '@/utils/axios';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';

export default function Releases({ data }: { data: AnimeData }) {
  const router = useRouter();
  // console.log(data);
  return (
    <div className="flex flex-col rounded-xl m-5">
      {/* <div className="h-8">
        <input className="w-full h-full rounded-xl bg-sixth caret-white text-white outline-none px-4"/>
      </div> */}
      <h1 className="font-bold py-4 cursor-default text-2xl text-center"> Finished </h1>
      <div className="w-full flex flex-wrap gap-5 overflow-auto">
        {data.media.map((e: any) => (
          <div
            key={e.id}
            className="xl:w-[48.5%] w-full h-56 bg-third rounded-xl p-2 cursor-pointer flex"
            onClick={() => router.push(`/pome/animes/${e.id}`)}
          >
            <img
              src={e.coverImage.extraLarge}
              alt={e.title}
              className="rounded-md w-40 mr-3"
            />
            <div className="flex flex-col h-full w-[88%]">
              <h1 className="font-bold text-2xl cursor-pointer max-h-16 overflow-auto"> {e.title.romaji} </h1>
              <div className="flex justify-between h-[68%] w-full pr-10">
                <div className="lg:w-3/5">
                  {e.averageScore ? <Stars score={e.averageScore} /> : <div className="h-8"> </div>}
                  <h3 className="overflow-auto h-3/4 cursor-pointer">
                    {e.description ? e.description.replace(/(<([^>]+)>)/ig, ' ').replace(/(\r\n|\n|\r)/gm, ' ') : 'No description yet'}
                  </h3>
                </div>
                {e.genres ? <GenresList genres={e.genres} /> : null}
              </div>
            </div>
          </div>
        ))}
        <PageHandler
          currentPage={data.pageInfo.currentPage}
          hasNextPage={data.pageInfo.hasNextPage}
          route="/pome/finished"
        />
      </div>
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const variables = {
    page: Number(context.query.page),
    year: Number(new Date().getFullYear() - 1 + '0000')
  };
  const query = `
    query ($page: Int, $year: FuzzyDateInt) {
      Page (page: $page, perPage: 20) {
        pageInfo {
          currentPage
          hasNextPage
        }
        media (status: FINISHED, startDate_greater: $year, type: ANIME, format: TV, isAdult: false) {
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
  `;
  try {
    let { data } = await animeApi.post('', { query, variables }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });

    if (!data) return {
      redirect: { destination: '/', permanent: false },
    };

    data = data.data.Page;
    return { props: { data } };
  } catch (error) {
    return { redirect: { destination: '/', permanent: false } };
  }
}
