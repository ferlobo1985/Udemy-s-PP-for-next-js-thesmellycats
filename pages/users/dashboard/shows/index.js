import { useState } from 'react';
import LayoutAdmin from 'components/ui/layout.admin';
import connectToDb from 'database/db';
import { paginateShows } from 'database/services/show.service';
import { toJson } from 'helpers/functions';
import axios from 'axios';

import PaginateBlock from 'components/users/admin/paginate';

import { useDispatch } from 'react-redux';
import { successDispatcher, errorDispatcher } from 'store/actions/notifications.action';


const ShowsAdmin =({shows}) => {
    const dispatch = useDispatch()
    const limit = 2;
    const [showsPag,setShowsPag] = useState(shows);
    const [currentPage, setCurrentPage] = useState(1);

    const [removeModal,setRemoveModal] = useState(false);
    const [toRemove,setToRemove] = useState(null);


    ////
    const gotoPage = (page) => {
        getShows({page:page,limit});
        setCurrentPage(page);
    }

    const getShows = (values) => {
        axios.post('/api/shows/paginate',values)
        .then( response => {
            setShowsPag(response.data)
        }).catch(error=>{
            dispatch(errorDispatcher(error.response.data.message))
        })
    }


    const handleClose = () => {
      setToRemove('');
      setRemoveModal(false)
    }

    const handleModal = (id) => {
        setToRemove(id);
        setRemoveModal(true)
    }


    const handleRemove = () => {
        axios.delete('/api/shows/remove',{
            data:{
                id:toRemove
            }
        }).then( response => {
            

        }).catch(error=>{
            dispatch(errorDispatcher(error.response.data.message))
        })


    }


    return(
        <LayoutAdmin title="Shows">
            <div className="shows_table">
                <PaginateBlock 
                    shows={showsPag}
                    prev={(page)=> gotoPage(page)}
                    next={(page)=> gotoPage(page)}

                    removeModal={removeModal}
                    handleClose={()=>handleClose()}
                    handleModal={(id)=> handleModal(id)}
                    handleRemove={()=> handleRemove()}
                />
            </div>
        </LayoutAdmin>
    )
}

export const getServerSideProps = async() => {
    await connectToDb();
    const shows = await paginateShows(1,2);

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