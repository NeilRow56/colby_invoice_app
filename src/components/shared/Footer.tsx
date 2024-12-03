import Container from './Container'

const Footer = () => {
  return (
    <footer className='mb-8 mt-12 self-baseline'>
      <Container className='flex justify-between gap-4'>
        <p className='text-sm'>
          Invoicipedia &copy; {new Date().getFullYear()}
        </p>
        <p className='text-sm'>
          Created by Colby Fayock with Next.js, Xata, and Clerk
        </p>
      </Container>
    </footer>
  )
}

export default Footer
