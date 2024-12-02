import { z } from 'zod'

export const InvoiceSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.'
  }),
  email: z.string().min(2, {
    message: 'Email must be at least 2 characters.'
  }),
  value: z.string().min(2, {
    message: 'Value must be at least 1 character.'
  }),
  description: z.string().min(2, {
    message: 'Description must be at least 2 characters.'
  })
})
