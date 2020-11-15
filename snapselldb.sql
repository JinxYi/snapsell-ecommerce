-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: snapsell
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (2,16,7,'2020-01-01 16:01:31'),(3,5,10,'2020-01-02 13:48:08'),(5,11,10,'2020-01-02 13:49:01'),(7,14,8,'2020-01-02 16:20:07'),(9,30,6,'2020-02-07 06:23:44'),(10,30,7,'2020-02-07 06:31:00'),(11,30,8,'2020-02-07 06:32:49'),(13,30,14,'2020-02-07 06:41:00'),(14,30,10,'2020-02-07 06:44:55'),(26,30,7,'2020-02-07 07:16:59'),(27,30,4,'2020-02-07 07:18:31'),(28,30,4,'2020-02-07 07:20:20'),(29,1,7,'2020-02-09 18:15:26'),(30,1,6,'2020-02-09 18:21:51');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `listing`
--

LOCK TABLES `listing` WRITE;
/*!40000 ALTER TABLE `listing` DISABLE KEYS */;
INSERT INTO `listing` VALUES (1,'iPhone 6s USED','In good condition. Camera and screen not working.','250',1,'2019-12-29 05:04:45','https://cdn.pixabay.com/photo/2018/10/31/14/57/apple-iphone-6-s-plus-a1687-3785988_1280.jpg','IFNSST'),(2,'iPhone 8 NEW','New, never been used','699',1,'2019-12-29 05:56:01','https://images.pexels.com/photos/818043/pexels-photo-818043.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940','IFNN'),(3,'Airpods','Used twice, clean','180',15,'2019-12-29 06:30:50','https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/AirPods_%282%29.jpg/1200px-AirPods_%282%29.jpg','ARPTS'),(4,'Guitar String E A D G B E','Acoustic Bronze Guitar Strings','60',4,'2019-12-29 07:35:02','https://sc02.alicdn.com/kf/HTB1PpGnX21H3KVjSZFB762SMXXaE/Brass-winding-stainless-guitar-strings.png','KTRSTRNKTKB'),(6,'FILA Disruptor II White 38','New. Reason for selling: size is too small for me.\nSize: 38','120',20,'2019-12-29 09:18:26','https://live.staticflickr.com/1915/44402977824_6be3618360_z.jpg','FLTSRPTRHT'),(7,'SAMSUNG Type C Cable','Original, unused.','15',11,'2019-12-30 08:03:54','https://upload.wikimedia.org/wikipedia/commons/c/c3/USB-C_cable_2017_A.jpg','SMSNKTPKKBL'),(8,'Uniqlo Simosons','White T-shirt, size M.','19.90',2,'2019-12-30 08:12:05','https://d2h1pu99sxkfvn.cloudfront.net/b0/2696775/328139824_qRvC7XGjcO/P0.jpg','UNKLSMSNS'),(9,'Gucci Wallet','Second Hand','420',3,'2019-12-30 08:12:05','https://live.staticflickr.com/7163/6495885873_5ec99bc0b1.jpg','KKSWLT'),(10,'Charles & Kieth Sling Bag/Wallet','Used twice, white.','43',15,'2019-12-30 08:12:05','https://live.staticflickr.com/5126/5363475110_0523048333.jpg','XRLSK0SLNKBKWLT'),(13,'mouse','good, wireless','3',2,'2020-01-08 00:35:40','https://live.staticflickr.com/7547/16161114498_731b717ccd_b.jpg','MS'),(14,'Ukulele','Brand new ','40',6,'2020-01-30 06:40:53','https://upload.wikimedia.org/wikipedia/commons/1/11/Mahalo_U50_soprano_ukulele.jpg','UKLL'),(16,'Car rental','Nissan GTR. $110/day. Available from Mon to Fri','110',28,'2020-01-31 08:59:51','https://i.pinimg.com/originals/05/bf/e4/05bfe42eb7335ebf3140753f5fd343dd.jpg','KRRNTL'),(17,'Car rental','Toyota Vellfire. Available Mon to Sun, 10am to 5pm. Find us at 43 Boulevard Street','50',6,'2020-01-31 09:22:24','https://i.pinimg.com/originals/08/b2/56/08b2568e7a275ce1df3a157c378e40e1.jpg','KRRNTL'),(18,'SAMSUNG NOTE 8','Good condition, selling to get NOTE 10\n','360',28,'2020-02-06 10:46:00','https://p1.pxfuel.com/preview/101/27/635/samsung-galaxy-note8-phone-electronic.jpg','SMSNKNT'),(20,'Bottle Caps','Meet up at vault 13','10',28,'2020-02-06 10:53:24','https://d2skuhm0vrry40.cloudfront.net/2013/articles/1/7/6/2/7/6/7/fan-attempts-to-pre-order-fallout-4-with-bottle-caps-143455857657.jpg/EG11/resize/690x-1/quality/75/format/jpg','BTLKPS'),(21,'Acoustic Guitar','Have it for 2 years, scratches on the body.\nMeetup at Bishan or Khatib MRT','70',4,'2020-02-06 15:16:28','https://live.staticflickr.com/7807/31632693617_7672cdeacb_b.jpg','AKSTKKTR'),(27,'Brush','Used by BobRoss himself','200',10,'2020-02-06 15:36:31','https://c1.peakpx.com/wallpaper/171/93/232/art-brush-painting-creativity-wallpaper-preview.jpg','BRX'),(28,'iPhone 11 Pro Max 64GB','New, In Stock (60)','1500.99',1,'2020-02-06 15:42:23','https://p1.pxfuel.com/preview/147/405/102/iphone-11-pro-iphone-11-mobile-mobile-phone-space-gray-tech.jpg','IFNPRMKSKB'),(29,'iPhone 11','New, In Stock(56).','1029.99',1,'2020-02-06 15:53:56','https://live.staticflickr.com/65535/48956447766_4f8423e551_b.jpg','IFN');
/*!40000 ALTER TABLE `listing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `offer`
--

LOCK TABLES `offer` WRITE;
/*!40000 ALTER TABLE `offer` DISABLE KEYS */;
INSERT INTO `offer` VALUES (1,'200',1,3,'2019-12-29 16:28:13'),(2,'55',4,20,'2019-12-29 17:04:52'),(3,'180',3,1,'2019-12-30 08:51:21'),(4,'85',6,16,'2019-12-30 08:51:22'),(5,'19.90',8,10,'2019-12-30 08:54:24'),(6,'670',2,17,'2019-12-30 08:54:24'),(7,'400',9,14,'2019-12-30 08:55:35'),(8,'680',2,14,'2019-12-30 08:56:18'),(9,'52',4,17,'2020-01-02 16:13:33'),(10,'200',2,27,'2020-01-08 00:39:39'),(12,'700',2,20,'2020-02-06 07:44:01'),(13,'115',6,28,'2020-02-06 07:51:02'),(14,'3',13,28,'2020-02-06 07:55:34'),(15,'240',1,28,'2020-02-06 09:25:05'),(16,'410',9,1,'2020-02-06 16:39:42'),(17,'690',2,30,'2020-02-07 05:59:43'),(18,'12345',2,30,'2020-02-07 07:26:57');
/*!40000 ALTER TABLE `offer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'steve_jobs','https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Steve_Jobs_Headshot_2010-CROP2.jpg/800px-Steve_Jobs_Headshot_2010-CROP2.jpg','2019-12-26 09:27:05','easypasswor'),(2,'kermitfrog','https://cdn.pixabay.com/photo/2019/12/02/05/19/kermit-the-frog-4666940_1280.jpg','2019-12-26 09:27:05','easypasswor'),(3,'chickenlover45','https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/PICA.jpg/900px-PICA.jpg','2019-12-26 09:27:05','easypasswor'),(4,'swami','https://images.pexels.com/photos/1450082/pexels-photo-1450082.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940','2019-12-26 11:26:19','easypasswor'),(5,'hawhaw','https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/PICA.jpg/900px-PICA.jpg','2019-12-26 15:06:57','easypasswor'),(6,'emo','https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/PICA.jpg/900px-PICA.jpg','2019-12-26 15:10:31','easypasswor'),(10,'bobross','https://dynaimage.cdn.cnn.com/cnn/q_auto,w_1263,c_fill,g_auto,h_711,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F160523192458-10-netflix-amazon-hulu-itunes-june.jpg','2019-12-27 10:14:46','easypasswor'),(11,'deadpool39','https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Cosplayer_of_Deadpool_calling_with_smartphone_20180729a.jpg/562px-Cosplayer_of_Deadpool_calling_with_smartphone_20180729a.jpg','2019-12-27 12:36:13','easypasswor'),(14,'whatshappening','https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/womanyellingcat-1573233850.jpg?resize=980:*','2019-12-27 14:09:19','easypasswor'),(15,'kayla.evans','https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/PICA.jpg/900px-PICA.jpg','2019-12-27 14:13:36','easypasswor'),(16,'gwen_hallaway','https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/PICA.jpg/900px-PICA.jpg','2019-12-27 15:10:54','easypasswor'),(17,'anonymous','https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/PICA.jpg/900px-PICA.jpg','2019-12-27 15:17:28','easypasswor'),(18,'otakufam<3','https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/PICA.jpg/900px-PICA.jpg','2019-12-27 15:23:34','easypasswor'),(19,'why_lliddat','https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/PICA.jpg/900px-PICA.jpg','2019-12-27 15:28:46','easypasswor'),(20,'adminUser','https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/PICA.jpg/900px-PICA.jpg','2019-12-27 15:33:54','easypasswor'),(21,'adminPenny','https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/PICA.jpg/900px-PICA.jpg','2019-12-27 15:38:29','easypasswor'),(22,'pennywise >u<','https://images-na.ssl-images-amazon.com/images/I/61qcTb%2BaYnL._AC_UL160_.jpg','2019-12-27 15:40:44','easypasswor'),(23,'billie_cob2002','https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/PICA.jpg/900px-PICA.jpg','2019-12-29 08:18:20','easypasswor'),(24,'admin_jenny','https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/PICA.jpg/900px-PICA.jpg','2019-12-29 08:56:28','easypasswor'),(25,'tom','https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/PICA.jpg/900px-PICA.jpg','2020-01-02 15:37:19','easypasswor'),(27,'david','https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/PICA.jpg/900px-PICA.jpg','2020-01-08 00:30:00','easypasswor'),(28,'vaultboi','https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/PICA.jpg/900px-PICA.jpg','2020-01-17 07:36:18','easypasswor'),(30,'testUser','https://freesvg.org/img/1317604469.png','2020-02-07 01:12:25','easypasswor');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-10  2:36:54
