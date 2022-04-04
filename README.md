# mern_01_user_authentication
Provides user authentication functions using MERN Stack including these use cases :
- User registration & email activation.
- User login & logout.
- User forget & reset password.

For email authentication and reset password, I use JWT token to encrypt data and expiration. For email authentication, I use SNS from AWS.

# Quick Start

## 1. Make sure you have AWS account and for non production environment, register email from and email to :
- Prepare 2 email account for email from and email to for email activation.
- Put the email from and email to in AWS SES service.

### 2. Configuration of S3 in AWS
- Go to S3
- Create bucket with default values. 
- Update permission policy
- Update CORS policy

## 2. Steps to running in local
### 2.1. Update env file at server/.env.git to server/.env and modify this content :
- PORT : 8000
- CLIENT_URL : Type your client url.
- DATABASE_URL : Type your database url.
- AWS_APP_KEY : AWS App Key for SNS email service.
- AWS_SECRET_KEY : AWS Secret Key for SNS email service.
- AWS_REGION : AWS region for SNS email service.
- EMAIL_FROM : Email from for email authentication. Make sure it's registered in AWS SNS for non production environment.
- EMAIL_REPLY_TO : Email to for email authentication. Make sure it's registered in AWS SNS for non production environment.

### 2.2. Run backend/server  :
- Go to server folder. 
- Run this command : npm start
- Check server : http://localhost:8000/api/test . It should return JSON message : "Test Success"

### 2.3. Run frontend/client  :
- Go to client folder. 
- Run this command : npm run dev
- Check client : http://localhost:3000/


## 3. Steps to running in AWS :
- Create IAM User. 
  Make sure the created IAM user has EC2 & SNS access  (contains AmazonEC2FullAccess , AmazonSESFullAccess in the policy)
- Create EC2 instance.
    - Select Ubuntu instance.
    - Configure security group as follow into your instance :
        - SSH 
        - HTTP with port 80
        - Custom TCP with port 8000 (for server port)
        - Custom TCP with port 3000 (for client port)
- Login into EC2 instance and do these steps :
    - Install nodeJs. 
    Use this link to help https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html
    - Change nodeJS to version 16
        - nvm install 16.13.1
        - nvm alias default 16.13.1
    - Check if git is installed: git --version
    - Get code from github: 
        - git clone https://github.com/m-triagni/mern_01_user_authentication.git
        - git config --global user.email [email]
        - git config --global user.password [password]    
    - Go to server folder 
        - Update .env file as in step #2 
        - Install dependencies : npm install
        - Start server : 
            - install pm2: npm install pm2 -g
            - running server background : pm2 start server.js
        - Check if it's running properly : curl localhost:8000/api/test
    - Go to client folder 
        - Update next.config.js as follows :
            - API: '/api' 
            - DOMAIN: AWS client domain
        - Install dependencies: 
            - npm install
            - npm run build
        - Start client :
            - pm2 start npm -- start
        - Check if it's running properly : curl localhost:3000
    - Setup nginx to make the app run on port 80.
        - Install nginx : sudo apt install nginx
        - Check if it's running properly : 
            - curl localhost
        - Go to dir : cd /etc/nginx/sites-enabled
        - Edit default page : sudo vi default
        - Comment location and add this :
            location / {
                proxy_pass http://127.0.0.1:3000;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
            } 
            location /api {
                proxy_pass http://127.0.0.1:8000;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
            }
        - Start nginx : 
            - sudo service nginx restart
            - sudo nginx -t
        - Check if its running properly : 
            - http://[EC2 url]
            - http://[EC2 url]/api/test
        - Any changes made in source code, you can update it with following procedures :
            - Go to mern_01_user_authentication folder
            - Pull from git hub : sudo git pull
            - Go to client folder
                - Build again : npm run build
                - Stop the server : pm2 stop npm
                - Start the server : pm2 start npm -- start
            - Go to server folder
                - Stop the server : pm2 stop server
                - Start the server : pm2 start server.js
        - When EC2 is restart, the url will change. Do this following procedures
            - Go to client folder
                - Update next.config.js related with EC2 new url
                - Stop the server : pm2 stop npm
                - Start the server : pm2 start npm -- start
            - Go to server folder
                - Update .env related with EC2 new url
                - Stop the server : pm2 stop npm
                - Start the server : pm2 start npm -- start
## 4. Perform this use case :
- Register user
- Authenticate email
- Login
- Logout
- Forget password
- Reset password

