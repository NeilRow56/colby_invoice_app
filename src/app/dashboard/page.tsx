import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { CirclePlus } from 'lucide-react'
import Link from 'next/link'

const invoices = [
  {
    date: '1 Nov 2024',
    customer: 'John Doe Limited',
    email: 'john@johndoe.com',
    status: 'paid',
    value: '150.00'
  },

  {
    date: '3 Nov 2024',
    customer: 'Jpac Limited',
    email: 'sam@jpac.com',
    status: 'awaiting dispatch',
    value: '1,250.00'
  },

  {
    date: '4 Nov 2024',
    customer: 'GD Paving Limited',
    email: 'admin@gdpaving.com',
    status: 'open',
    value: '12,570.00'
  }
]

export default function DashboardPage() {
  return (
    <div className='mx-auto my-12 flex h-full max-w-5xl flex-col justify-center gap-6 text-center'>
      <div className='flex justify-between'>
        <h1 className='text-left text-3xl font-bold'>Invoices</h1>
        <p>
          <Button
            className='inline-flex gap-2 text-primary'
            variant='ghost'
            asChild
          >
            <Link href='/invoices/new'>
              <CirclePlus className='h-4 w-4 text-primary' />
              Create Invoice
            </Link>
          </Button>
        </p>
      </div>

      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow className='bg-slate-200'>
            <TableHead className='w-[150px] p-4'>Date</TableHead>
            <TableHead className='p-4'>Customer</TableHead>
            <TableHead className='p-4'>Email</TableHead>
            <TableHead className='p-4 text-center'>Status</TableHead>
            <TableHead className='p-4 text-right'>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map(invoice => (
            <TableRow key={invoice.customer}>
              <TableCell className='p-4 text-left'>
                <span className='font-semibold'>{invoice.date}</span>
              </TableCell>
              <TableCell className='p-4 text-left font-medium'>
                <span className='font-semibold'>{invoice.customer}</span>
              </TableCell>
              <TableCell className='p-4 text-left'>
                <span className=''>{invoice.email}</span>
              </TableCell>
              <TableCell className='justify-center p-4'>
                <span className='font-semibold'>
                  <Badge className='rounded-full'>{invoice.status}</Badge>
                </span>
              </TableCell>
              <TableCell className='p-4 text-right'>
                <span className='font-semibold'>{invoice.value}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className='text-right'>£13,970.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
