'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { InputWithLabel } from '@/components/inputs/InputWithLabel'
import { TextAreaWithLabel } from '@/components/inputs/TeaxAreaWithLabel'
import { InvoiceSchema } from '@/zod-schemas/invoice'

import { useTransition } from 'react'

export default function NewInvoiceForm() {
  const [isPending, startTransition] = useTransition()
  // 1. Define your form.
  const form = useForm<z.infer<typeof InvoiceSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(InvoiceSchema),
    defaultValues: {
      name: '',
      email: '',
      value: 0,
      description: ''
    }
  })

  // 2. Define a submit handler.
  function onSubmit(formData: z.infer<typeof InvoiceSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(formData)
  }
  return (
    <div className='rounded-lg border p-4'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='mt-6 w-[600px] space-y-8'
        >
          <InputWithLabel fieldTitle='Name' nameInSchema='name' />
          <InputWithLabel fieldTitle='Email' nameInSchema='email' />
          <InputWithLabel fieldTitle='Value' nameInSchema='value' />
          <TextAreaWithLabel
            fieldTitle='Description'
            nameInSchema='description'
            className='h-[152px]'
          />
          <Button type='submit' className='w-full font-semibold'>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}
