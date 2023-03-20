import React from 'react'
import { LoadingSpiner, ErrorDisplay } from '@/components'

const QueryResult = ({ loading, error, data, children }) => {
    if (loading) return <LoadingSpiner />
    if (error) return <ErrorDisplay name={error.name} message={error.message} />
    if (data) return children
}

export default QueryResult