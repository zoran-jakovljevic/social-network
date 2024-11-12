class User{
    user_id = '';
    username = '';
    email = '';
    password = '';
    api_url = 'http://localhost/SocialNetwork/php/user_api.php';
    api_url_login = 'http://localhost/SocialNetwork/php/check_user.php';

    create(){
        let data = {
            username: this.username,
            email: this.email,
            password: this.password
        }

        fetch(this.api_url, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        })

        .then(response=>response.json())

        .then(data => {
            if (data.message && data.id) { 
                let session = new Session();
                session.user_id = data.id;  
                session.startSession();
                window.location.href = 'firstPage.html';
            } else if (data.error) {
                alert(data.error);
            }
        })

        .catch(error=>{
            console.error('Error', error);
        });
    }

    async get(userid) {
        try {
            const response = await fetch(`${this.api_url}?id=${userid}`);
            const data = await response.json();
            return data;
        } catch (error) {
            return null;
        }
    }
    
    


    login() {
        let data = {
            email: this.email,
            password: this.password
        };

        fetch(this.api_url_login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data['success']==true && data['id']) {
                let session = new Session();
                session.user_id = data['id'];
                session.startSession();
                window.location.href = 'firstPage.html';
            } else{
                alert("Error: " + (data.error || "Invalid email or password"));
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    update() {
        let session = new Session();
        let sessionId = session.getSession();

        let data = {
            id: sessionId,
            username: this.username,
            email: this.email
        };
    
        fetch(this.api_url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

        .then(response => response.json())

        .then(data => {
            if (data.success) {
                alert("Successfully updated");
                window.location.href = '/';
            } else {
                alert("Error");
            }
        })
        .catch(error => console.error("Fetch error:", error));
    }

    delete(){
        let session = new Session();
        let sessionId = session.getSession();

        let data = {
            id: sessionId
        }

        fetch(this.api_url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        .then(response=>response.json())

        .then(data => {
            console.log(data)
            if(data.success){
                alert("Successfully")
                let session = new Session();
                session.destroySession();
                window.location.href = '/';
            }else{
                alert("Error")
            }
        })

        .catch(error => console.error("Fetch error:", error));

    }
        


    }