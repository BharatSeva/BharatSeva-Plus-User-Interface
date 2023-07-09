import './App.css';
import RegisterPage from './Health_Seva/Register_And_Login_Page/Register_Page';
import Dashboard from './Health_Seva/Dashboard/Dashboard'
import LoginPage from './Health_Seva/Register_And_Login_Page/Login_page';
import Home from './Health_Seva/Dashboard/Right_sidebar/Home/Home';
import Right_sidebar from './Health_Seva/Dashboard/Right_sidebar/Right_sidebar';

import { Route, createBrowserRouter, createRoutesFromElements, Outlet, RouterProvider } from 'react-router-dom';


export default function App() {


  const route = createBrowserRouter(createRoutesFromElements(
    <Route path='/bharatseva-user' errorElement={<h2>Something Got Wrong With Your Session Please Login Again</h2>}>
      <Route path='login' element={<LoginPage />} />
      <Route path='register' element={<RegisterPage />} />
      <Route>
        <Route path='dashboard/*' element={<Dashboard />} />
      </Route>
      <Route path='*' element={<h2>Page Not Found</h2>} />
    </Route>
  ))
  return (
    <>
      <RouterProvider router={route} />
    </>

  )
}
