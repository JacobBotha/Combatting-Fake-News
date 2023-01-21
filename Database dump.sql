-- phpMyAdmin SQL Dump
-- version 5.1.1deb3+bionic1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 27, 2021 at 04:33 PM
-- Server version: 8.0.26
-- PHP Version: 7.2.24-0ubuntu0.18.04.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wfw`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int NOT NULL,
  `compound_id` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  `provider_type` varchar(255) NOT NULL,
  `provider_id` varchar(255) NOT NULL,
  `provider_account_id` varchar(255) NOT NULL,
  `refresh_token` text,
  `access_token` text,
  `access_token_expires` timestamp(6) NULL DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `idAnswers` int NOT NULL,
  `answer` tinyint NOT NULL,
  `statement` varchar(200) DEFAULT NULL,
  `Questions_idQuestions` int NOT NULL,
  `description` varchar(400) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`idAnswers`, `answer`, `statement`, `Questions_idQuestions`, `description`) VALUES
(1, 1, '', 1, 'Master Cherry is a trusted source.'),
(2, 1, '', 2, NULL),
(3, 1, 'This is a recount of the reporters experience.', 3, 'Correct, This article follows a reporter recount of being in Geppetto\'s studion.'),
(4, 0, 'This is emotive and manipulative.', 3, 'Incorrect, this article does not use any high modality descriptions to persuade the reader.'),
(5, 0, 'This is completely fictional.', 3, 'Incorrect, other recounts corroborate parts of the story.'),
(6, 0, NULL, 4, 'This article is heavily against Geppetto and is positioning the reader to be against Geppetto.'),
(7, 1, NULL, 5, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `friends`
--

CREATE TABLE `friends` (
  `Follower` int NOT NULL,
  `Followee` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `levels`
--

CREATE TABLE `levels` (
  `idlevels` int NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `story` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `idQuestions` int NOT NULL,
  `headline` varchar(200) NOT NULL,
  `Question_Type_idQuestion_Type` int NOT NULL,
  `body` longtext NOT NULL,
  `imageUrl` varchar(200) DEFAULT NULL,
  `hint` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`idQuestions`, `headline`, `Question_Type_idQuestion_Type`, `body`, `imageUrl`, `hint`) VALUES
(1, 'THE PIECE OF WOOD THAT LAUGHED AND CRIED LIKE A CHILD ', 1, 'Authorities are reporting that Master Antonio, known as Master Cherry, is making claims of talking timber. This report comes directly from Master Antonio claiming to have received the “shock of his life” when the sentient piece of wood began talking to him whilst being prepared on his work bench. \n\nCherry makes claims of the wood “crying and to lamenting like a child”. \n\nAuthorities are investigating but sceptical and dismissive of Master Cherry that the wood is “nothing but a log for fuel like all the others”. \n\nCherry remains adamant even with the sceptics however is ready to part with the timber that was intended to be used for a new table leg.\n', NULL, 'This article is skeptical of Master Cherry however he is a well respected and trusted public figure'),
(2, 'MASTER CHERRY GIVES THE WOOD AWAY ', 1, 'Today marks a historic business transaction between local businessman. Renowned carpenter Master Cherry and Geppetto, a puppeteer, met at Cherry’s workshop in the early hours of the morning. Geppetto in pursuit of a fine piece of wood for a new puppet he intended to travel the world with. \n\nDiscussions were tense with the two old men coming to blows on multiple occasions as Geppetto took much disliking to Cherry’s use of his much despised nickname “Pudding”. \n\nHaving eventually come to an agreement, with two scratches on the nose of Charry and two buttons lost on the waistcoat of Geppetto, the pair parted ways. Geppetto limping away from the negotiating with his sort after piece of timber. ', NULL, 'Visual reports confirm the transfer of wood between the two men aswell as the evidence of the physical altercation.'),
(3, 'GEPPETTO NAMES HIS PUPPET PINOCCHIO', 2, 'With a world tour on the horizon local puppeteer Geppetto was kind enough to take us on a walk through of the creation of his newest puppet Pinocchio.  \n\nGeppetto’s work place was modest. Located on the ground floor being only lit from the adjoined staircase and a dwindling fire, the furniture was simple a rickety chair, a poor bed, and a broken-down table. However, the magic lied in skills of the puppeteer.  \n\nWe sat and watched Geppetto work in utter disbelief of what we were witnessing. As Geppetto begin carving his masterpiece it began to animate as if Geppetto was already pulling the strings. \n\nAs he carved the eyes they began to move and scan the room. The mouth was barely finished before laughter erupted from the puppet. Geppetto growing ever confused and frustrated with the sentient timber continued his carving the chin, then the throat, then the shoulders, the stomach, the arms and the hands. \n\nMuch to the growing melancholy of Geppetto, Pinocchio continued with his insolent and derisive behaviour: snatching Geppetto’s wig once he had hands and kicking him once he had legs and feet. \n\nGeppetto pushed through the adversity and once complete with his carving began to attempt to teach to the puppet that now more resemble a young boy than a piece of wood how to walk. \n\nMuch like his previous efforts with the puppet, Geppetto was once again duped by the devious puppet ran around the room out the door and down the street.  \n\nWe lost Geppetto in pursuit of his new creation that he is now responsible for. ', NULL, 'Geppetto declined to comment on the article however social media posts show a puppet running down the street with an old man chasing it.'),
(4, 'GEPPETO ARRESTED', 1, 'Both ends of main street were barricaded today as the police reacted to commotion and building crowds in the city centre. Preparing for a colt that had escaped its master, the officers on duty began to move through the growing crowd. \n\nMuch to their surprise they instead arrived to find raggedly old puppeteer Geppetto verbally and physically abusing his new sentient puppet Pinocchio.  \n\nWith a rough and over-aggressive hold on the puppet, Geppetto was trying to drag him away claiming he is going to “settle accounts”. \n\nThe local officers intervened and detained Geppetto. \n\nThe Police lead Geppetto to prison not without the abusive puppeteer letting out a final hurl of abuse towards his puppet. ', NULL, 'Consider the intent of the author.'),
(5, 'THE TALKING-CRICKET AND PINOCCHIO', 1, 'Prior to being struck down by Pinocchio, our reporter on the ground, the Talking-Cricket was able to catch up with him to discuss his intentions now that Geppetto has turned him into a boy. \n\n“I have made up my mind to run away tomorrow at daybreak, because if I remain, I shall not escape the fate of all other boys”, the newly animated puppet told out reporter.  \n\n \"All I wish to do is to eat, drink, sleep and amuse myself, and to lead a vagabond life from morning to night\", Pinocchio. \n\nUpon a critique of his intentions from the talking cricket Pinocchio exploded in a fit of rage, hurling a wooden mallet at our reporting, fatally wounding him. ', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `question_types`
--

CREATE TABLE `question_types` (
  `idQuestion_Type` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `data_type` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `question_types`
--

INSERT INTO `question_types` (`idQuestion_Type`, `name`, `data_type`) VALUES
(1, 'True or False', 'Bool'),
(2, 'Multiple Choice', 'String'),
(3, 'Multiple Answer', 'JSON');

-- --------------------------------------------------------

--
-- Table structure for table `quizzes`
--

CREATE TABLE `quizzes` (
  `idQuiz` int NOT NULL,
  `link` varchar(200) NOT NULL,
  `expiry` timestamp(6) NULL DEFAULT NULL,
  `time` int DEFAULT NULL,
  `name` varchar(200) NOT NULL,
  `image` varchar(200) NOT NULL,
  `position` varchar(500) NOT NULL,
  `namePosition` varchar(200) NOT NULL,
  `imagePosition` varchar(200) NOT NULL,
  `quizNumber` int DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `Levels_idLevels` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `quizzes`
--

INSERT INTO `quizzes` (`idQuiz`, `link`, `expiry`, `time`, `name`, `image`, `position`, `namePosition`, `imagePosition`, `quizNumber`, `description`, `Levels_idLevels`) VALUES
(1, 'consider-the-source', NULL, NULL, 'Consider the source', 'images/Level1.svg', '{\"top\": \"16%\", \"left\": \"1%\"}', 'right', 'bottom', 1, '(to understand its mission and purpose)', NULL),
(2, 'read-beyond-the-headline', NULL, NULL, 'Read beyond the headline', 'images/Level2.svg', '{\"top\":\"40%\", \"left\":\"22%\"}', 'left', 'top', 2, '(to understand its mission and purpose)', NULL),
(3, 'check-the-authors', NULL, NULL, 'Check the authors', 'images/Level3.svg', '{\"top\":\"74%\", \"left\":\"34%\"}', 'bottom', 'left', 3, '(to see if they are real and credible', NULL),
(4, 'access-the-supporting-sources', NULL, NULL, 'Access the supporting sources', 'images/Level4.svg', '{\"top\":\"11%\", \"left\":\"39%\"}', 'right', 'left', 4, '(to ensure they support the claims)', NULL),
(5, 'check-the-date-of-publication', NULL, NULL, 'Check the date of publication', 'images/Level5.svg', '{\"top\":\"63%\", \"left\":\"50%\"}', 'bottom', 'left', 5, '(to see if the story is relevant and up to date)', NULL),
(6, 'ask-if-is-a-joke', NULL, NULL, 'Ask if it is a joke', 'images/Level6.svg', '{\"top\":\"29%\", \"left\":\"63%\"}', 'top', 'left', 6, '(to determine if it is meant to be satire)', NULL),
(7, 'review-your-own-biases', NULL, NULL, 'Review your own biases', 'images/Level7.svg', '{\"top\":\"70%\", \"left\":\"72%\"}', 'bottom', 'right', 7, '(to see if they are affecting your judgment)', NULL),
(8, 'ask-experts', NULL, NULL, 'Ask experts', 'images/Level8.svg', '{\"top\":\"20%\", \"left\":\"86%\"}', 'top', 'left', 8, '(to get confirmation from independent people with knowledge)', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `quizzes_has_questions`
--

CREATE TABLE `quizzes_has_questions` (
  `Quizzes_idQuiz` int NOT NULL,
  `Questions_idQuestions` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `quizzes_has_questions`
--

INSERT INTO `quizzes_has_questions` (`Quizzes_idQuiz`, `Questions_idQuestions`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 5);

-- --------------------------------------------------------

--
-- Table structure for table `quizzes_has_users`
--

CREATE TABLE `quizzes_has_users` (
  `Quiz_idQuiz` int NOT NULL,
  `User_idUser` int NOT NULL,
  `score` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `idRole` int NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`idRole`, `name`) VALUES
(1, 'Player');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `expires` timestamp(6) NOT NULL,
  `session_token` varchar(255) NOT NULL,
  `access_token` varchar(255) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `email_verified` timestamp(6) NULL DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `Role_idRole` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified`, `image`, `created_at`, `updated_at`, `Role_idRole`) VALUES
(1, 'John Doe', 'example@exampple.com', NULL, NULL, '2021-09-18 11:23:01.180592', '2021-09-18 11:23:01.180592', 1);

-- --------------------------------------------------------

--
-- Table structure for table `verification_requests`
--

CREATE TABLE `verification_requests` (
  `id` int NOT NULL,
  `identifier` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires` timestamp(6) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `compound_id` (`compound_id`),
  ADD KEY `provider_account_id` (`provider_account_id`),
  ADD KEY `provider_id` (`provider_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`idAnswers`),
  ADD KEY `fk_Answer_Question1_idx` (`Questions_idQuestions`);

--
-- Indexes for table `friends`
--
ALTER TABLE `friends`
  ADD PRIMARY KEY (`Follower`,`Followee`),
  ADD KEY `fk_User_has_User_User1_idx` (`Followee`),
  ADD KEY `fk_User_has_User_User_idx` (`Follower`);

--
-- Indexes for table `levels`
--
ALTER TABLE `levels`
  ADD PRIMARY KEY (`idlevels`),
  ADD UNIQUE KEY `idlevels_UNIQUE` (`idlevels`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`idQuestions`),
  ADD KEY `fk_Question_Question_Type1_idx` (`Question_Type_idQuestion_Type`);

--
-- Indexes for table `question_types`
--
ALTER TABLE `question_types`
  ADD PRIMARY KEY (`idQuestion_Type`);

--
-- Indexes for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD PRIMARY KEY (`idQuiz`),
  ADD UNIQUE KEY `link_UNIQUE` (`link`),
  ADD UNIQUE KEY `idQuiz_UNIQUE` (`idQuiz`);

--
-- Indexes for table `quizzes_has_questions`
--
ALTER TABLE `quizzes_has_questions`
  ADD PRIMARY KEY (`Quizzes_idQuiz`,`Questions_idQuestions`),
  ADD KEY `fk_Quiz_has_Question_Question1_idx` (`Questions_idQuestions`),
  ADD KEY `fk_Quiz_has_Question_Quiz1_idx` (`Quizzes_idQuiz`);

--
-- Indexes for table `quizzes_has_users`
--
ALTER TABLE `quizzes_has_users`
  ADD PRIMARY KEY (`Quiz_idQuiz`,`User_idUser`),
  ADD KEY `fk_Quiz_has_User_User1_idx` (`User_idUser`),
  ADD KEY `fk_Quiz_has_User_Quiz1_idx` (`Quiz_idQuiz`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`idRole`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `session_token` (`session_token`),
  ADD UNIQUE KEY `access_token` (`access_token`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_User_Role1_idx` (`Role_idRole`);

--
-- Indexes for table `verification_requests`
--
ALTER TABLE `verification_requests`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `idAnswers` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `levels`
--
ALTER TABLE `levels`
  MODIFY `idlevels` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `idQuestions` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `quizzes`
--
ALTER TABLE `quizzes`
  MODIFY `idQuiz` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `idRole` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `verification_requests`
--
ALTER TABLE `verification_requests`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `fk_Answer_Question1` FOREIGN KEY (`Questions_idQuestions`) REFERENCES `questions` (`idQuestions`);

--
-- Constraints for table `friends`
--
ALTER TABLE `friends`
  ADD CONSTRAINT `fk_User_has_User_User` FOREIGN KEY (`Follower`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_User_has_User_User1` FOREIGN KEY (`Followee`) REFERENCES `users` (`id`);

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `fk_Question_Question_Type1` FOREIGN KEY (`Question_Type_idQuestion_Type`) REFERENCES `question_types` (`idQuestion_Type`);

--
-- Constraints for table `quizzes_has_questions`
--
ALTER TABLE `quizzes_has_questions`
  ADD CONSTRAINT `fk_Quiz_has_Question_Question1` FOREIGN KEY (`Questions_idQuestions`) REFERENCES `questions` (`idQuestions`),
  ADD CONSTRAINT `fk_Quiz_has_Question_Quiz1` FOREIGN KEY (`Quizzes_idQuiz`) REFERENCES `quizzes` (`idQuiz`);

--
-- Constraints for table `quizzes_has_users`
--
ALTER TABLE `quizzes_has_users`
  ADD CONSTRAINT `fk_Quiz_has_User_Quiz1` FOREIGN KEY (`Quiz_idQuiz`) REFERENCES `quizzes` (`idQuiz`),
  ADD CONSTRAINT `fk_Quiz_has_User_User1` FOREIGN KEY (`User_idUser`) REFERENCES `users` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_User_Role1` FOREIGN KEY (`Role_idRole`) REFERENCES `roles` (`idRole`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
