import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routers.jsx'
import AuthProvider from './Providers/AuthProvider'
import bgimg from "./assets/cool-background.png"

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()
const backgrounStyle = {
  backgroundImage: `url(${bgimg})`,
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div style={backgrounStyle} className='max-w-7xl mx-auto'>
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
console.log