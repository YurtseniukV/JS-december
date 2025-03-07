let userId = new URL(location.href).searchParams.get('id');

let baseURL = `https://jsonplaceholder.typicode.com/users/${userId}`;
let postsURL = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;

fetch(baseURL)
    .then(resp => resp.json())
    .then(user => {
        let userContainer = document.querySelector('.user-container');
        userContainer.classList.add('userContainer');
        document.body.appendChild(userContainer);

        for (const key in user) {
            if (typeof user[key] !== 'object') {
                let p = document.createElement('p');
                p.innerHTML = `${key} : ${user[key]}`;
                userContainer.appendChild(p);
            } else {
                let ul = document.createElement('ul');
                ul.innerText = `${key} :`;

                Object.entries(user[key]).forEach(([item, value]) => {
                    let li = document.createElement('li');

                    if (item === 'geo') {
                        li.innerText = `${item} ( "${value.lat}" , "${value.lng}" )`;
                    } else {
                        li.innerText = `${item}: ${value}`;
                    }

                    ul.appendChild(li);
                });

                userContainer.appendChild(ul);
            }
        }

        let buttonCurrentPost = document.createElement('button');
        buttonCurrentPost.classList.add('buttonCurrentPost');
        buttonCurrentPost.innerText = 'Post of current user';
        userContainer.appendChild(buttonCurrentPost);

        let postsBlock = null;

        let getUserPost = function () {

            if (postsBlock) {
                postsBlock.style.display = postsBlock.style.display === 'none' ? 'grid' : 'none';
                buttonCurrentPost.innerText = postsBlock.style.display === 'none' ? 'Show posts of this user' : 'Hide posts of this user';
                return;
            }

            fetch(postsURL)
                .then(resp => resp.json())
                .then(posts => {
                    postsBlock = document.createElement('div');
                    postsBlock.classList.add('postsBlock');

                    posts.forEach(post => {
                        let postDiv = document.createElement('div');
                        postDiv.classList.add('postBlock');

                        let postTitle = document.createElement('p');
                        postTitle.innerText = post.title;

                        let buttonAboutPost = document.createElement('button');
                        buttonAboutPost.classList.add('buttonAboutPost')
                        buttonAboutPost.innerText = 'Read more...';

                        buttonAboutPost.addEventListener('click', () => {
                            location.href = `post-details.html?postId=${post.id}`;
                        });

                        postDiv.append(postTitle, buttonAboutPost);
                        postsBlock.appendChild(postDiv);
                    });

                    userContainer.append(postsBlock);

                    buttonCurrentPost.innerText = 'Hide posts of this user';
                    postsBlock.style.display = 'grid';
                });
        };

        buttonCurrentPost.addEventListener('click', () => {
            getUserPost();
        });
    });