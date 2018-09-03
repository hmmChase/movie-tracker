# Movie Tracker

## Context

This project is working off the The Movie DB API. The idea of the project is to be able to sign in as a user and save favorite movies. This is our first dive into redux and testing redux.

---

## To use:

- Clone down this repo

### Start backend

- cd movie-tracker
- From the command line, run the following command to create a users database `psql -f ./database/users.sql` (Must have PostgreSQL installed)
- Install the dependencies -> `npm install`
- Start server -> `npm start`

### Start frontend

- cd client
- Install the dependencies -> `npm install`
- Start server -> `npm start`
- Once server is running visit -> `http://localhost:3001`

---

## API

- ##### Sign In `/api/users`

To sign in you will need to pass in _email_ and _password_ to the _body_.
Emails should be sent in all lowercase. - ex: `{..., body: {email: 'tim@aol.com', password: 'password'} }`
The database starts off with a single user inside. -> { email: tman2272@aol.com password: password }. Keep in mind the response will send the entire user back.

- ##### Create Account - `/api/users/new`

  Creating an account must have all input fields filled in (name, email, password)
  You must send all three into the body. Passwords are case sensitive.
  Keep in mind the response only gives the new user ID.

- ##### Add Favorite - `/api/users/favorites/new`

  To save a favorite you must send into the body: movie_id, user_id and title, poster_path, release_date, vote_average, overview.
  Keep in mind the response only gives the new favorite id

- ##### Receive All Favorites - `/api/users/:user_id/favorites`

  To get a users favorite movies you need to send in the user ID through the params. This will return an array favorite objects.

- ##### Delete a Favorite - `/api/users/:user_id/favorites/:movie_id`
  To delete a users favorite you must send in the users id and id of the movie.

### Our comp

![comp](https://i.imgur.com/R4ogszs.jpg)
![comp2](https://i.imgur.com/miy96qJ.jpg)
![mobile comp](https://i.imgur.com/fKOsyvB.png)
![mobile comp](https://i.imgur.com/LoAhs7V.png)

### The Team

[Chase Richard](https://github.com/hmmChase),
[Jim Dechant](https://github.com/Ecksi)
