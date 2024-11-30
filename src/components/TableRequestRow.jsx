'use client'

import Campaign from '@/campaign'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import web3 from '@/web3'
import { Loader2 } from 'lucide-react'
import PropTypes from 'prop-types'
import { useState } from 'react'

const TableRequestRow = ({ request, index, approversCount, address }) => {
  const [approveLoading, setApproveLoading] = useState(false)
  const [finalizeLoading, setFinalizeLoading] = useState(false)
  const readyToFinalize = request.approvalCount > approversCount / 2

  const handleApprove = async () => {
    setApproveLoading(true)
    const campaignInstance = Campaign(address)
    const accounts = await web3.eth.getAccounts()
    await campaignInstance.methods.approveRequest(index).send({
      from: accounts[0]
    })
    setApproveLoading(false)
  }

  const handleFinalize = async () => {
    setFinalizeLoading(true)
    const campaignInstance = Campaign(address)
    const accounts = await web3.eth.getAccounts()
    await campaignInstance.methods.finalizeRequest(index).send({
      from: accounts[0]
    })
    setFinalizeLoading(false)
  }
  return (
    <TableRow
      key={index}
      disabled={request.complete}
      active={readyToFinalize && !request.complete}
    >
      <TableCell>{index}</TableCell>
      <TableCell>{request.description}</TableCell>
      <TableCell>{web3.utils.fromWei(request.value, 'ether')}</TableCell>
      <TableCell>{request.recipient}</TableCell>
      <TableCell>
        {request.approvalCount}/{approversCount}
      </TableCell>
      <TableCell>
        {!request.complete && (
          <Button
            className='border-green-500 text-green-500 text-xs font-semibold'
            variant='outline'
            size='sm'
            onClick={handleApprove}
            disabled={approveLoading}
          >
            {approveLoading ? (
              <span className='flex items-center gap-x-2'>
                <Loader2 className='w-4 h-4 animate-spin' /> Approving...
              </span>
            ) : (
              'Approve'
            )}
          </Button>
        )}
      </TableCell>
      <TableCell>
        {!request.complete && (
          <Button
            variant='outline'
            size='sm'
            className='border-teal-500 text-teal-500 text-xs font-semibold'
            onClick={handleFinalize}
          >
            {finalizeLoading ? (
              <span className='flex items-center gap-x-2'>
                <Loader2 className='w-4 h-4 animate-spin' /> Finalizing...
              </span>
            ) : (
              'Finalize'
            )}
          </Button>
        )}
      </TableCell>
    </TableRow>
  )
}

TableRequestRow.propTypes = {
  request: PropTypes.shape({
    description: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    recipient: PropTypes.string.isRequired,
    approvalCount: PropTypes.number.isRequired,
    complete: PropTypes.bool.isRequired
    // Add other properties as needed
  }).isRequired,
  index: PropTypes.number.isRequired,
  approversCount: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired
}

export default TableRequestRow
