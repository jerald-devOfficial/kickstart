import Campaign from '@/campaign'
import CampaignDetails from '@/components/CampaignDetails'
import ContributeForm from '@/components/ContributeForm'
import Link from 'next/link'
import PropTypes from 'prop-types'
import web3 from 'web3'

const CampaignShow = async ({ params }) => {
  const { campaign } = await params

  const campaignInstance = Campaign(campaign)
  const summary = await campaignInstance.methods.getSummary().call()

  const formattedSummary = {
    minimumContribution: summary[0],
    balance: summary[1],
    requestsCount: summary[2],
    approversCount: summary[3],
    manager: summary[4]
  }

  const campaignDetails = [
    {
      header: formattedSummary.manager,
      meta: 'Address of Manager',
      description:
        'The manager created this campaign and can create requests to withdraw money.'
    },
    {
      header: formattedSummary.minimumContribution,
      meta: 'Minimum Contribution (wei)',
      description: 'The minimum amount of money needed to become an approver.'
    },
    {
      header: formattedSummary.requestsCount,
      meta: 'Number of Requests',
      description:
        'A request tries to withdraw money from the contract. Requests must be approved by the approvers.'
    },
    {
      header: formattedSummary.approversCount,
      meta: 'Number of Approvers',
      description: 'Number of people who have already donated to this campaign.'
    },

    {
      header: web3.utils.fromWei(formattedSummary.balance, 'ether'),
      meta: 'Campaign Balance (ether)',
      description:
        'The balance is how much money this campaign has left to spend.'
    }
  ]

  return (
    <main className='flex flex-col gap-y-5'>
      <h3 className='text-xl font-bold ml-6'>Campaign Details</h3>
      <div className='grid grid-cols-5 gap-x-4'>
        <div className='col-span-4 grid grid-cols-2 gap-4 w-full grid-rows-2'>
          {campaignDetails.map((detail) => (
            <CampaignDetails key={detail.meta} {...detail} />
          ))}
        </div>

        <ContributeForm campaign={campaign} />
      </div>
      <div className='block'>
        <Link
          className='bg-blue-500 text-white px-4 py-2 rounded-md font-semibold'
          href={`/campaigns/${campaign}/requests`}
        >
          View Requests
        </Link>
      </div>
    </main>
  )
}

export default CampaignShow

CampaignShow.propTypes = {
  params: PropTypes.shape({
    campaign: PropTypes.string.isRequired
  }).isRequired
}
