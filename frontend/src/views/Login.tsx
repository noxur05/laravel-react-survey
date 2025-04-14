import { LockClosedIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
        </h2>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
              <div className="mt-2">
                <input
                  id="email"
                  placeholder="Email"
                  name="email"
                  type="email"
                  required
                  className="block w-full rounded-t-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                <input
                  id="password"
                  placeholder="Password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-b-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-between rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <LockClosedIcon className="h-5 w-5"/>
                <div className="">
                  Sign in
                </div>
                <div className=""></div>
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{' '}
            <Link to='/signup' className="font-medium text-indigo-600 hover:text-indigo-500">Signup</Link>
          </p>
        </div>
    </>
  )
}
