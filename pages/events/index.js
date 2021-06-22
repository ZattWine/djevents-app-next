import Link from 'next/link'
import Layout from '@/components/Layout'
import Pagination from '@/components/Pagination'
import { API_URL } from '@/config/index'
import EventItem from '@/components/EventItem'
import { PER_PAGE } from '@/config/index'

export default function EventsPage({ events, page, total }) {
  return (
    <Layout>
      <h1>All Events</h1>
      {events.length === 0 && <h3>No events to show!</h3>}

      {events.map((evt) => (
        <EventItem key={evt.slug} evt={evt} />
      ))}

      <Pagination page={page} total={total} />
    </Layout>
  )
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE

  // fetch total/count
  const totalRes = await fetch(`${API_URL}/events/count`)
  const total = await totalRes.json()

  // fetch events
  const eventsRes = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  )
  const events = await eventsRes.json()

  return {
    props: { events, page: +page, total },
  }
}
