import { useState } from "react";
import { Navigate } from "react-router-dom";
import Message from "../Message";
import "./Login_page.css";
import GoogleOAuth from "./GoogleAuth/GoogleOAuth";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function LoginPage() {
  document.title = "Login | Bharat Seva";

  const [IsAuthenticated, SetAuthenticated] = useState({
    IsAuthenticated: false,
    IsFetching: false,
    IsGood: false,
    Message: "😎",
  });
  const [Credentials, SetCredentials] = useState();

  function Credential(e) {
    const { name, value } = e.target;
    SetCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const LoginAPI = async () => {
    SetAuthenticated((p) => ({ ...p, IsFetching: true }));
    try {
      const Authorization = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/userauth/userlogin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Credentials),
        }
      );
      let Response = await Authorization.json();
      if (Authorization.ok) {
        sessionStorage.setItem(
          "BharatSevaUser",
          JSON.stringify({ ...Response, IsAuthenticated: true })
        );
        SetAuthenticated((p) => ({
          ...p,
          IsAuthenticated: true,
          IsGood: true,
        }));
      } else {
        SetAuthenticated((p) => ({ ...p, Message: Response.message }));
        alert(Response.message);
      }
    } catch (err) {
      alert("Could Not Connect to Server...");
      SetAuthenticated((p) => ({
        ...p,
        Message: "Could not Connect to Server...",
      }));
    }
    SetAuthenticated((p) => ({ ...p, IsFetching: false }));
  };

  const preventDefault = (e) => {
    e.preventDefault();
    LoginAPI();
  };

  return (
    <div>
      {IsAuthenticated.IsFetching ? (
        <Message message="Validating..." />
      ) : IsAuthenticated.IsGood ? (
        <Message message="Validating..." />
      ) : (
        <Message message={`${IsAuthenticated.Message}`} />
      )}

      {IsAuthenticated.IsAuthenticated && (
        <div>
          <Message message="Login Success..." />
          <Navigate to="/user/dashboard" replace={true} />
        </div>
      )}

      {/* new login page design */}
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">
              LOGIN
            </h2>
            <form className="mt-8 space-y-4" onSubmit={preventDefault}>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Health ID
                </label>
                <div className="relative flex items-center">
                  <input
                    name="health_id"
                    type="Number"
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter Your Health ID"
                    onChange={Credential}
                    onKeyUp={Credential}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-4 h-4 absolute right-4"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="10"
                      cy="7"
                      r="6"
                      data-original="#000000"
                    ></circle>
                    <path
                      d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter Your Password"
                    onChange={Credential}
                    onKeyUp={Credential}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-4 h-4 absolute right-4 cursor-pointer"
                    viewBox="0 0 128 128"
                  >
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    for="remember-me"
                    className="ml-3 block text-sm text-gray-800"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="jajvascript:void(0);"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  value={`${
                    IsAuthenticated.IsFetching ? "Validating..." : "Login*"
                  }`}
                  disabled={IsAuthenticated.IsFetching}
                >
                  Sign in
                </button>
              </div>
              <div class="my-4 flex items-center gap-4">
                <hr class="w-full border-gray-300" />
                <p class="text-sm text-gray-800 text-center">or</p>
                <hr class="w-full border-gray-300" />
              </div>

              <GoogleOAuthProvider clientId="476285565826-8smpt7q2bh9o1ace0iqn8lcmn52maele.apps.googleusercontent.com">
                <GoogleOAuth />
              </GoogleOAuthProvider>

              <p className="text-gray-800 text-sm !mt-8 text-center">
                Don't have an account?{" "}
                <a
                  href="/user/register"
                  class="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                >
                  Register here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>

      <div className="loginabouttextcontainer loginaboutwidht">
        <p>Points to Note :</p>
        <ul>
          <li>
            This Project is Under-development, Some functionalities might not
            work as expected.
          </li>
          <li>
            We will add more features in updates, feel free to Share Your
            Thoughts about this project regarding Design and Feature.
          </li>
          <li>
            We may occasionally delete accounts in order to improve the
            platform.
          </li>
          <li>
            Remember, you can only perform 50 operations per account which
            includes viewing records, creating appointments etc..
          </li>
          {/* <li className="triallogin">For The Trail Purpose You Can Login With ID : 2021071042 and Password : 12345.</li> */}
        </ul>
      </div>

      {/* This One IS For Insecure Alert!! */}
      {/* <InsecureContent /> */}
    </div>
  );
}
