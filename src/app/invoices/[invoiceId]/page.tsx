import React from 'react'
import { db } from '@/db'
import { Invoices } from '@/db/schema'
import { and, eq } from 'drizzle-orm'

import { notFound } from 'next/navigation'

import { auth } from '@clerk/nextjs/server'
import Invoice from './Invoice'

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

  // const invoice = {
  //   ...result.invoices,

  return <Invoice invoice={result} />
}
