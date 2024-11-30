"use client"

import { useUser } from "@clerk/nextjs"

export const WelcomeMsg = () => {

    const {user , isLoaded} = useUser()

    return (
        <div className="space-y-4 mb-4">
            <h2 className="text-2xl lg:text-4xl text-white font-medium">Welcome Back{isLoaded ? ", " : " "}{user?.fullName}👋</h2>
            <p className="text-sm lg:text-base text-[#89b6fd]">This is your Financial Oveview Report</p>
        </div>
    )
}