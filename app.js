document.getElementById('getText').addEventListener(
    'click', getText)


//fetch text file from sample.txt
function getText() {
    fetch('sample.txt')
    //fetch returns a promise - placeholder for response will receive asyncronously
    .then(function(response){
        return response.text()
    })
    //this will give the data, text inside the file
    .then(function(data){
        document.getElementById('output').textContent = data
    })
    // to catch errors with promises use .catch()
    .catch(error => console.log(error))
}


// fetch data from json file
document.getElementById('getJson').addEventListener('click', getJson)
function getJson(){
    fetch('users.json')
    .then(res => res.json())
    .then(data => {
        //put output in the browser
        let output = '<h2 class="mb-4">Json Users</h2>'
        // console.log(data)
        data.forEach(user => {
            output += `
                <ul class="list-group mb-3">
                    <li class="list-group-item">ID: ${user.id}</li>
                    <li class="list-group-item">Name: ${user.name}</li>
                    <li class="list-group-item">Email: ${user.email}</li>
                </ul>
            `
        });
        document.getElementById('output').innerHTML = output
    })
}

//fetch data from outside API
document.getElementById('getPosts').addEventListener('click', getPosts)

function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(data => {
        //put output in the browser
        let output = '<h2 class="mb-4">Posts</h2>';
        // console.log(data)
        data.forEach(post => {
            output += `
                <div class="card card-body mb-3">
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                </div>
                `
        });
        document.getElementById('output').innerHTML = output
    })
}

//form to post
document.getElementById('addPost').addEventListener('submit', addPost)

function addPost(e) {
    e.preventDefault() //stop form from submitting to a file
    let title = document.getElementById('title').value
    let body = document.getElementById('body').value

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({title:title, body:body})
    })
    .then(res=>res.json())
    .then(data => console.log(data))
}