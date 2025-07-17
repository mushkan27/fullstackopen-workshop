import { createRoot } from 'react-dom/client'
import './index.css'
// import store from './store'

import App from './ReactQueryApp'
// import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()


const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)
