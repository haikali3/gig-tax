import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import Navbar from '@/components/navbar/navbar'

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />

      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
