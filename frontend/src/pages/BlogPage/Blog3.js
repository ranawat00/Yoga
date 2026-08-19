import React from 'react';
import './BlogPage.css';

export default function Blog3({ blog }) {
  return (
    <div className="blog-article-container">
      {/* Article Body */}
      <article className="blog-article-body blog-substance-article">
        {/* Lead Paragraph */}
        <p className="blog-paragraph blog-substance-paragraph blog-substance-lead">
          The teenage and young adult years are a whirlwind of self-discovery, growth, and independence. But alongside the excitement, today's youth face unprecedented pressure—from academic expectations and social media standards to complex family dynamics and mental health struggles. In an attempt to cope with stress, anxiety, or emotional pain, many young people turn to drug or alcohol experimentation. What often starts as a temporary escape, however, can quickly turn into a life-altering crisis.
        </p>

        {/* Section 1 Heading */}
        <h2 className="blog-substance-section-heading">
          The Reality: Physical and Mental Toll
        </h2>

        <p className="blog-paragraph blog-substance-paragraph">
          Youth living with substance use disorders face significantly higher rates of physical and mental illnesses. Beyond the immediate physical risks, substance use degrades overall well-being, impairs brain development, and drastically increases the risk of long-term addiction.
        </p>

        <p className="blog-paragraph blog-substance-paragraph">
          When a young person uses substances to cope, it often masks underlying psychological distress. Substance use and mental health challenges walk hand-in-hand: self-medication might offer temporary relief, but it ultimately worsens anxiety, deepens depression, and creates a damaging cycle that becomes harder to break over time.
        </p>

        {/* Section 2 Heading */}
        <h2 className="blog-substance-section-heading">
          Strengthening Mental Health: The Ultimate Buffer
        </h2>

        <p className="blog-paragraph blog-substance-paragraph">
          Preventing substance abuse isn't just about saying "no"—it's about building a mind strong enough to navigate life's challenges without needing an escape. Strengthening mental health equips young people with emotional resilience, self-awareness, and healthy coping mechanisms. Instead of turning to substances when overwhelmed, youth with strong emotional foundations learn to:
        </p>

        <ul className="blog-substance-list">
          <li>Identify and process difficult emotions safely.</li>
          <li>Reach out for help without feeling shame or stigma.</li>
          <li>Develop healthy outlets like physical sports, creative arts, mindfulness, and supportive social connections.</li>
        </ul>

        <p className="blog-paragraph blog-substance-paragraph">
          Mental health awareness shifts the narrative from punishing bad behavior to understanding underlying pain and building resilience before a crisis occurs.
        </p>

        {/* Section 3 Heading */}
        <h2 className="blog-substance-section-heading">
          Protective Factors: Building a Shield Against Addiction
        </h2>

        <p className="blog-paragraph blog-substance-paragraph">
          Research highlights that specific "protective factors" act as powerful buffers, drastically reducing the likelihood that a young person will engage in high-risk substance use. These key buffers include:
        </p>

        <ul className="blog-substance-list">
          <li><strong>Family Engagement &amp; Support:</strong> Strong, positive connections with parents or caregivers create a safe harbor where youth feel valued, heard, and understood.</li>
          <li><strong>Clear Parental Expectations:</strong> Active parental monitoring and open communication declaring clear disapproval of substance use set firm, safe boundaries.</li>
          <li><strong>School Connectedness:</strong> Feeling accepted, supported, and included within a school community gives young people a sense of belonging and purpose.</li>
        </ul>

        {/* Section 4 Heading */}
        <h2 className="blog-substance-section-heading">
          Strategies for moving forward as a community
        </h2>

        <p className="blog-paragraph blog-substance-paragraph">
          Overcoming youth substance use requires a compassionate, proactive approach from families, schools, and communities alike:
        </p>

        <div className="blog-substance-strategies">
          <p className="blog-paragraph blog-substance-paragraph">
            <strong>Prioritize Early Mental Health Education:</strong> Integrate mental health literacy into school curriculums so youth can recognize stress and trauma early.
          </p>

          <p className="blog-paragraph blog-substance-paragraph">
            <strong>Normalize Seeking Help:</strong> Break the stigma around therapy and counseling. Reaching out for professional mental health support should be viewed as a sign of strength, not weakness.
          </p>

          <p className="blog-paragraph blog-substance-paragraph">
            <strong>Foster Open, Unjudgmental Dialogue:</strong> Parents and guardians should aim to listen more than they lecture. Creating spaces where youth can speak honestly about peer pressure and mental health makes them far more likely to seek guidance when struggling.
          </p>

          <p className="blog-paragraph blog-substance-paragraph">
            <strong>Promote Healthy Coping Outlets:</strong> Encourage participation in sports, creative hobbies, community volunteering, and peer support networks that naturally boost mood and confidence.
          </p>
        </div>

        {/* Concluding Paragraph */}
        <p className="blog-paragraph blog-substance-paragraph blog-substance-conclusion">
          Substance use among youth is rarely just about curiosity—it is often a cry for help. By prioritizing mental health strengthening and bolstering protective factors, we can guide young people toward healthier, more resilient futures.
        </p>
      </article>
    </div>
  );
}
