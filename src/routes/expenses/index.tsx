import Expenses from '@/components/expenses'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/expenses/')({
  component: Expenses,
})
