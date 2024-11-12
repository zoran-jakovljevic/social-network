class Post {
    post_id = '';
    post_content = '';
    user_id = '';
    likes = '';
    api_url = 'http://localhost/SocialNetwork/php/api_url_post.php';

    async create() {
        let session = new Session();
        let session_id = session.getSession();

        let data = {
            user_id: session_id,
            content: this.post_content,
            likes: 0
        };

        data = JSON.stringify(data);

        let response = await fetch(this.api_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });

        let responseData = await response.json();
        return responseData;
    }

    async getAllPosts() {
        let response = await fetch(this.api_url);
        let data = await response.json();
        return data;
    }

    async updateLikes(postId) {

        let session = new Session();
        let session_id = session.getSession();

        let data = {
            post_id: postId,
            user_id: session_id
        }

        fetch(this.api_url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        .then(response => response.json())

        .then(data => {
            if(data.message == "error"){
                alert("You already liked this post");
            }
        })

        .catch(error => console.error('Error', error));

    }

    deletePost(post_id){

        let data = {
            post_id: post_id
        }

        fetch(this.api_url, {
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        })

        .then(response => response.json())
        
        .then(data => {
            if (data.message === "Deleted successfully") {
                alert("Comment deleted!");
                window.location.href = '/';
            } else {
                console.error("Error deleting comment:", data.message);
            }
        })

        
    }

}
