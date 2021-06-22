import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import EventItem from '@/components/EventItem'

export default function EventsPage({ events }) {
  return (
    <Layout>
      <h1>All Events</h1>
      {events.length === 0 && <h3>No events to show!</h3>}

      {events.map((evt) => (
        <EventItem key={evt.slug} evt={evt} />
      ))}
    </Layout>
  )
}

export async function getStaticProps(context) {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC`)
  const events = await res.json()

  if (!events) {
    return {
      notFound: true,
    }
  }

  return {
    props: { events },
    revalidate: 1,
  }
}
