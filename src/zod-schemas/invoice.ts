import { AVAILABLE_STATUSES } from '@/data/invoices'
import { z } from 'zod'

export const InvoiceSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.'
  }),
  email: z.string().email({
    message: 'Email must be at least 2 characters.'
  }),
  status: z.string().array(),
  value: z
    .preprocess(
      a => parseFloat(z.string().parse(a)),
      z.number({
        invalid_type_error: 'Value must be Number'
      })
    )
    .optional(),
  description: z.string().min(2, {
    message: 'Description must be at least 2 characters.'
  })
})
