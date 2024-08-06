const Profile = require('../models/Profile')
const { Builder, By, Key, until, Browser } = require('selenium-webdriver')

selectors = {
  author: [
    "input[type='text'][name*='author' i]",
    "input[type='text'][name*='name' i]",
    "input[name*='name' i]",
    "input[id*='name' i]",
    "input[type='text']",
  ],
  email: [
    "input[type='text'][name*='mail' i]",
    "input[name*='mail' i]",
    "input[id*='mail' i]",
    "input[type='email']",
  ],
  phone: [
    "input[type='text'][name*='url' i]",
    "input[name*='url' i]",
    "input[type='text']",
  ],
  website: [
    "input[type='text'][name*='url' i]",
    "input[name*='url' i]",
    "input[type='text']",
  ],
  comment: [
    "textarea[name*='comment' i]",
    "input[type='text'][name*='comment' i]",
    "input[name*='comment' i]",
    'textarea',
    "input[type='text']",
  ],
  submit: [
    "input[type='submit'][name*='submit' i]",
    "input[type='submit']",
    "input[name*='submit' i]",
    'span',
  ],
}

async function findElementBySelector(driver, selectors) {
  for (let selector of selectors) {
    try {
      let element = await driver.findElement(By.css(selector))
      if (element && (await element.isDisplayed) && (await element.isEnabled)) {
        return element
      }
    } catch (err) {
      console.log('cant find element ' + err.message + ' selectors ' + selector)
    }
  }
  return null
}

module.exports.postComment = async function (postId, urls) {
  let driver = new Builder().forBrowser(Browser.CHROME).build()

  //   var dataResp
  //   try {
  //     console.log(postId)
  //   } catch (error) {
  //     // console.log(error.response)
  //   }

  try {
    dataResp = await Profile.findById(postId)
    const { name, phone, email, url, comment } = dataResp
    let result = {}

    for (let url of urls) {
      try {
        await driver.get(url)
        await driver.wait(driver, 2000)

        try {
          let nameField = await findElementBySelector(
            driver,
            selectors['author']
          )
          let emailField = await findElementBySelector(
            driver,
            selectors['email']
          )
          let phoneField = await findElementBySelector(
            driver,
            selectors['phone']
          )
          let websiteField = await findElementBySelector(
            driver,
            selectors['website']
          )
          let commentField = await findElementBySelector(
            driver,
            selectors['comment']
          )
          let submitButton = await findElementBySelector(
            driver,
            selectors['submit']
          )

          if (
            !nameField &&
            !emailField &&
            !phoneField &&
            !websiteField &&
            !commentField &&
            !submitButton
          ) {
            console.log('cant find anything')
            continue
          } else {
            if (nameField) {
              await nameField.sendKeys(name)
            }
            if (emailField) {
              await emailField.sendKeys(email)
            }
            if (phoneField) {
              await phoneField.sendKeys(phone)
            }
            if (websiteField) {
              await websiteField.sendKeys(url)
            }
            if (commentField) {
              await commentField.sendKeys(comment)
            }

            if (submitButton) {
              console.log('submit')
              await submitButton.click()
            }
          }
        } catch (err) {
          console.log(err.message)
          continue
        }
      } catch (err) {
        console.log(err.message)
        continue
      }
      result[url] = 'Sucess'
    }
    console.log(result)
  } catch (err) {
    console.log('Unexpected error: ' + err.message)
  } finally {
    await driver.quit()
  }
}
