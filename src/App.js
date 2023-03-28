import './App.css';
import RegisterPage from './Health_Seva/Register_And_Login_Page/Register_Page';
import Dashboard from './Health_Seva/Dashboard/Dashboard'
import LoginPage from './Health_Seva/Register_And_Login_Page/Login_page';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



export default function App() {
  return (
    <div className="App">

    <BrowserRouter>
      <Routes>

        <Route path="/">

        <Route index element={<Dashboard />}/>
        <Route path="register" element={<RegisterPage />}/>
        <Route path="login" element={<LoginPage />}/>

        </Route>

      </Routes>
    </BrowserRouter>


    </div>
  );
}
