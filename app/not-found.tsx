import Image from 'next/image'
import image from '../public/undraw_page_not_found_re_e9o6.svg'
import Link from 'next/link'

export default function notFound() {
  return(
    <div className="flex justify-center items-center flex-col w-min p-6">
      <div className='relative w-[40rem] h-[20rem]'>
        <Image src={image} alt='Error image' fill={true} />
      </div>
      <h1 className='my-6 text-7xl font-sans text-slate-800'>Oops!</h1>
      <h2 className='text-5xl font-mono text-slate-800'>PAGE NOT FOUND</h2>
      <p className='text-center mb-5 font-mono text-slate-800'>This page does not exist or has been moved. <br /> Try returning back to the homepage.</p>
      <Link href="/" className='bg-blue-900 text-white px-4 py-1 rounded hover:text-blue-900 hover:bg-white hover:outline hover:outline-2 hover:outline-blue-900 '>Return to Home</Link>
    </div>
  )
}