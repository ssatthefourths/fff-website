import { useState } from 'react';
import { Link } from 'react-router';

type TabMode = 'login' | 'register';

function AccountPage() {
  const [activeTab, setActiveTab] = useState<TabMode>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Account features coming soon! Check back later.');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerPassword !== registerConfirmPassword) {
      setMessage('Passwords do not match. Please try again.');
      return;
    }
    setMessage('Account features coming soon! Check back later.');
  };

  const inputClasses =
    "border border-[#8b52c5]/30 rounded-[10px] px-4 py-3 w-full focus:outline-none focus:border-[#8b52c5] font-['Roboto:Regular',sans-serif] text-[#3f3f3f] text-[16px] transition-colors";

  return (
    <div className="bg-[#fffdf3] min-h-screen">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] py-12 md:py-16 lg:py-20 max-w-[1400px] mx-auto">
        <div className="max-w-md mx-auto">
          {/* Card */}
          <div className="bg-white shadow-lg rounded-[20px] p-8">
            {/* Tabs */}
            <div className="flex mb-8 border-b border-[#8b52c5]/15">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('login');
                  setMessage('');
                }}
                className={`flex-1 pb-3 font-['Roboto:Bold',sans-serif] font-bold text-[18px] tracking-[1px] uppercase transition-colors border-b-2 ${
                  activeTab === 'login'
                    ? 'text-[#8b52c5] border-[#8b52c5]'
                    : 'text-[#3f3f3f]/40 border-transparent hover:text-[#3f3f3f]/60'
                }`}
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('register');
                  setMessage('');
                }}
                className={`flex-1 pb-3 font-['Roboto:Bold',sans-serif] font-bold text-[18px] tracking-[1px] uppercase transition-colors border-b-2 ${
                  activeTab === 'register'
                    ? 'text-[#8b52c5] border-[#8b52c5]'
                    : 'text-[#3f3f3f]/40 border-transparent hover:text-[#3f3f3f]/60'
                }`}
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Register
              </button>
            </div>

            {/* Toast/Alert */}
            {message && (
              <div className="mb-6 p-4 rounded-[10px] bg-[#f4eefa] border border-[#8b52c5]/20">
                <p
                  className="font-['Roboto:Regular',sans-serif] text-[#8b52c5] text-[14px] text-center"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  {message}
                </p>
              </div>
            )}

            {/* Login Form */}
            {activeTab === 'login' && (
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label
                    htmlFor="login-email"
                    className="block font-['Roboto:Regular',sans-serif] text-[#3f3f3f] text-[14px] font-medium mb-2"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Email
                  </label>
                  <input
                    id="login-email"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className={inputClasses}
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="login-password"
                    className="block font-['Roboto:Regular',sans-serif] text-[#3f3f3f] text-[14px] font-medium mb-2"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Password
                  </label>
                  <input
                    id="login-password"
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className={inputClasses}
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full content-stretch flex items-center justify-center rounded-[100px] font-['Roboto:Bold',sans-serif] font-bold leading-[0] text-center tracking-[2.7px] uppercase whitespace-nowrap transition-opacity bg-[#BBD148] text-[#3F3F3F] px-[40px] py-[20px] text-[18px] hover:opacity-90 cursor-pointer"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Sign In
                </button>
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() =>
                      setMessage('Account features coming soon! Check back later.')
                    }
                    className="font-['Roboto:Regular',sans-serif] text-[#8b52c5] text-[14px] hover:underline cursor-pointer"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Forgot Password?
                  </button>
                </div>
              </form>
            )}

            {/* Register Form */}
            {activeTab === 'register' && (
              <form onSubmit={handleRegister} className="space-y-5">
                <div>
                  <label
                    htmlFor="register-name"
                    className="block font-['Roboto:Regular',sans-serif] text-[#3f3f3f] text-[14px] font-medium mb-2"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Name
                  </label>
                  <input
                    id="register-name"
                    type="text"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    placeholder="Your full name"
                    required
                    className={inputClasses}
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="register-email"
                    className="block font-['Roboto:Regular',sans-serif] text-[#3f3f3f] text-[14px] font-medium mb-2"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Email
                  </label>
                  <input
                    id="register-email"
                    type="email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className={inputClasses}
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="register-password"
                    className="block font-['Roboto:Regular',sans-serif] text-[#3f3f3f] text-[14px] font-medium mb-2"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Password
                  </label>
                  <input
                    id="register-password"
                    type="password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    placeholder="Create a password"
                    required
                    className={inputClasses}
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="register-confirm-password"
                    className="block font-['Roboto:Regular',sans-serif] text-[#3f3f3f] text-[14px] font-medium mb-2"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Confirm Password
                  </label>
                  <input
                    id="register-confirm-password"
                    type="password"
                    value={registerConfirmPassword}
                    onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                    className={inputClasses}
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full content-stretch flex items-center justify-center rounded-[100px] font-['Roboto:Bold',sans-serif] font-bold leading-[0] text-center tracking-[2.7px] uppercase whitespace-nowrap transition-opacity bg-[#BBD148] text-[#3F3F3F] px-[40px] py-[20px] text-[18px] hover:opacity-90 cursor-pointer"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Create Account
                </button>
              </form>
            )}
          </div>

          {/* Back to home link */}
          <div className="text-center mt-8">
            <Link
              to="/"
              className="font-['Roboto:Regular',sans-serif] text-[#8b52c5] text-[16px] hover:underline"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export { AccountPage };
export default AccountPage;
