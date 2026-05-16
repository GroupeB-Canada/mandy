'use client'
import { useState } from 'react'

const AMOUNTS = [5, 10, 25, 50, 100]

export default function DonateButton({ slug, title }: { slug: string, title: string }) {
  const [amount, setAmount] = useState(25)
  const [custom, setCustom] = useState('')
  const [loading, setLoading] = useState(false)

  const finalAmount = custom ? parseInt(custom) : amount

  async function handleDonate() {
    if (!finalAmount || finalAmount < 1) return
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, amount: finalAmount, title }),
      })
      const { url } = await res.json()
      if (url) window.location.href = url
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <p className="text-sm font-semibold text-gray-700 mb-2">Choisissez un montant</p>
      <div className="grid grid-cols-5 gap-1.5 mb-3">
        {AMOUNTS.map(a => (
          <button
            key={a}
            onClick={() => { setAmount(a); setCustom('') }}
            className={`py-2 rounded-lg text-sm font-bold border-2 transition-colors ${
              amount === a && !custom
                ? 'border-red-600 bg-red-50 text-red-600'
                : 'border-gray-200 text-gray-600 hover:border-red-300'
            }`}
          >
            {a}$
          </button>
        ))}
      </div>
      <input
        type="number"
        placeholder="Montant personnalisé ($)"
        value={custom}
        onChange={e => { setCustom(e.target.value); setAmount(0) }}
        className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm mb-4 focus:border-red-400 focus:outline-none"
        min="1"
      />
      <button
        onClick={handleDonate}
        disabled={loading || !finalAmount || finalAmount < 1}
        className="btn-red w-full py-3.5 text-base disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Redirection...' : `Donner ${finalAmount}$ →`}
      </button>
    </div>
  )
}
