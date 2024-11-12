let session = new Session();
let session_id = session.getSession();
let user = new User();

async function loadUserData() {
    if (session_id) {
        const userData = await user.get(session_id);
        
        if (userData) {
            document.querySelector('#email').innerText = userData.email;
            document.querySelector('#username').innerText = userData.username;
            document.querySelector('#edit_username').value = userData.username;
            document.querySelector('#edit_email').value = userData.email;
        } else {
            console.error("Ne mogu da učitam korisničke podatke.");
        }
    } else {
        window.location.href = "/";
    }
}

loadUserData();

document.querySelector('#logout').addEventListener('click', e => {
    e.preventDefault();
    let session = new Session();
    session.destroySession();
    window.location.href = '/';
});

document.querySelector('#editAccount').addEventListener('click', () => {
    document.querySelector('.custom-modal').style.display = 'block';
});

document.querySelector('#closeModal').addEventListener('click', () => {
    document.querySelector('.custom-modal').style.display = 'none';
});

document.querySelector('#editForm').addEventListener('submit', e => {
    e.preventDefault();
    let username = document.querySelector('#edit_username').value;
    let email = document.querySelector('#edit_email').value;

    user.username = username;
    user.email = email;
    user.update();
});

document.querySelector('#deleteButton').addEventListener('click', e => {
    e.preventDefault();
    user.delete();
});


document.querySelector('#postForm').addEventListener('submit', e => {
    e.preventDefault();

    async function createPost(){
        let content = document.querySelector('#postContent').value;
        document.querySelector('#postContent').value = '';
        let post = new Post();
        post.post_content = content;
        post = await post.create();
    
        user = await user.get(session_id);

        let html = document.querySelector('#allPostsWrapper').innerHTML;
    
        let delete_post_html = '';
        
        if(session_id === post.user_id){
            delete_post_html = '<button class="remove-btn" onclick="removeMyPost(this)">Remove</button>';
        }
    
        document.querySelector('#allPostsWrapper').innerHTML = `<div class='single-post' data-post_id='${post.id}'> 
                                                                <div class='post-content'>${post.content}</div>
    
                                                                <div class="post-actions">
                                                                <p><b>Autor: </b>${session_id}</p>
                                                                </div>
    
                                                                <div>
                                                                <button onclick="likePost(this)" class="likePostJS like-btn"><span>${post.likes}</span> Likes</button>
                                                                <button class="comment-btn" onclick="commentPost(this)">Comments</button>
                                                                ${delete_post_html}
                                                                </div>
                                                                </div>
    
                                                                 <div class='post-comments'>
                                                                    <form>
                                                                        <input placeholder="Write a comment..." type="text" class="comment">
                                                                        <button onclick="commentPostSubmit(event)">Comment</button>
                                                                    </form>
                                                                    </div>
                                                                </div>` + html;
    }
    
    createPost();
});


async function getAllPosts() {
    let all_posts = new Post();
    all_posts = await all_posts.getAllPosts();

    all_posts.forEach(post => {
        async function getPostUser() {
            
            let user = new User();
            user = user.get(post.user_id);

            let comments = new Comment();
            comments = await comments.getAllComments(post['id']);
            
            let comments_html = '';

            if(comments.length > 0){
                comments.forEach(comment => {
                    comments_html += `<div class="single-comment">${comment}</div>`
            })
            }

            let html = document.querySelector('#allPostsWrapper').innerHTML;

            let delete_post_html = '';
        
            if(session_id === post.user_id){
                delete_post_html = '<button class="remove-btn" onclick="removeMyPost(this)">Remove</button>';
            }

            document.querySelector('#allPostsWrapper').innerHTML = `<div class='single-post' data-post_id='${post.id}'> 
                                                                <div class='post-content'>${post.content}</div>
    
                                                                <div class="post-actions">
                                                                <p><b>Autor: </b>${post.user_id}</p>
                                                                </div>
    
                                                                <div class='informations'>
                                                                <button onclick="likePost(this)" class="likePostJS like-btn"><span>${post.likes}</span> Likes</button>
                                                                <button class="comment-btn" onclick="commentPost(this)">Comments</button>
                                                                ${delete_post_html}
                                                                </div>
                                                                
    
                                                                 <div class='post-comments'>
                                                                    <form>
                                                                        <input placeholder="Write a comment..." type="text" class="comment">
                                                                        <button onclick="commentPostSubmit(event)">Comment</button>
                                                                    </form>
                                                                    ${comments_html}
                                                                    </div>
                                                                </div></div>` + html;

        }
        
        getPostUser();

    });

    

}

getAllPosts();

function commentPostSubmit(event) {
    event.preventDefault();

    let button = event.target;
    button.setAttribute('disabled', 'true');

    let commentInput = button.previousElementSibling;
    let commentValue = commentInput.value;

    let parentElement = button.closest('.single-post');
    let postId = parentElement.getAttribute('data-post_id');

    parentElement.querySelector('.post-comments').innerHTML += `<div class="single-comment">${commentValue}</div>`;

    let comment = new Comment();
    comment.post_id = postId;
    comment.comment_content = commentValue;

    comment.create();

}

function removeMyPost(el) {
    let parentElement = el.closest('.single-post');
    let post_id = parentElement.getAttribute('data-post_id');
    parentElement.remove();
    let post = new Post();
    post.deletePost(post_id);
}

function likePost(btn) {
    btn.setAttribute('disabled', 'true');
    let parentElement = btn.closest('.single-post');
    let postId = parentElement.getAttribute('data-post_id');
    let post = new Post();
    post.updateLikes(postId);

    let likesSpan = btn.querySelector('span');

    let currentLikes = parseInt(likesSpan.innerText);
    likesSpan.innerText = currentLikes + 1;


}

function commentPost(btn) {
    let parentElement = btn.closest('.informations');
    let nextElement = parentElement.nextElementSibling;
    nextElement.style.display = 'block';
}


document.querySelector('#editAccount').addEventListener('click', ()=> {
    document.querySelector('.custom-modal').style.display = 'block';
})

document.querySelector('#closeModal').addEventListener('click', () => {
    document.querySelector('.custom-modal').style.display = 'none';
})

document.querySelector('#editForm').addEventListener('submit', e => {
    e.preventDefault();

    let user = new User();
    user.username = document.querySelector('#edit_username').value;
    user.email = document.querySelector('#edit_email').value;
    user.edit();
})

