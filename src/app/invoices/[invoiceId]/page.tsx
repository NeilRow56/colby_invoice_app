import { auth } from '@clerk/nextjs/server'
import { and, eq, isNull } from 'drizzle-orm'
import { notFound } from 'next/navigation'

import { db } from '@/db'
import { Customers, Invoices } from '@/db/schema'
import Invoice from './Invoice'

export default async function InvoicePage({
  params
}: {
  params: { invoiceId: string }
}) {
  const { userId } = await auth()

  if (!userId) return

  const requiredId = (await params).invoiceId
  const isNumberRegX = /^\d+$/

  // Check if the input is empty or not a number
  if (!isNumberRegX.test(requiredId)) {
    throw new Error('Invalid ID')
  }

  const invoiceId = parseInt(requiredId)

  // Displaying all invoices for public demo

  const [result] = await db
    .select()
    .from(Invoices)
    .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
    .where(and(eq(Invoices.id, invoiceId), eq(Invoices.userId, userId)))
    .limit(1)

  if (!result) {
    notFound()
  }

  const invoice = {
    ...result.invoices,
    customer: result.customers
  }

  return <Invoice invoice={invoice} />
}
