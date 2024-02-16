import {Routes,Route} from 'react-router-dom';


//pages
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import Listingpage from './pages/List';
import HomePage from './pages/Home';
import BookDetailPage from './pages/Detail';
import Orderpage from './pages/ViewOrder';
import  ViewOrderDetails from "./pages/ViewOrderDetail";

//components
import MyNavbar from './components/Navbar';

//css
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
  <div>
    <MyNavbar/>
    <Routes>
    
    <Route path="/" element ={<HomePage/>} />
    <Route path="/login" element={<LoginPage/>} />
    <Route path="/register" element={<RegisterPage/>} />
    <Route path="/book/list" element={<Listingpage />} />
    <Route path="/book/view/:bookId" element={<BookDetailPage/>}/>
    <Route path="/book/orders" element={<Orderpage/>}/>
    <Route path="/books/orders/:bookId" element={<ViewOrderDetails />} />
</Routes>;
</div>
    );
}

export default App;
