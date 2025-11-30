import { Navigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { fetchMe } from "@/store/auth.slice" // <-- your thunk

export default function ProtectedRoute({ children, role }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")

    // no token → not logged in
    if (!token) {
      setLoading(false)
      return
    }

    // user exists in redux → no need to fetch
    if (user) {
      setLoading(false)
      return
    }

    // fetch user from backend
    dispatch(fetchMe())
      .finally(() => setLoading(false))
  }, [dispatch, user])

  // while loading fetchMe() wait → avoid redirect flicker
  if (loading) return <div>Loading...</div>

  // no user even after fetch → redirect to login
  if (!user) return <Navigate to="/login" />

  // role mismatch → block
  if (role && user.role !== role) return <Navigate to="/" />

  return children
}
