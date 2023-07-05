import { routes } from './routes/routes'
import { RouterProvider } from 'react-router-dom'
import CustomLoader from './components/CustomLoader'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className='w-full md:max-w-[1240px]  px-12 md:px-0 m-auto'>
      <ToastContainer/>
      <RouterProvider router={routes} fallbackElement={<CustomLoader />}/>
    </div>
  )
}

export default App
