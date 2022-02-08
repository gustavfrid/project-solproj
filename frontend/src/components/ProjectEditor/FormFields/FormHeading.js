import { Heading, Divider } from '@chakra-ui/react'

export const FormHeading = ({ text }) => {
  return (
    <>
      <Heading as='h2' size='lg' alignSelf='flex-start'>
        {text}
      </Heading>
      <Divider />
    </>
  )
}
