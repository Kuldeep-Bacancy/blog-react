import './App.css'
import { Header, Footer } from './components/index.js'
import { Outlet }  from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
      <ToastContainer />
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
