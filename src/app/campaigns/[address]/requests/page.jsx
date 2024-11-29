import Campaign from '@/campaign'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
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

  const requests = await Promise.all(
    Array(parseInt(requestCount))
      .fill()
      .map((element, index) => campaignInstance.methods.requests(index).call())
  )

  return (
    <main className='flex flex-col gap-y-5'>
      <h3 className='text-xl font-bold ml-6'>Requests</h3>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow className='bg-gray-100 rounded-2xl border-gray-300 border'>
            {columns.map((column) => (
              <TableHead key={column}>{column}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request, index) => (
            <TableRow key={request.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{request.description}</TableCell>
              <TableCell>{request.value.toString()}</TableCell>
              <TableCell>{request.recipient}</TableCell>
              <TableCell>{request.approvalCount}</TableCell>
              <TableCell>{request.approve}</TableCell>
              <TableCell>{request.finalize}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
