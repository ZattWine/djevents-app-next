import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'

export default function Home({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const res = await fetch(`${API_URL}/api/events`)
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
