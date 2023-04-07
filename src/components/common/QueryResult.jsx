import React from 'react'
import { ErrorDisplay } from '@/components'
import { NetworkStatus } from '@apollo/client'
const QueryResult = ({ loading, error, data, skeleton, networkStatus, children }) => {
    if (loading) return skeleton
    if (networkStatus && networkStatus === NetworkStatus.refetch) return skeleton
    if (error) return <ErrorDisplay name={error.name} message={error.message} />
    if (data) return children
}

export default QueryResult