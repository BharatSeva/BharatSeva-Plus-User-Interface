import './App.css';
import RegisterPage from './Health_Seva/Register_And_Login_Page/Register_Page';
import Dashboard from './Health_Seva/Dashboard/Dashboard'
import LoginPage from './Health_Seva/Register_And_Login_Page/Login_page';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Health_Seva/Dashboard/Right_sidebar/Home/Home';
import Right_sidebar from './Health_Seva/Dashboard/Right_sidebar/Right_sidebar';



export default function App() {
  return (
    <div className="App">

    <BrowserRouter>
      <Routes>

        <Route path="/">

        <Route path='/' exact element={<Dashboard />}/>
        <Route path="register" element={<RegisterPage />}/>
        <Route path="login" element={<LoginPage />}/>
        <Route path="Dashboard/*" element={<Right_sidebar/>}>

          {/* <Route path="Home" element={<Home/>}/> */}

    

          </Route>


        </Route>

      </Routes>
    </BrowserRouter>


    </div>
  );
}
