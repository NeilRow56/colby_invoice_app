'use server'

import { db } from '@/db'
import { Invoices } from '@/db/schema'

//Create invoice
export async function createAction(formData: FormData) {
  // const value = Math.floor(
  //     Number.parseFloat(String(formData.get("value"))) * 100,
  //   );
  //   const description = formData.get("description") as string;
  //   const name = formData.get("name") as string;
  //   const email = formData.get("email") as string;
  console.log('formData', formData)
}
