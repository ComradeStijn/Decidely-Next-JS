'use client'
import image from '../public/undraw_bug_fixing_oc-7-a.svg'
import Image from 'next/image'

export default function ErrorPage({
  error,
  reset
}: {
  error: Error & { digest?: string},
  reset: () => void
}) {
  return (
    <div className="flex justify-center items-center flex-col w-min p-6">
      <div className='relative w-[15rem] h-[15rem] md:w-[40rem] md:h-[20rem]'>
        <Image src={image} alt='Error image' fill={true} />
      </div>
      <h1 className='my-6 text-7xl font-sans text-slate-800'>Oops!</h1>
      <h2 className='text-2xl mb-3 md:text-5xl font-mono text-slate-800'>UNEXPECTED ERROR</h2>
      <p className='text-center text-sm md:text-base mb-5 font-mono text-slate-800'>{error.message}</p>
      <button onClick={() => reset()} className='bg-blue-900 text-white px-4 py-1 rounded hover:text-blue-900 hover:bg-white hover:outline hover:outline-2 hover:outline-blue-900 '>Try again</button>
    </div>
  )
}