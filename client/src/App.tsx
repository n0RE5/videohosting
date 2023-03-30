import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { check } from './backendAPI/userAPI';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Loader from './components/UI/Loader/Loader';
import { useFetching } from './hooks/useFetching';
import { useAppDispatch } from './hooks/useReduxHooks';
import { fetchUser, fetchUserError, fetchUserSuccess } from './store/reducers/UserSlice';

function App() {
  const dispatch = useAppDispatch()
  const [checkUser, isUserLoading] = useFetching(async () => {
    try {
        dispatch(fetchUser())
        const response = await check()
        dispatch(fetchUserSuccess(response))
    } catch (error: any) {
        dispatch(fetchUserError(error.response?.data?.message))
    }
  })

  useEffect(() => {
    checkUser()
  }, [])

  if(isUserLoading) {
    return <Loader />
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='app_w'>
          <Sidebar />
          <AppRouter />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
