import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Center,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react'

import HeroImage from '../../assets/hero_img.jpg'

import { Signin } from './Signin'

export const Auth = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [formState, setFormState] = useState('signin')
  const initialRef = useRef()
  const navigate = useNavigate()
  const { accessToken } = useSelector((store) => store.user)

  useEffect(() => {
    if (accessToken) {
      navigate('/main/projects')
    }
    onOpen()
  }, [accessToken, navigate, onOpen])

  const onChangeFormState = () => {
    if (formState === 'signin') {
      setFormState('signup')
    } else if (formState === 'signup') {
      setFormState('signin')
    }
  }

  return (
    <Center h='100vh' bgImage={HeroImage} bgPosition='center' bgRepeat='no-repeat' bgSize='cover'>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} initialFocusRef={initialRef} isCentered>
        <ModalOverlay />
        <ModalContent w={350}>
          <ModalHeader>{formState === 'signin' ? 'Sign In!' : 'Create account!'}</ModalHeader>
          <ModalCloseButton onClick={() => navigate('/')} />
          <ModalBody pb={6}>
            <Signin
              // handleSubmit={handleSubmit}
              onClose={onClose}
              formState={formState}
              initialRef={initialRef}
              // loading={loading}
              // error={error}
            />
          </ModalBody>

          <ModalFooter>
            <Button onClick={onChangeFormState}>
              {formState === 'signup' ? 'Already have an account? Signin!' : 'New user? Signup!'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  )
}
