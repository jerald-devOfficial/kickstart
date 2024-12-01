import Campaign from '@/campaign'
import TableRequestRow from '@/components/TableRequestRow'
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import Link from 'next/link'
import PropTypes from 'prop-types'

const columns = [
  'ID',
  'Description',
  'Amount',
  'Recipient',
  'Approval Count',
  'Approve',
  'Finalize'
]

const RequestPage = async ({ params }) => {
  const { address } = await params
  const campaignInstance = Campaign(address)
  const requestCount = await campaignInstance.methods.getRequestsCount().call()
  const approversCount = await campaignInstance.methods.approversCount().call()

  const requests = await Promise.all(
    Array(parseInt(requestCount))
      .fill()
      .map((element, index) => campaignInstance.methods.requests(index).call())
  )

  return (
    <main className='flex flex-col gap-y-5'>
      <h3 className='text-xl font-bold ml-6'>Requests</h3>
      <div className='flex justify-end'>
        <Link
          className='bg-blue-500 text-white px-4 py-2 rounded-md font-medium'
          href={`/campaigns/${address}/requests/new`}
        >
          Add Request
        </Link>
      </div>
      <Table>
        <TableCaption>Found {requestCount} requests.</TableCaption>
        <TableHeader>
          <TableRow className='bg-gray-100 rounded-2xl border-gray-300 border'>
            {columns.map((column) => (
              <TableHead key={column}>{column}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request, index) => (
            <TableRequestRow
              key={request.id}
              request={request}
              index={index}
              approversCount={approversCount}
              address={address}
            />
          ))}
        </TableBody>
      </Table>
    </main>
  )
}

RequestPage.propTypes = {
  params: PropTypes.shape({
    address: PropTypes.string.isRequired
  }).isRequired
}

export default RequestPage
