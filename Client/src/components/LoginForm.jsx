import { ArrowLeftIcon, EyeIcon, EyeOffIcon, Loader2Icon } from 'lucide-react'
import React from 'react'
import LoginLeftSide from './LoginLeftSide'
import { Link } from 'react-router-dom'

const LoginForm = ({role, title, subtitle}) => {

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [showPassword, setShowPassword] = React.useState(false)
    const [error, setError] = React.useState("")
    const [loading, setLoading] = React.useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)
    }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
        <LoginLeftSide />
        <div className="flex-1 flex item-center justify-center p-6 sm:p-12 bg-white">
            <div className="w-full max-w-md animate-fade-in">
                <Link to="/login" className="inline-flex items-center gap-2 text-sm text-slate-400 mb-10 hover:text-slate-700 transition-colors">
                    <ArrowLeftIcon size={16}/> Back to portal
                </Link>

                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-medium text-zinc-800">
                        {title}</h1>
                    <p className="text-slate-500 text-sm sm:text-base mt-2">
                        {subtitle}</p>
                </div>

                {error && (
                    <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl text-sm flex item-start gap-3 mb-6">
                        <div className='w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0' />

                        {error}
                    </div>
                )}
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                            Email address
                        </label>
                        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                            required placeholder="you@example.com"
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input id="password" type={showPassword ? "text" : "password"} value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required className="pr-11"
                                placeholder="••••••••"
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                            </button>
                        </div>    
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-linear-to-r from-indigo-600 to-indigo-500 text-white py-3 rounded-md text-sm font-semibold hover:from-indigo-700 hover:to-indigo-600 disabled:opacity-50 transition-all duration-200 shadow-lg shadow-indigo-500/25 active:scale-[0.98] flex items-center justify-center">
                            {loading && <Loader2Icon 
                            className="animate-spin h-4 w-4 mr-2" />} 
                            Sign in
                    </button>
                </form>
            </div>
        </div>
        

    </div>
  )
}

export default LoginForm