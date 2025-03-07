let postId = new URL(location.href).searchParams.get('postId');
let baseUrl = `https://jsonplaceholder.typicode.com/posts/${postId}`;
let commentsUrl = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;
let commentsBlock = document.createElement('div')

fetch(baseUrl)
    .then(response => response.json())
    .then(post => {
        let postContainer = document.querySelector('.post-container');
        let postTitle = document.createElement('h4');
        postTitle.innerText = post.title;

        let postBody = document.createElement('p');
        postBody.innerText = post.body;

        let showCommentsButton = document.createElement('button');
        showCommentsButton.innerText = 'Show comments of this post';

        postContainer.append(postTitle,postBody,showCommentsButton);

        let getCommentsByUser = function () {
            fetch(commentsUrl)
                .then(response => response.json())
                .then(comments => {
                    let commentsBlock = document.createElement('div');
                    commentsBlock.classList.add('commentsBlock')
                    commentsBlock.innerHTML = '';

                    for(let comment of comments){
                        let commentElement = document.createElement('div');
                        commentElement.classList.add('commentBlock');

                        let commentTitle = document.createElement('h4');
                        commentTitle.innerText = comment.name;

                        let commentBody = document.createElement('p');
                        commentBody.innerText = comment.body;

                        commentElement.append(commentTitle, commentBody);
                        commentsBlock.appendChild(commentElement);
                    }

                    postContainer.appendChild(commentsBlock)

                    showCommentsButton.innerText = 'Hide comments of this post';

                    showCommentsButton.removeEventListener('click', getCommentsByUser);
                    showCommentsButton.addEventListener('click', () => {
                        commentsBlock.style.display = commentsBlock.style.display === 'none' ? 'block' : 'none';
                        showCommentsButton.innerText = commentsBlock.style.display === 'none' ? 'Show comments of this post' : 'Hide comments of this post'; // Змінюємо текст кнопки
                    });
                })

        }

        showCommentsButton.addEventListener('click', getCommentsByUser)
    })