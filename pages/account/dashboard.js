import Layout from '@/components/Layout'
import DashboardEvent from '@/components/DashboardEvent'
import { API_URL } from '@/config/index'
import { parseCookie } from '@/helpers/index'
import styles from '@/styles/Dashboard.module.css'

export default function DashboardPage({ events }) {
  const deleteEvent = (id) => {
    console.log(id)
  }

  return (
    <Layout title='User Dashboard'>
      <div className={styles.dashboard}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        {events.map((evt) => (
          <DashboardEvent
            key={evt.slug}
            evt={evt}
            deleteHandler={deleteEvent}
          />
        ))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookie(req)

  const res = await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const events = await res.json()

  return {
    props: { events },
  }
}
