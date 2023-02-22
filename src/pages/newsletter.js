import React from 'react'
import Seo from '../components/Seo'
import AddedValue from '../components/AddedValue'
import Layout from '../components/Layout'

export default function Newsletter() {
  return (
    <Layout>
      <Seo title="Newsletter" keywords={['Newsletter', 'Kyle Shevlin']} />
      <h1>Newsletter</h1>
      <AddedValue />
    </Layout>
  )
}
