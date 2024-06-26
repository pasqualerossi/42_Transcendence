# Project Overview

<img width="796" alt="Screen Shot 2023-06-05 at 3 32 22 PM" src="https://github.com/pasqualerossi/42_Transcendence/assets/58959408/fc3c968e-96ac-4770-a90d-3ab4a4d18941">

<br>

# 💂 Security

<img width="735" alt="Screen Shot 2023-06-06 at 8 32 07 PM" src="https://github.com/pasqualerossi/42_Transcendence/assets/58959408/167c8acf-759a-48c4-a0be-71859a6b30c3">

<br>

# 💻 Setup

1. Copy the following to iTerm:
```
git clone https://github.com/pasqualerossi/42_Transcendence.git && cd 42_Transcendence && touch db.env && cd backend && touch .env && cd .. && cd frontend && vim .env
```
2. Now copy this into the .env file your currently in:
```
VUE_APP_HOST_URL='http://<HOST_URL>'
```
3. Once copied, save and quit by doing ```wq``` on your keyboard.
4. Copy the following to iTerm:
```
cd .. && vim db.env
```
5. Now copy this into the db.env file your currently in:
```
POSTGRES_USER=trans
POSTGRES_PASSWORD=trans
POSTGRES_DB=transcendence
PGADMIN_DEFAULT_EMAIL=trans@trans.com
PGADMIN_DEFAULT_PASSWORD=admin
```
6. Once copied, save and quit by doing ```wq``` on your keyboard.
7. Copy the following to iTerm:
```
cd backend && vim .env
```
8. Copy the following to the .env file your currently in:
```
DB_HOST='postgres'
DB_PORT=5432
DB_USERNAME='trans'
DB_PASSWORD='trans'
DB_NAME='transcendence'
TWO_FACTOR_AUTHENTICATION_APP_NAME='transcendence'
JWT_ACCESS_TOKEN_SECRET='secretllul'
JWT_ACCESS_TOKEN_EXPIRATION_TIME='2000'
JWT_REFRESH_TOKEN_SECRET='secretllul_2'
JWT_REFRESH_TOKEN_EXPIRATION_TIME='2000'
FORTYTWO_APP_ID='<UID_OF_YOUR_42_API_APP>'
FORTYTWO_APP_SECRET='<SECRET_OF_YOUR_42_API_APP>'
CALLBACK_URL='http://<HOST_URL>:3000/authentication/callback'
VUE_APP_HOST_URL='http://<HOST_URL>'
```
9. Once copied, save and quit by doing ```wq``` on your keyboard.

10. Now click on this website: https://profile.intra.42.fr/oauth/applications/new

11. On the website, type in any name you like:

<img width="872" alt="Screen Shot 2023-06-09 at 12 31 32 PM" src="https://github.com/pasqualerossi/42_Transcendence/assets/58959408/d5ba585f-68cb-4a9e-ba31-b512f0d902a7">

12. Further down the website, in the field 'Redirect URI' 

<img width="892" alt="Screen Shot 2023-06-09 at 12 33 50 PM" src="https://github.com/pasqualerossi/42_Transcendence/assets/58959408/f7a11fbb-e3fa-4fe6-9157-2b371f6b2306">

Copy and paste the following:
```
http://<HOST_URL>:3000/authentication/callback
```

and click submit.

<img width="104" alt="Screen Shot 2023-06-09 at 12 35 40 PM" src="https://github.com/pasqualerossi/42_Transcendence/assets/58959408/0d59270b-4a91-45ba-b755-3d4df6023ae3">

13. Head back to your iTerm and copy the following to iTerm:
```
cd .. && docker-compose up --build
```
