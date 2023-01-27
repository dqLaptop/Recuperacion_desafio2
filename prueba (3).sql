-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-01-2023 a las 21:16:24
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prueba`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `atributos`
--

CREATE TABLE `atributos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `atributos`
--

INSERT INTO `atributos` (`id`, `nombre`, `created_at`, `updated_at`) VALUES
(1, 'sabiduria', NULL, NULL),
(2, 'nobleza', NULL, NULL),
(3, 'virtud', NULL, NULL),
(4, 'maldad', NULL, NULL),
(5, 'astucia', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `atributos_asignados`
--

CREATE TABLE `atributos_asignados` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `idU` bigint(20) UNSIGNED NOT NULL,
  `idA` bigint(20) UNSIGNED NOT NULL,
  `valor` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `atributos_asignados`
--

INSERT INTO `atributos_asignados` (`id`, `idU`, `idA`, `valor`) VALUES
(1, 3, 1, 2),
(2, 3, 2, 4),
(3, 3, 3, 3),
(4, 3, 4, 4),
(5, 3, 5, 4),
(6, 4, 1, 5),
(7, 4, 2, 3),
(8, 4, 3, 2),
(9, 4, 4, 4),
(10, 4, 5, 2),
(11, 5, 1, 5),
(12, 5, 2, 4),
(13, 5, 3, 1),
(14, 5, 4, 3),
(15, 5, 5, 2),
(193, 59, 1, 4),
(194, 59, 2, 4),
(195, 59, 3, 5),
(196, 59, 4, 1),
(197, 59, 5, 3),
(258, 72, 1, 5),
(259, 72, 2, 1),
(260, 72, 3, 2),
(261, 72, 4, 3),
(262, 72, 5, 2),
(278, 76, 1, 4),
(279, 76, 2, 1),
(280, 76, 3, 3),
(281, 76, 4, 1),
(282, 76, 5, 5),
(528, 129, 1, 5),
(529, 129, 2, 4),
(530, 129, 3, 1),
(531, 129, 4, 1),
(532, 129, 5, 3),
(533, 130, 1, 4),
(534, 130, 2, 3),
(535, 130, 3, 2),
(536, 130, 4, 5),
(537, 130, 5, 1),
(538, 131, 1, 2),
(539, 131, 2, 5),
(540, 131, 3, 4),
(541, 131, 4, 4),
(542, 131, 5, 5),
(543, 132, 1, 2),
(544, 132, 2, 2),
(545, 132, 3, 3),
(546, 132, 4, 4),
(547, 132, 5, 3),
(728, 169, 1, 2),
(729, 169, 2, 1),
(730, 169, 3, 1),
(731, 169, 4, 1),
(732, 169, 5, 4),
(733, 170, 1, 5),
(734, 170, 2, 3),
(735, 170, 3, 4),
(736, 170, 4, 5),
(737, 170, 5, 1),
(738, 171, 1, 1),
(739, 171, 2, 3),
(740, 171, 3, 1),
(741, 171, 4, 1),
(742, 171, 5, 5),
(743, 172, 1, 1),
(744, 172, 2, 1),
(745, 172, 3, 5),
(746, 172, 4, 1),
(747, 172, 5, 3),
(748, 173, 1, 4),
(749, 173, 2, 5),
(750, 173, 3, 5),
(751, 173, 4, 1),
(752, 173, 5, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `idU` bigint(20) UNSIGNED NOT NULL,
  `idR` bigint(20) UNSIGNED NOT NULL,
  `comentario` varchar(255) NOT NULL,
  `asunto` varchar(255) NOT NULL,
  `leido` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`id`, `idU`, `idR`, `comentario`, `asunto`, `leido`, `created_at`, `updated_at`) VALUES
(1, 59, 72, 'Hola, que tal?', 'prueba', 0, NULL, NULL),
(2, 72, 129, 'Probando', 'prueba2', 1, NULL, '2023-01-17 10:21:45'),
(39, 129, 72, 'Comprobando', 'Probando js', 1, NULL, '2023-01-19 08:30:21'),
(132, 129, 3, 'h', 'prueba', 0, '2023-01-20 10:26:24', '2023-01-20 10:26:24'),
(133, 129, 4, 'h', 'prueba', 0, '2023-01-20 10:26:24', '2023-01-20 10:26:24'),
(134, 129, 5, 'h', 'prueba', 0, '2023-01-20 10:26:24', '2023-01-20 10:26:24'),
(135, 129, 59, 'h', 'prueba', 0, '2023-01-20 10:26:24', '2023-01-20 10:26:24'),
(136, 129, 72, 'h', 'prueba', 0, '2023-01-20 10:26:24', '2023-01-20 10:26:24'),
(137, 129, 76, 'h', 'prueba', 0, '2023-01-20 10:26:24', '2023-01-20 10:26:24'),
(138, 129, 130, 'h', 'prueba', 0, '2023-01-20 10:26:24', '2023-01-20 10:26:24'),
(139, 129, 131, 'h', 'prueba', 1, '2023-01-20 10:26:24', '2023-01-23 11:19:41'),
(140, 129, 132, 'h', 'prueba', 0, '2023-01-20 10:26:24', '2023-01-20 10:26:24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `humanos`
--

CREATE TABLE `humanos` (
  `idU` bigint(20) UNSIGNED NOT NULL,
  `destino` bigint(20) UNSIGNED NOT NULL,
  `estado` varchar(255) NOT NULL,
  `idD` bigint(20) UNSIGNED NOT NULL,
  `afinidad` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `humanos`
--

INSERT INTO `humanos` (`idU`, `destino`, `estado`, `idD`, `afinidad`) VALUES
(59, 15, 'vivo', 3, 8),
(72, 0, 'vivo', 4, 3),
(76, 0, 'vivo', 3, 9),
(130, 0, 'vivo', 4, 3),
(131, 0, 'vivo', 3, 3),
(132, 0, 'Tartaro', 3, 3),
(169, 0, 'vivo', 129, 7),
(170, 0, 'vivo', 4, 4),
(171, 0, 'vivo', 129, 7),
(172, 0, 'vivo', 3, 10),
(173, 0, 'vivo', 129, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2022_11_25_091946_create_parametros_table', 1),
(2, '2022_11_22_184506_create_roles_table', 2),
(3, '2014_10_12_000000_create_users_table', 3),
(4, '2022_11_22_182820_create_humanos_table', 4),
(5, '2022_11_25_091307_create_atributos_table', 5),
(6, '2022_11_25_091331_create_atributos_asignados_table', 6),
(7, '2014_10_12_100000_create_password_resets_table', 7),
(8, '2019_08_19_000000_create_failed_jobs_table', 7),
(9, '2019_12_14_000001_create_personal_access_tokens_table', 7),
(19, '2022_12_05_192726_create_prueba_table', 8),
(20, '2022_12_05_192754_create_prueba_valoracion_table', 9),
(21, '2022_12_05_192813_create_prueba_eleccion_table', 10),
(22, '2022_12_05_192854_create_prueba_respuesta_libre_table', 11),
(23, '2022_12_05_192915_create_prueba_puntual_table', 12),
(24, '2022_12_05_192941_create__respuesta_table', 13),
(27, '2022_12_24_165012_create_comentarios_table', 14);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parametros`
--

CREATE TABLE `parametros` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `valor` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `parametros`
--

INSERT INTO `parametros` (`id`, `nombre`, `valor`) VALUES
(1, 'eliseo', 200);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prueba`
--

CREATE TABLE `prueba` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `destino` bigint(20) UNSIGNED NOT NULL,
  `idD` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `prueba`
--

INSERT INTO `prueba` (`id`, `descripcion`, `tipo`, `destino`, `idD`, `created_at`, `updated_at`) VALUES
(18, '¿Mar o montaña?', 'eleccion', 20, 129, '2022-12-12 22:35:15', '2023-01-19 08:17:59'),
(19, '¿Mar o montaña?', 'eleccion', 24, 129, '2022-12-13 09:50:08', '2023-01-19 08:20:12'),
(20, '¿Fuego o agua?', 'eleccion', 15, 129, '2022-12-13 09:51:13', '2023-01-18 20:54:37'),
(22, '¿Mar o montaña?', 'valoracion', 10, 3, '2022-12-13 10:37:36', '2022-12-13 10:37:36'),
(40, '¿Por que no funciona?', 'respuesta libre', 20, 3, NULL, NULL),
(117, 'Derrotar a medusa', 'eleccion', 60, 5, '2023-01-09 17:20:39', '2023-01-09 17:20:39'),
(120, 'Derrotar al león', 'eleccion', 60, 129, '2023-01-11 08:26:35', '2023-01-11 08:26:35');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prueba_eleccion`
--

CREATE TABLE `prueba_eleccion` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `idP` bigint(20) UNSIGNED NOT NULL,
  `valor_atributo` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `prueba_eleccion`
--

INSERT INTO `prueba_eleccion` (`id`, `idP`, `valor_atributo`, `created_at`, `updated_at`) VALUES
(9, 19, 0, '2022-12-13 09:50:08', '2023-01-19 08:18:11'),
(10, 20, 1, '2022-12-13 09:51:13', '2022-12-13 09:51:13'),
(36, 117, 1, '2023-01-09 17:20:39', '2023-01-09 17:20:39'),
(38, 120, 1, '2023-01-11 08:26:35', '2023-01-11 08:26:35');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prueba_puntual`
--

CREATE TABLE `prueba_puntual` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `idP` bigint(20) UNSIGNED NOT NULL,
  `idA` bigint(20) UNSIGNED NOT NULL,
  `dificultad` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prueba_respuesta_libre`
--

CREATE TABLE `prueba_respuesta_libre` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `idP` bigint(20) UNSIGNED NOT NULL,
  `palabras_clave` varchar(255) NOT NULL,
  `acierto` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `prueba_respuesta_libre`
--

INSERT INTO `prueba_respuesta_libre` (`id`, `idP`, `palabras_clave`, `acierto`, `created_at`, `updated_at`) VALUES
(14, 40, 'roto,mal', 50, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prueba_valoracion`
--

CREATE TABLE `prueba_valoracion` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `idP` bigint(20) UNSIGNED NOT NULL,
  `idA` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `prueba_valoracion`
--

INSERT INTO `prueba_valoracion` (`id`, `idP`, `idA`, `created_at`, `updated_at`) VALUES
(1, 18, 2, '2022-12-12 22:35:15', '2022-12-12 22:35:15'),
(2, 22, 3, '2022-12-13 10:37:36', '2022-12-13 10:37:36');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuesta`
--

CREATE TABLE `respuesta` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `idP` bigint(20) UNSIGNED NOT NULL,
  `idU` bigint(20) UNSIGNED NOT NULL,
  `valor` varchar(255) NOT NULL,
  `realizada` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `respuesta`
--

INSERT INTO `respuesta` (`id`, `idP`, `idU`, `valor`, `realizada`, `created_at`, `updated_at`) VALUES
(2, 20, 59, '1', 1, '2023-01-19 19:17:58', '2023-01-19 19:55:13'),
(3, 20, 72, '', 0, '2023-01-19 19:17:58', '2023-01-19 19:17:58'),
(4, 19, 170, '1', 1, '2023-01-27 19:03:06', '2023-01-27 19:13:24'),
(5, 20, 170, '', 0, '2023-01-27 19:03:56', '2023-01-27 19:03:56');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `nombre`, `created_at`, `updated_at`) VALUES
(1, 'humano', NULL, NULL),
(2, 'dios', NULL, NULL),
(3, 'hades', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `idR` bigint(20) UNSIGNED NOT NULL,
  `email_verified_at` timestamp(1) NULL DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `nombre`, `password`, `email`, `idR`, `email_verified_at`, `remember_token`, `created_at`, `updated_at`) VALUES
(3, 'Zeus', '$2y$10$Wb9UEFO3ZtoxmvO/Lcf.2.4Hf4c/Q1TMhe7WATvh/6tDwJVmr196G', 'zeus123@gmail.com', 2, '2022-12-13 08:35:32.0', NULL, '2022-12-14 08:46:21', '2022-12-14 08:46:21'),
(4, 'poseidon', 'poseidon123', 'poseidon123@gmail.com', 2, '2022-12-14 08:34:22.0', NULL, NULL, NULL),
(5, 'Hades', 'hades123', 'hades123@gmail.com', 3, '0000-00-00 00:00:00.0', NULL, NULL, NULL),
(59, 'Isa', '$2y$10$Wb9UEFO3ZtoxmvO/Lcf.2.4Hf4c/Q1TMhe7WATvh/6tDwJVmr196G', 'arcadia.laptop@gmail.com', 1, '2022-11-29 04:58:42.0', NULL, '2022-11-29 04:56:20', '2022-11-29 04:58:42'),
(72, 'Manuel', '$2y$10$DrSBKOozs/7CpBB4v1R8H.VZ2PkjEFS41LvWinugqusTvgdAbawYu', 'manuel@gmail.com', 1, NULL, NULL, '2022-11-30 06:50:16', '2022-11-30 06:50:16'),
(76, 'Isabel', '$2y$10$OZcL9.ils1nSFW6tD5vVvekIU.YwQfKJTqMQSbbGBANkzbcIHk9KC', 'isabelmm331@gmail.com', 1, '2022-11-30 10:12:44.0', NULL, '2022-11-30 10:12:28', '2022-11-30 10:12:44'),
(129, 'hades', '$2y$10$jlH9P1Hgvx9o0XeYT5CTKOXIOpTEqTJmPd8uCer/lyb6pBX3wJ9Ma', 'hades@gmail.es', 3, '2022-12-14 08:50:00.0', NULL, '2022-12-14 07:49:25', '2022-12-14 07:49:25'),
(130, 'Mr. Cornell Borer II', '$2y$10$P14i7dnkQS/snjivN6WMfuW.Fm0NWWVQGACHJVtAwjHQ1xvfW6ojS', 'moore.sigurd@example.com', 1, '2023-01-11 19:29:41.0', NULL, '2023-01-11 19:29:41', '2023-01-11 19:29:41'),
(131, 'Mrs. Romaine Parker Sr.', '$2y$10$/oImfEuCcDGHrN3xYPfgfuqj0y8r07bzfwBumSYYZnETJaM62vh1W', 'vernice.barrows@example.org', 1, '2023-01-11 19:29:41.0', NULL, '2023-01-11 19:29:41', '2023-01-11 19:29:41'),
(132, 'Santino Aufderhar', '$2y$10$yDPbwUkSZRPTNec5/kWsD.imsoeTSksjLAPOq3gnt61232ZPF9W7e', 'jacquelyn23@example.com', 1, '2023-01-11 19:29:41.0', NULL, '2023-01-11 19:29:41', '2023-01-11 19:29:41'),
(169, 'Kaden Brekke', '$2y$10$0yXvt70/F0XWYSoHAC4rx.6zoBvKT7h3Jizgl0ylsGe8tsOee3ySK', 'rippin.emelia@example.com', 1, '2023-01-26 04:18:03.0', NULL, '2023-01-26 04:18:03', '2023-01-26 04:18:03'),
(170, 'Miss Aida Maggio', '$2y$10$lsvpNwQkl0hkAHAknoSC4e2vebnGh6o8ap5MWTuqe3QkJIfzeB65i', 'odessa25@example.net', 1, '2023-01-26 04:18:03.0', NULL, '2023-01-26 04:18:03', '2023-01-26 04:18:03'),
(171, 'Heloise Kovacek', '$2y$10$GrGS2GZ7Fjg9oSbF4p85x.Xi1JrMr6Zv/MAC80StNyF0dT0y9D6QW', 'paucek.caitlyn@example.com', 1, '2023-01-26 04:18:03.0', NULL, '2023-01-26 04:18:03', '2023-01-26 04:18:03'),
(172, 'Jordon Franecki', '$2y$10$Gc0nWd2gg/EbZd2XRvK.TuG3eweuMT7uXCyhn09UYQSIiznoqDkgy', 'xkoepp@example.com', 1, '2023-01-26 04:18:03.0', NULL, '2023-01-26 04:18:03', '2023-01-26 04:18:03'),
(173, 'Lowell Orn IV', '$2y$10$exzgUpTDuCKpJ5jEY0Sx8eawuBTNF9XmKxIf.qpRM160hqSUU5C4e', 'kihn.audrey@example.net', 1, '2023-01-26 04:18:03.0', NULL, '2023-01-26 04:18:03', '2023-01-26 04:18:03');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `atributos`
--
ALTER TABLE `atributos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `atributos_asignados`
--
ALTER TABLE `atributos_asignados`
  ADD PRIMARY KEY (`id`),
  ADD KEY `atributos_asignados_idu_foreign` (`idU`),
  ADD KEY `atributos_asignados_ida_foreign` (`idA`);

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comentarios_idu_foreign` (`idU`),
  ADD KEY `comentarios_idr_foreign` (`idR`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `humanos`
--
ALTER TABLE `humanos`
  ADD UNIQUE KEY `humanos_idu_unique` (`idU`),
  ADD KEY `humanos_idd_foreign` (`idD`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `parametros`
--
ALTER TABLE `parametros`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `parametros_id_unique` (`id`);

--
-- Indices de la tabla `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indices de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indices de la tabla `prueba`
--
ALTER TABLE `prueba`
  ADD PRIMARY KEY (`id`),
  ADD KEY `prueba_idd_foreign` (`idD`);

--
-- Indices de la tabla `prueba_eleccion`
--
ALTER TABLE `prueba_eleccion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `prueba_eleccion_idp_foreign` (`idP`);

--
-- Indices de la tabla `prueba_puntual`
--
ALTER TABLE `prueba_puntual`
  ADD PRIMARY KEY (`id`),
  ADD KEY `prueba_puntual_ida_foreign` (`idA`),
  ADD KEY `prueba_puntual_idp_foreign` (`idP`);

--
-- Indices de la tabla `prueba_respuesta_libre`
--
ALTER TABLE `prueba_respuesta_libre`
  ADD PRIMARY KEY (`id`),
  ADD KEY `prueba_respuesta_libre_idp_foreign` (`idP`);

--
-- Indices de la tabla `prueba_valoracion`
--
ALTER TABLE `prueba_valoracion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `prueba_valoracion_ida_foreign` (`idA`),
  ADD KEY `prueba_valoracion_idp_foreign` (`idP`);

--
-- Indices de la tabla `respuesta`
--
ALTER TABLE `respuesta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `respuesta_idp_foreign` (`idP`),
  ADD KEY `respuesta_idu_foreign` (`idU`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_id_unique` (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_id_unique` (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_idr_foreign` (`idR`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `atributos`
--
ALTER TABLE `atributos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `atributos_asignados`
--
ALTER TABLE `atributos_asignados`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=753;

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=141;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `parametros`
--
ALTER TABLE `parametros`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=190;

--
-- AUTO_INCREMENT de la tabla `prueba`
--
ALTER TABLE `prueba`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=146;

--
-- AUTO_INCREMENT de la tabla `prueba_eleccion`
--
ALTER TABLE `prueba_eleccion`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `prueba_puntual`
--
ALTER TABLE `prueba_puntual`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `prueba_respuesta_libre`
--
ALTER TABLE `prueba_respuesta_libre`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `prueba_valoracion`
--
ALTER TABLE `prueba_valoracion`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `respuesta`
--
ALTER TABLE `respuesta`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=174;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `atributos_asignados`
--
ALTER TABLE `atributos_asignados`
  ADD CONSTRAINT `atributos_asignados_ida_foreign` FOREIGN KEY (`idA`) REFERENCES `atributos` (`id`),
  ADD CONSTRAINT `atributos_asignados_idu_foreign` FOREIGN KEY (`idU`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_idr_foreign` FOREIGN KEY (`idR`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `comentarios_idu_foreign` FOREIGN KEY (`idU`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `humanos`
--
ALTER TABLE `humanos`
  ADD CONSTRAINT `humanos_idd_foreign` FOREIGN KEY (`idD`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `humanos_idu_foreign` FOREIGN KEY (`idU`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `prueba`
--
ALTER TABLE `prueba`
  ADD CONSTRAINT `prueba_idd_foreign` FOREIGN KEY (`idD`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `prueba_eleccion`
--
ALTER TABLE `prueba_eleccion`
  ADD CONSTRAINT `prueba_eleccion_idp_foreign` FOREIGN KEY (`idP`) REFERENCES `prueba` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `prueba_puntual`
--
ALTER TABLE `prueba_puntual`
  ADD CONSTRAINT `prueba_puntual_ida_foreign` FOREIGN KEY (`idA`) REFERENCES `atributos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `prueba_puntual_idp_foreign` FOREIGN KEY (`idP`) REFERENCES `prueba` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `prueba_respuesta_libre`
--
ALTER TABLE `prueba_respuesta_libre`
  ADD CONSTRAINT `prueba_respuesta_libre_idp_foreign` FOREIGN KEY (`idP`) REFERENCES `prueba` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `prueba_valoracion`
--
ALTER TABLE `prueba_valoracion`
  ADD CONSTRAINT `prueba_valoracion_idp_foreign` FOREIGN KEY (`idP`) REFERENCES `prueba` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `respuesta`
--
ALTER TABLE `respuesta`
  ADD CONSTRAINT `respuesta_idp_foreign` FOREIGN KEY (`idP`) REFERENCES `prueba` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `respuesta_idu_foreign` FOREIGN KEY (`idU`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_idr_foreign` FOREIGN KEY (`idR`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
