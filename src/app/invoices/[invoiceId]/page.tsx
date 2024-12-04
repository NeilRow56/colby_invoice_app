import React from 'react'
import { db } from '@/db'
import { Invoices } from '@/db/schema'
import { and, eq } from 'drizzle-orm'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { notFound } from 'next/navigation'
import Container from '@/components/shared/Container'
import { auth } from '@clerk/nextjs/server'

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
        <div className='mb-8 flex items-center gap-4'>
          <h1 className='text-left text-3xl font-bold'>Invoice {invoiceId}</h1>
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
