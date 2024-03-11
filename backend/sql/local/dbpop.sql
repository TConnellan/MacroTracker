
delete from user_profile where true;

insert into user_profile(username, salt, password_hash, created_at, avatar) 
values ('Tom', '123                          X', null, null, 1);



insert into consumed(user_id, quantity, carbs, fats, proteins) values (1, 1, 100, 1, 5);
insert into consumed(user_id, quantity, carbs, fats, proteins) values (1, 2, 40, 55, 10);
insert into consumed(user_id, quantity, carbs, fats, proteins) values (1, 3, 10, 5, 10);
insert into consumed(user_id, quantity, carbs, fats, proteins) values (1, 4, 60, 0, 2);
insert into consumed(user_id, quantity, carbs, fats, proteins) values (1, 5, 25, 10, 12);
