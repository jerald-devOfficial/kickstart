import PropTypes from 'prop-types'

const CreateRequest = async ({ params }) => {
  const { campaign } = await params
  return (
    <main className='flex flex-col gap-y-5'>
      <h3 className='text-xl font-bold ml-6'>Create a Request</h3>
      {campaign}
    </main>
  )
}

CreateRequest.propTypes = {
  params: PropTypes.shape({
    campaign: PropTypes.string.isRequired
  }).isRequired
}

export default CreateRequest
