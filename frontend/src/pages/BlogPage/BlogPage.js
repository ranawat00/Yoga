import React from 'react';
import './BlogPage.css';
import blogBannerImg from '../../assets/blog/blog_banner.jpg';
import Logo from '../../common/Logo/Logo';

export default function BlogPage() {

  return (
    <div className="blog-page">
      {/* Blog Hero Banner - Full Width */}
      <div className="blog-banner-hero-wrapper">
        <div className="blog-banner-frame">
          <img
            src={blogBannerImg}
            alt="A Silent Pandemic - Yoga Healers Blog Banner"
            className="blog-banner-img"
          />
        </div>
      </div>

      {/* Main Blog Article Container */}
      <main className="blog-content-wrapper">
        <div className="blog-container">
          {/* Logo Badge & Author Header */}
          <div className="blog-header-badge-section">
            <div className="blog-logo-badge-wrapper">
              <Logo size={60} />
            </div>
            <h1 className="blog-org-title">Yoga Healers Organisation</h1>
            <p className="blog-org-subtitle">
              Nurturing Mental Strength in the Age of Acceleration
            </p>
          </div>

          {/* Article Body */}
          <article className="blog-article-body">
            <p className="blog-paragraph lead-paragraph">
              <strong>We live in an era</strong> defined by extraordinary innovation. Artificial Intelligence speeds up our tasks, digital transformation connects us globally in milliseconds, and opportunities to learn and grow are everywhere. Yet, alongside this fast-paced shift to put speed and achievement first, a quiet phenomenon has emerged: the silent pandemic of neglected mental health.
            </p>

            <p className="blog-paragraph">
              While physical health often commands immediate attention, our mental well-being forms the foundation of every thought, decision, and action. Recognizing its importance is not a sign of vulnerability—it is the first step toward building resilient mindsets in a modern world.
            </p>

            <h2 className="blog-section-heading">
              UNDERSTANDING THE GLOBAL LANDSCAPE
            </h2>

            <p className="blog-paragraph">
              Mental health challenges affect individuals across every background, demographic, and profession. From young students navigating digital environments to working adults and high-level leaders balancing complex responsibilities, mental strain is universal—and frequently unnoticed.
            </p>

            {/* Demographic Impact Table */}
            <div className="blog-table-container">
              <table className="blog-demographic-table">
                <thead>
                  <tr>
                    <th>DEMOGRAPHIC GROUP</th>
                    <th>PRIMARY ENVIRONMENTAL FACTOR</th>
                    <th>IMPACT ON DAILY WELL-BEING</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Children &amp; Youth</td>
                    <td>Academic competition &amp; continuous screen time</td>
                    <td>Reduced attention spans &amp; social fatigue</td>
                  </tr>
                  <tr>
                    <td>Adults &amp; Professionals</td>
                    <td>Fast-paced workplaces &amp; always-on digital culture</td>
                    <td>Burnout &amp; blurred work-life boundaries</td>
                  </tr>
                  <tr>
                    <td>Leaders &amp; Diplomats</td>
                    <td>High-stakes decision making &amp; public scrutiny</td>
                    <td>High stress &amp; isolation at top levels</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="blog-paragraph">
              According to data from the World Health Organization (WHO), nearly 1 billion people globally live with a mental health condition, while depression and anxiety cost the global economy an estimated $1 trillion annually in lost productivity. These metrics show that proactive care is essential for personal and societal growth.
            </p>

            {/* Section 2: Why Mental Strength is Today's Greatest Asset */}
            <h2 className="blog-section-heading">
              WHY MENTAL STRENGTH IS TODAY'S GREATEST ASSET
            </h2>

            <p className="blog-paragraph">
              Digital advancements offer powerful tools to streamline our daily routines, opening up space to focus on holistic health. Prioritizing mental strength transforms how we navigate high-speed environments:
            </p>

            <p className="blog-paragraph blog-list-item">
              <strong>Foundation for Physical Vitality:</strong> Neurological research demonstrates that mind and body operate as an integrated system. Reduced mental stress supports immune performance, cardiovascular health, and restful sleep.
            </p>

            <p className="blog-paragraph blog-list-item">
              <strong>Clarity in a Fast-Paced World:</strong> A balanced mind processes information more effectively, fostering creative problem-solving and intentional decision-making amidst constant digital input.
            </p>

            <p className="blog-paragraph blog-list-item">
              <strong>Sustained Resilience:</strong> Strengthening mental health builds emotional reserves, turning everyday challenges into opportunities for growth.
            </p>

            {/* Section 3: Practical Ways to Reclaim Your Peace */}
            <h2 className="blog-section-heading">
              PRACTICAL WAYS TO RECLAIM YOUR PEACE
            </h2>

            <p className="blog-paragraph">
              Cultivating peace of mind does not require stepping away from modern technology—it simply means integrating mindful habits alongside digital tools:
            </p>

            <p className="blog-paragraph blog-list-item">
              <strong>Practice Intentional Unplugging:</strong> Allocate 30 to 60 minutes each day away from screens to ground yourself in physical movement, reading, or nature.
            </p>

            <p className="blog-paragraph blog-list-item">
              <strong>Prioritize Mindful Routines:</strong> Brief daily practices like deep breathing, meditation, or light physical exercise significantly lower stress indicators.
            </p>

            <p className="blog-paragraph blog-list-item">
              <strong>Normalize Open Conversations:</strong> Treat mental well-being as a standard topic of health. Sharing experiences builds supportive, empathetic communities.
            </p>

            <p className="blog-paragraph blog-concluding-paragraph">
              The fast pace of the AI era brings unprecedented potential. By placing mental wellness at the top of our priorities, we ensure that technological progress goes hand-in-hand with genuine human fulfillment.
            </p>
          </article>
        </div>
      </main>
    </div>
  );
}
