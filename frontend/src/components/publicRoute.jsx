import { Navigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { fetchMe } from "@/store/auth.slice"

export default function PublicRoute({ children }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")

    // no token → user definitely not logged in
    if (!token) {
      setLoading(false)
      return
    }

    // if user already in redux → no need to fetch
    if (user) {
      setLoading(false)
      return
    }

    // fetch user from backend using token
    dispatch(fetchMe()).finally(() => setLoading(false))
  }, [dispatch, user])

  // show loading to prevent flicker
  if (loading) return <div>Loading...</div>

  // if logged in → redirect based on role
  if (user) {
    return user.role === "manager"
      ? <Navigate to="/manager/dashboard" />
      : <Navigate to="/employee/dashboard" />
  }

  // if not logged in → allow page
  return children
}
