import ReactDOM from "react-dom/client"
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import 'sweetalert2/src/sweetalert2.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
