'use client'

import React from 'react'

const AdvancedSearchFilter = ({ onFilter }: { onFilter: (filters: any) => void }) => {
  return (
    <div>
      <h2>Advanced Search</h2>
      <button onClick={() => onFilter({})}>Apply Filters</button>
    </div>
  )
}

export default AdvancedSearchFilter