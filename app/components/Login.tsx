/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'

export default function Login() {
const supabase = createPagesBrowserClient()

const handleOAuthLogin = async (provider: 'google' | 'github') => {
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider,
		options: {
			redirectTo: `${window.location.origin}/auth/callback`,
			queryParams: provider === 'google' ? {
			access_type: 'offline',
			prompt: 'consent',
		} : undefined,
	    },
    });

    if (error) console.error(`${provider} login error:`, error)
    }

    return (
        <section aria-label="Oauth login options" className="flex mx-auto flex-col gap-4">
            <button onClick={() => handleOAuthLogin('google')} className="bg-googleGray p-[5px] pl-[10px] cursor-pointer hover:bg-gray-50 hover:shadow-sm">
                <div className="flex justify-between items-center">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink" className="w-8 h-8">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                        <path fill="none" d="M0 0h48v48H0z"></path>
                    </svg>
                    <p className="text-[14px] w-[200px] text-text">Sign in with Google</p>
                </div>
            </button>
            <button onClick={() => handleOAuthLogin('github')} className="bg-googleGray p-[10px] cursor-pointer hover:bg-gray-50 hover:shadow-sm">
                <div className="flex justify-between">
                    <Image src="/images/github-mark.png" alt="github logo" width={22} height={18} />
                    <p className="text-[14px] w-[200px] text-text">Sign in with Github</p>
                </div>
            </button>
        </section>
    )
}