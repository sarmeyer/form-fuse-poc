'use client'
 
import {
  Provider,
  createClient,
} from '@/fuse/client'
import React from 'react'
 
export const GraphQLClientProvider = (props: any) => {
  const [client, ssr] = React.useMemo(() => {
    const { client, ssr } = createClient({
      url: 'http://localhost:3000/api/fuse',
      suspense: true,
    })
 
    return [client, ssr]
  }, [])
 
  return (
    <Provider client={client} ssr={ssr}>
      <React.Suspense>
        {props.children}
      </React.Suspense>
    </Provider>
  )
}