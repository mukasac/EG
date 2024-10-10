import Link from 'next/link'

const partners = [
  { id: 1, name: 'Agricultural University of Kenya', type: 'University' },
  { id: 2, name: 'Ethiopian Farmers Association', type: 'Organization' },
  { id: 3, name: 'Dr. Amina Diop - Soil Scientist', type: 'Expert' },
  // Add more partners as needed
]

export default function Partnerships() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Partnerships</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {partners.map((partner) => (
          <div key={partner.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{partner.name}</h2>
            <p className="text-gray-600">Type: {partner.type}</p>
            <Link href={`/partnerships/${partner.id}`} className="mt-2 inline-block bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
              Learn More
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Become a Partner</h2>
        <p className="mb-4">Interested in partnering with EG Business? Fill out our partnership application form.</p>
        <Link href="/partnerships/apply" className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600">
          Apply for Partnership
        </Link>
      </div>
    </div>
  )
}