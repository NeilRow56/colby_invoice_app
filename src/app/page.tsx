import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function Home() {
  return (
    // <div className='h-full bg-slate-100'>
    //   <div className='mx-auto flex max-w-5xl flex-col gap-6 bg-slate-100 text-center'>
    //     <h1 className='text-5xl font-bold'>Invoicipedia</h1>
    //     <div className='items-center justify-center'>
    //       <Button asChild>
    //         <Link href='/dashboard'>Sign In</Link>
    //       </Button>
    //     </div>
    //   </div>
    // </div>
    <div className='flex h-screen flex-col'>
      <div className='flex h-32 w-full items-center justify-center'>
        <h1 className='text-center text-5xl font-bold'>Invoicipedia</h1>
      </div>

      <div className='mt-36 flex w-full flex-1 flex-col items-center p-4 text-lg shadow-lg'>
        <Button asChild>
          <Link href='/dashboard'>Sign In</Link>
        </Button>
      </div>
    </div>
  )
}
