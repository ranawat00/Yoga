import React from 'react';
import './BlogPage.css';

export default function Blog4({ blog }) {
  return (
    <div className="blog-article-container">
      {/* Article Body */}
      <article className="blog-article-body blog-pmos-article">
        {/* Lead Paragraphs */}
        <p className="blog-paragraph blog-pmos-paragraph blog-pmos-lead">
          For decades, millions of women have been diagnosed with PCOS (Polycystic Ovary Syndrome)—a name that often caused confusion. Many women were left asking, "If I don't have ovarian cysts, do I really have this condition?"
        </p>

        <p className="blog-paragraph blog-pmos-paragraph">
          To clear up this misunderstanding and better reflect the full scope of what women experience, medical experts have updated the terminology:
        </p>

        <p className="blog-paragraph blog-pmos-paragraph blog-pmos-highlight-box">
          <strong>PCOS is now recognized as PMOS (Polyendocrine Metabolic Ovarian Syndrome).</strong>
        </p>

        <p className="blog-paragraph blog-pmos-paragraph">
          This shift is more than just a name change—it represents a crucial step toward better understanding, clearer diagnoses, and more targeted, holistic care.
        </p>

        {/* Section 1 Heading */}
        <h2 className="blog-pmos-section-heading">
          Key Takeaways
        </h2>

        <ul className="blog-pmos-list">
          <li><strong>A New Name:</strong> PCOS is now referred to as PMOS, which stands for Polyendocrine Metabolic Ovarian Syndrome.</li>
          <li><strong>A Broader Picture:</strong> The new name accurately reflects the condition's multi-system hormonal, metabolic, and ovarian impact.</li>
          <li><strong>Widespread Impact:</strong> PMOS affects roughly 1 in 10 women of reproductive age worldwide.</li>
          <li><strong>Comprehensive Care:</strong> Management continues to focus on balancing hormones, supporting fertility, and improving long-term metabolic health.</li>
        </ul>

        {/* Section 2 Heading */}
        <h2 className="blog-pmos-section-heading">
          Decoding PMOS: What Does the New Name Mean?
        </h2>

        <p className="blog-paragraph blog-pmos-paragraph">
          The shift to <strong>Polyendocrine Metabolic Ovarian Syndrome</strong> gives a far more accurate representation of how this condition affects the body:
        </p>

        <ul className="blog-pmos-list">
          <li><strong>Polyendocrine:</strong> Highlights that multiple hormone systems are involved—including insulin, cortisol, and thyroid hormones—rather than strictly reproductive hormones.</li>
          <li><strong>Metabolic:</strong> Emphasizes the deep connection to metabolic health, including insulin resistance, weight management challenges, and elevated risks for type 2 diabetes and cardiovascular disease.</li>
          <li><strong>Ovarian:</strong> Retains the acknowledgement of the reproductive and ovarian aspects, such as irregular cycles or ovulation challenges, without making "cysts" the sole defining factor.</li>
        </ul>

        <p className="blog-paragraph blog-pmos-paragraph">
          By reframing the condition, <strong>PMOS</strong> removes the misconception that it is purely a gynaecological issue and recognizes it as a systemic health state that deserves whole-body attention.
        </p>

        {/* Section 3 Heading */}
        <h2 className="blog-pmos-section-heading">
          A Positive Path Forward: Empowering Solutions
        </h2>

        <p className="blog-paragraph blog-pmos-paragraph">
          While a diagnosis of PMOS can feel overwhelming, understanding the condition's multi-system nature is actually empowering. Because PMOS touches endocrine, metabolic, and reproductive health, small, positive lifestyle adjustments can yield significant improvements across your entire well-being.
        </p>

        <div className="blog-pmos-subsections">
          <div className="blog-pmos-subsection-item">
            <h3 className="blog-pmos-subheading">Nourish for Metabolic Balance</h3>
            <p className="blog-paragraph blog-pmos-paragraph">
              Focus on stabilizing blood sugar to manage insulin levels. Incorporate whole foods, lean proteins, high-fiber vegetables, and healthy fats while reducing refined sugars and processed carbs.
            </p>
          </div>

          <div className="blog-pmos-subsection-item">
            <h3 className="blog-pmos-subheading">Embrace Consistent, Joyful Movement</h3>
            <p className="blog-paragraph blog-pmos-paragraph">
              Physical activity enhances insulin sensitivity and boosts mood. A mix of strength training, walking, and low-impact exercise (like yoga or Pilates) supports metabolic health without overly spiking stress hormones.
            </p>
          </div>

          <div className="blog-pmos-subsection-item">
            <h3 className="blog-pmos-subheading">Prioritize Stress Management &amp; Sleep</h3>
            <p className="blog-paragraph blog-pmos-paragraph">
              Because the endocrine system is deeply connected to stress, high cortisol can exacerbate PMOS symptoms. Cultivate restorative sleep habits and dedicate time daily to relaxation practices like deep breathing, meditation, or quiet hobbies.
            </p>
          </div>

          <div className="blog-pmos-subsection-item">
            <h3 className="blog-pmos-subheading">Partner with an Integrated Healthcare Team</h3>
            <p className="blog-paragraph blog-pmos-paragraph">
              Effective PMOS care focuses on your personal goals—whether that means regulating your cycle, boosting energy, improving fertility, or protecting long-term heart health. Working with endocrinologists, gynaecologists, and nutritionists ensures a personalized roadmap.
            </p>
          </div>
        </div>

        {/* Concluding Paragraph */}
        <p className="blog-paragraph blog-pmos-paragraph blog-pmos-conclusion">
          <strong>PMOS affects 1 in 10 women</strong>, meaning you are never alone on this journey. The redefinition from PCOS to PMOS is a positive leap forward, giving women and healthcare providers the clarity needed to nurture long-term health, balance, and vitality.
        </p>
      </article>
    </div>
  );
}
