async function fetchGetRecentOrders() {
  const response = await fetch('https://localhost:3000/recent_orders')

  const data = await response.json()

  return data;
}

export { fetchGetRecentOrders }