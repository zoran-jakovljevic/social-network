class Comment {
    comment_id = '';
    post_id = '';
    user_id = '';
    comment_content = '';
    api_url = "http://localhost/SocialNetwork/php/comments.php"

    async create() {
        let session = new Session();
        let sessionId = session.getSession();

        let data = {
            user_id: sessionId,
            post_id: this.post_id,
            content: this.comment_content
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

    async getAllComments(post_id) {
        let response = await fetch(`${this.api_url}?post_id=${post_id}`); 
        let data = await response.json();
    
        let post_comments = [];
    
        data.forEach(item => {
            if (item.post_id === post_id) {
                post_comments.push(item['content']);
            }
        });

        return post_comments;
    }
    
    
}
