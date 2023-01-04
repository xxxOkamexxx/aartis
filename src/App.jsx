import { Routes, Route } from 'react-router-dom'
import Navigation from './components/NavComponents/Navigation'
import StartPage from './pages/StartPage'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import LogoutPage from './pages/LogoutPage'
import UploadPage from './pages/UploadPage'
import Dashboard from './pages/Dashboard'
import ProfilePage from './pages/ProfilePage'
import EditProfilePage from './pages/EditProfilePage'
import WorkPage from './pages/WorkPage'
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
				<Route path="/logout" element={<LogoutPage />} />
				<Route path="/dashboard" element={<Dashboard />} />				
				<Route path="/profile/:id" element={<ProfilePage />} />
				<Route path="/profile-edit" element={<EditProfilePage />} />				
				<Route path="/work/:id" element={<WorkPage />} />				
			</Routes>
		</div>
	)
}

export default App
