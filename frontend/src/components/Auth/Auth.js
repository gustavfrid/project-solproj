import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
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
import { user } from '../../reducers/userReducer'
import { API_URL } from '../../utils/constants'
import { Signin } from './Signin'

export const Auth = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [formState, setFormState] = useState('signin')

  const initialRef = useRef()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const accessToken = useSelector((store) => store.user.accessToken)
  //const loading = useSelector(store => store.user.loading)

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

  const handleSubmit = (values) => {
    dispatch(user.actions.setLoading(true))

    fetch(API_URL(formState), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId))
            dispatch(user.actions.setUsername(data.response.username))
            dispatch(user.actions.setAccessToken(data.response.accessToken))
            dispatch(user.actions.setError(null))
          })
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null))
            dispatch(user.actions.setUsername(null))
            dispatch(user.actions.setAccessToken(null))
            dispatch(user.actions.setError(data.response))
          })
        }
      })
      .finally(dispatch(user.actions.setLoading(false)))
  }

  return (
    <Center h='100vh' bgImage={HeroImage} bgPosition='center' bgRepeat='no-repeat' bgSize='cover'>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} initialFocusRef={initialRef} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{formState === 'signin' ? 'Sign In!' : 'Create account!'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Signin handleSubmit={handleSubmit} onClose={onClose} formState={formState} initialRef={initialRef} />
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
