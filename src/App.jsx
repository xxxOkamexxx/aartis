import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import StartPage from './components/StartPage'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import UploadPage from './pages/UploadPage'
import './assets/scss/App.scss'
function App() {
	return (
		<div id="App">
			<Navigation />

			<Routes>
				<Route path="/" element={<StartPage />} />
				<Route path="/home" element={<HomePage />} />
				<Route path="*" element={<NotFound />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignupPage />} />
				<Route path="/upload" element={<UploadPage />} />
			</Routes>
		</div>
	)
}

export default App
