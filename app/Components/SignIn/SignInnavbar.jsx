import { SignIn } from '@clerk/clerk-react'
import { UserPlus } from 'lucide-react'
import React from 'react'

function SignInnavbar() {
  return (
    <div>
        <div className="">
        <button  onClick={()=>document.getElementById('my_modal_3').showModal()}>
        <div className='p-2 rounded-md border text-black bg-green-500 hover:bg-green-400 '>
          Sign In
        </div>
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

export default SignInnavbar