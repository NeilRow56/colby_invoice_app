'use client'

import { useFormContext } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { InputHTMLAttributes } from 'react'

type Props<S> = {
  fieldTitle: string
  nameInSchema: keyof S & string
  className?: string
} & InputHTMLAttributes<HTMLInputElement>

export function InputWithLabel<S>({
  fieldTitle,
  nameInSchema,
  className,
  ...props
}: Props<S>) {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem>
          <FormLabel className='text-base' htmlFor={nameInSchema}>
            {fieldTitle}
          </FormLabel>

          <FormControl>
            <Input
              id={nameInSchema}
              className={`w-full disabled:text-blue-500 disabled:opacity-75 dark:disabled:text-yellow-300 ${className}`}
              {...props}
              {...field}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}