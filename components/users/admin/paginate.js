import { Table, Pagination, Modal, Button } from 'react-bootstrap';
import { useRouter } from 'next/router'


const PaginateBlock = ({
    shows
}) => {
    const router = useRouter();

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
        </>
    )
}

export default PaginateBlock;