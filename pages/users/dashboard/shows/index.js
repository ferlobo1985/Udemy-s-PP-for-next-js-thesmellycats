import { useState } from 'react';
import LayoutAdmin from 'components/ui/layout.admin';
import connectToDb from 'database/db';
import { paginateShows } from 'database/services/show.service';
import { toJson } from 'helpers/functions';
import axios from 'axios';

import PaginateBlock from 'components/users/admin/paginate';


const ShowsAdmin =({shows}) => {
    const limit = 2;
    const [showsPag,setShowsPag] = useState(shows);


    ////
    const gotoPage = (page) => {
        getShows({page:page,limit})
    }

    const getShows = (values) => {
        axios.post('/api/shows/paginate',values)
        .then( response => {
            console.log(response)
        }).catch(error=>{
            console.log(error)
        })
    }


    return(
        <LayoutAdmin title="Shows">
            <div className="shows_table">
                <PaginateBlock 
                    shows={showsPag}
                    prev={(page)=> gotoPage(page)}
                    next={(page)=> gotoPage(page)}


                />
            </div>
        </LayoutAdmin>
    )
}

export const getServerSideProps = async() => {
    await connectToDb();
    const shows = await paginateShows(2,2);

    if(!shows) {
        return {
            props:{
                shows:[]
            }
        }
    }
 
    return {
        props:{
            shows: toJson(shows)
        }
    }


}


export default ShowsAdmin;