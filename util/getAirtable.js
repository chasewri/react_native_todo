import { domainNameBase } from './api'

const endpoint = 'getTodos'

const getAirtable = async () => {
  const res = await fetch(domainNameBase + endpoint)
  const table = res.json()
  return table
}
export { getAirtable }
