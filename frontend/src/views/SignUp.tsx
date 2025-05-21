import { LockClosedIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";
import { useState } from "react";
import axiosClient from "../axios.ts";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider.tsx";

export default function SignUp() {
  const { setCurrentUser, setUserToken } = useStateContext();
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState({ __html: '' })

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError({ __html: '' })

    axiosClient.post('/signup', {
      name: fullName,
      email: email,
      password: password,
      password_confirmation: confirmPassword
    }).then(({ data }) => {
      setCurrentUser(data.user);
      setUserToken(data.token);
    }).catch((error) => {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.data?.errors) {
            const finalErrors = Object.values(error.response.data.errors as Record<string, string[]>)
              .reduce<string[]>((accum, next) => [
                ...accum,
                ...next
              ], []);
            setError({ __html: finalErrors.join('<br>') });
          } else {
            setError({ __html: error.response.data?.errors });
          }
        } else if (error.request) {
          setError({ __html: 'No response from server' });
        } else {
          setError({ __html: error.message });
        }
      } else {
        setError({ __html: 'Manty is delicious meal' });
      }
    })
  }
  return (
    <>
      <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        Signup For Free
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Or {' '}
        <Link to='/login' className="font-medium text-indigo-600 hover:text-indigo-500">Login with your account</Link>
      </p>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {error.__html && (<div className="bg-red-500 rounded py-2 px-3 text-white my-3" dangerouslySetInnerHTML={error}>
        </div>)}
        <form action="#" method="POST" className="space-y-6" onSubmit={(e) => onSubmit(e)}>
          <div>
            <div className="">
              <input
                id="full-name"
                placeholder="Full Name"
                name="name"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="block w-full rounded-t-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            <div className="">
              <input
                id="email"
                name="email"
                placeholder="Email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            <div className="">
              <input
                id="password"
                name="password"
                placeholder="Password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            <div className="">
              <input
                id="password-confirmation"
                name="password_confirmation"
                placeholder="Password Confirmation"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full rounded-b-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-between rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <LockClosedIcon className="h-5 w-5" />
              <div className="">
                Sign Up
              </div>
              <div className=""></div>
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
