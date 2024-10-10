// components/AddPaymentMethod.tsx
import React, { useState } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'

interface AddPaymentMethodProps {
  onSuccess: () => void
  onCancel: () => void
}

export default function AddPaymentMethod({ onSuccess, onCancel }: AddPaymentMethodProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    const cardElement = elements.getElement(CardElement)

    if (!cardElement) {
      return
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    })

    if (error) {
      setError(error.message || 'An error occurred')
    } else if (paymentMethod) {
      try {
        const response = await fetch('/api/payment-methods', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'card',
            last4: paymentMethod.card?.last4,
          }),
        })

        if (response.ok) {
          onSuccess()
        } else {
          setError('Failed to save payment method')
        }
      } catch (err) {
        setError('An error occurred')
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Add Payment Method</h2>
        <form onSubmit={handleSubmit}>
          <CardElement className="mb-4 p-3 border rounded" />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded">
              Add Payment Method
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}