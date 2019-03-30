-- MySQL dump 10.13  Distrib 5.6.39, for macos10.13 (x86_64)
--
-- Host: localhost    Database: cai-mall
-- ------------------------------------------------------
-- Server version	5.6.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `code`
--

DROP TABLE IF EXISTS `code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `code` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(64) NOT NULL DEFAULT '',
  `user_id` int(11) DEFAULT NULL,
  `make_name` varchar(64) DEFAULT NULL,
  `is_expired` int(11) NOT NULL DEFAULT '0',
  `create_at` datetime DEFAULT NULL,
  `update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `code`
--

LOCK TABLES `code` WRITE;
/*!40000 ALTER TABLE `code` DISABLE KEYS */;
INSERT INTO `code` VALUES (35,'7leT',NULL,'root',0,'2019-03-16 17:23:16','2019-03-16 09:23:16'),(36,'elLy',NULL,'root',0,'2019-03-16 17:23:44','2019-03-16 09:23:44'),(37,'in77',NULL,'root',0,'2019-03-16 18:49:53','2019-03-16 10:49:53'),(38,'9bSu',NULL,'root',0,'2019-03-16 18:51:51','2019-03-16 10:51:51'),(39,'YHND',30,'root',1,'2019-03-16 18:54:55','2019-03-21 12:11:52'),(40,'nnup',27,'dazhong',1,'2019-03-16 18:56:21','2019-03-18 01:48:46'),(41,'m6xD',26,'root',1,'2019-03-16 19:46:43','2019-03-18 01:39:33'),(42,'gbGY',32,'root',1,'2019-03-24 20:25:00','2019-03-24 12:25:35'),(43,'xXXk',33,'root',1,'2019-03-24 20:29:47','2019-03-24 12:30:17');
/*!40000 ALTER TABLE `code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `good_kind`
--

DROP TABLE IF EXISTS `good_kind`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `good_kind` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL DEFAULT '',
  `is_expired` int(11) NOT NULL DEFAULT '0',
  `create_at` datetime NOT NULL,
  `updaet_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `good_kind`
--

LOCK TABLES `good_kind` WRITE;
/*!40000 ALTER TABLE `good_kind` DISABLE KEYS */;
INSERT INTO `good_kind` VALUES (1,'化妆品',0,'2019-03-17 22:09:02','2019-03-17 14:09:17'),(2,'二手手机',0,'2019-03-18 20:29:00','2019-03-18 12:29:00'),(3,'数码电子',0,'2019-03-18 20:29:06','2019-03-18 13:36:10'),(4,'二手图书',0,'2019-03-18 20:29:19','2019-03-18 12:29:19'),(5,'母婴玩具',0,'2019-03-18 20:29:29','2019-03-18 12:29:29'),(6,'服饰鞋包',0,'2019-03-18 20:29:46','2019-03-18 12:29:46'),(7,'游戏装备',0,'2019-03-18 20:30:03','2019-03-18 12:30:03'),(8,'女装',0,'2019-03-18 20:30:45','2019-03-18 12:30:45'),(9,'技能服务',0,'2019-03-18 20:31:08','2019-03-18 12:31:08');
/*!40000 ALTER TABLE `good_kind` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goods`
--

DROP TABLE IF EXISTS `goods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `goods` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL DEFAULT '',
  `price` varchar(32) NOT NULL DEFAULT '',
  `introduce` varchar(64) DEFAULT NULL,
  `details` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `is_expired` int(11) NOT NULL DEFAULT '0',
  `is_deleted` int(11) NOT NULL DEFAULT '0',
  `create_at` datetime NOT NULL,
  `update_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `kind_id` int(11) NOT NULL,
  `old_price` varchar(32) NOT NULL DEFAULT '',
  `click_time` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods`
--

LOCK TABLES `goods` WRITE;
/*!40000 ALTER TABLE `goods` DISABLE KEYS */;
INSERT INTO `goods` VALUES (2,'iPhone7手机','1800','性能依旧可以，值得入手哦！','<p>iphone手机</p><p><img src=\"http://localhost:9003/30-1553346885657\" data-mce-src=\"http://localhost:9003/30-1553346885657\"></p><p><br data-mce-bogus=\"1\"></p><p>不错的手机！</p>',30,0,0,'2019-03-23 21:15:09','2019-03-23 13:15:09',2,'3000',0),(3,'洗面奶','20','男生必备洗面奶','<p><span style=\"font-size: 15pt; color: rgb(53, 152, 219);\" data-mce-style=\"font-size: 15pt; color: #3598db;\">洗面奶二手</span></p><p><img src=\"http://localhost:9003/30-1553414556427\" data-mce-src=\"http://localhost:9003/30-1553414556427\"></p><p>值得入手哦！</p><p><span style=\"color: rgb(53, 152, 219);\" data-mce-style=\"color: #3598db;\">低价处理了</span></p>',30,0,0,'2019-03-23 21:17:34','2019-03-24 09:34:40',1,'51',0),(4,'java编程思想','29','成为编程大牛！','<p><span style=\"font-size: 16pt; color: rgb(24, 160, 133);\" data-mce-style=\"font-size: 16pt; color: #18a085;\">java编程思想。</span></p><p>hello world</p>',30,0,0,'2019-03-23 21:26:45','2019-03-24 09:35:36',4,'100',0),(5,'大话java','23','java大话','<p>hello dottie</p><p><img src=\"http://localhost:9003/30-1553351555251\" data-mce-src=\"http://localhost:9003/30-1553351555251\"></p>',30,0,0,'2019-03-23 22:32:37','2019-03-23 14:32:37',4,'89',0),(6,'java','24','大话java','<p><span style=\"color: rgb(24, 160, 133);\" data-mce-style=\"color: #18a085;\">hello dottie</span></p><p><img src=\"http://localhost:9003/30-1553351618529\" data-mce-src=\"http://localhost:9003/30-1553351618529\"></p>',30,0,0,'2019-03-23 22:33:46','2019-03-23 14:33:46',4,'78',0),(7,'护肤','12','好用的洗面奶','<p><br></p><p>男生洗面奶</p><p><img src=\"http://localhost:9003/30-1553420012053\" data-mce-src=\"http://localhost:9003/30-1553420012053\"></p><p>期待很久很久了，一直缺货，到手以后跟自己想象的不太一样，我以为是有点橘的感觉，其实就是暗红色带点砖红的感觉，完全就是大红色系的，也不错，有气场。赞，还有，京东价格美丽，正品。</p>',30,0,0,'2019-03-23 22:53:45','2019-03-24 09:36:47',1,'322',0),(8,'iphonex','2000','性能很强悍！','<p>iphoneX</p><p><img src=\"http://localhost:9003/30-1553353045552\" data-mce-src=\"http://localhost:9003/30-1553353045552\"></p>',30,0,0,'2019-03-23 22:57:42','2019-03-23 14:57:42',2,'4000',0),(9,'mac电脑','4000','macbook pro 2018','<p>mac</p><p><img src=\"http://localhost:9003/30-1553353396088\" data-mce-src=\"http://localhost:9003/30-1553353396088\"></p>',30,0,0,'2019-03-23 23:03:18','2019-03-23 15:03:18',3,'8000',0),(10,'迪奥口红','129','全新未使用','<p><img src=\"http://localhost:9003/30-1553414698127\" data-mce-src=\"http://localhost:9003/30-1553414698127\"></p><p>hello dottie</p>',30,0,0,'2019-03-23 23:12:50','2019-03-24 08:05:01',1,'199',0),(11,'xxdd','1','123123','<p>hello dottie</p><p><br data-mce-bogus=\"1\"></p><p><img src=\"http://localhost:9003/30-1553400888676\" data-mce-src=\"http://localhost:9003/30-1553400888676\"></p><p><img src=\"http://localhost:9003/30-1553400890619\" data-mce-src=\"http://localhost:9003/30-1553400890619\"></p><p><br data-mce-bogus=\"1\"></p><p><br data-mce-bogus=\"1\"></p><p><br data-mce-bogus=\"1\"></p><p><br data-mce-bogus=\"1\"></p><p><br data-mce-bogus=\"1\"></p><p><br data-mce-bogus=\"1\"></p><p><br data-mce-bogus=\"1\"></p>',30,0,0,'2019-03-24 12:15:47','2019-03-24 04:15:47',1,'1',0),(12,'好东西','1','不错啦','<p>hello dottie</p><p><img src=\"http://localhost:9003/30-1553402463097\" data-mce-src=\"http://localhost:9003/30-1553402463097\"></p><p><img src=\"http://localhost:9003/30-1553402463940\" data-mce-src=\"http://localhost:9003/30-1553402463940\"></p><p><img src=\"http://localhost:9003/30-1553402464730\" data-mce-src=\"http://localhost:9003/30-1553402464730\"></p><p><img src=\"http://localhost:9003/30-1553402465538\" data-mce-src=\"http://localhost:9003/30-1553402465538\"></p><p><img src=\"http://localhost:9003/30-1553402466211\" data-mce-src=\"http://localhost:9003/30-1553402466211\"></p><p><img src=\"http://localhost:9003/30-1553402466965\" data-mce-src=\"http://localhost:9003/30-1553402466965\"><img src=\"http://localhost:9003/30-1553402467292\" data-mce-src=\"http://localhost:9003/30-1553402467292\"></p><p><br data-mce-bogus=\"1\"></p>',30,0,1,'2019-03-24 12:41:14','2019-03-24 07:38:38',1,'1',0),(13,'好东西','1','不错啦','<p>hello dottie</p><p><img src=\"http://localhost:9003/30-1553402463097\" data-mce-src=\"http://localhost:9003/30-1553402463097\"></p><p><img src=\"http://localhost:9003/30-1553402463940\" data-mce-src=\"http://localhost:9003/30-1553402463940\"></p><p><img src=\"http://localhost:9003/30-1553402464730\" data-mce-src=\"http://localhost:9003/30-1553402464730\"></p><p><img src=\"http://localhost:9003/30-1553402465538\" data-mce-src=\"http://localhost:9003/30-1553402465538\"></p><p><img src=\"http://localhost:9003/30-1553402466211\" data-mce-src=\"http://localhost:9003/30-1553402466211\"></p><p><img src=\"http://localhost:9003/30-1553402466965\" data-mce-src=\"http://localhost:9003/30-1553402466965\"><img src=\"http://localhost:9003/30-1553402467292\" data-mce-src=\"http://localhost:9003/30-1553402467292\"></p><p><br data-mce-bogus=\"1\"></p>',30,0,1,'2019-03-24 15:36:06','2019-03-24 07:38:46',1,'1',0),(14,'口红111','12','123123','<p>123123</p>',30,0,1,'2019-03-24 15:52:33','2019-03-24 08:03:04',1,'123',0),(15,'试试','123','123123','<p><img src=\"http://localhost:9003/32-1553430392884\" data-mce-src=\"http://localhost:9003/32-1553430392884\"></p><p>as</p>',32,0,0,'2019-03-24 20:26:35','2019-03-24 12:26:35',3,'123',0),(16,'hello11','123','afsa ','<p><img src=\"http://localhost:9003/33-1553430651775\" data-mce-src=\"http://localhost:9003/33-1553430651775\">fasdf</p><p><br></p>',33,0,1,'2019-03-24 20:31:05','2019-03-24 12:38:09',2,'123',0);
/*!40000 ALTER TABLE `goods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL DEFAULT '',
  `password` varchar(64) NOT NULL DEFAULT '',
  `is_admin` int(11) NOT NULL DEFAULT '0',
  `is_expired` int(11) NOT NULL DEFAULT '0',
  `identity` int(11) NOT NULL DEFAULT '0' COMMENT '0是买家， 1是商家',
  `phone` varchar(64) DEFAULT NULL,
  `create_at` datetime DEFAULT NULL,
  `update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'root','1',1,0,2,'12312312311','2019-03-14 23:34:46','2019-03-17 14:11:20'),(2,'dazhong','123',1,0,0,'12312312322','2019-03-14 23:35:48','2019-03-17 14:11:24'),(3,'user1','123',0,0,0,'23423423423','2019-03-15 09:53:06','2019-03-17 14:11:30'),(19,'user2','123',0,0,0,'15012312312','2019-03-16 16:24:03','2019-03-17 14:11:32'),(22,'seller1','123',0,0,1,'15051888123','2019-03-17 22:05:00','2019-03-19 12:45:50'),(24,'seller2','123',0,0,1,'12311122233','2019-03-18 09:36:15','2019-03-19 12:45:45'),(25,'buyer1','123',0,0,0,'88121212121','2019-03-18 09:38:07','2019-03-18 01:38:07'),(26,'seller3','123',0,0,1,'12311122233','2019-03-18 09:39:33','2019-03-19 12:45:56'),(27,'seller5','123',0,0,1,'13672932312','2019-03-18 09:48:46','2019-03-19 12:45:57'),(28,'dottie','111',0,0,0,'15197122345','2019-03-21 20:02:39','2019-03-21 12:02:39'),(29,'dottie1','111',0,0,0,'15151234567','2019-03-21 20:03:21','2019-03-21 12:03:21'),(30,'dottie-sell','111',0,0,1,'','2019-03-21 20:11:52','2019-03-21 12:11:52'),(31,'大钟','666',0,0,0,'15051816816','2019-03-21 20:58:33','2019-03-21 12:58:33'),(32,'sell','111',0,0,1,'15051987234','2019-03-24 20:25:35','2019-03-24 12:25:35'),(33,'卖家','111',0,0,1,'12313123123','2019-03-24 20:30:17','2019-03-24 12:30:17');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_goods`
--

DROP TABLE IF EXISTS `user_goods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_goods` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `good_id` int(11) NOT NULL,
  `create_at` datetime NOT NULL,
  `update_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `count` int(11) NOT NULL,
  `is_finished` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_goods`
--

LOCK TABLES `user_goods` WRITE;
/*!40000 ALTER TABLE `user_goods` DISABLE KEYS */;
INSERT INTO `user_goods` VALUES (1,30,3,'2019-03-24 13:29:34','2019-03-24 09:33:04',1,0),(2,30,11,'2019-03-24 13:30:13','2019-03-24 09:35:52',2,0),(3,30,7,'2019-03-24 13:39:38','2019-03-24 09:36:18',3,0),(4,30,4,'2019-03-24 16:07:31','2019-03-24 08:07:31',1,0),(5,25,2,'2019-03-24 16:08:09','2019-03-24 09:23:13',0,0),(6,25,8,'2019-03-24 16:08:10','2019-03-24 09:29:39',3,0),(7,25,3,'2019-03-24 16:53:23','2019-03-24 09:26:27',0,0),(8,25,7,'2019-03-24 16:54:08','2019-03-24 09:28:51',0,0),(9,25,5,'2019-03-24 17:12:54','2019-03-24 09:32:08',2,0),(10,25,6,'2019-03-24 17:12:55','2019-03-24 09:32:10',1,0),(11,25,4,'2019-03-24 17:12:56','2019-03-24 09:29:43',2,0),(12,25,10,'2019-03-24 17:28:41','2019-03-24 09:30:11',0,0),(13,25,11,'2019-03-24 17:28:59','2019-03-24 09:29:03',2,0),(14,3,7,'2019-03-24 17:37:33','2019-03-24 09:37:36',2,0),(15,3,10,'2019-03-24 17:39:35','2019-03-24 12:15:47',3,0),(16,32,7,'2019-03-24 20:25:56','2019-03-24 12:25:56',1,0),(17,32,15,'2019-03-24 20:26:47','2019-03-24 12:26:47',1,0),(18,33,16,'2019-03-24 20:31:52','2019-03-24 12:31:52',1,0),(19,33,7,'2019-03-24 20:40:34','2019-03-24 12:42:21',0,0),(20,33,10,'2019-03-24 20:42:23','2019-03-24 12:42:26',3,0);
/*!40000 ALTER TABLE `user_goods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_token`
--

DROP TABLE IF EXISTS `user_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_token` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL DEFAULT '',
  `token` varchar(64) NOT NULL DEFAULT '',
  `is_expired` int(11) NOT NULL DEFAULT '0',
  `create_at` datetime NOT NULL,
  `update_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_token`
--

LOCK TABLES `user_token` WRITE;
/*!40000 ALTER TABLE `user_token` DISABLE KEYS */;
INSERT INTO `user_token` VALUES (1,'buyer1','91cde09b9039e8373a4d16588b80814f',1,'2019-03-19 22:44:44','2019-03-19 14:44:51'),(2,'buyer1','89ea4f5ea2864b376eb4d2264efcba6c',1,'2019-03-19 22:45:19','2019-03-19 14:45:55'),(3,'buyer1','c033a8bfef1f8fc4c1da385cbb0b5881',1,'2019-03-19 22:49:18','2019-03-19 14:49:24'),(4,'buyer1','e7c6036aeeea5a0a69502de68e673d7b',0,'2019-03-19 22:50:12','2019-03-19 14:50:12'),(5,'buyer1','ddaa382655457e4d0fd27d0cbbce27ce',0,'2019-03-19 22:52:07','2019-03-19 14:52:07'),(6,'buyer1','24a6a72c16bcbe1f0b7ee56efe3b1b3f',1,'2019-03-19 22:55:09','2019-03-19 14:55:12'),(7,'buyer1','976031c45c0e2e20da2b795a6756647f',1,'2019-03-21 19:48:56','2019-03-21 11:48:59'),(8,'dottie','9629a5692574719755b38330020e6309',1,'2019-03-21 20:03:00','2019-03-21 12:03:06'),(9,'dottie1','197eac03271cee27760e63e6e37bc83b',1,'2019-03-21 20:03:42','2019-03-21 12:03:44'),(10,'dottie1','7c28a7f2db826bc090b244ac2229bbba',1,'2019-03-21 20:04:00','2019-03-21 12:04:03'),(11,'dottie-sell','f706d439134a827de4e1b628b8d15e20',1,'2019-03-21 20:12:25','2019-03-21 12:13:32'),(12,'dottie','3a5775b16359a3eb4eba03bdc3feec3d',1,'2019-03-21 20:14:25','2019-03-21 12:22:42'),(13,'dottie-sell','43cefbdf329c2ca7115bb9ff64a2edac',1,'2019-03-21 20:22:49','2019-03-21 12:36:46'),(14,'buyer1','83269fba49548021a4a433ba4eff5480',0,'2019-03-21 20:52:28','2019-03-21 12:52:28'),(15,'buyer1','45d903bf8811442f9afb59adf016d626',0,'2019-03-21 20:54:48','2019-03-21 12:54:48'),(16,'dottie-sell','995abe076f1e3cbf712c5fb12a2880de',1,'2019-03-21 20:54:57','2019-03-21 12:56:00'),(17,'大钟','3f0ffb5681b86715520c69c65cfb75b4',1,'2019-03-21 20:58:43','2019-03-21 12:58:51'),(18,'buyer1','8f258c835a24961da0ceb8e23d51f82c',1,'2019-03-21 21:05:10','2019-03-21 13:05:13'),(19,'大钟','afa9b73ee88bbeaec8792dc67a83e647',1,'2019-03-21 21:05:23','2019-03-23 08:11:25'),(20,'buyer1','20ae0fa2a2a1e333760baefc0ebe73b2',1,'2019-03-23 16:11:30','2019-03-23 08:11:34'),(21,'dottie-sell','5a4617a69c9173210f9ff22513212af6',1,'2019-03-23 16:11:49','2019-03-23 08:26:05'),(22,'buyer1','817c046c5281abf708a186c878dba9ae',1,'2019-03-23 16:36:41','2019-03-23 08:36:48'),(23,'buyer1','0126fbe3db06f95958e4379affa9efe5',1,'2019-03-23 16:38:03','2019-03-23 08:38:09'),(24,'dottie-sell','d7539fd0903aad806ce0affa4c80bdee',0,'2019-03-23 16:38:16','2019-03-23 08:38:16'),(25,'buyer1','f4b587e86aded913c95dd8692ddcf398',1,'2019-03-23 16:38:45','2019-03-23 08:39:05'),(26,'dottie-sell','e04de47b56934758c14ad5408bf63b33',1,'2019-03-23 16:39:14','2019-03-23 08:41:23'),(27,'dottie-sell','dbc2d7828d1daa31130bba889daf7cc0',1,'2019-03-23 16:47:49','2019-03-23 10:51:02'),(28,'dottie-sell','64a6536879a0d619fae6e28e69ad7e7f',1,'2019-03-23 18:51:08','2019-03-24 06:19:20'),(29,'dottie-sell','2800670d88c3dd903a38a5fe3c95b1f0',1,'2019-03-24 14:19:44','2019-03-24 08:07:39'),(30,'buyer1','6c33cb0192215382049654aceb18a6e4',1,'2019-03-24 16:07:46','2019-03-24 08:33:23'),(31,'buyer1','492818750729ca56e7f6ef64e2f0c54b',1,'2019-03-24 16:33:26','2019-03-24 08:38:57'),(32,'buyer1','2b4e8a28ce66dad66c474c8ec7dd606f',1,'2019-03-24 16:39:00','2019-03-24 09:32:17'),(33,'dottie-sell','f72c80627340e3dc4483357f3861bd77',1,'2019-03-24 17:32:25','2019-03-24 09:32:39'),(34,'buyer1','fd8c22e656ad7386d624781a646d8b01',1,'2019-03-24 17:32:42','2019-03-24 09:32:51'),(35,'dottie-sell','449e8b0f2563772dbe5a0054b27f2512',1,'2019-03-24 17:32:59','2019-03-24 09:37:16'),(36,'user1','770b1b844ea626d57cc7b344024294ea',0,'2019-03-24 17:37:23','2019-03-24 09:37:23'),(37,'user1','bb5251b6bccb6abea811986c92a3074b',1,'2019-03-24 20:15:36','2019-03-24 12:17:07'),(38,'dottie-sell','9c5a6e372a47cc01a9b2f6eb4ef91744',0,'2019-03-24 20:17:14','2019-03-24 12:17:14'),(39,'sell','52c051f4ebad83e7a8432cae73a86d31',0,'2019-03-24 20:25:43','2019-03-24 12:25:43'),(40,'卖家','39cbdf95092efef98cee322425d27aa2',0,'2019-03-24 20:30:23','2019-03-24 12:30:23');
/*!40000 ALTER TABLE `user_token` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-24 21:11:29
