import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { check } from './backendAPI/userAPI';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Loader from './components/UI/Loader/Loader';
import { useFetching } from './hooks/useFetching';
import { useAppDispatch, useAppSelector } from './hooks/useReduxHooks';
import { fetchUser, fetchUserError, fetchUserSuccess } from './store/reducers/UserSlice';

function App() {
  const dispatch = useAppDispatch()
  const [userLoading, setUserLoading] = useState<boolean>(true)
  const checkUser = async () => {
    try {
        setUserLoading(true)
        dispatch(fetchUser())
        const response = await check()
        dispatch(fetchUserSuccess(response))
    } catch (error: any) {
        dispatch(fetchUserError(error.response?.data?.message))
    } finally {
      setUserLoading(false)
    }
  }

  useEffect(() => {
    checkUser()
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        {userLoading
          ? <Loader />
          : <AppRouter />
        }
      </BrowserRouter>
    </div>
  );
}

export default App;
