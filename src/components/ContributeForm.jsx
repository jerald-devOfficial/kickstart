'use client'
import Campaign from '@/campaign'
import Message from '@/components/Message'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import web3 from '@/web3'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import PropTypes from 'prop-types'
import { useReducer } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  value: z.number().min(1, 'Value must be a positive number')
})

const ContributeForm = ({ address }) => {
  const { push } = useRouter()
  const reducer = (state, action) => ({ ...state, ...action })
  const initialState = {
    buttonText: 'Contribute!',
    success: null,
    error: null
  }

  const [{ buttonText, error, success }, dispatch] = useReducer(
    reducer,
    initialState
  )

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: 100
    }
  })

  // Define the mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      dispatch({ buttonText: 'Sending...', error: null, success: null })
      const currentCampaign = Campaign(address)
      const accounts = await web3.eth.getAccounts()
      return currentCampaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(data.value, 'ether')
      })
    },
    onSuccess: () => {
      dispatch({
        buttonText: 'Sent!',
        success: 'Successfully sent ether to the campaign.'
      })
      push('/')
    },
    onError: ({ message }) => {
      dispatch({ error: message, buttonText: 'Try again!' })
    }
  })

  const onSubmit = (values) => {
    mutate(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='value'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold'>Amount to Contribute</FormLabel>
              <div className='flex items-center w-full'>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='100'
                    {...field}
                    className='rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-blue-200'
                  />
                </FormControl>
                <span className='h-10 flex items-center bg-gray-200 px-2 rounded-l-none border-y border-r rounded-r-md'>
                  ether
                </span>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='bg-blue-600 text-white font-medium'>
          {isPending && <Loader2 className='w-4 h-4 animate-spin' />}
          {buttonText}
        </Button>
        {success && <Message message={success} type='success' />}
        {error && <Message message={error} type='error' />}
      </form>
    </Form>
  )
}

ContributeForm.propTypes = {
  address: PropTypes.string.isRequired
}

export default ContributeForm
