async function fetchGetRecentOrders() {
  const response = await fetch('http://localhost:3000/recent-orders')

  const data = await response.json()

  return data;
}

export { fetchGetRecentOrders }