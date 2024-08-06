const post = require('../models/post')
const commentServices = require('../services/commentServices')

module.exports.getAllPost = async function (req, res) {
  try {
    const posts = await post.find({})
    res.status(200).json({
      status: 'success',
      //   result: posts.length,
      data: {
        posts,
      },
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err })
  }
}

module.exports.createPost = async function (req, res) {
  try {
    const newPost = await post.create(req.body)
    res.status(201).json({
      message: 'create post successfully',
      newPost: newPost,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err })
  }
}

module.exports.updatePost = async function (req, res) {
  let id = req.params.id
  try {
    const updatedPost = await post.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    res.status(200).json({
      message: 'update post successfully',
      updatedPost: updatedPost,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err })
  }
}

module.exports.deletePost = async function (req, res) {
  let id = req.params.id
  try {
    const deletedPost = await post.findByIdAndDelete(id)
    res.status(200).json({
      message: 'delete post successfully',
      deletedPost: deletedPost,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err })
  }
}

module.exports.postComment = async function (req, res) {
  const { profileId, urls } = req.body
  await commentServices.postComment(profileId, urls)
  res.status(200).json({
    message: 'post comment successfully',
  })
}
