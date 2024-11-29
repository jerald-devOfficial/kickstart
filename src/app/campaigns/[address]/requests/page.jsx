import Campaign from '@/campaign'
import Link from 'next/link'
import PropTypes from 'prop-types'

const RequestPage = async ({ params }) => {
  const { address } = await params
  const campaignInstance = Campaign(address)
  const requestCount = await campaignInstance.methods.getRequestsCount().call()

  const requests = await Promise.all(
    Array(parseInt(requestCount))
      .fill()
      .map((element, index) => campaignInstance.methods.requests(index).call())
  )

  console.log('requests', requests)

  return (
    <main className='flex flex-col gap-y-5'>
      <h3 className='text-xl font-bold ml-6'>Requests</h3>
      <div className='block'>
        <Link
          className='bg-blue-500 text-white px-4 py-2 rounded-md font-semibold'
          href={`/campaigns/${address}/requests/new`}
        >
          Create a Request
        </Link>
      </div>
    </main>
  )
}

RequestPage.propTypes = {
  params: PropTypes.shape({
    address: PropTypes.string.isRequired
  }).isRequired
}

export default RequestPage
