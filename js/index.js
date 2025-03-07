let url = new URL('https://jsonplaceholder.typicode.com/users');

let usersContainer = document.querySelector('.users-container');

fetch(url)
    .then(response => response.json())
    .then(
        users =>
            users.map(user => {
                let userBlock = document.createElement('div');
                userBlock.classList.add("userBlock");
                let userDetailsButton = document.createElement('button');
                userDetailsButton.classList.add("userDetailButton");

                userBlock.innerText = `${user.id} - ${user.name}`;
                userDetailsButton.innerText = 'About this user'

                userDetailsButton.addEventListener('click', () => {
                    location.href = `user-details.html?id=${user.id}`
                })

                userBlock.appendChild(userDetailsButton)
                usersContainer.appendChild(userBlock);
            })
    )