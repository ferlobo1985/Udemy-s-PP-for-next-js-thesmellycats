import Featured from 'components/home/featured';
import Shows from 'components/home/shows';
import connectToDb from 'database/db';
import { getAllShows } from 'database/services/show.service'
import { toJson } from 'helpers/functions'

const Home = (props) => {
  return (
    <>
        <Featured/>
        <Shows shows={props.shows}/>
    </>
  )
}


export const getServerSideProps = async() => {
  await connectToDb();
  try{
    const shows = await getAllShows('_id','desc',3,0);
    return { props:{ shows:toJson(shows)} }
  }catch(error){
    return { props:{ shows:[]} }
  }
}



export default Home;