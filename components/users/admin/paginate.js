import { Table, Pagination, Modal, Button } from 'react-bootstrap';
import { useRouter } from 'next/router'


const PaginateBlock = ({
    shows,
    prev,
    next
}) => {
    const router = useRouter();

    const goToPrevPage = (page) => {
        prev(page)
    }

    const goToNextPage = (page) => {
        next(page)
    }



    return(
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Venue</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    { shows.docs.map(( show )=>(
                        <tr key={show._id}>
                            <td>{show.title}</td>
                            <td>{show.venue}</td>
                            <td>{show.date}</td>
                            <td
                                className="action_btn remove_btn"
                                onClick={()=>alert('remove')}
                            >Remove</td>
                            <td
                                className="action_btn edit_btn"
                                onClick={()=>alert('go to edit')}
                            >Edit</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination>
                { shows.hasPrevPage ? (
                    <>
                        <Pagination.Prev onClick={()=> goToPrevPage(shows.prevPage)}/>
                        <Pagination.Item onClick={()=>  goToPrevPage(shows.prevPage)}>
                            {shows.prevPage}
                        </Pagination.Item>
                    </>
                ):null}

                <Pagination.Item active>{shows.page}</Pagination.Item>

                { shows.hasNextPage ? (
                    <>
                        <Pagination.Item onClick={()=>  goToNextPage(shows.nextPage)}>
                            {shows.nextPage}
                        </Pagination.Item>
                        <Pagination.Next onClick={()=> goToNextPage(shows.nextPage)}/>
                    </>
                ):null}


            </Pagination>
        </>
    )
}

export default PaginateBlock;