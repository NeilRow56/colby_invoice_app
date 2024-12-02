'use client'

import React, { SyntheticEvent, useState, startTransition } from 'react'
import { sql } from 'drizzle-orm'
import { db } from '@/db'
import Form from 'next/form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import { BackButton } from '@/components/shared/BackButton'
// import { Form } from '@/components/ui/form'
import { createAction } from '@/app/actions'
import SubmitButton from '@/components/shared/SubmitButton'
import Container from '@/components/shared/Container'
// import NewInvoiceForm from './form/NewInvoiceForm'

export default function NewInvoicePage() {
  const [state, setState] = useState('ready')
  async function handleOnSubmit(event: SyntheticEvent) {
    if (state === 'pending') {
      event.preventDefault()
      return
    }
    setState('pending')
  }
  return (
    <div className='mx-auto flex flex-col justify-center p-6'>
      <span className='mt-6'>
        <h1 className='mb-4 text-left text-3xl font-bold'>
          Create a new Invoice
        </h1>
      </span>
      <BackButton title='Go Back' variant='default' className='w-[150px]' />
      <div className='mx-auto mt-24 flex w-full flex-col items-center justify-center'>
        <h1 className='mb-4 text-left text-3xl font-bold text-primary'>
          Invoice Form
        </h1>

        {/* <NewInvoiceForm /> */}
        <Container className=''>
          <Form
            action={createAction}
            onSubmit={handleOnSubmit}
            className='grid max-w-5xl gap-4'
          >
            <div>
              <Label
                htmlFor='name'
                className='mb-2 block text-sm font-semibold'
              >
                Billing Name
              </Label>
              <Input id='name' name='name' type='text' className='w-[500px]' />
            </div>
            <div>
              <Label
                htmlFor='email'
                className='mb-2 block text-sm font-semibold'
              >
                Billing Email
              </Label>
              <Input id='email' name='email' type='email' />
            </div>
            <div>
              <Label
                htmlFor='value'
                className='mb-2 block text-sm font-semibold'
              >
                Value
              </Label>
              <Input id='value' name='value' type='text' />
            </div>
            <div>
              <Label
                htmlFor='description'
                className='mb-2 block text-sm font-semibold'
              >
                Description
              </Label>
              <Textarea id='description' name='description' />
            </div>
            <div>
              <SubmitButton />
            </div>
          </Form>
        </Container>
      </div>
    </div>
  )
}
