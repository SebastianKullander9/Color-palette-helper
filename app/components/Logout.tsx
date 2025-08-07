/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'

export default function Logout() {
    const supabase = createPagesBrowserClient();

    const handleOAuthLogout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Logout error:", error.message);
            return;
        }
        
        window.location.href = "/";
    }

    return (
        <div>
            <button onClick={handleOAuthLogout} className="w-full border-gray-100 border-1 bg-white text-lg font-bold text-gray-900 p-2 font- mt-2 rounded-md cursor-pointer hover:bg-indigo-600 hover:border-indigo-700 hover:text-white hover:shadow-md transition duration-200">
                Logout
            </button>
        </div>
    );
}