import './App.css';
import RegisterPage from './Health_Seva/Register_And_Login_Page/Register_Page';
import Dashboard from './Health_Seva/Dashboard/Dashboard'
import LoginPage from './Health_Seva/Register_And_Login_Page/Login_page';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import NotFound from './Health_Seva/Dashboard/NotFound';
import ErrorFound from './Health_Seva/Dashboard/Right_sidebar/ErrorFound';
import IsAuthenticated from './Health_Seva/AfterAuthentication/IsAuthenticated';
import IndexPage from './Health_Seva/Dashboard/IndexPage';

export default function App() {


  const route = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path="/" element={<IndexPage />} />
      <Route path='/user' errorElement={<ErrorFound />}>
        <Route path='login' element={<LoginPage />} />
        <Route path='register' element={<RegisterPage />} />
        <Route element={<IsAuthenticated />}>
          <Route path='dashboard/*' element={<Dashboard />} />
        </Route>
      </Route>
      <Route path='*' element={<NotFound />} />
    </>
  ))

  return (
    <>
      <RouterProvider router={route} />
    </>

  )
}
