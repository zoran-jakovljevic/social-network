-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 08, 2024 at 07:52 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `social_network`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `user_id`, `post_id`, `content`) VALUES
(19, 58, 45, 'Great post! Really enjoyed reading this.'),
(20, 59, 46, 'This is very helpful, thank you!'),
(21, 60, 47, 'I completely agree with your point.'),
(22, 61, 48, 'Interesting perspective, thanks for sharing!'),
(23, 62, 49, 'I never thought about it this way before.'),
(24, 63, 50, 'Thanks for the insights!'),
(25, 64, 51, 'Very well written!'),
(26, 65, 52, 'This is exactly what I was looking for.'),
(27, 66, 53, 'I learned something new today!'),
(28, 67, 54, 'Awesome content, keep it up!'),
(29, 68, 55, 'This was really informative.'),
(30, 69, 56, 'Thanks for the tips!'),
(31, 70, 57, 'I found this very useful.'),
(32, 71, 58, 'Can you share more on this topic?'),
(33, 72, 59, 'Loved this post, thanks for sharing!'),
(34, 60, 60, 'I have a different opinion, but this is great.'),
(35, 61, 61, 'Could you provide more details?'),
(36, 62, 62, 'Thanks for the post, very insightful!'),
(37, 63, 63, 'This post really resonated with me.'),
(38, 64, 64, 'Looking forward to reading more like this.'),
(39, 73, 45, 'Great post!');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` varchar(150) NOT NULL,
  `likes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `user_id`, `content`, `likes`) VALUES
(45, 58, 'Just finished reading a great book on SQL!', 25),
(46, 59, 'Excited to start my new job!', 18),
(47, 60, 'I love programming in Python!', 30),
(48, 61, 'Working on my fitness journey!', 23),
(49, 62, 'Visited the mountains today, breathtaking views!', 15),
(50, 63, 'Cooking a new recipe tonight!', 12),
(51, 64, 'Learning JavaScript and enjoying it!', 20),
(52, 65, 'Finally watched the latest Marvel movie!', 33),
(53, 66, 'Started a blog on web development!', 27),
(54, 67, 'Exploring the world of data science!', 10),
(55, 68, 'Looking forward to my vacation next week!', 5),
(56, 69, 'Attending a tech conference this weekend.', 19),
(57, 70, 'Got my first freelance project!', 24),
(58, 71, 'Trying out React.js for the first time!', 29),
(59, 72, 'Back to school and ready to study hard!', 11),
(60, 59, 'Today I ran 5 kilometers!', 14),
(61, 60, 'Building a small web app for practice.', 9),
(62, 58, 'Enjoying some quiet time with a good book.', 13),
(63, 64, 'Attending a workshop on cybersecurity.', 21),
(64, 66, 'Exploring new places with friends.', 17);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(30) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`) VALUES
(58, 'john.doe@example.com', 'johndoe', 'password123'),
(59, 'jane.smith@example.com', 'janesmith', 'pass456'),
(60, 'michael.jordan@example.com', 'mjordan', 'secret789'),
(61, 'sarah.connor@example.com', 'sconnor', 'secure123'),
(62, 'david.beckham@example.com', 'dbeckham', 'football456'),
(63, 'emma.watson@example.com', 'ewatson', 'magic789'),
(64, 'charlie.brown@example.com', 'cbrown', 'charlie123'),
(65, 'lucy.heartfilia@example.com', 'lheartfilia', 'fairytail456'),
(66, 'bruce.wayne@example.com', 'bwayne', 'batman789'),
(67, 'clark.kent@example.com', 'ckent', 'superman123'),
(68, 'harry.potter@example.com', 'hpotter', 'hogwarts456'),
(69, 'tony.stark@example.com', 'tstark', 'ironman789'),
(70, 'steve.rogers@example.com', 'srogers', 'america123'),
(71, 'natasha.romanoff@example.com', 'nromanoff', 'blackwidow456'),
(72, 'peter.parker@example.com', 'pparker', 'spiderman789'),
(73, 'zoranjakovljevic2001@gmail.com', 'zoranjakovljevic', 'zoran123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
