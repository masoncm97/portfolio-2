import { useRouteStore } from '@/lib/store'
import useSWR from 'swr'

const fetcher = (...args: [RequestInfo, RequestInit?]) =>
  fetch(...args).then((res) => res.json())

export function getSiblingRoutes(): string[] {
  return getRoutesFromStore() ?? getRoutesFromApi()
}

function getRoutesFromStore(): string[] | undefined {
  const siblingRoutes = useRouteStore((state) => state.siblingRoutes)
  return !siblingRoutes || siblingRoutes.length === 0
    ? undefined
    : siblingRoutes
}

function getRoutesFromApi(): string[] {
  const { data, error } = useSWR('/api/routes', fetcher)
  if (error) console.error(error)
  return data
}
