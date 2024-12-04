import React from 'react'
import { db } from '@/db'
import { Invoices } from '@/db/schema'
import { and, eq } from 'drizzle-orm'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { notFound } from 'next/navigation'
import Container from '@/components/shared/Container'
import { auth } from '@clerk/nextjs/server'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronDown, CreditCard, Ellipsis, Trash2 } from 'lucide-react'
import { AVAILABLE_STATUSES } from '@/data/invoices'
import Link from 'next/link'
import { updateStatusAction } from '@/app/actions'

export default async function IndividualInvoicePage({
  params
}: {
  params: { invoiceId: string }
}) {
  const { userId } = await auth()

  if (!userId) {
    return
  }

  // covert invoiceId from string to number as id is an interger in schema

  const requiredId = (await params).invoiceId
  const isNumberRegX = /^\d+$/

  // Check if the input is empty or not a number
  if (!isNumberRegX.test(requiredId)) {
    throw new Error('Invalid ID')
  }

  const invoiceId = parseInt(requiredId)

  const [result] = await db
    .select()
    .from(Invoices)
    .where(and(eq(Invoices.id, invoiceId), eq(Invoices.userId, userId)))
    .limit(1)

  // code to temporarily check status css color is working
  //   result.status = 'uncollectible'

  if (!result) {
    notFound()
  }

  return (
    <main className='h-full w-full'>
      <Container>
        <div className='mb-8 flex justify-between'>
          <h1 className='flex items-center gap-4 text-3xl font-semibold'>
            Invoice {invoiceId}
            <Badge
              className={cn(
                'rounded-full bg-green-500 capitalize',
                result.status === 'open' && 'bg-blue-500',
                result.status === 'paid' && 'bg-green-600',
                result.status === 'void' && 'bg-zinc-500',
                result.status === 'uncollectible' && 'bg-red-600'
              )}
            >
              {result.status}
            </Badge>
          </h1>
          <div className='flex gap-4'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className='flex items-center gap-2'
                  variant='outline'
                  type='button'
                >
                  Change Status
                  <ChevronDown className='h-auto w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {AVAILABLE_STATUSES.map(status => {
                  return (
                    <DropdownMenuItem key={status.id}>
                      <form action={updateStatusAction}>
                        <input type='hidden' name='id' value={invoiceId} />
                        <input type='hidden' name='status' value={status.id} />
                        <button type='submit'>{status.label}</button>
                      </form>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            <Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className='flex items-center gap-2'
                    variant='outline'
                    type='button'
                  >
                    <span className='sr-only'>More Options</span>
                    <Ellipsis className='h-auto w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <DialogTrigger asChild>
                      <button className='flex items-center gap-2' type='submit'>
                        <Trash2 className='h-auto w-4' />
                        Delete Invoice
                      </button>
                    </DialogTrigger>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Link
                      href={`/invoices`}
                      className='flex items-center gap-2'
                    >
                      <CreditCard className='h-auto w-4' />
                      Payment
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DialogContent className='bg-white'>
                <DialogHeader>
                  <DialogTitle className='text-2xl'>
                    Delete Invoice?
                  </DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your invoice and remove your data from our servers.
                  </DialogDescription>
                  <DialogFooter>
                    <form className='flex justify-center'>
                      {/* <input type='hidden' name='id' value='1000000' /> */}
                      <Button
                        variant='destructive'
                        className='flex items-center gap-2'
                        type='submit'
                      >
                        <Trash2 className='h-auto w-4' />
                        Delete Invoice
                      </Button>
                    </form>
                  </DialogFooter>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <p className='mb-3 text-3xl'>£{(result.value / 100).toFixed(2)}</p>
        <p className='mb-8 text-lg'>{result.description}</p>
        <h2 className='mb-4 text-lg font-bold'>Billing Details</h2>
        <p className='mb-3 text-3xl'></p>
        <ul className='grid gap-2'>
          <li className='flex gap-4'>
            <strong className='block w-28 flex-shrink-0 text-sm font-medium'>
              Invoice ID
            </strong>
            <span>{invoiceId}</span>
          </li>
          <li className='flex gap-4'>
            <strong className='block w-28 flex-shrink-0 text-sm font-medium'>
              Invoice Date
            </strong>
            <span>
              {' '}
              {new Date(result.createTimeStamp).toLocaleDateString('en-GB')}
            </span>
          </li>
          <li className='flex gap-4'>
            <strong className='block w-28 flex-shrink-0 text-sm font-medium'>
              Billing Name
            </strong>
            <span></span>
          </li>
          <li className='flex gap-4'>
            <strong className='block w-28 flex-shrink-0 text-sm font-medium'>
              Billing Email
            </strong>
          </li>
        </ul>
      </Container>
    </main>
  )
}
