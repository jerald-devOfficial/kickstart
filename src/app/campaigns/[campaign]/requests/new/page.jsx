import CreateRequestForm from '@/components/CreateRequestForm'
import { MoveLeft } from 'lucide-react'
import Link from 'next/link'
import PropTypes from 'prop-types'

const CreateRequest = async ({ params }) => {
  const { campaign } = await params
  return (
    <main className='flex flex-col gap-y-5'>
      <Link
        className='text-blue-600 flex gap-x-1 items-center'
        href={`/campaigns/${campaign}/requests`}
      >
        <MoveLeft size={20} /> <span>Back</span>
      </Link>
      <h3 className='text-xl font-bold'>Create a Request</h3>
      <CreateRequestForm campaign={campaign} />
    </main>
  )
}

CreateRequest.propTypes = {
  params: PropTypes.shape({
    campaign: PropTypes.string.isRequired
  }).isRequired
}

export default CreateRequest
