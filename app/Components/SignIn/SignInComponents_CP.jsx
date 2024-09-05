
import { UserPlus } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

function SignInComponents({userDetailsG}) {
  const router = useRouter()
  return (
    <div onClick={()=>router.push("/CreateProfile")} className="flex gap-2 border p-2 rounded-full w-10 cursor-pointer hover:text-blue-500 hover:scale-110 duration-200">
          <UserPlus />
    </div>
  )
}

export default SignInComponents