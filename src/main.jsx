import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routers.jsx'
import AuthProvider from './Providers/AuthProvider'
// import bgimg from "./assets/cool-background.png"
import { HelmetProvider } from 'react-helmet-async';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()
// const backgrounStyle = {
//   backgroundImage: `url(${bgimg})`,
// };

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <div  className='max-w-7xl mx-auto'>
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
      </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>,
)