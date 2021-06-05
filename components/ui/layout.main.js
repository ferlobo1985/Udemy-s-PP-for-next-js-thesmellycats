import Head from 'next/head';
import Header from '../navigation/header';
import Footer from '../navigation/footer';



const MainLayout = (props) => {
    return(
        <>
            <Head>
                <title>The smelly cats</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="The homepage of the smelly cats, the greatest band in the whole world"/>
                <meta name="keywords" content="Music, shows, smelly cats"/>
                <meta name="author" content="The smelly cats"/>
            </Head>
            <Header/>
            {props.children}
            <Footer/>
        </>
    )
}

export default MainLayout;