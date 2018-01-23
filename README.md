# Nostalgia Trip

Hosted on Heroku at: [nostalgia-trip.herokuapp.com](nostalgia-trip.herokuapp.com)

Nostalgia Trip is a full-stack web application that serves as a cental hub for users to connect to their memories of the past. It allows users to create profiles which in turn will allow them to create, edit, "like/unlike", and delete posts. 

## Built With

- HTML5
- CSS3
- JavaScript
- AngularJS
- Angular Material
- Express.js
- Node.js
- PostgreSQL
- Passport
- Filestack API
- Let me google that for you (LMGTFY) API

## Getting Started

1. Fork and Clone Repository
2. Run `npm install --save`
3. Run `npm start`
4. Open [http://localhost:5000](http://localhost:5000) in your browser (Google Chrome Preffered)

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- PostgreSQL

### Installing

Run SQL query or load query from the `Nostalgia_Trip.sql` file.

```sql
CREATE TABLE "users" (
	"id" serial primary key,
	"username" varchar(30) not null UNIQUE,
	"password" varchar(240) not null, 
	"firstname" varchar(30) not null,
	"lastname" varchar(30) not null,
	"bio" varchar(1000),
	"profilepic");

CREATE TABLE "posts" (
	"p_id" serial primary key,
	"id" int not null references "users"("id"),
	"postname" varchar(50) not null,
	"postdesc" varchar(1000) not null,
	"postpic" text not null, 
	"dateposted" date not null default now(),
	"votes" int default 0,
	"username" varchar(50) not null references "users"("username")
	);  
```

## Documentation

[Nostalgia Trip Scope Documentation](https://docs.google.com/document/d/1e-Kak_ZRYfT_nbKTvoJnmuq7E24Tcc-jynYwQS_WBok/edit?usp=sharing)

### Completed Features

- [x] Create User
- [x] Edit User Information
- [x] Upload User Profile Picture
- [x] Create Posts
- [x] Upload Posts Pictures
- [x] Edit Posts
- [x] Delete Posts
- [x] "Like" and "Unlike" Posts
- [x] Learn more about a post by directing user to LMGTFY API

### Next Steps

- [ ] Add Creation Dsate
- [ ] Admin Users
- [ ] Flag Posts
- [ ] Sorting by Dates
- [ ] Adding Tags and Categories
- [ ] Searching Feature
- [ ] Follow Other Users

## Deployment

1. Run `heroku create`
2. Run `git push heroku master`
3. Run `heroku open`

## Author

* Xong Xiong
