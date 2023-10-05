import ExchangeForm from "@/components/ExchangeForm"

async function fetchData() {
  const response = await fetch('https://whitebit.com/api/v4/public/futures')
  const data = await response.json()
  if (data && data.result && data.result.length > 0) {
    const btcPerpData = data.result.find((item) => item.ticker_id === 'BTC_PERP')
    if (!btcPerpData) return console.log('btcPerpData not found')
    return btcPerpData.index_price
  }
}

export default async function Home() {
  const exchangeRate = await fetchData()
  return (
    <main className="flex min-h-screen flex-col items-center p-6">
      <h1 className="text-3xl text-center mb-10 font-bold">Exchange rate between BTC & USDT</h1>
      <ExchangeForm exchangeRate={exchangeRate} />
    </main>
  )
}
