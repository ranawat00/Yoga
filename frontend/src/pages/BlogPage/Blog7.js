import React from 'react';
import './BlogPage.css';
import { useApp } from '../../hooks/useApp';
import blog7ContentImg from '../../assets/blog/blog7_content.jpg';

export default function Blog7({ blog }) {
  const { setView } = useApp();

  const handleRegisterClick = () => {
    if (setView) {
      setView('workshops');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="blog-article-container">
      {/* Article Body */}
      <article className="blog-article-body blog-parental-article">
        {/* Main Title */}
        <h1 className="blog-parental-main-title">
          Nurturing the Nurturers: Why Parental Mental Health Matters (And How Yoga Healers Organisation Can Help)
        </h1>

        {/* Lead Paragraphs */}
        <p className="blog-paragraph blog-parental-paragraph blog-parental-lead">
          In today's fast-paced, hyper-connected world, parenting has become more demanding than ever. Between juggling full-time career responsibilities, managing household logistics, and guiding children through an era of constant digital stimulation, modern parents are often pushed to their emotional and physical limits.
        </p>

        <p className="blog-paragraph blog-parental-paragraph">
          We often hear the classic airplane safety rule: "Put on your own oxygen mask before assisting others." Yet, when it comes to mental health, parents routinely put themselves last. It is time to change that narrative. A parent's mental well-being isn't a luxury—it is the bedrock of a healthy, thriving family.
        </p>

        {/* Section 1 Heading */}
        <h2 className="blog-parental-section-heading">
          The Hidden Toll of Modern Parenting
        </h2>

        <p className="blog-paragraph blog-parental-paragraph">
          Parenting in a fast-paced environment brings unique stressors that can quietly erode mental peace:
        </p>

        <ul className="blog-parental-list">
          <li><strong>Chronic Burnout:</strong> The endless stream of micro-decisions and responsibilities leaves little room for mental rest.</li>
          <li><strong>Emotional Overwhelm:</strong> Navigating work deadlines alongside a child's emotional needs often leads to anxiety and stress accumulation.</li>
          <li><strong>The "Digital Distraction" Gap:</strong> Balancing screen time, staying present with family, and keeping up with modern demands makes achieving authentic inner calm feel almost impossible.</li>
          <li><strong>Physical Exhaustion:</strong> Mental stress directly manifests in the physical body—leading to poor sleep, low energy, chronic muscle tension, and weakened immune function.</li>
        </ul>

        <p className="blog-paragraph blog-parental-paragraph">
          When a parent is operating on empty, the entire household feels the ripple effect. Conversely, when a parent feels calm, emotionally grounded, and physically energized, that resilience flows directly to their children.
        </p>

        {/* Section 2 Heading */}
        <h2 className="blog-parental-section-heading">
          How Yoga Healers Organisation (YHO) Empowers Parents
        </h2>

        <p className="blog-paragraph blog-parental-paragraph">
          At Yoga Healers Organisation (YHO), we recognize that true well-being requires a 360-degree holistic approach. Our scientifically designed, evidence-based modules go beyond basic fitness; they are structured to restore harmony across mind, body, and spirit. YHO has specialized programs to support parents in becoming mentally stronger and more resilient.
        </p>

        {/* Section 3 Heading */}
        <h2 className="blog-parental-section-heading">
          3 Core Pillars of YHO's Approach for Parents
        </h2>

        <div className="blog-parental-subsections">
          <div className="blog-parental-subsection-item">
            <h3 className="blog-parental-subheading">Shifting from "Survival Mode" to Parasympathetic Calm</h3>
            <p className="blog-paragraph blog-parental-paragraph">
              Chronic stress keeps the body locked in a perpetual "fight-or-flight" state, releasing elevated levels of cortisol and adrenaline. YHO's targeted breathwork and meditative techniques activate the parasympathetic nervous system ("rest-and-digest"), signaling to your body that it is safe to unwind.
            </p>
          </div>

          <div className="blog-parental-subsection-item">
            <h3 className="blog-parental-subheading">Building Somatic and Emotional Resilience</h3>
            <p className="blog-paragraph blog-parental-paragraph">
              Emotions leave a physical footprint. YHO's tailored yoga sequences help unblock physical tightness in the shoulders, back, and hips—where stress commonly accumulates. By combining physical movement with conscious awareness, parents gain both physical strength and emotional stability.
            </p>
          </div>

          <div className="blog-parental-subsection-item">
            <h3 className="blog-parental-subheading">Fostering a Conscious Household Culture</h3>
            <p className="blog-paragraph blog-parental-paragraph">
              YHO programs are designed to fit into real, busy lives. Rather than requiring hours of uninterrupted isolation, parents learn accessible, daily practices that integrate seamlessly into family routines—creating an atmosphere of presence, patience, and mutual well-being at home.
            </p>
          </div>
        </div>

        {/* Section 4 Heading & Conclusion */}
        <h2 className="blog-parental-section-heading">
          Stepping Into a Stronger, Calmer Version of Yourself
        </h2>

        <p className="blog-paragraph blog-parental-paragraph blog-parental-conclusion">
          Prioritizing your mental health is not an act of selfishness; it is the greatest gift you can give your children. When you step onto the mat with Yoga Healers Organisation, you are taking an intentional step toward breaking the cycle of burnout and reclaiming your inner vitality.
        </p>

        {/* Workshop Banner & Register CTA Card */}
        <div className="blog7-cta-box">
          <div className="blog7-content-img-wrapper">
            <img src={blog7ContentImg} alt="Start your Free 5 DAYS ONLINE YOGA WORKSHOP" className="blog7-content-img" />
          </div>
          <button className="blog7-register-btn" onClick={handleRegisterClick}>
            <span>Register Now</span>
            <div className="blog7-btn-arrow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </button>
        </div>
      </article>
    </div>
  );
}
