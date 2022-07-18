CREATE DATABASE  IF NOT EXISTS `digibank_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `digibank_db`;
-- MariaDB dump 10.19  Distrib 10.4.24-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: digibank_db
-- ------------------------------------------------------
-- Server version	10.4.24-MariaDB

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
-- Table structure for table `adquisicion`
--

DROP TABLE IF EXISTS `adquisicion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `adquisicion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_adquisicion` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adquisicion`
--

LOCK TABLES `adquisicion` WRITE;
/*!40000 ALTER TABLE `adquisicion` DISABLE KEYS */;
INSERT INTO `adquisicion` VALUES (1,'Carro'),(2,'Camioneta'),(3,'Casa'),(4,'Apartamento'),(5,'Campo');
/*!40000 ALTER TABLE `adquisicion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deposito`
--

DROP TABLE IF EXISTS `deposito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `deposito` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_moneda` varchar(255) NOT NULL,
  `limite_maximo` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deposito`
--

LOCK TABLES `deposito` WRITE;
/*!40000 ALTER TABLE `deposito` DISABLE KEYS */;
INSERT INTO `deposito` VALUES (1,'Euro',3000),(2,'Dolar',3500);
/*!40000 ALTER TABLE `deposito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prestamo`
--

DROP TABLE IF EXISTS `prestamo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prestamo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `valor_prestamo` float NOT NULL,
  `valor_cuota` float DEFAULT NULL,
  `cantidad_cuota` int(11) DEFAULT NULL,
  `adquisicionId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `adquisicionId` (`adquisicionId`),
  CONSTRAINT `prestamo_ibfk_1` FOREIGN KEY (`adquisicionId`) REFERENCES `adquisicion` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prestamo`
--

LOCK TABLES `prestamo` WRITE;
/*!40000 ALTER TABLE `prestamo` DISABLE KEYS */;
INSERT INTO `prestamo` VALUES (1,200,100,2,2),(2,120,30,4,1),(3,115000,0,0,3),(4,580000,NULL,NULL,4);
/*!40000 ALTER TABLE `prestamo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `producto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_producto` varchar(255) NOT NULL,
  `monto_maximo` float NOT NULL,
  `tipoProductoId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tipoProductoId` (`tipoProductoId`),
  CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`tipoProductoId`) REFERENCES `tipo_producto` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'Tu casa',10000000,2),(2,'Tu apartamento',7000000,2),(3,'Tu auto YA!',150,1),(4,'Tu camioneta hoy mismo!!',200,1),(5,'Caja de ahorro simple',15000000,3),(6,'Cuenta corriente',20000000,3);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto_deposito`
--

DROP TABLE IF EXISTS `producto_deposito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `producto_deposito` (
  `productoId` int(11) NOT NULL,
  `depositoId` int(11) NOT NULL,
  PRIMARY KEY (`productoId`,`depositoId`),
  UNIQUE KEY `producto_deposito_productoId_depositoId_unique` (`productoId`,`depositoId`),
  KEY `depositoId` (`depositoId`),
  CONSTRAINT `producto_deposito_ibfk_1` FOREIGN KEY (`productoId`) REFERENCES `producto` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `producto_deposito_ibfk_2` FOREIGN KEY (`depositoId`) REFERENCES `deposito` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto_deposito`
--

LOCK TABLES `producto_deposito` WRITE;
/*!40000 ALTER TABLE `producto_deposito` DISABLE KEYS */;
INSERT INTO `producto_deposito` VALUES (5,1),(6,2);
/*!40000 ALTER TABLE `producto_deposito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto_prestamo`
--

DROP TABLE IF EXISTS `producto_prestamo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `producto_prestamo` (
  `productoId` int(11) NOT NULL,
  `prestamoId` int(11) NOT NULL,
  PRIMARY KEY (`productoId`,`prestamoId`),
  UNIQUE KEY `producto_prestamo_prestamoId_productoId_unique` (`productoId`,`prestamoId`),
  KEY `prestamoId` (`prestamoId`),
  CONSTRAINT `producto_prestamo_ibfk_1` FOREIGN KEY (`productoId`) REFERENCES `producto` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `producto_prestamo_ibfk_2` FOREIGN KEY (`prestamoId`) REFERENCES `prestamo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto_prestamo`
--

LOCK TABLES `producto_prestamo` WRITE;
/*!40000 ALTER TABLE `producto_prestamo` DISABLE KEYS */;
INSERT INTO `producto_prestamo` VALUES (1,3),(2,4),(3,2),(4,1);
/*!40000 ALTER TABLE `producto_prestamo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto_segmento`
--

DROP TABLE IF EXISTS `producto_segmento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `producto_segmento` (
  `productoId` int(11) NOT NULL,
  `segmentoId` int(11) NOT NULL,
  PRIMARY KEY (`productoId`,`segmentoId`),
  UNIQUE KEY `producto_segmento_productoId_segmentoId_unique` (`productoId`,`segmentoId`),
  KEY `segmentoId` (`segmentoId`),
  CONSTRAINT `producto_segmento_ibfk_1` FOREIGN KEY (`productoId`) REFERENCES `producto` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `producto_segmento_ibfk_2` FOREIGN KEY (`segmentoId`) REFERENCES `segmento` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto_segmento`
--

LOCK TABLES `producto_segmento` WRITE;
/*!40000 ALTER TABLE `producto_segmento` DISABLE KEYS */;
INSERT INTO `producto_segmento` VALUES (1,1),(1,2),(1,3),(2,1),(2,2),(3,1),(3,3),(4,1),(4,2),(4,3),(5,2),(5,3),(6,1),(6,2),(6,3);
/*!40000 ALTER TABLE `producto_segmento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `segmento`
--

DROP TABLE IF EXISTS `segmento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `segmento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_segmento` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `segmento`
--

LOCK TABLES `segmento` WRITE;
/*!40000 ALTER TABLE `segmento` DISABLE KEYS */;
INSERT INTO `segmento` VALUES (1,'Jovenes'),(2,'Standard'),(3,'Premium');
/*!40000 ALTER TABLE `segmento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_producto`
--

DROP TABLE IF EXISTS `tipo_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_producto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_tipo` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_producto`
--

LOCK TABLES `tipo_producto` WRITE;
/*!40000 ALTER TABLE `tipo_producto` DISABLE KEYS */;
INSERT INTO `tipo_producto` VALUES (1,'Prestamo Automotor'),(2,'Prestamo Hipotecario'),(3,'Cuentas Vista');
/*!40000 ALTER TABLE `tipo_producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'digibank_db'
--

--
-- Dumping routines for database 'digibank_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-17 22:21:18
