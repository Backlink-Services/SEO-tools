const Profile = require('../models/Profile')
const commentServices = require('../services/commentServices')

// Get Profile

// Get All Profile
module.exports.getAllProfile = async function (req, res) {
  try {
    const profiles = await Profile.find({})

    res.status(200).json({
      status: 'success',
      profiles,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err })
  }
}

// Create Profile
module.exports.createProfile = async function (req, res) {
  console.log(req.body)
  try {
    const newPost = await Profile.create(req.body)
    res.status(201).json({
      message: 'create post successfully',
      newPost: newPost,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err })
  }
}

// Update Profile
module.exports.updateProfile = async function (req, res) {
  let id = req.params.id
  try {
    const updatedPost = await Profile.findByIdAndUpdate(id, req.body, {
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

// Delete Profile
module.exports.deleteProfile = async function (req, res) {
  let id = req.params.id
  try {
    const deletedPost = await Profile.findByIdAndDelete(id)
    res.status(200).json({
      message: 'delete post successfully',
      deletedPost: deletedPost,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err })
  }
}

// Comment
module.exports.postComment = async function (req, res) {
  const { profileId, urls } = req.body
  // console.log(1)
  // console.log(urls)
  // console.log(profileId)
  // console.log(3)
  const result = await commentServices.postComment(profileId, urls)
  console.log(result)
  // const finalResult = [...result]
  res.status(200).json({
    message: 'post comment successfully',
    data: {
      result,
    },
  })
}
