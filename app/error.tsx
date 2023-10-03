'use client'
import { error } from 'console';
import React  from 'react';

export default function Error({ error, reset }: any) {
  React.useEffect(() => {
    console.log('logging error:', error);
  }, [error]);

  return (

<div className="space-y-4">
<h2 className="text-lg font-bold">Error General</h2>
<p className="text-sm">{error?.message}</p>
<p>{error}</p>
<div>
  <button onClick={() => reset()}>Try Again</button>
</div>
</div>
  )
}

// throw new error