import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'

import MainLayout from 'components/ui/layout.main';

import { Provider } from 'react-redux';
import store from 'store/index';
import { createWrapper } from 'next-redux-wrapper';


function MyApp({ Component, pageProps }) {
  return (
      <Provider store={store}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </Provider>
  )
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
