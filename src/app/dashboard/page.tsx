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

const invoices = [
  {
    date: '1 Nov 2024',
    customer: 'John Doe Limited',
    email: 'john@johndoe.com',
    status: 'awaiting dispatch',
    value: '150.00'
  }
]

export default function DashboardPage() {
  return (
    <div className='mx-auto mt-24 w-full max-w-5xl'>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow className='bg-slate-200'>
            <TableHead className='w-[150px]'>Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Value</TableHead>
            <TableHead className='text-right'>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map(invoice => (
            <TableRow key={invoice.customer}>
              <TableCell>{invoice.date}</TableCell>
              <TableCell className='font-medium'>{invoice.customer}</TableCell>
              <TableCell>{invoice.email}</TableCell>
              <TableCell>{invoice.status}</TableCell>
              <TableCell className='text-right'>{invoice.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className='text-right'>$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
