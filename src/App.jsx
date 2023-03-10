import { Routes, Route } from 'react-router-dom'
import RequireAuth from '../src/components/RequireAuth'
import { ReactQueryDevtools } from 'react-query/devtools'

//Pages 
import Navigation from './components/NavComponents/Navigation'

import StartPage from './pages/StartPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'

import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'

import NotFound from './pages/NotFound'
import LogoutPage from './pages/LogoutPage'

import Dashboard from './pages/Dashboard'
import ProfilePage from './pages/ProfilePage'
import WorkPage from './pages/WorkPage'
import UploadPage from './pages/UploadPage'
import EditProfilePage from './pages/EditProfilePage'
import EditWorkPage from './pages/EditWorkPage'


import './assets/scss/App.scss'


function App() {
	
	
	return (
		<div id="App">
			<Navigation />

			<Routes>
				<Route path="/en" element={<StartPage />} />
				<Route path="*" element={<NotFound />} />
				<Route path="/signup" element={<SignupPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/reset-password" element={<ForgotPasswordPage />} />


				<Route path="/" element={
					<RequireAuth >
						<HomePage />
					</RequireAuth>
				} />
				<Route path="/search/" element={
					<RequireAuth >
						<SearchPage />
					</RequireAuth>
				} />
				<Route path="/upload" element={
					<RequireAuth >
						<UploadPage />
					</RequireAuth>
				} />
				<Route path="/logout" element={
					<RequireAuth>
						<LogoutPage />
					</RequireAuth>
				} />
				<Route path="/dashboard" element={
					<RequireAuth>
						<Dashboard />
					</RequireAuth>
				} />				
				<Route path="/profile/:id" element={
					<RequireAuth>
						<ProfilePage />
					</RequireAuth>
				} />
				<Route path="/profile-edit" element={
					<RequireAuth>
						<EditProfilePage />
					</RequireAuth>
				} />				
				<Route path="/work/:id" element={
					<RequireAuth>
						<WorkPage />
					</RequireAuth>
				} />				
				<Route path="/work-edit/:id" element={
					<RequireAuth>
						<EditWorkPage />
					</RequireAuth>
				} />				
			</Routes>

			<ReactQueryDevtools position='bottom-right' />
		</div>
	)
}

export default App
