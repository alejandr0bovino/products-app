import React from "react";
import { Helmet } from "react-helmet";

function About() {
  return (
    <>
      <Helmet>
        <title>About - Products App</title>
      </Helmet>
      <h2 className="theme-main-title">About</h2>

      <blockquote cite="https://reactjs.org/blog/2022/06/15/react-labs-what-we-have-been-working-on-june-2022.html">
        React 18 was years in the making, and with it brought valuable lessons
        for the React team. Its release was the result of many years of research
        and exploring many paths. Some of those paths were successful; many more
        were dead-ends that led to new insights. One lesson we’ve learned is
        that it’s frustrating for the community to wait for new features without
        having insight into these paths that we’re exploring.
      </blockquote>
    </>
  );
}

export default About;
