import { SignIn } from '@clerk/clerk-react'
import { UserPlus } from 'lucide-react'
import React from 'react'

function SignInComponents() {
  return (
    <div>
        <div className="">
        <button  onClick={()=>document.getElementById('my_modal_3').showModal()}>
        <button  className="flex gap-2 border p-2 rounded-full w-10 cursor-pointer hover:text-blue-500 hover:scale-110 duration-200">
          <UserPlus />
        </button>
        </button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm absolute right-2 top-2 text-white">✕</button>
            </form>
            <div className='flex items-center justify-center'>
              <SignIn />
            </div>
          </div>
        </dialog>
        </div>
    </div>
  )
}

export default SignInComponents