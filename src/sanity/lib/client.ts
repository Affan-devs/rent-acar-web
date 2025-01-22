import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
<<<<<<< HEAD
  projectId,
=======
  projectId ,
>>>>>>> 7867f03 (building component)
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
