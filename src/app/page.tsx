import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='bg-slate-100'>
      <div className='mx-auto flex h-screen max-w-5xl flex-col justify-center gap-6 bg-slate-100 text-center'>
        <h1 className='text-5xl font-bold'>Invoicipedia</h1>
        <p>
          <Button asChild>
            <Link href='/dashboard'>Sign In</Link>
          </Button>
        </p>
      </div>
    </div>
  )
}
