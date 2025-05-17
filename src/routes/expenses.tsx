import { createFileRoute } from '@tanstack/react-router'
import Expenses from '../components/expenses'

export const Route = createFileRoute('/expenses')({
  component: Expenses,
})
