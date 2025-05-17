import AddExpense from '@/components/add-expenses'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/expenses/add/')({
  component: AddExpense,
})
