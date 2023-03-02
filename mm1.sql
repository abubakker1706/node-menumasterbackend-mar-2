create database menumaster;

use menumaster;

CREATE TABLE `users` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `birthdate` datetime DEFAULT NULL,
  `status` int DEFAULT '1',
  `cdate` timestamp NULL DEFAULT NULL,
  `cuser` int unsigned DEFAULT '1',
  PRIMARY KEY (`userid`)
);

CREATE TABLE `brands` (
  `brandid` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `BImage` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `favourite` int DEFAULT NULL,
  `status1` int DEFAULT NULL,
  `rank1` int DEFAULT NULL,
  `cUser` int DEFAULT NULL,
  `cDate` timestamp NULL DEFAULT NULL,
  `uUser` int DEFAULT NULL,
  `uDate` datetime DEFAULT NULL,
   PRIMARY KEY (`brandid`),
   FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) 
);

CREATE TABLE `rests` (
  `restid` int NOT NULL AUTO_INCREMENT,
    `plan_id` int DEFAULT NULL,
	`plan_name` varchar(255) DEFAULT "BASIC",
	`plan_expiry` date DEFAULT NULL,
	`restcode` varchar(255) not null,
  `rest` varchar(255) DEFAULT NULL,
  `userid` int NOT NULL,
  `brandid` int NOT NULL,
  `RImage` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `favourite` int DEFAULT NULL,
  `status1` int DEFAULT NULL,
  `rank1` int DEFAULT NULL,
  `cUser` int DEFAULT NULL,
  `cDate` timestamp NULL DEFAULT NULL,
  `uUser` int DEFAULT NULL,
  `uDate` datetime DEFAULT NULL,
   PRIMARY KEY (`restid`),
   FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ,
   FOREIGN KEY (`brandid`) REFERENCES `brands` (`brandid`)
);

CREATE TABLE `menutypes` (
  `mtid` int NOT NULL AUTO_INCREMENT,
  `menutype` varchar(255) DEFAULT NULL,
  `brandid` int NOT NULL,
  `restid` int NOT NULL,
  `userid` int NOT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `MTImage` varchar(255) DEFAULT NULL,
  `favourite` int DEFAULT NULL,
  `status1` int DEFAULT NULL,
  `rank1` int DEFAULT NULL,
  `cUser` int DEFAULT NULL,
  `cDate` timestamp NULL DEFAULT NULL,
  `uUser` int DEFAULT NULL,
  `uDate` datetime DEFAULT NULL,
   PRIMARY KEY (`mtid`),
   FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ,
   FOREIGN KEY (`brandid`) REFERENCES `brands` (`brandid`),
   FOREIGN KEY (`restid`) REFERENCES `rests` (`restid`)
);


CREATE TABLE `cats` (
  `catid` int NOT NULL AUTO_INCREMENT,
  `cat` varchar(255) default null,
  `mtid` int NOT NULL,
  `brandid` int NOT NULL,
  `restid` int NOT NULL,
  `userid` int NOT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `CImage` varchar(255) DEFAULT NULL,
  `favourite` int DEFAULT NULL,
  `status1` int DEFAULT NULL,
  `rank1` int DEFAULT NULL,
  `cUser` int DEFAULT NULL,
  `cDate` timestamp NULL DEFAULT NULL,
  `uUser` int DEFAULT NULL,
  `uDate` datetime DEFAULT NULL,
   PRIMARY KEY (`catid`),
   FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ,
   FOREIGN KEY (`brandid`) REFERENCES `brands` (`brandid`),
   FOREIGN KEY (`mtid`) REFERENCES `menutypes` (`mtid`),
   FOREIGN KEY (`restid`) REFERENCES `rests` (`restid`)
);

CREATE TABLE `menus` (
  `menuid` int NOT NULL AUTO_INCREMENT,
  `menu` varchar(255) default null,
  `mtid` int NOT NULL,
  `brandid` int NOT NULL,
  `restid` int NOT NULL,
  `catid` int not null,
  `userid` int NOT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `MImage` varchar(255) DEFAULT NULL,
  `veg` int DEFAULT NULL,
  `spice` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `ingredients` varchar(2000) DEFAULT NULL,
  `favourite` int DEFAULT NULL,
  `status1` int DEFAULT NULL,
  `rank1` int DEFAULT NULL,
  `cUser` int DEFAULT NULL,
  `cDate` timestamp NULL DEFAULT NULL,
  `uUser` int DEFAULT NULL,
  `uDate` datetime DEFAULT NULL,
   PRIMARY KEY (`menuid`),
   FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ,
   FOREIGN KEY (`brandid`) REFERENCES `brands` (`brandid`),
   foreign key(`catid`) references `cats`(`catid`),
   FOREIGN KEY (`mtid`) REFERENCES `menutypes` (`mtid`),
   FOREIGN KEY (`restid`) REFERENCES `rests` (`restid`)
);

drop table users;
drop table brands;
drop table rests;
drop table menutypes;
drop table cats;
drop table menus;

select * from users;
select * from brands;
select * from rests;
select * from menutypes;
select * from cats;
select * from menus;

insert into rests (rest, userid, plan_id,plan_name , notes, favourite, status1, rank1, cUser, brandid,restcode) values ('famous restaurant',1,1,'basic','nill',0,1,1,1,1,9257);

select * from rests



