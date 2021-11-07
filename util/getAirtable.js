const getAirtable = async () => {
  const res = await fetch(
    'https://upbeat-snyder-6fb606.netlify.app/api/getTodos'
  )
  const table = res.json()
  return table
}
export { getAirtable }
