import { createRoot } from 'react-dom/client'
import './index.css'
import store from './store'

import App from './App'
import { Provider } from 'react-redux'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
<Provider store={store}>
<App />
</Provider>
)
