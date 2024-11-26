import Link from 'next/link'
import PropTypes from 'prop-types'
const RequestPage = async ({ params }) => {
  const { campaign } = await params
  return (
    <main className='flex flex-col gap-y-5'>
      <h3 className='text-xl font-bold ml-6'>Requests</h3>
      <div className='block'>
        <Link
          className='bg-blue-500 text-white px-4 py-2 rounded-md font-semibold'
          href={`/campaigns/${campaign}/requests/new`}
        >
          Create a Request
        </Link>
      </div>
    </main>
  )
}

RequestPage.propTypes = {
  params: PropTypes.shape({
    campaign: PropTypes.string.isRequired
  }).isRequired
}

export default RequestPage
