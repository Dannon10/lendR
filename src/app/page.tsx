"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./page.scss";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="page">
      <main className="main">
        <header>
          <Image src="/lendsqr-logo.svg" alt="Logo" width={146} height={32} />
        </header>

<div className="login-container">
        <div className="login-img">
          <Image src="/login-img1.png" alt="Illustration" width={600} height={337} />
        </div>

        <div className="login-field">
          <div className="login-text">
          <h1>Welcome!</h1>
          <p>Enter details to login.</p>
          </div>

          <form>
            <div>
              <input type="email" placeholder="Email" />
            </div>

            <div className="password-input-wrapper">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
              />
              <button
                type="button"
                className="show-password-btn"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>

            <div>
              <a href="#">FORGOT PASSWORD?</a>
            </div>

            <div className="login-btn">
              <button type="submit" onClick={handleLogin}>LOG IN</button>
            </div>
          </form>
        </div>
</div>
      </main>
    </div>
  );
}
