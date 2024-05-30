# The Social Tree 🌳
A Social Media App Project designed to connect a people's multiple social accounts all together at a single place.

## The Need ?
In the modern 2024 year, it is really hard to keep all your friend's or your family member's social media accounts on one place and since social media has become such an important part of our lives there should be an app which can be helped to directly connect all your social accounts at one place which your friends can check out.


## Demo 💻

You can view the web app live at: https://web.socialtree.site

**TO FORK IT**
1. Make sure to `star` the repo if you like it :)
2. Make sure to replace the credentials inside the src/firebase/firebase.js with your own Firebase credentials.
3. Turn on the authentication/email-password and firestore module from firebase backend.

## Features 

+ **Profile Card**: This gives each user his own unique profile card link which he can share to his friends and this profile card has the user's all social media links in form of `buttons`.

+ **Family Creation Feature**: This gives users the ability to create and manage a group of their close ones, here we offer `chatting` `photo sharing` `list of all members` and various more community features.

+ **Customizable Profile**: We offer the user to customize their profile however they want. We currently have public and private toggling of profiles new updates will launch other features as well.
& various more!!!

## Data Safety 🔐
+ **User Side Data**: All the user side data such as email, first name, last name, password, family name, send messages, recieved messages are stored in firestore which is a firebase database offered by google. The database has `encrypted` data in and out system therefore data cannot be stolen during mid way.

+ **Database Owner**: The database is owned by brokendev2007@gmail.com himself and he will be responsible for any kind of mishappenings.

+ **Message encryption** We provide basic SHA512 encryption system therefore the message data is stored in form of encrypted code in the database and is decrypted directly in the front end which the the client side loading.



## Tech Stack ⚙️

💻 **Client:** React, Vite, Antd for ui. 🖥️ **Server:** Node, Firebase


