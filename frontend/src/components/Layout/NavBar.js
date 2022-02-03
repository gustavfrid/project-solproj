import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, NavLink } from 'react-router-dom'
import { IconButton, Button, Flex, Image } from '@chakra-ui/react' //MenuItem
import { HamburgerIcon, CloseIcon, LockIcon, AddIcon, RepeatIcon, ChevronLeftIcon } from '@chakra-ui/icons'

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'

import { user } from '../../reducers/userReducer'
import { project } from '../../reducers/projectReducer'
import Sun from '../../assets/sun.png'

export const NavBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [displayMenu, setDisplayMenu] = useState('none')
  // const toggle = () => setIsOpen(!isOpen)
  // const { colorMode, toggleColorMode } = useColorMode()

  const handleSignout = () => {
    dispatch(user.actions.reset())
    dispatch(project.actions.reset())
  }

  const handleProjectRefresh = () => {
    dispatch(project.actions.reset())
    navigate('/main/projects')
  }

  const MenuItems = () => {
    return (
      <>
        <NavLink to='/main/projects/new'>
          <Button variant='ghost' aria-label='Project List' w='100%' onClick={() => setDisplayMenu('none')}>
            New Project
          </Button>
        </NavLink>
        <NavLink onClick={() => dispatch(project.actions.reset())} to='/main/projects'>
          <Button variant='ghost' aria-label='Project List' w='100%' onClick={() => setDisplayMenu('none')}>
            Project List
          </Button>
        </NavLink>
        <NavLink onClick={() => handleSignout()} to='/'>
          <Button variant='ghost' aria-label='Project List' w='100%' onClick={() => setDisplayMenu('none')}>
            Sign Out
          </Button>
        </NavLink>
      </>
    )
  }

  return (
    <Flex h='50px' align='center'>
      <Image ml={2} w='40px' src={Sun} alt='logo' />

      <Flex align='center' ml='auto'>
        <Flex display={['none', 'flex', 'flex', 'flex']}>
          <MenuItems />
        </Flex>

        {/* <IconButton
          aria-label='Open menu'
          variant='ghost'
          size='lg'
          mr={2}
          icon={<HamburgerIcon />}
          display={['flex', 'flex', 'none', 'none']}
          onClick={() => setDisplayMenu('flex')}
        /> */}

        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Open menu'
            icon={<HamburgerIcon />}
            variant='ghost'
            size='lg'
            mr={2}
            display={['flex', 'none', 'none', 'none']}
          />
          <MenuList zIndex='10'>
            <MenuItem icon={<AddIcon />} onClick={() => navigate('/main/projects/new')}>
              New Project
            </MenuItem>
            <MenuItem icon={<ChevronLeftIcon />} onClick={() => navigate('/main/projects')}>
              Project List
            </MenuItem>
            <MenuItem icon={<RepeatIcon />} onClick={handleProjectRefresh}>
              Refresh Projects
            </MenuItem>
            <MenuItem icon={<LockIcon />} onClick={handleSignout}>
              Sign Out!
            </MenuItem>
          </MenuList>
        </Menu>
        {/* <Switch color='green' isChecked={colorMode === 'dark'} onChange={toggleColorMode} alignSelf='center' /> */}
      </Flex>
    </Flex>
  )
}
