/*
 * call other imported services, or same service but different functions here if you need to
 */
export const testController = async (req, res, next) => {
  const { user, content } = req.body
  let message = (text) => text
  try {
    const newMessage = await message('test ok!')
    console.log(newMessage)
    // other service call (or same service, different function can go here)
    // i.e. - await generateBlogpostPreview()
    res.status(201).json({ message: newMessage })
    next()
  } catch (e) {
    console.log(e.message)
    res.sendStatus(500) && next(error)
  }
}

export const welcomeController = async (req, res, next) => {
  res.send('Welcome to solproj API')
  next()
}
