import { createFileRoute } from '@tanstack/react-router'
import AddExpense from '@/components/add-expenses'

export const Route = createFileRoute('/expenses/add-expenses/')({
  component: AddExpense,
})
