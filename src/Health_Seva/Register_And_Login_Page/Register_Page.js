import { useState } from "react";
import Message from "../Message";
import "./Register_Page.css";
import GoogleOAuth from "./GoogleAuth/GoogleOAuth";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function RegisterPage() {
  document.title = "Register | Bharat Seva";

  const [IsRegistered, SetIsregistered] = useState(false);
  const [IsLoading, SetIsLoading] = useState(false);
  const [Credentials, SetCredentials] = useState();
  function SetCredential(e) {
    const { name, value } = e.target;
    SetCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Register API Goes here
  const RegisterPatient = async () => {
    SetIsLoading(true);
    try {
      const Response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/userauth/userregister`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(Credentials),
        }
      );
      const data = await Response.json();
      if (Response.ok) {
        SetIsregistered(data.status);
      } else {
        console.log(data.message);
        SetIsregistered(data.status);
      }
    } catch (err) {
      console.log(err);
      alert(err);
      SetIsregistered(false);
    } finally {
      SetIsLoading(false);
    }
  };

  const PasswordUser = document.querySelector("#PasswordUser");
  const PasswordAgainUser = document.querySelector("#AgainPasswordUser");
  const PasswordNotmatch = document.querySelector("#PasswordDonotmatch");
  const preventDefault = (e) => {
    SetIsregistered(false);
    e.preventDefault();
    if (
      PasswordUser.value === PasswordAgainUser.value &&
      PasswordAgainUser.value &&
      PasswordUser.value
    ) {
      RegisterPatient();
      PasswordNotmatch.classList.remove("Displaypasstxt");
    } else {
      PasswordNotmatch.classList.add("Displaypasstxt");
    }
  };
  return (
    <>
      {IsRegistered && (
        <div>
          <Message message={IsRegistered} />
        </div>
      )}

      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">
              REGISTER
            </h2>
            <form className="mt-8 space-y-4" onSubmit={preventDefault}>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Health ID
                </label>
                <div className="relative flex items-center">
                  <input
                    name="health_id"
                    id="UserRegiserhealthId"
                    type="Number"
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter Your Health ID"
                    onChange={SetCredential}
                    onKeyUp={SetCredential}
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
                  Email
                </label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter Your Email"
                    onChange={SetCredential}
                    onKeyUp={SetCredential}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    class="w-4 h-4 absolute right-4"
                    viewBox="0 0 682.667 682.667"
                  >
                    <defs>
                      <clipPath id="a" clipPathUnits="userSpaceOnUse">
                        <path
                          d="M0 512h512V0H0Z"
                          data-original="#000000"
                        ></path>
                      </clipPath>
                    </defs>
                    <g
                      clip-path="url(#a)"
                      transform="matrix(1.33 0 0 -1.33 0 682.667)"
                    >
                      <path
                        fill="none"
                        stroke-miterlimit="10"
                        stroke-width="40"
                        d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                        data-original="#000000"
                      ></path>
                      <path
                        d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                        data-original="#000000"
                      ></path>
                    </g>
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
                    id="PasswordUser"
                    type="password"
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter Your Password"
                    onChange={SetCredential}
                    onKeyUp={SetCredential}
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

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Confirm Password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    id="AgainPasswordUser"
                    type="password"
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter Your Password Again"
                    onChange={SetCredential}
                    onKeyUp={SetCredential}
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
              <p id="PasswordDonotmatch">Password Do no Match</p>

              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  value={`${IsLoading ? "Validating..." : "Register"}`}
                  disabled={IsLoading}
                >
                  Register
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
                Already registered?{" "}
                <a
                  href="/user/login"
                  class="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>

      <div className="Registertextcontaine loginabouttextcontainer">
        <p>Points to Note</p>
        <ul>
          <li>
            Before Registration, Healthcare Need to create a account with your
            HealthId.
          </li>
          <li>Password should be 5 characters long.</li>
          <li>
            Enter the same Email with which your account registered with.{" "}
          </li>
        </ul>
      </div>

      {/* Pop Up to show warning!! */}
      {/* <InsecureContent/> */}
    </>
  );
}
