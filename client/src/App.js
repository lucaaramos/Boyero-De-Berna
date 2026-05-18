import './App.css';
import { Home } from './pages/Home/Home';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { NavBar } from './componets/NavBar/NavBar';
import { Footer } from './componets/Footer/Foter';
import { AboutUs } from './pages/AboutUs/AboutUs';
import { Gallery } from './pages/Gallery/Gallery';
import Exhibitions from './pages/Exhibitions/Exhibitions.jsx'
import Contact from './pages/ContactUs/contact';
import { UserContext } from './componets/globalContext/userContext';
import NewsList from './pages/News/News';
import { NewsProvider } from './contexts/NewsContext';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CreateEvent from './pages/FormsCreate/CreateExpo';
import UpdateEvent from './pages/FormsUpdate/UpdateExpo';
import CreateParticipant from './pages/FormsCreate/CreateParticipant';
import UpdateNews from './pages/News/updateNews';
import Sponsors from './pages/Sponsors/Sponsors';
import RecuperarContraseña from './componets/ContainerLogin/RecuperarContraseña';
import ResetPassword from './componets/ContainerLogin/ResetPassword';

function App() {
  return (
    <NewsProvider>
    <UserContext>
    <div className='app'>
      <BrowserRouter className="App">
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home/>}/>        
          <Route path="/ingresar" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/aboutUs" element={<AboutUs/>}/>        
          <Route path="/gallery" element={<Gallery/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/exhibitions" element={<Exhibitions/>}/>
          <Route path="/sponsors" element={<Sponsors/>}/>
          <Route path='/exhibitions/nueva-expo' element={<CreateEvent/>}/>
          <Route path='/exhibitions/actualizar-expo/:id' element={<UpdateEvent/>}/>
          <Route path="/news" element={<NewsList/>}/>
          <Route path='/registar-expo/:title/:id' element={<CreateParticipant/>}/>
          <Route path="/update-news/:id" element={<UpdateNews/>} />
          <Route path="/recuperar-contraseña" element={<RecuperarContraseña/>} />
          <Route path="/:token/restore" element={<ResetPassword/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
    </UserContext>
    </NewsProvider>
  );
}

export default App;
