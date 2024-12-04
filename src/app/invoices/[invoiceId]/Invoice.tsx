'use client'
import { ChevronDown, CreditCard, Ellipsis, Trash2 } from 'lucide-react'
import { useOptimistic } from 'react'

import { Badge } from '@/components/ui/badge'
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
import type { Invoices } from '@/db/schema'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'

import { deleteInvoiceAction, updateStatusAction } from '@/app/actions'
import { AVAILABLE_STATUSES } from '@/data/invoices'
import Link from 'next/link'
import Container from '@/components/shared/Container'

interface InvoiceProps {
  // Infer types from schema definition
  invoice: typeof Invoices.$inferSelect
}

export default function Invoice({ invoice }: InvoiceProps) {
  const [currentStatus, setCurrentStatus] = useOptimistic(
    // initial status
    invoice.status,
    (_state, newStatus) => {
      return String(newStatus)
    }
  )

  async function handleOnUpdateStatus(formData: FormData) {
    const originalStatus = currentStatus
    setCurrentStatus(formData.get('status'))
    try {
      await updateStatusAction(formData)
    } catch {
      setCurrentStatus(originalStatus)
    }
  }
  return (
    <main className='h-full w-full'>
      <Container>
        <div className='mb-8 flex justify-between'>
          <h1 className='flex items-center gap-4 text-3xl font-semibold'>
            Invoice {invoice.id}
            <Badge
              className={cn(
                'rounded-full capitalize',
                currentStatus === 'open' && 'bg-blue-500',
                currentStatus === 'paid' && 'bg-green-600',
                currentStatus === 'void' && 'bg-zinc-700',
                currentStatus === 'uncollectible' && 'bg-red-600'
              )}
            >
              {currentStatus}
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
                      <form action={handleOnUpdateStatus}>
                        <input type='hidden' name='id' value={invoice.id} />
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
                      href={`/invoices/${invoice.id}/payment`}
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
                    <form
                      className='flex justify-center'
                      action={deleteInvoiceAction}
                    >
                      <input type='hidden' name='id' value={invoice.id} />
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

        <p className='mb-3 text-3xl'>£{(invoice.value / 100).toFixed(2)}</p>

        <p className='mb-8 text-lg'>{invoice.description}</p>

        <h2 className='mb-4 text-lg font-bold'>Billing Details</h2>

        <ul className='grid gap-2'>
          <li className='flex gap-4'>
            <strong className='block w-28 flex-shrink-0 text-sm font-medium'>
              Invoice ID
            </strong>
            <span>{invoice.id}</span>
          </li>
          <li className='flex gap-4'>
            <strong className='block w-28 flex-shrink-0 text-sm font-medium'>
              Invoice Date
            </strong>
            <span>
              {new Date(invoice.createTimeStamp).toLocaleDateString('en-GB')}
            </span>
          </li>
          <li className='flex gap-4'>
            <strong className='block w-28 flex-shrink-0 text-sm font-medium'>
              Billing Name
            </strong>
            <span>Name</span>
          </li>
          <li className='flex gap-4'>
            <strong className='block w-28 flex-shrink-0 text-sm font-medium'>
              Billing Email
            </strong>
            <span>Email</span>
          </li>
        </ul>
      </Container>
    </main>
  )
}
