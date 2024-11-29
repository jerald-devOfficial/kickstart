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
  description: z.string().min(1, 'Description is required'),
  value: z
    .string()
    .refine((val) => /^\d*\.?\d+$/.test(val) && parseFloat(val) > 0, {
      message: 'Value must be a positive number'
    }),
  recipient: z.string().min(1, 'Recipient is required')
})

const CreateRequestForm = ({ address }) => {
  const { push } = useRouter()
  const reducer = (state, action) => ({ ...state, ...action })
  const initialState = {
    buttonText: 'Create!',
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
      description: '',
      value: '0',
      recipient: ''
    }
  })

  // Define the mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      dispatch({ buttonText: 'Creating...', error: null, success: null })
      const currentCampaign = Campaign(address)
      const accounts = await web3.eth.getAccounts()
      return currentCampaign.methods
        .createRequest(
          data.description,
          web3.utils.toWei(data.value, 'ether'),
          data.recipient
        )
        .send({
          from: accounts[0]
        })
    },
    onSuccess: () => {
      dispatch({
        buttonText: 'Created!',
        success: 'Successfully created request.'
      })
      push('/')
    },
    onError: ({ message }) => {
      dispatch({ error: message, buttonText: 'Try again!' })
    }
  })

  const onSubmit = (values) => mutate(values)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold'>Description</FormLabel>
              <div className='flex items-center w-full'>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Description'
                    {...field}
                    className='rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-blue-200'
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='value'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold'>Value</FormLabel>
              <div className='flex items-center w-full'>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='Value'
                    {...field}
                    className='rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-blue-200'
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='recipient'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold'>Recipient</FormLabel>
              <div className='flex items-center w-full'>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Recipient'
                    {...field}
                    className='rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-blue-200'
                  />
                </FormControl>
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

CreateRequestForm.propTypes = {
  address: PropTypes.string.isRequired
}

export default CreateRequestForm
