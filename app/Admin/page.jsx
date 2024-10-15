import React from 'react'
import AdminPage from './Components/AdminPage'
import RequireAuth from './Components/RequireAuth'
function page() {
  return (
    <div>
      <RequireAuth>
      <AdminPage />
      </RequireAuth>
    </div>
  )
}

export default page