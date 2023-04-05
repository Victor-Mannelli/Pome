import { NextPageContext } from 'next';
import { useEffect, useState } from 'react';
import Button from '@/components/models/button';
import Filter from '@/components/models/filter';
import _ from 'underscore';

export default function Profile(data: any) {
  const [list, setList] = useState<string>('Whatching');
  const [sort, setSort] = useState<string>('');

  const user = {
    banner: '/assets/dark_bg.jpg',
    profile_picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM1cDnT1Q5ZrkfLfxiSgFvC2ZsjpngynJGvg&usqp=CAU',
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
      id:10,
      title: 'aaaaaaa',
      score: '10',
      progress: '10/12',
      type: 'TV',
    }
  ];

  useEffect(() => {
  
    //request to list type 
  
  }, []);

  data = _.sortBy(data, sort).reverse();

  return (
    <>
      {
        !data ? null : (
          <div className="flex flex-col">
            <div className={'w-full h-[20rem] flex items-end px-48'}
              style={{backgroundImage: `url('${user.banner}')`}}
            >
              <img 
                className="h-56"
                src={user.profile_picture} 
                alt="profile_pic"
              />
              <h1 className="pl-10 pb-5"> {user.username} </h1>
            </div>
            <div className="flex h-screen w-full">
              <div className="w-1/4 h-screen bg-second flex p-10">
                <Filter onChange={(e) => setSort(e.target.value)}/>
              </div>
              <div className="w-3/4 h-screen flex flex-col">
                <div className="flex justify-center">
                  <Button 
                    text={'Finished'} 
                    className={`ml-5 mt-5 ${list === 'Finished' ? 'border bg-second' : 'bg-third'}`} 
                    onClick={() => setList('Finished')}
                  />
                  <Button 
                    text={'Whatching'} 
                    className={`ml-5 mt-5 ${list === 'Whatching' ? 'border bg-second' : 'bg-third'}`} 
                    onClick={() => setList('Whatching')}
                  />
                  <Button 
                    text={'Planning'} 
                    className={`ml-5 mt-5 ${list === 'Planning' ? 'border bg-second' : 'bg-third'}`} 
                    onClick={() => setList('Planning')}
                  />
                  <Button 
                    text={'Dropped'} 
                    className={`ml-5 mt-5 ${list === 'Dropped' ? 'border bg-second' : 'bg-third'}`} 
                    onClick={() => setList('Dropped')}
                  />
                  <Button 
                    text={'Rewatching'} 
                    className={`ml-5 mt-5 ${list === 'Rewatching' ? 'border bg-second' : 'bg-third'}`} 
                    onClick={() => setList('Rewatching')}
                  />
                </div>
                <div className="bg-third rounded-2xl m-5 pb-5">
                  <div className="w-full flex pt-5">
                    <h3 className="w-[64%] pl-7 break-all font-bold"> Title </h3>
                    <h3 className="w-[12%] text-center font-bold"> Score </h3>
                    <h3 className="w-[12%] text-center font-bold"> Progress </h3>
                    <h3 className="w-[12%] text-center font-bold"> Type </h3>
                  </div>
                  {moc.map((e: any) => (
                    <div key={e.id} className="w-full flex pt-5">
                      <h3 className="w-[64%] pl-7 break-all"> {e.title} </h3>
                      <h3 className="w-[12%] text-center"> {e.score} </h3>
                      <h3 className="w-[12%] text-center"> {e.progress} </h3>
                      <h3 className="w-[12%] text-center"> {e.type} </h3>
                    </div>
                  ))}
                </div>
              </div>
            </div> 
          </div>
        )
      }
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  // const { data } = await Api.get(`/user/${context.query.id}`)
  const data = {};

  if (!data) return {
    redirect: { destination: '/pome/home', permanent: false },
  };

  return {
    props: {
      data,
    },
  };
}
