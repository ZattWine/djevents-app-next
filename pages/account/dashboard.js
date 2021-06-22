import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import { parseCookie } from '@/helpers/index'

export default function DashboardPage({ events }) {
  console.log(events)
  return (
    <Layout title='User Dashboard'>
      <h1>Dashboard</h1>
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
