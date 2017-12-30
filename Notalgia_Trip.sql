CREATE TABLE "users" (
	"id" serial primary key,
	"username" varchar(30) not null UNIQUE,
	"password" varchar(240) not null, 
	"firstname" varchar(30) not null,
	"lastname" varchar(30) not null,
	"bio" varchar(1000),
	"profilepic"
	);
	
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