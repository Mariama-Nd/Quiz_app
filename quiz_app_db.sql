-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mer. 19 mars 2025 à 22:24
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `quiz_app_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `quiz_title` varchar(255) NOT NULL,
  `comment` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `user_id`, `quiz_title`, `comment`, `created_at`) VALUES
(1, 2, 'Mathématiques de Base', 'Très bon quiz, bien adapté pour les débutants !', '2025-02-03 17:28:30'),
(2, 3, 'Culture Générale', 'J’ai appris beaucoup de choses, merci pour ce quiz.', '2025-02-03 17:28:30'),
(3, 4, 'Programmation', 'Les questions étaient intéressantes, mais un peu difficiles.', '2025-02-03 17:28:30'),
(4, 6, 'Histoire', 'Excellent quiz sur l’histoire, très enrichissant.', '2025-02-03 17:28:30'),
(5, 2, 'Programmation', 'J’ai aimé la variété des questions, mais quelques explications seraient utiles.', '2025-02-03 17:28:30'),
(6, 3, 'Mathématiques de Base', 'Trop facile pour moi, mais bien conçu.', '2025-02-03 17:28:30'),
(7, 4, 'Culture Générale', 'Certaines questions n’étaient pas très claires.', '2025-02-03 17:28:30'),
(8, 6, 'Mathématiques de Base', 'Un quiz qui donne envie de se replonger dans les maths.', '2025-02-03 17:28:30'),
(9, 2, 'Histoire', 'Les questions sur les guerres étaient particulièrement intéressantes.', '2025-02-03 17:28:30'),
(10, 3, 'Programmation', 'Bon quiz, mais certaines réponses semblaient incorrectes.', '2025-02-03 17:28:30');

-- --------------------------------------------------------

--
-- Structure de la table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `message`, `is_read`, `created_at`) VALUES
(1, 2, 'Un nouveau quiz a t cr !', 0, '2025-02-02 19:54:23'),
(2, 1, 'Un nouveau quiz \"ertkl\" a t ajout !', 0, '2025-02-02 22:27:20'),
(3, 3, 'Un nouveau quiz \"ertkl\" a t ajout !', 0, '2025-02-02 22:27:20'),
(4, 1, 'Un nouveau quiz \"tqtq\" a t ajout !', 0, '2025-02-02 22:34:23'),
(5, 2, 'Un nouveau quiz \"tqtq\" a t ajout !', 0, '2025-02-02 22:34:23'),
(6, 1, 'Un nouveau quiz \"wtfzs\" a t ajout !', 0, '2025-02-02 22:41:47'),
(7, 2, 'Un nouveau quiz \"wtfzs\" a t ajout !', 0, '2025-02-02 22:41:47'),
(8, 7, 'Un nouveau quiz : \"Addition\" a ete ajout !', 0, '2025-02-03 18:45:12'),
(9, 1, 'Un nouveau quiz : \"Addition\" a ete ajout !', 0, '2025-02-03 18:45:12'),
(10, 2, 'Un nouveau quiz : \"Addition\" a ete ajout !', 0, '2025-02-03 18:45:12'),
(11, 3, 'Un nouveau quiz : \"Addition\" a ete ajout !', 0, '2025-02-03 18:45:12'),
(12, 6, 'Un nouveau quiz : \"Addition\" a ete ajout !', 0, '2025-02-03 18:45:12'),
(13, 4, 'Un nouveau quiz : \"Addition\" a ete ajout !', 0, '2025-02-03 18:45:12');

-- --------------------------------------------------------

--
-- Structure de la table `Question`
--

CREATE TABLE `Question` (
  `Id` int(11) NOT NULL,
  `question_text` text NOT NULL,
  `quiz_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Question`
--

INSERT INTO `Question` (`Id`, `question_text`, `quiz_id`, `created_at`) VALUES
(1, 'Combien font 2 + 2 ?', 1, '2025-02-03 17:24:33'),
(2, 'Quelle est la racine carrée de 16 ?', 1, '2025-02-03 17:24:33'),
(3, 'Qui a écrit \"Les Misérables\" ?', 2, '2025-02-03 17:24:33'),
(4, 'Quelle est la capitale de l\'Australie ?', 2, '2025-02-03 17:24:33'),
(5, 'Quelle est la valeur de \"true && false\" en JavaScript ?', 3, '2025-02-03 17:24:33'),
(6, 'Quel est le langage utilisé pour créer des styles sur le web ?', 3, '2025-02-03 17:24:33'),
(7, 'En quelle année a commencé la Première Guerre mondiale ?', 4, '2025-02-03 17:24:33'),
(8, 'Qui a découvert l\'Amérique ?', 4, '2025-02-03 17:24:33'),
(9, 'Combien font 7 * 8 ?', 1, '2025-02-03 17:34:09'),
(10, 'Quelle est la formule pour le périmètre d’un cercle ?', 1, '2025-02-03 17:34:09'),
(11, 'Quelle est la planète la plus proche du Soleil ?', 5, '2025-02-03 17:34:09'),
(12, 'Quel est le symbole chimique de l’eau ?', 5, '2025-02-03 17:34:09'),
(13, 'Quel est le plus grand désert du monde ?', 6, '2025-02-03 17:34:09'),
(14, 'Quelle rivière traverse Paris ?', 6, '2025-02-03 17:34:09'),
(15, 'Qui a écrit \"Guerre et Paix\" ?', 7, '2025-02-03 17:34:09'),
(16, 'Quel est le vrai nom de Mark Twain ?', 7, '2025-02-03 17:34:09'),
(17, 'Quelle équipe a remporté la Coupe du monde de football en 2018 ?', 8, '2025-02-03 17:34:09'),
(18, 'Combien de joueurs y a-t-il dans une équipe de basket-ball ?', 8, '2025-02-03 17:34:09'),
(60, '1+1?', 34, '2025-02-03 18:45:09'),
(61, '2+2?', 34, '2025-02-03 18:45:09');

-- --------------------------------------------------------

--
-- Structure de la table `Quiz`
--

CREATE TABLE `Quiz` (
  `Id` int(11) NOT NULL,
  `titre` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Quiz`
--

INSERT INTO `Quiz` (`Id`, `titre`, `description`, `user_id`, `created_at`) VALUES
(1, 'Mathématiques de Base', 'Un quiz pour tester vos connaissances en mathématiques de base', 2, '2025-02-03 17:24:33'),
(2, 'Culture Générale', 'Testez vos connaissances générales', 3, '2025-02-03 17:24:33'),
(3, 'Programmation', 'Quiz sur les bases de la programmation', 4, '2025-02-03 17:24:33'),
(4, 'Histoire', 'Un quiz sur les grands événements historiques', 6, '2025-02-03 17:24:33'),
(5, 'Science', 'Un quiz sur les bases de la science', 2, '2025-02-03 17:33:15'),
(6, 'Géographie', 'Testez vos connaissances en géographie', 3, '2025-02-03 17:33:15'),
(7, 'Littérature', 'Un quiz sur les grands écrivains', 4, '2025-02-03 17:33:15'),
(8, 'Sport', 'Quiz sur les grands événements sportifs', 6, '2025-02-03 17:33:15'),
(34, 'Addition', 'qertfzghkjx', 8, '2025-02-03 18:45:09');

-- --------------------------------------------------------

--
-- Structure de la table `Reponse`
--

CREATE TABLE `Reponse` (
  `Id` int(11) NOT NULL,
  `reponse_text` text NOT NULL,
  `question_id` int(11) NOT NULL,
  `is_correct` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Reponse`
--

INSERT INTO `Reponse` (`Id`, `reponse_text`, `question_id`, `is_correct`, `created_at`) VALUES
(1, '4', 1, 1, '2025-02-03 17:24:33'),
(2, '5', 1, 0, '2025-02-03 17:24:33'),
(3, '16', 2, 0, '2025-02-03 17:24:33'),
(4, '4', 2, 1, '2025-02-03 17:24:33'),
(5, 'Victor Hugo', 3, 1, '2025-02-03 17:24:33'),
(6, 'Jules Verne', 3, 0, '2025-02-03 17:24:33'),
(7, 'Sydney', 4, 0, '2025-02-03 17:24:33'),
(8, 'Canberra', 4, 1, '2025-02-03 17:24:33'),
(9, 'false', 5, 1, '2025-02-03 17:24:33'),
(10, 'true', 5, 0, '2025-02-03 17:24:33'),
(11, 'CSS', 6, 1, '2025-02-03 17:24:33'),
(12, 'HTML', 6, 0, '2025-02-03 17:24:33'),
(13, '1914', 7, 1, '2025-02-03 17:24:33'),
(14, '1939', 7, 0, '2025-02-03 17:24:33'),
(15, 'Christophe Colomb', 8, 1, '2025-02-03 17:24:33'),
(16, 'Vasco de Gama', 8, 0, '2025-02-03 17:24:33'),
(17, '56', 9, 1, '2025-02-03 17:34:37'),
(18, '54', 9, 0, '2025-02-03 17:34:37'),
(19, '2πr', 10, 1, '2025-02-03 17:34:37'),
(20, 'r²', 10, 0, '2025-02-03 17:34:37'),
(21, 'Mercure', 11, 1, '2025-02-03 17:34:37'),
(22, 'Mars', 11, 0, '2025-02-03 17:34:37'),
(23, 'H2O', 12, 1, '2025-02-03 17:34:37'),
(24, 'O2', 12, 0, '2025-02-03 17:34:37'),
(25, 'Le Sahara', 13, 1, '2025-02-03 17:34:37'),
(26, 'Le Gobi', 13, 0, '2025-02-03 17:34:37'),
(27, 'La Seine', 14, 1, '2025-02-03 17:34:37'),
(28, 'Le Rhône', 14, 0, '2025-02-03 17:34:37'),
(29, 'Léon Tolstoï', 15, 1, '2025-02-03 17:34:37'),
(30, 'Fiodor Dostoïevski', 15, 0, '2025-02-03 17:34:37'),
(31, 'Samuel Clemens', 16, 1, '2025-02-03 17:34:37'),
(32, 'Charles Dickens', 16, 0, '2025-02-03 17:34:37'),
(33, 'France', 17, 1, '2025-02-03 17:34:37'),
(34, 'Brésil', 17, 0, '2025-02-03 17:34:37'),
(35, '5', 18, 1, '2025-02-03 17:34:37'),
(36, '6', 18, 0, '2025-02-03 17:34:37'),
(37, '2', 60, 1, '2025-02-03 18:46:33'),
(38, '3', 60, 0, '2025-02-03 18:46:33'),
(39, '5', 60, 0, '2025-02-03 18:46:33'),
(40, '8', 61, 0, '2025-02-03 18:46:57'),
(41, '4', 61, 1, '2025-02-03 18:46:57');

-- --------------------------------------------------------

--
-- Structure de la table `Reponse_Question`
--

CREATE TABLE `Reponse_Question` (
  `Id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reponse_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Reponse_Question`
--

INSERT INTO `Reponse_Question` (`Id`, `user_id`, `reponse_id`, `created_at`) VALUES
(1, 2, 1, '2025-02-03 17:24:33'),
(2, 2, 4, '2025-02-03 17:24:33'),
(3, 3, 5, '2025-02-03 17:24:33'),
(4, 3, 8, '2025-02-03 17:24:33'),
(5, 4, 9, '2025-02-03 17:24:33'),
(6, 4, 12, '2025-02-03 17:24:33'),
(7, 6, 13, '2025-02-03 17:24:33'),
(8, 6, 15, '2025-02-03 17:24:33'),
(9, 2, 17, '2025-02-03 17:34:52'),
(10, 2, 20, '2025-02-03 17:34:52'),
(11, 3, 21, '2025-02-03 17:34:52'),
(12, 3, 24, '2025-02-03 17:34:52'),
(13, 4, 25, '2025-02-03 17:34:52'),
(14, 4, 28, '2025-02-03 17:34:52'),
(15, 6, 29, '2025-02-03 17:34:52'),
(16, 6, 32, '2025-02-03 17:34:52'),
(17, 2, 33, '2025-02-03 17:34:52'),
(18, 3, 36, '2025-02-03 17:34:52'),
(19, 4, 23, '2025-02-03 17:34:52'),
(20, 6, 18, '2025-02-03 17:34:52'),
(21, 8, 37, '2025-02-03 18:48:22'),
(22, 8, 40, '2025-02-03 18:50:39');

-- --------------------------------------------------------

--
-- Structure de la table `User`
--

CREATE TABLE `User` (
  `Id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `User`
--

INSERT INTO `User` (`Id`, `username`, `email`, `password`, `created_at`) VALUES
(1, 'mmm', 'freg@gmail.com', '$2y$10$gSIbTVOlwH.hxNRE7deghe/5uAU078s5k0.nVzhaF14k1CG6v.MHS', '2025-01-25 13:08:44'),
(2, 'mariama', 'mariama.ndiaye@uahb.sn', '$2y$10$.bJxamjwHttHco1KImoz2OTO4SNzAd4YLdwcn8Bt3CPnFpDDBGjnW', '2025-01-25 13:10:37'),
(3, 'Mouhamed Amar', 'amar@gmail.com', '$2y$10$o8Cy4J9.IAo7gXjBS2jFi.AbSDbncjZxe0meAEspOVi6UmFu./HVS', '2025-01-26 20:45:27'),
(4, 'Déguéne Falli', 'falli@uahb.sn', '$2y$10$owWd517hBGx4IHm2FBBj5OueCi.kpbOOpSV88/mmRaNUVL7Gv2OkS', '2025-02-03 17:02:37'),
(6, 'Aïssa', 'aissa@uahb.sn', '$2y$10$oMXJ3lw4fgGwm4wsy3JlyuxKy50o8a4B87J3Xmwv41sFrdLdXmBvC', '2025-02-03 17:19:12'),
(7, 'Koumba Kara', 'koumbak@uahb.sn', '$2y$10$P.rBH3XoE3n1Sd4vT/yLCeIBhi/dvFnAXYn.ES5HnQZRn8BPDKrfa', '2025-02-03 17:44:33'),
(8, 'seydou', 'seydou@uahb.sn', '$2y$10$.GAlxxbV2B1dAqc413JYouEG3LLhzByOU2fzt/LJihPkIkLmmpIw6', '2025-02-03 18:43:03');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `Question`
--
ALTER TABLE `Question`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `quiz_id` (`quiz_id`);

--
-- Index pour la table `Quiz`
--
ALTER TABLE `Quiz`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `Reponse`
--
ALTER TABLE `Reponse`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `question_id` (`question_id`);

--
-- Index pour la table `Reponse_Question`
--
ALTER TABLE `Reponse_Question`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `reponse_id` (`reponse_id`);

--
-- Index pour la table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `Question`
--
ALTER TABLE `Question`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT pour la table `Quiz`
--
ALTER TABLE `Quiz`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT pour la table `Reponse`
--
ALTER TABLE `Reponse`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT pour la table `Reponse_Question`
--
ALTER TABLE `Reponse_Question`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT pour la table `User`
--
ALTER TABLE `User`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`Id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`Id`);

--
-- Contraintes pour la table `Question`
--
ALTER TABLE `Question`
  ADD CONSTRAINT `question_ibfk_1` FOREIGN KEY (`quiz_id`) REFERENCES `Quiz` (`Id`);

--
-- Contraintes pour la table `Quiz`
--
ALTER TABLE `Quiz`
  ADD CONSTRAINT `quiz_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`Id`);

--
-- Contraintes pour la table `Reponse`
--
ALTER TABLE `Reponse`
  ADD CONSTRAINT `reponse_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `Question` (`Id`);

--
-- Contraintes pour la table `Reponse_Question`
--
ALTER TABLE `Reponse_Question`
  ADD CONSTRAINT `reponse_question_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`Id`),
  ADD CONSTRAINT `reponse_question_ibfk_2` FOREIGN KEY (`reponse_id`) REFERENCES `Reponse` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
