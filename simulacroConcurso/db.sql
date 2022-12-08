
-- HAY QUE CREAR UNA BASE DE DATOS CON EL NOMBRE DE  =  dbandres. 
-- AHI SE VA A ESCRIBIR TODO ESTE SCRIPT PARA LLENAR LA BASE DE DATOS Y QUE FUNCIONE LA PAGINA 


-- ESTUDIANTE:   Andres Felipe Galvis Pereira
-- MATERIA :      Desarrollo de aplicaciones empresariales



SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Base de datos: `dbandres`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `caso`
--

CREATE TABLE `caso` (
  `id_caso` int(4) NOT NULL,
  `nombre_caso` varchar(80) COLLATE utf8mb4_bin NOT NULL,
  `id_persona` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Volcado de datos para la tabla `caso`
--

INSERT INTO `caso` (`id_caso`, `nombre_caso`, `id_persona`) VALUES
(1, 'Asesinato de la familia Kennedi', 5),
(2, 'Robo de la casa Dimaria', 2),
(3, 'Secuestro de la familia Fernandez', 1),
(4, 'Venta de drogas en california', 4),
(5, 'Violacion a niñas de orfanato', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `id` int(4) NOT NULL,
  `cedula` varchar(40) COLLATE utf8mb4_bin NOT NULL,
  `nombre` varchar(80) COLLATE utf8mb4_bin NOT NULL,
  `edad` varchar(3) COLLATE utf8mb4_bin NOT NULL,
  `sexo` varchar(1) COLLATE utf8mb4_bin NOT NULL,
  `foto` varchar(500) COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`id`, `cedula`, `nombre`, `edad`, `sexo`, `foto`) VALUES
(1, '1007438502', 'Andres Galvis ', '22', 'M', 'Hom.jpg'),
(2, '1006543245', 'Angie Carreño', '30', 'F', 'chica.jpg'),
(3, '1004567893', 'Stiven lommbok', '32', 'M', 'chico.jpg'),
(4, '1003456789', 'Emilia Chacon', '28', 'F', 'muj.jpg'),
(5, '1004323567', 'Enrique Nocksvill', '40', 'M', 'loco.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pruebas`
--

CREATE TABLE `pruebas` (
  `id_prueba` int(4) NOT NULL,
  `descripcion` varchar(80) COLLATE utf8mb4_bin NOT NULL,
  `imagen` varchar(80) COLLATE utf8mb4_bin NOT NULL,
  `veracidad` tinyint(1) NOT NULL,
  `id_caso` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Volcado de datos para la tabla `pruebas`
--

INSERT INTO `pruebas` (`id_prueba`, `descripcion`, `imagen`, `veracidad`, `id_caso`) VALUES
(1, 'Se encontro un cuchillo con sangre en el lugar de los hechos', 'cuchillo.jpg', 1, 1),
(2, 'tijeras y martillo con los que cortaron y golpearon a las victimas', 'marti.jpeg', 0, 1),
(3, 'Pistola y balas en la habitacion del crimen', 'pistola.jpg', 1, 1),
(4, 'Camara de seguridad graba a la complice', 'prueba7.jpg', 0, 1),
(5, 'rastros de sangre del asesino ', 'prueba2.jpg', 1, 1),
(6, 'Cuerpo sin vida Cubierto con sabana', 'prueba3.jpeg', 0, 2),
(7, 'arma del asalto tirada en el pasillo ', 'pistola.jpg', 1, 2),
(8, 'Camara graba el momento en que entro el secuestrador', 'prueba4.jpeg', 1, 3),
(9, 'imagen de las victimas amarradas ', 'secuestro.png', 1, 3),
(10, 'imagenes de las drogras', 'drugs.jpg', 0, 4),
(11, 'foto de la chica vendiendo a un carro ', 'ventas.jpg', 0, 4),
(12, 'supuesta imagen de la entrega de la droga y el dinero', 'vens.jpg', 0, 4),
(13, 'la acusada estaba drogandose', 'fuma.jpg', 1, 4),
(14, 'imagenes del acto de violacion a la victima 1', 'viola.jpg', 1, 5),
(15, 'imagen del violador con la segunda victima', 'viola2.jpg', 1, 5),
(16, 'Camara de seguridad graba momento de violacion', 'viola3.jpeg', 1, 5),
(17, 'una segunda camara graba la violacion a otra de las niñas', 'viola4.jpeg', 1, 5),
(18, 'Camara registra el ingreso del violador al orfanato', 'viola5.jpeg', 1, 5);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `caso`
--
ALTER TABLE `caso`
  ADD PRIMARY KEY (`id_caso`),
  ADD KEY `id_persona` (`id_persona`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pruebas`
--
ALTER TABLE `pruebas`
  ADD PRIMARY KEY (`id_prueba`),
  ADD KEY `id_caso` (`id_caso`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `caso`
--
ALTER TABLE `caso`
  MODIFY `id_caso` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `persona`
--
ALTER TABLE `persona`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `pruebas`
--
ALTER TABLE `pruebas`
  MODIFY `id_prueba` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `caso`
--
ALTER TABLE `caso`
  ADD CONSTRAINT `persona_ibfk_1` FOREIGN KEY (`id_persona`) REFERENCES `persona` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `pruebas`
--
ALTER TABLE `pruebas`
  ADD CONSTRAINT `prueba_ibfk_1` FOREIGN KEY (`id_caso`) REFERENCES `caso` (`id_caso`) ON UPDATE CASCADE;
COMMIT;
