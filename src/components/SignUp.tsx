import Link from 'next/link'

export default function SignUp() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-100 via-green-50 to-white flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-emerald-800 text-center">Sign Up</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-emerald-700">Full Name</label>
            <input type="text" id="name" name="name" required className="mt-1 block w-full rounded-md border-emerald-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-emerald-700">Email</label>
            <input type="email" id="email" name="email" required className="mt-1 block w-full rounded-md border-emerald-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-emerald-700">Password</label>
            <input type="password" id="password" name="password" required className="mt-1 block w-full rounded-md border-emerald-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-emerald-700">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required className="mt-1 block w-full rounded-md border-emerald-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50" />
          </div>
          <div>
            <button type="submit" className="w-full bg-emerald-600 text-white rounded-md py-2 px-4 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 transition-colors duration-300">
              Sign Up
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-emerald-600">
          Already have an account?{' '}
          <Link href="/signin" className="font-medium text-emerald-800 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}