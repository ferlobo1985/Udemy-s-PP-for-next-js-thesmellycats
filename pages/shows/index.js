import { useState } from 'react'
import Masonry from 'react-masonry-css';
import axios from 'axios';

import connectToDb from 'database/db';
import { getAllShows } from 'database/services/show.service'
import { toJson } from 'helpers/functions';
import Card from 'components/ui/card'


const ShowsPage = (props) => {
    const [shows,setShow] = useState(props.shows)

    const breakpointColumnsObj = {
        default: 3,
        1100: 3,
        700: 2,
        500: 1
    };


    return(
        <div className="container page_container">
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                { shows.map(show => (
                   <Card show={show} key={show._id}/>
                ))}
            </Masonry>
        </div>
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
  
  


export default ShowsPage;