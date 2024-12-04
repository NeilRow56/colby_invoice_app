import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp
} from 'drizzle-orm/pg-core'

import { AVAILABLE_STATUSES } from '@/data/invoices'

// [number] equals position in array
export type Status = (typeof AVAILABLE_STATUSES)[number]['id']

const statuses = AVAILABLE_STATUSES.map(({ id }) => id) as Array<Status>

export const statusEnum = pgEnum(
  'status',
  statuses as [Status, ...Array<Status>]
)

export const Invoices = pgTable('invoices', {
  id: serial('id').primaryKey().notNull(),
  createTimeStamp: timestamp('createTimeStamp').defaultNow().notNull(),
  value: integer('value').notNull(),
  description: text('description').notNull(),
  userId: text('userId'),
  status: statusEnum('status').notNull()
})
