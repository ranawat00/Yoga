import React from 'react';
import './BlogPage.css';

export default function Blog2({ blog }) {
  return (
    <div className="blog-article-container">
      {/* Article Body */}
      <article className="blog-article-body blog-climate-article">
        {/* Main Title */}
        <h1 className="blog-climate-main-title">
          The Time to Act Is Yesterday: Why Climate Change Demands Immediate Collective Action
        </h1>

        {/* Lead Paragraph */}
        <p className="blog-paragraph blog-climate-paragraph blog-climate-lead">
          Climate change is no longer a distant theoretical scenario or a worry reserved for future generations. It is here, unfolding in real time across every continent. From record-shattering heatwaves and erratic monsoon seasons to catastrophic floods and accelerating glacier melt, the signals are unambiguous. The science is settled, the impacts are visible, and the urgency to act grows with every fraction of a degree in global temperature rise.
        </p>

        {/* Section 1 Heading */}
        <h2 className="blog-climate-section-heading">
          The Reality Facing Our Planet
        </h2>

        <p className="blog-paragraph blog-climate-paragraph">
          The warming of the Earth's surface is driven primarily by human activities—specifically the burning of fossil fuels, widespread deforestation, and industrial practices that release massive quantities of greenhouse gases like carbon dioxide and methane into the atmosphere. These gases trap heat that would otherwise escape into space, steadily altering global climate systems.
        </p>

        {/* Section 1 List Points formatted like Blog 3 */}
        <ul className="blog-climate-list">
          <li><strong>Rising Global Temperatures:</strong> Extreme heat records are routinely broken year after year, disrupting ecosystems and threatening public health.</li>
          <li><strong>Extreme Weather Events:</strong> Hurricanes are growing more intense, droughts are lasting longer, and rainfall patterns are shifting unpredictably, compromising food and water security.</li>
          <li><strong>Rising Sea Levels:</strong> Thermal expansion of oceans combined with melting glaciers threatens coastal cities and island nations worldwide.</li>
        </ul>

        {/* Section 2 Heading */}
        <h2 className="blog-climate-section-heading">
          Moving From Awareness to Action
        </h2>

        <p className="blog-paragraph blog-climate-paragraph">
          Understanding the crisis is only the first step; meaningful change requires rapid, structural, and individual responses. Waiting for a perfect global consensus is no longer an option. Every sector of society has a role to play in curbing emissions and building resilience.
        </p>

        {/* Section 2 Subheadings & Paragraphs formatted like Blog 3 */}
        <div className="blog-climate-action-blocks">
          <p className="blog-paragraph blog-climate-paragraph">
            <strong>Accelerating the Clean Energy Transition:</strong> Transitioning away from coal, oil, and gas toward renewable energy sources—such as solar, wind, and geothermal power—is essential to stopping carbon buildup at its source.
          </p>

          <p className="blog-paragraph blog-climate-paragraph">
            <strong>Protecting and Restoring Ecosystems:</strong> Forests, wetlands, and oceans act as natural carbon sinks. Reforestation, stopping illegal deforestation, and preserving coastal mangroves significantly strengthen our planet's ability to absorb excess carbon.
          </p>

          <p className="blog-paragraph blog-climate-paragraph">
            <strong>Rethinking Consumption and Infrastructure:</strong> Sustainable urban planning, electrification of public transit, efficient agriculture, and reducing food waste are high-impact interventions that lower our collective footprint while improving quality of life.
          </p>

          <p className="blog-paragraph blog-climate-paragraph">
            <strong>Holding Systems and Leaders Accountable:</strong> Policy drives scale. Supporting climate-conscious policy, holding corporations accountable for their emissions, and advocating for environmental protection within local communities turns individual concern into systemic change.
          </p>
        </div>

        {/* Concluding Paragraphs & Call to Action */}
        <p className="blog-paragraph blog-climate-paragraph blog-climate-conclusion">
          The window to avoid the most severe consequences of climate change is narrowing, but it remains open. The choices made today will directly define the stability, health, and habitability of our shared planet for decades to come.
        </p>

        <p className="blog-paragraph blog-climate-paragraph blog-climate-cta">
          <strong>Action is no longer optional—it is essential.</strong>
        </p>
      </article>
    </div>
  );
}
