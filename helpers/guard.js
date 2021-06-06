import { getSession } from 'next-auth/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loader from 'helpers/loader';

const RouterGuard = (props) => {
    const router = useRouter();
    const [loading,setLoading] = useState(true);


    useEffect(()=>{
        getSession().then( session =>{
            if(!session){
                router.push('/users/sign_in')
            } else {
                setLoading(false)
            }
        })
    },[])


    if(loading){
        return <Loader full={true}/>
    }

    return(
        <>
            {props.childres}
        </>
    )

}


export default RouterGuard;