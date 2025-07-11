import { useEffect, useState } from 'react'

import {Routes, Route} from 'react-router-dom'

import * as pages from './pages/index.js'
import * as components from './components/index.js'

import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/App.scss'
import { fetchAuthMe, selectIsAuth } from './redux/store.js'
import { useDispatch, useSelector } from 'react-redux'

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchAuthMe()); // Проверяем авторизацию при загрузке
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route path="/" element={<><components.Header /><pages.Main /> <components.Footer/> </>} />
        <Route path="/login" element={<><components.Header /><pages.Login /></>} />
        <Route path="/registration" element={<><components.Header /><pages.Registration /></>} />
        <Route path="/profile" element={<><components.Header /><pages.Profile /></>} />
        <Route path="/edit-profile" element={<><components.Header /><pages.Profile /></>} />
        <Route path="/participants" element={<><components.Header /><pages.ParticipantList /></>} />
        <Route path="/moderator" element={<><components.Header /><pages.ModeratorDashboard /></>} />
        <Route path="/criterion" element={<><components.Header /><pages.Criterion /></>} />
        <Route path="/details" element={<><components.Header /><pages.Details /></>} />
        <Route path="/program" element={<><components.Header /><pages.Sponsors /></>} />
        <Route path="/certificates" element={<><components.Header /><pages.Certificates /><components.Footer/></>} />
        <Route path="/section/:sectionId" element={<><components.Header /><pages.SectionDetails /><components.Footer/></>} />
      </Routes>
    </>
  )
}

export default App
