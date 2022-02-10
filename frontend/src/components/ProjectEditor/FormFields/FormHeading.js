import { Heading, Divider, Text, Box } from '@chakra-ui/react'

export const FormHeading = ({ text, subTitle }) => {
  return (
    <Box>
      <Heading as='h2' size='lg' alignSelf='flex-start'>
        {text}
      </Heading>
      {subTitle && (
        <Text color='gray.500' mt={1} mb={2}>
          {subTitle}
        </Text>
      )}
      <Divider mb={2} />
    </Box>
  )
}
