import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast'
import { store } from './store/store'
import { fetchGlobalData } from './store/globalSlice'
import type { RootState, AppDispatch } from './store/store'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Loading from './components/Loading'
import Home from './pages/Home'
import VratFestivalsPage from './pages/Vrat'
import TemplesPage from './pages/Temples'
import Festivals from './pages/Festivals'
import Puja from './pages/Puja'
import Blogs from './pages/Blogs'
import './App.css'

function AppContent() {
  const dispatch = useDispatch<AppDispatch>()
  const { loading, error } = useSelector((state: RootState) => state.global)
  const hasFetched = useRef(false)

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true
      dispatch(fetchGlobalData())
    }
  }, [dispatch])

  useEffect(() => {
    if (error) {
      toast.error(`Failed to load data: ${error}`)
    }
  }, [error])

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--surface)',
            color: 'var(--ink)',
            border: '1px solid var(--border)',
          },
        }}
      />
      {loading && <Loading />}
      <Router>
        <div className="app">
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/vrat" element={<VratFestivalsPage />} />
              <Route path="/temples" element={<TemplesPage />} />
              <Route path="/festivals" element={<Festivals />} />
              <Route path="/puja" element={<Puja />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </>
  )
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}

export default App