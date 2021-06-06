import { useEffect, useState} from 'react';
import { getSession } from 'next-auth/client'

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';

import Loader from 'helpers/loader';
import MainLayout from 'components/ui/layout.main';

/// redux
import { Provider, useDispatch } from 'react-redux';
import store from 'store/index';
import { createWrapper } from 'next-redux-wrapper';
import { autoSignIn } from 'store/actions/user.action';



function MyApp({ Component, pageProps }) {
  const  [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=>{
    getSession().then( session => {
      if(session){
        dispatch(autoSignIn(session))
      }
      setLoading(false)
    })
  },[])



  return (
      <Provider store={store}>

        { loading  ?
          <Loader full={true}/>
          :
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        }

        
      </Provider>
  )
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
