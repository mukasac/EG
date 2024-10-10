'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Book, Video, Users, Filter, LucideIcon } from 'lucide-react'

// Type definitions
type ResourceType = 'Article' | 'Video' | 'Webinar'

interface Resource {
  id: number
  title: string
  type: ResourceType
  description: string
}

// Resource type icons
const resourceTypeIcons: Record<ResourceType, LucideIcon> = {
  'Article': Book,
  'Video': Video,
  'Webinar': Users,
}

// Resource data
const resources: Resource[] = [
  { id: 1, title: 'Sustainable Farming Techniques', type: 'Article', description: 'Learn about eco-friendly farming methods that promote long-term sustainability.' },
  { id: 2, title: 'Crop Rotation Basics', type: 'Video', description: 'A comprehensive guide to implementing effective crop rotation strategies.' },
  { id: 3, title: 'Pest Management Strategies', type: 'Webinar', description: 'Expert-led session on managing pests while minimizing environmental impact.' },
  { id: 4, title: 'Soil Health and Nutrition', type: 'Article', description: 'Discover the importance of soil health and how to maintain it for optimal crop growth.' },
  { id: 5, title: 'Water Conservation in Agriculture', type: 'Video', description: 'Practical techniques for efficient water use in farming operations.' },
  { id: 6, title: 'Organic Farming Certification', type: 'Webinar', description: 'Step-by-step guide to obtaining organic farming certification.' },
]

// Main component
export default function Education() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'All' | ResourceType>('All')

  const filteredResources = resources.filter(resource => 
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterType === 'All' || resource.type === filterType)
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-green-800">Educational Resources</h1>
      
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full p-3 pl-10 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-3 text-green-500" />
        </div>
        <div className="relative">
          <select
            className="w-full md:w-48 p-3 pl-10 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none bg-white"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as 'All' | ResourceType)}
          >
            <option value="All">All Types</option>
            <option value="Article">Articles</option>
            <option value="Video">Videos</option>
            <option value="Webinar">Webinars</option>
          </select>
          <Filter className="absolute left-3 top-3 text-green-500" />
        </div>
      </div>

      {filteredResources.length === 0 ? (
        <p className="text-center text-gray-600 mt-8">No resources found. Try adjusting your search or filter.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => {
            const IconComponent = resourceTypeIcons[resource.type]
            return (
              <div key={resource.id} className="bg-white border border-green-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <IconComponent className="text-green-600 mr-2" />
                  <h2 className="text-xl font-semibold text-green-800">{resource.title}</h2>
                </div>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">
                    {resource.type}
                  </span>
                  <Link 
                    href={`/education/${resource.id}`}
                    className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Access Resource
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}