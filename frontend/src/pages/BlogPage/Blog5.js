import React from 'react';
import './BlogPage.css';

export default function Blog5({ blog }) {
  return (
    <div className="blog-article-container">
      {/* Article Body */}
      <article className="blog-article-body blog-soil-article">
        {/* Main Title */}
        <h1 className="blog-soil-main-title">
          Healing the Earth from the Ground Up: Sustainable Soil Management as a Pathway to Global Peace
        </h1>

        {/* Lead Paragraph */}
        <p className="blog-paragraph blog-soil-paragraph blog-soil-lead">
          The foundation of human civilization lies quietly beneath our feet. Healthy soil is not simply dirt; it is a living ecosystem that nurtures agriculture, filters water, and stabilizes global climate systems. As arable land faces rapid degradation worldwide, sustainable soil management has emerged as a global movement—uniting communities, policy leaders, and scientists to stand up for soil health and rebuild organic matter in agricultural lands.
        </p>

        {/* Section 1 Heading */}
        <h2 className="blog-soil-section-heading">
          The Power of Soil Organic Matter
        </h2>

        <p className="blog-paragraph blog-soil-paragraph">
          Increasing organic content in topsoil is one of the most effective, scalable solutions for restoring ecological balance. By integrating practices such as cover cropping, minimal tillage, and organic composting, farmers transform degraded lands into carbon-rich, resilient ecosystems.
        </p>

        <ul className="blog-soil-list">
          <li><strong>Enhanced Water Retention:</strong> Soils rich in organic matter act like natural sponges, reducing drought vulnerability and preventing runaway erosion.</li>
          <li><strong>Nutrient-Dense Food Systems:</strong> Healthy living soil produces crops packed with essential micro-nutrients, directly improving global public health.</li>
          <li><strong>Climate Resilience:</strong> Sequestering atmospheric carbon back into agricultural fields mitigates climate extremes while boosting crop yields.</li>
        </ul>

        {/* Section 2 Heading */}
        <h2 className="blog-soil-section-heading">
          Cultivating Soil Health to Empower Global Peace
        </h2>

        <p className="blog-paragraph blog-soil-paragraph">
          Resource scarcity, topsoil depletion, and food insecurity are key drivers of regional instability and conflict. Restoring the fertility of our lands addresses these root causes directly, establishing a foundation for lasting stability.
        </p>

        {/* Impact Area Table */}
        <div className="blog-soil-table-container">
          <table className="blog-soil-impact-table">
            <thead>
              <tr>
                <th>Impact Area</th>
                <th>How Soil Management Promotes Peace</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="blog-soil-table-impact">Resource Security</td>
                <td>Prevents conflict over shrinking arable land by revitalizing existing agricultural acreage.</td>
              </tr>
              <tr>
                <td className="blog-soil-table-impact">Economic Stability</td>
                <td>Provides smallholder farmers and rural communities with predictable, resilient livelihoods.</td>
              </tr>
              <tr>
                <td className="blog-soil-table-impact">Global Unity</td>
                <td>Creates a shared human purpose - transcending political boundaries to protect a common resource.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 3 Heading */}
        <h2 className="blog-soil-section-heading">
          Actioning Sustainable Policies Across Nations
        </h2>

        <p className="blog-paragraph blog-soil-paragraph">
          A successful shift toward global soil security relies on uniting policy and grassroots action. World leaders and agricultural networks are moving toward key systemic changes:
        </p>

        <div className="blog-soil-policies">
          <p className="blog-paragraph blog-soil-paragraph">
            <strong>Incentivizing Regenerative Practices:</strong> Providing direct subsidies and credit access to farmers who implement soil-building techniques.
          </p>

          <p className="blog-paragraph blog-soil-paragraph">
            <strong>Community-Led Education:</strong> Training localized farming networks in natural composting, crop rotation, and bio-fertilization.
          </p>

          <p className="blog-paragraph blog-soil-paragraph">
            <strong>Global Soil Standards:</strong> Establishing clear, measurable benchmarks for soil organic matter targets across international agricultural trade networks.
          </p>
        </div>

        {/* Concluding Paragraph */}
        <p className="blog-paragraph blog-soil-paragraph blog-soil-conclusion">
          When communities nurture the earth, the earth sustains humanity in return. By prioritizing sustainable soil management today, we secure a stable, peaceful, and abundant world for generations to come.
        </p>
      </article>
    </div>
  );
}
