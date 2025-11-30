import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { registerUser } from "@/store/auth.slice" 
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"

export function SignupForm({ ...props }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loading = useSelector((state) => state.auth.loading)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    const form = new FormData(e.target)
    const data = Object.fromEntries(form)

    // Force role = employee
    data.role = "employee"

    try {
      const user = await dispatch(registerUser(data)).unwrap()

      // Redirect after success
      navigate("/employee/dashboard")

    } catch (err) {
      setError(err?.message || "Registration failed")
    }
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>

            {/* FULL NAME */}
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input id="name" name="name" type="text" placeholder="John Doe" required />
            </Field>

            {/* EMAIL */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" name="email" type="email" placeholder="m@example.com" required />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>

            {/* PASSWORD */}
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" name="password" type="password" autoComplete="off" required />
            </Field>

            {/* DEPARTMENT */}
            <Field>
              <FieldLabel htmlFor="department">Department</FieldLabel>
              <Input id="department" name="department" placeholder="IT / HR / Sales" required />
            </Field>

            {/* ERROR */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* HIDDEN ROLE FIELD */}
            <input type="hidden" name="role" value="employee" />

            <FieldGroup>
              <Field>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Creating..." : "Create Account"}
                </Button>

                <FieldDescription className="px-6 text-center">
                  Already have an account? <Link to="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>

          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
