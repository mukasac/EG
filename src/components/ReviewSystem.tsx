'use client'

import { useState } from 'react'
import { StarIcon } from '@heroicons/react/solid'

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewSystemProps {
  productId: number;
  initialReviews: Review[];
}

export default function ReviewSystem({ productId, initialReviews }: ReviewSystemProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' })

  const submitReview = async () => {
    // In a real app, this would be an API call
    const response = await fetch(`/api/products/${productId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(newReview),
    })
    const addedReview = await response.json()
    setReviews(prev => [addedReview, ...prev])
    setNewReview({ rating: 0, comment: '' })
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
      
      {/* Add new review */}
      <div className="mb-6">
        <div className="flex mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              className={`h-6 w-6 ${star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'}`}
              onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
            />
          ))}
        </div>
        <textarea
          value={newReview.comment}
          onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
          className="w-full p-2 border rounded"
          placeholder="Write your review..."
        />
        <button
          onClick={submitReview}
          className="mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Submit Review
        </button>
      </div>

      {/* Display reviews */}
      <div>
        {reviews.map(review => (
          <div key={review.id} className="border-b pb-4 mb-4">
            <div className="flex items-center mb-2">
              <div className="flex mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`h-5 w-5 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="font-semibold">{review.user}</span>
            </div>
            <p>{review.comment}</p>
            <span className="text-sm text-gray-500">{review.date}</span>
          </div>
        ))}
      </div>
    </div>
  )
}