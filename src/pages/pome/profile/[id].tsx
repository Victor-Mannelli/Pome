// eslint-disable-next-line @typescript-eslint/no-unused-vars
import _ from 'underscore';
import { Button, Filter } from '@/components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';
import { parseCookies } from 'nookies';
import { api } from '@/utils';

export default function Profile(data: any) {
  const [filter, setFilter] = useState<string>('Whatching');
  const [sort, setSort] = useState<string>('');
  const router = useRouter();

  console.log(data);

  const user = {
    banner: '/assets/dark_bg.jpg',
    profile_picture: 'https://icon2.cleanpng.com/20180319/row/kisspng-computer-icons-google-account-user-profile-iconfin-png-icons-download-profile-5ab0301d8907a6.3404305715214960935613.jpg',
    username: 'Catto',
  };
  const moc: any = [
    {
      id: 1,
      title: 'aaaaaaa',
      score: '10',
      progress: '10/12',
      type: 'TV',
    }, {
      id: 2,
      title: 'aaaaaaa',
      score: '10',
      progress: '10/12',
      type: 'TV',
    }, {
      id: 3,
      title: 'aaaaaaa',
      score: '10',
      progress: '10/12',
      type: 'TV',
    }, {
      id: 4,
      title: 'aaaaaaa',
      score: '10',
      progress: '10/12',
      type: 'TV',
    }, {
      id: 5,
      title: 'aaaaaaa',
      score: '10',
      progress: '10/12',
      type: 'TV',
    }, {
      id: 6,
      title: 'aaaaaaa',
      score: '10',
      progress: '10/12',
      type: 'TV',
    }, {
      id: 7,
      title: 'aaaaaaa',
      score: '10',
      progress: '10/12',
      type: 'TV',
    }, {
      id: 8,
      title: 'aaaaaaa',
      score: '10',
      progress: '10/12',
      type: 'TV',
    }, {
      id: 9,
      title: 'aaaaaaa',
      score: '10',
      progress: '10/12',
      type: 'TV',
    }, {
      id: 10,
      title: 'aaaaaaa',
      score: '10',
      progress: '10/12',
      type: 'TV',
    }
  ];

  useEffect(() => {

    //request to list type 

  }, []);

  // data = _.sortBy(data, sort).reverse();
  const animeList = data.userAnimeList.filter((e: any) => e.status === filter);
  return (
    <div className="flex flex-col">
      <div className={'w-full h-[20rem] flex items-end px-48'}
        style={{ backgroundImage: `url('${user.banner}')` }}
      >
        <img
          className="h-56"
          src={user.profile_picture}
          alt="profile_pic"
        />
        <h1 className="pl-10 pb-5"> {data.userData.username} </h1>
      </div>
      <div className="flex h-screen w-full">
        <div className="w-1/4 h-screen bg-second flex p-10">
          <Filter onChange={(e) => setSort(e.target.value)} />
        </div>
        <div className="w-3/4 h-screen flex flex-col">
          <div className="flex justify-center">
            <Button
              text={'Finished'}
              className={`ml-5 mt-5 ${filter === 'Finished' ? 'border bg-second' : 'bg-third'}`}
              onClick={() => setFilter('Finished')}
            />
            <Button
              text={'Watching'}
              className={`ml-5 mt-5 ${filter === 'Watching' ? 'border bg-second' : 'bg-third'}`}
              onClick={() => setFilter('Watching')}
            />
            <Button
              text={'Planning'}
              className={`ml-5 mt-5 ${filter === 'Planning' ? 'border bg-second' : 'bg-third'}`}
              onClick={() => setFilter('Planning')}
            />
            <Button
              text={'Dropped'}
              className={`ml-5 mt-5 ${filter === 'Dropped' ? 'border bg-second' : 'bg-third'}`}
              onClick={() => setFilter('Dropped')}
            />
            <Button
              text={'Rewatching'}
              className={`ml-5 mt-5 ${filter === 'Rewatching' ? 'border bg-second' : 'bg-third'}`}
              onClick={() => setFilter('Rewatching')}
            />
          </div>
          <div className="bg-third rounded-2xl m-5">
            <div className="w-full flex py-5">
              <h3 className="w-[64%] pl-7 break-all font-bold"> Title </h3>
              <h3 className="w-[12%] text-center font-bold"> Score </h3>
              <h3 className="w-[12%] text-center font-bold"> Progress </h3>
              <h3 className="w-[12%] text-center font-bold"> Type </h3>
            </div>
            {animeList.map((e: any) => (
              <div
                key={e.anime_id}
                className="w-full flex py-5 hover:bg-second rounded-xl cursor-pointer"
                onClick={() => router.push(`/pome/anime/${e.anime_id}`)}
              >
                <h3 className="w-[64%] pl-7 break-all cursor-pointer"> {e.anime.title} </h3>
                <h3 className="w-[12%] text-center cursor-pointer"> {e.score} </h3>
                <h3 className="w-[12%] text-center cursor-pointer"> {e.progress} </h3>
                <h3 className="w-[12%] text-center cursor-pointer"> {e.anime.type} </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// export async function getServerSideProps(context: NextPageContext) {
//   // const id = context.query.id;
//   const cookies = parseCookies(context);
//   const config = { headers: { Authorization: `Bearer ${cookies.token}` } };
//   try {
//     const [userData, userAnimeList] = await Promise.all([
//       api.get('/users', config).then(e => e.data),
//       api.get('/anime/userlist', config).then(e => e.data),
//     ]);

//     const data = {
//       userData,
//       userAnimeList,
//     };

//     if (!data) return {
//       redirect: { destination: '/', permanent: false },
//     };

//     return { props: data };
//   } catch (error) {
//     return { redirect: { destination: '/', permanent: false } };
//   }
// }
