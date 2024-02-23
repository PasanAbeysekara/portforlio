import AnimatedText from "@/components/AnimatedText";
import { motion, useMotionValue } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import blog1 from "../../public/images/articles/react-component-based-archi-sub.webp";
import blog2 from "../../public/images/articles/aws-amplify.webp";
import blog3 from "../../public/images/articles/aws-api-gateway-architecture.webp";
import blog4 from "../../public/images/articles/react-hooks-guide.webp";
import blog5 from "../../public/images/articles/redux-guide.webp";
import blog6 from "../../public/images/articles/aws-lambda-optimization.webp";

import Layout from "@/components/Layout";
import Link from "next/link";
import { useRef } from "react";
import TransitionEffect from "@/components/TransitionEffect";

const FramerImage = motion(Image);

const MovingImg = ({ title, img, link }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const imgRef = useRef(null);

  function handleMouse(event) {
    imgRef.current.style.display = "inline-block";
    x.set(event.pageX);
    y.set(-10);
  }

  function handleMouseLeave(event) {
    imgRef.current.style.display = "none";
    x.set(0);
    y.set(0);
  }
  return (
    <>
      <Link
        href={link}
        target={"_blank"}
        className="relative"
        onMouseMove={handleMouse}
        onMouseLeave={handleMouseLeave}
      >
        <h2 className="capitalize text-xl font-semibold hover:underline dark:text-light md:text-lg xs:text-base">
          {title}
        </h2>
        <FramerImage
          src={img}
          ref={imgRef}
          alt={title}
          className="w-96 h-auto z-10 hidden absolute rounded-lg md:!hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { duration: 0.2 } }}
          style={{
            x: x,
            y: y,
          }}
          sizes="(max-width: 768px) 60vw,
              (max-width: 1200px) 40vw,
              33vw"
        />
      </Link>
    </>
  );
};

const Article = ({ img, title, date, link }) => {
  return (
    <motion.li
      initial={{ y: 200 }}
      whileInView={{ y: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
      viewport={{ once: true }}
      className="relative w-full p-4 py-6 my-2 rounded-xl flex sm:flex-col items-center justify-between 
      bg-light text-dark first:mt-0 border border-solid border-dark
      border-r-4 border-b-4 dark:bg-dark dark:border-light
      "
    >
      <MovingImg img={img} title={title} link={link} />
      <span className="text-primary font-semibold dark:text-primaryDark min-w-max pl-4 sm:self-start 
      sm:pl-0 xs:text-sm">
        {date}
      </span>
    </motion.li>
  );
};

const FeaturedArticle = ({ img, title, time, summary, link }) => {
  return (
    <li className="relative w-full p-4 col-span-1 bg-light border border-dark border-solid rounded-2xl 
    dark:bg-dark dark:border-light">
      <div
        className="absolute  top-0 -right-3 w-[102%] h-[103%] rounded-[2rem]  rounded-br-3xl bg-dark 
        -z-10  "
      />
      <Link
        href={link}
        target={"_blank"}
        className="inline-block rounded-lg overflow-hidden w-full"
      >
        <FramerImage
          src={img}
          alt={title}
          className="w-full h-auto"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          sizes="100vw"
          priority
        />
      </Link>

      <Link href={link} target={"_blank"}>
        <h2 className="capitalize text-2xl font-bold my-2 mt-4 hover:underline xs:text-lg">
          {title}
        </h2>
      </Link>
      <p className="text-sm  mb-2">{summary}</p>
      <span className="text-primary font-semibold dark:text-primaryDark">
        {time}
      </span>
    </li>
  );
};

export default function Articles() {
  return (
    <>
      <Head>
        <title>Simple Portfolio Built with Nextjs | Articles Page</title>
        <meta name="description" content="Browse through CodeBucks's collection of software engineering articles and 
        tutorials on Next.js, React.js, web development, and more. 
        Gain valuable insights and stay up-to-date with SEO tips for building a developer portfolio." />
      </Head>
      <TransitionEffect />
      <main
        className={`w-full mb-16 flex flex-col items-center justify-center dark:text-light overflow-hidden`}
      >
        <Layout className="pt-16">
          <AnimatedText
            text="Some of my Articles!"
            className="!text-8xl !leading-tight mb-16 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8"
          />

          <ul className="grid grid-cols-2 gap-16 lg:gap-8 md:grid-cols-1 md:gap-y-16">
            <FeaturedArticle
              img={blog1}
              title="Building Scalable React Applications: Embracing Component-Based Architecture"
              time="9 min read"
              summary="Building scalable React applications requires embracing a component-based architecture, which enables developers to create complex web applications by assembling small, modular components. Each component acts as an independent, reusable UI element, managing its own state and rendering, thus facilitating scalability, maintainability, and performance in web application development"
              link="https://pasan-bytes-blog.vercel.app/blogs/scalable-react-component-architecture"
            />

            <FeaturedArticle
              img={blog2}
              title="AWS Amplify: Accelerating The Development Of Full-Stack Applications"
              time="10 min read"
              summary="AWS Amplify accelerates the development of full-stack applications by providing a comprehensive toolkit for developers to easily integrate cloud services with their applications. It simplifies the process of setting up, testing, launching, and scaling applications, allowing developers to focus more on building their applications rather than managing backend services."
              link="https://pasan-bytes-blog.vercel.app/blogs/aws-amplify-full-stack-developmen"
            />
          </ul>

          <h2 className="font-bold text-4xl w-full text-center mt-32 my-16">
            All Articles
          </h2>

          <ul className="flex flex-col items-center relative">
            <Article
              title="AWS API Gateway: Paving The Way For Scalable And Secure APIs"
              img={blog3}
              date="January 27, 2024"
              link="https://pasan-bytes-blog.vercel.app/blogs/aws-api-gateway-scalable-secure-apis"
            />
            <Article
              title="Leveraging React Hooks For Stateful Logic: An In-Depth Guide"
              img={blog4}
              date="January 30, 2024"
              link="https://pasan-bytes-blog.vercel.app/blogs/react-hooks-stateful-logic-guid"
            />
            <Article
              title="Mastering Redux: A Comprehensive Guide For State Management"
              img={blog5}
              date="January 29, 2024"
              link="https://pasan-bytes-blog.vercel.app/blogs/redux-state-management-comprehensive-guide"
            />
            <Article
              title="Optimizing Serverless Applications With AWS Lambda: Strategies For Efficiency And Scalability"
              img={blog6}
              date="January 28, 2024"
              link="https://pasan-bytes-blog.vercel.app/blogs/serverless-aws-lambda-optimization-strategies"
            />
          </ul>
        </Layout>
      </main>
    </>
  );
}
