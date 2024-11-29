import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import PropTypes from 'prop-types'

const Campaigns = ({ address }) => {
  return (
    <Card className='w-full p-4 flex flex-col gap-y-2'>
      <CardTitle>{address}</CardTitle>
      <CardDescription>
        <Link
          href={`/campaigns/${address}`}
          className='text-blue-500 font-semibold'
        >
          View Campaign
        </Link>
      </CardDescription>
    </Card>
  )
}

Campaigns.propTypes = {
  address: PropTypes.string.isRequired
}

export default Campaigns
