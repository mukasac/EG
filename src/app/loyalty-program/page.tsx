import Link from 'next/link'

// This would typically come from a user's authenticated session
const mockUser = {
  name: 'John Doe',
  points: 1250,
  tier: 'Silver'
}

const rewards = [
  { id: 1, name: '10% Off Next Purchase', pointsCost: 500 },
  { id: 2, name: 'Free Shipping', pointsCost: 750 },
  { id: 3, name: 'Exclusive Webinar Access', pointsCost: 1000 },
  // Add more rewards as needed
]

export default function LoyaltyProgram() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Loyalty Program</h1>
      <div className="bg-gray-100 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-2">Welcome, {mockUser.name}!</h2>
        <p className="text-lg">Your current points: <span className="font-bold">{mockUser.points}</span></p>
        <p className="text-lg">Your tier: <span className="font-bold">{mockUser.tier}</span></p>
      </div>
      <h2 className="text-2xl font-bold mb-4">Available Rewards</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rewards.map((reward) => (
          <div key={reward.id} className="border p-4 rounded-lg">
            <h3 className="text-xl font-semibold">{reward.name}</h3>
            <p className="text-gray-600">Cost: {reward.pointsCost} points</p>
            <button className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
              Redeem
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">How to Earn Points</h2>
        <ul className="list-disc list-inside">
          <li>Make purchases in our marketplace</li>
          <li>Refer new farmers or customers</li>
          <li>Participate in educational programs</li>
          <li>Provide feedback on products or services</li>
        </ul>
      </div>
    </div>
  )
}