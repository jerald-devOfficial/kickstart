import Campaigns from '@/components/Campaigns'
import factory from '@/factory'
import Link from 'next/link'
import { Suspense } from 'react'
import { LuPlusCircle } from 'react-icons/lu'

const Home = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call()

  return (
    <main className='flex flex-col'>
      <div className='grid grid-cols-4 gap-4'>
        <Suspense fallback={<div>Loading...</div>}>
          <div className='col-span-3 flex flex-col gap-4'>
            {campaigns.map((address) => (
              <Campaigns key={address} address={address} />
            ))}
          </div>
        </Suspense>
        <div className='col-span-1'>
          <Link
            href='/campaigns/new'
            className='flex w-full gap-x-2 items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-lg'
          >
            <LuPlusCircle size={20} />
            <span className='text-sm'>Create Campaign</span>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Home
