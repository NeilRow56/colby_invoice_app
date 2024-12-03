'use client'
import NextError from 'next/error'

export default function Error({ error }: { error: Error }) {
  return <NextError statusCode={500} title={error.message} />
}

// <div className='flex min-h-screen items-center justify-center bg-red-100'>
//   <div className='w-full max-w-md rounded-lg bg-white p-10 shadow-lg'>
//     <h2 className='mb-6 text-center text-3xl font-bold text-primary'>
//       Something went wrong
//     </h2>
//     <p className='text-red-600'>{error.message}</p>
//   </div>
// </div>
