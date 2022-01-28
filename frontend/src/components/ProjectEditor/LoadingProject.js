import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const LoadingProject = () => {
  const { projectId } = useSelector((store) => store.project)
  const navigate = useNavigate()

  useEffect(() => {
    if (projectId !== 'new') {
      console.log('new project loaded!')
      navigate(`/main/projects/${projectId}`)
    }
  }, [projectId, navigate])

  return <div>Loading...</div>
}
