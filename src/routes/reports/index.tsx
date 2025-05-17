import Reports from '@/components/reports'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/reports/')({
  component: Reports,
})
