'use server'

import { db } from '@/db'
import { Invoices } from '@/db/schema'
import { redirect } from 'next/navigation'

//Create invoice
export async function createAction(formData: FormData) {
  const value = Math.floor(
    Number.parseFloat(String(formData.get('value'))) * 100
  )
  const description = formData.get('description') as string
  //   const name = formData.get('name') as string
  //   const email = formData.get('email') as string

  const results = await db
    .insert(Invoices)
    .values({
      value,
      description,
      status: 'open'
    })
    .returning({
      id: Invoices.id
    })
  redirect(`/invoices/${results[0].id}`)
}
