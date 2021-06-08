import Link from 'next/link';
import Image from 'next/image';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


const CardComponent = ({show}) => {
    return(
        <>
            <Card>
                <Image
                    src={`/images/venues/${show.image}`}
                    layout="responsive"
                    width="1920"
                    height="1080"
                />

                <CardContent>
                    <h5>{show.title}</h5>
                    <p>{show.excerpt}</p>
                </CardContent>

                <CardActions>
                    <Link href={`/shows/${show.slug}`}>
                        <Button
                            variant="contained"
                            color="primary"
                        >
                            See show
                        </Button>
                    </Link>
                </CardActions>

            </Card>
        </>
    )
}

export default CardComponent;