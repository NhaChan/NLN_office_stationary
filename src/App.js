import axios from 'axios'
import React, { Fragment, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import HomePage from './pages/HomePage/HomePage'
import { routes } from './routes'
import DeafultComponent from "./components/DeafaltComponent/DeafultComponent"
import { useQuery } from '@tanstack/react-query'

function App() {

  useEffect(() => {
    fetchApi()
  }, [])

  const fetchApi = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`);
    return res.data
  }

  const query = useQuery({ queryKey: ['toods'], queryFn: fetchApi })
  console.log('query', query)

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            const Layout = route.isShowHeader ? DeafultComponent : Fragment
            return (
              <Route key={route.path} path={route.path} element={
                <Layout>
                  <Page />
                </Layout>
              } />
            )
          })}
        </Routes>
      </Router>
    </div>
  )
}

export default App