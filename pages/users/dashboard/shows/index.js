import LayoutAdmin from 'components/ui/layout.admin';
import connectToDb from 'database/db';
import { paginateShows } from 'database/services/show.service';
import { toJson } from 'helpers/functions';

const  ShowsAdmin =(props) => {

    console.log(props)


    return(
        <LayoutAdmin title="Shows">
            hello

        </LayoutAdmin>
    )
}

export const getServerSideProps = async() => {
    await connectToDb();
    const shows = await paginateShows(1,2);

    if(!shows) {
        return { notFound: true}
    }
 
    return {
        props:{
            show: toJson(shows)
        }
    }


}


export default ShowsAdmin;