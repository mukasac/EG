import Link from 'next/link'

// This would typically come from an API or CMS
const blogPosts = [
  { id: 1, title: 'The Future of Sustainable Farming', date: '2023-09-15', excerpt: 'Exploring innovative techniques in sustainable agriculture...' },
  { id: 2, title: 'Market Trends: African Agriculture 2024', date: '2023-09-20', excerpt: 'Analyzing the latest trends in African agricultural markets...' },
  { id: 3, title: 'Success Story: Small-Scale Farmer Goes Digital', date: '2023-09-25', excerpt: 'How one farmer increased productivity using our platform...' },
]

export default function Blog() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">EG Business Blog</h1>
      <div className="space-y-8">
        {blogPosts.map(post => (
          <article key={post.id} className="border-b pb-4">
            <h2 className="text-2xl font-semibold mb-2">
              <Link href={`/blog/${post.id}`}>{post.title}</Link>
            </h2>
            <p className="text-gray-500 mb-2">{post.date}</p>
            <p>{post.excerpt}</p>
            <Link href={`/blog/${post.id}`} className="text-blue-500 hover:underline">
              Read more
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}