// https://jsonplaceholder.typicode.com/guide/

async function downloadPosts (page = 1) {
  const postsURL = `https://jsonplaceholder.typicode.com/posts?_page=${page}`
  const response = await fetch(postsURL)
  const articles = await response.json()
  return articles
}

async function downloadComments (postId) {
  const commentsURL = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  const response = await fetch(commentsURL)
  const comments = await response.json()
  return comments
}

async function getUserName (userId) {
  const userURL = `https://jsonplaceholder.typicode.com/users/${userId}`
  const response = await fetch(userURL)
  const user = await response.json()
  return user.name
}

function getArticleId (comments) {
  const article = comments.previousElementSibling
  const data = article.dataset
  return data.postId
}

async function generateArticle (post) {
  const article = document.createElement('article')
  const title = document.createElement('h2')
  const byAuthor = document.createElement('aside')
  const author = document.createElement('span')
  const articleP = document.createElement('p')

  article.setAttribute('data-post-id', post.id)

  title.textContent = post.title

  author.textContent = await getUserName(post.userId)
  byAuthor.textContent = "by "
  byAuthor.appendChild(author)

  articleP.innerHTML = post.body.split("\n").join("<br>")

  article.appendChild(title)
  article.appendChild(byAuthor)
  article.appendChild(articleP)
  return article
}

function populateDetails (detail) {
  const summary = document.createElement('summary')
  summary.textContent = "See what our readers had to say..."
  detail.appendChild(summary)

  const sect = document.createElement('section')
  const header = document.createElement('header')
  const comHead = document.createElement('h3')
  comHead.textContent = "Comments"
  header.appendChild(comHead)
  sect.appendChild(header)
  detail.appendChild(sect)
}

function createComment (comment) {
  const commentAside = document.createElement('aside')

  const commentText = document.createElement('p')
  commentText.innerHTML = comment.body.split("\n").join("<br>")
  

  const commentTitle = document.createElement('p')
  const commentSm = document.createElement('small')
  commentSm.innerHTML = comment.name


  commentTitle.appendChild(commentSm)

  commentAside.appendChild(commentText)
  commentAside.appendChild(commentTitle)

  return commentAside
}

/*
const details = document.getElementsByTagName('details')
for (const detail of details) {
  detail.addEventListener('toggle', async event => {
    if (detail.open) {
      const asides = detail.getElementsByTagName('aside')
      const commentsWereDownloaded = asides.length > 0
      if (!commentsWereDownloaded) {
        const articleId = getArticleId(detail)
        const comments = await downloadComments(articleId)
        console.log(comments)
      }
    }
  })
}
*/

const posts = await downloadPosts(2)
const main = document.querySelector('main')
for (const post of posts) {
  const article = await generateArticle(post)
  const details = document.createElement('details')
  populateDetails(details)
  const commentSection = details.querySelector('section')
  details.addEventListener('toggle', async event => {
    if (details.open) {
      const asides = details.getElementsByTagName('aside')
      const commentsWereDownloaded = asides.length > 0
      if (!commentsWereDownloaded) {
        const articleId = getArticleId(details)
        const comments = await downloadComments(articleId)
        console.log(comments)
        for (const comment of comments) {
          commentSection.appendChild(createComment(comment))
        }
      }
    }
  })
  main.appendChild(article)
  main.appendChild(details)
}
console.log(posts)
