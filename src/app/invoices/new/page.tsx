import React from 'react'
import { sql } from 'drizzle-orm'
import { db } from '@/db'

import { BackButton } from '@/components/shared/BackButton'
import NewInvoiceForm from './form/NewInvoiceForm'

export default async function NewInvoicePage() {
  const results = await db.execute(sql`SELECT current_database()`)
  return (
    <div className='mx-auto flex max-w-5xl flex-col justify-center p-6'>
      <span className='mt-6'>
        <h1 className='mb-4 text-left text-3xl font-bold'>
          Create a new Invoice
        </h1>
      </span>
      <BackButton title='Go Back' variant='default' className='w-[150px]' />
      <div className='mx-auto mt-24 flex w-full max-w-5xl flex-col items-center justify-center'>
        <h1 className='mb-4 text-left text-3xl font-bold text-primary'>
          Invoice Form
        </h1>
        {JSON.stringify(results)}
        <NewInvoiceForm />
      </div>
    </div>
  )
}
