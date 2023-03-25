import React from 'react'
import { LoadingSpiner, ErrorDisplay } from '@/components'

const QueryResult = ({ loading, error, data, skeleton, children }) => {
    if (loading) return skeleton
    if (error) return <ErrorDisplay name={error.name} message={error.message} />
    if (data) return children
}

export default QueryResult