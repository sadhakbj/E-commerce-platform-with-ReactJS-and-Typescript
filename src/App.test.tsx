import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import App from "./App"

test("renders login page", () => {
  render(<App />)
  const linkElement = screen.getByText(/Login to your account/i)
  expect(linkElement).toBeInTheDocument()
})

test("It should show error message for invalid credentials", () => {
  render(<App />)
  const usernameEl = screen.getByLabelText(/Username/i)
  const passwordEl = screen.getByLabelText(/Password/i)
  const button = screen.getByText("Login")
  fireEvent.change(usernameEl, { target: { value: "john" } })
  fireEvent.change(passwordEl, { target: { value: "password" } })
  button.click()
  setTimeout(() => {
    const errorMessage = screen.getByText("Invalid credentials")
    expect(errorMessage).toBeInTheDocument()
  }, 5000)
})
