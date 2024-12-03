'use client'

import React, { SyntheticEvent, useState, startTransition } from 'react'
import Form from 'next/form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import { BackButton } from '@/components/shared/BackButton'
import { createAction } from '@/app/actions'
import SubmitButton from '@/components/shared/SubmitButton'
import Container from '@/components/shared/Container'

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
    <main className='h-full'>
      <Container>
        <div className='mb-6 flex justify-between'>
          <h1 className='text-3xl font-semibold'>Create Invoice</h1>
        </div>
        <BackButton title='Go Back' variant='default' className='w-[150px]' />
        <div className='mx-auto mt-24 flex w-full flex-col justify-center'>
          <h1 className='mb-4 text-left text-3xl font-bold text-primary'>
            Invoice Form
          </h1>
        </div>

        {/* <NewInvoiceForm /> */}

        <Form
          action={createAction}
          onSubmit={handleOnSubmit}
          className='mx-auto grid max-w-xs'
        >
          <div>
            <Label htmlFor='name' className='mb-2 block text-sm font-semibold'>
              Billing Name
            </Label>
            <Input id='name' name='name' type='text' className='w-[500px]' />
          </div>
          <div>
            <Label htmlFor='email' className='mb-2 block text-sm font-semibold'>
              Billing Email
            </Label>
            <Input id='email' name='email' type='email' />
          </div>
          <div>
            <Label htmlFor='value' className='mb-2 block text-sm font-semibold'>
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
    </main>
  )
}
