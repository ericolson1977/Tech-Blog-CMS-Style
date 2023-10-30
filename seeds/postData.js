const { Posts } = require('../models');

const postsData = [
  {
    title: "The Importance of SEO-Friendly CMS for Your Website",
    content: "Search Engine Optimization (SEO) is crucial for driving organic traffic to your website. In this article, we'll delve into why choosing an SEO-friendly CMS is paramount. We'll discuss the key SEO features you should look for in a CMS and provide tips on optimizing your content and structure to rank higher in search engine results.",
    creator_username: "johnqpublic",
  },
  {
    title: "WordPress vs. Drupal: A Head-to-Head Comparison",
    content: "WordPress and Drupal are two popular CMS platforms, each with its own strengths and weaknesses. In this post, we'll compare these two giants in the CMS world, exploring aspects like user-friendliness, flexibility, community support, and more. By the end, you'll have a clearer picture of which platform aligns better with your website's specific needs.",
    creator_username: "janeusername",
  },
  {
    title: "Exploring Headless CMS: What Is It, and Is It Right for You?",
    content: "Headless CMS is gaining traction in the tech world. But what exactly is it, and when should you consider using it for your website or application? We'll explain the concept of headless CMS, its advantages, and scenarios where it might be a better fit than traditional CMS solutions.",
    creator_username: "anyone", 
  },
];

const seedPosts = () => Posts.bulkCreate(postsData);

module.exports = seedPosts;
