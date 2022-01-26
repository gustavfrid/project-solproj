/*
 * call other imported services, or same service but different functions here if you need to
 */
const testController = async (req, res, next) => {
  const { user, content } = req.body
  try {
    let message = (text) => text
    await message('test ok!')
    // other service call (or same service, different function can go here)
    // i.e. - await generateBlogpostPreview()
    res.sendStatus(201)
    next()
  } catch (e) {
    console.log(e.message)
    res.sendStatus(500) && next(error)
  }
}

module.exports = {
  testController,
}
