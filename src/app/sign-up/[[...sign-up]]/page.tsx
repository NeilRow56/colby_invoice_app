import Container from '@/components/shared/Container'
import { SignUp } from '@clerk/nextjs'
import React from 'react'

export default function page() {
  return (
    <Container className='h-full'>
      <SignUp />
    </Container>
  )
}
