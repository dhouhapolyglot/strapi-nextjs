import { markdownify } from "@lib/utils/textConverter";
import shortcodes from "@shortcodes/all";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import axios from 'axios';
import React, { useState, useEffect } from 'react';


const About = ({ data }) => {
  const { frontmatter, content:initialContent } = data;
  const { title: initialTitle, image: initialImage, education : initialEducation, experience : initialExperience} = frontmatter;
  const [title, setTitle] = useState(initialTitle);
  const [education, setEduction] = useState(initialEducation);
  const [experience, setExperience] = useState(initialExperience);
  const [content, setContent] = useState(initialContent);
  const [image, setImage] = useState(initialImage);

  //axios.get('http://localhost:1337/uploads/Screenshot_from_2023_02_06_11_19_58_b2132409d7.png').then(response => {
  //const newImage = response;
  //setImage(newImage);
  //});
  useEffect(() => {
    axios
      .get("http://localhost:1337/api/abouts?populate=*")
      .then((response) => {
        const newTitle = response.data.data[0].attributes.title;
        setTitle(newTitle);
        const newEduction = response.data.data[0].attributes.education;
        setEduction(newEduction);
        const newExperience = response.data.data[0].attributes.experience;
        setExperience(newExperience);
        const newContent = response.data.data[0].attributes.content;
        setContent(newContent);
        const Newimage_url = response.data.data[0].attributes.image.data[0].attributes.url;
        var url = 'http://localhost:1337' + Newimage_url;
        setImage(Newimage_url);
        //axios.get(url).then(response => {
        //  console.log(response.config.url);
        //  const newImage = response.config.url;
        //  setImage(newImage);
        //});
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  return (
    <section className="section mt-16">
      <div className="container text-center">
        {image && (
          <div className="mb-8">
            <Image
              src={image}
              width={1298}
              height={616}
              alt={title}
              className="rounded-lg"
              priority={true}
            />
          </div>
        )}
        {markdownify(title, "h1", "h1 text-left lg:text-[55px] mt-12")}

        <div className="content text-left">
          {content} 
        </div>

        <div className="row mt-24 text-left lg:flex-nowrap">
          <div className="lg:col-6 ">
            <div className="rounded border border-border p-6 dark:border-darkmode-border ">
              {markdownify(education.title, "h2", "section-title mb-12")}
              <div className="row">
                {education.degrees.map((degree, index) => (
                  <div className="mb-7 md:col-6" key={"degree-" + index}>
                    <h4 className="text-base lg:text-[25px]">
                      {degree.university}
                    </h4>
                    <p className="mt-2">{degree.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="experience mt-10 lg:mt-0 lg:col-6">
            <div className="rounded border border-border p-6 dark:border-darkmode-border ">
              {markdownify(experience.title, "h2", "section-title mb-12")}
              <ul className="row">
                {experience?.list?.map((item, index) => (
                  <li
                    className="mb-5 text-lg font-bold text-dark dark:text-darkmode-light lg:col-6"
                    key={"experience-" + index}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
