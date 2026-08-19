import React from 'react';
import './BlogPage.css';
import { useApp } from '../../hooks/useApp';
import blog8MiddleImg from '../../assets/blog/blog8_content1.png';
import blog8WorkshopBannerImg from '../../assets/blog/blog8-content.jpg';

export default function Blog8({ blog }) {
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
      <article className="blog-article-body blog-fitness-article">
        {/* Main Title */}
        <h1 className="blog-fitness-main-title">
          Why Nourishment Is Only Half the Equation—And How Yoga Unlocks Complete Fitness
        </h1>

        {/* Lead Paragraph */}
        <p className="blog-paragraph blog-fitness-paragraph blog-fitness-lead">
          It is easy to believe that filling your plate with vibrant, nutrient-dense foods is all it takes to reach optimal health. Clean eating lays a solid foundation, providing clean energy, essential vitamins, and internal cellular repair. However, true fitness requires movement. While a wholesome diet feeds the body, intentional movement conditions it to thrive. Nutrition fuels the engine, but without physical exertion, muscle tone fades, joint mobility tightens, and cardiovascular strength remains untapped. Fitness is dynamic—it is about how gracefully, strongly, and resiliently your body navigates the physical world.
        </p>

        {/* Section 1 Heading */}
        <h2 className="blog-fitness-section-heading">
          Why Movement Bridges the Fitness Gap
        </h2>

        {/* Second Image (blog8_content1.png) */}
        <div className="blog-fitness-middle-img-wrapper">
          <img
            src={blog8MiddleImg}
            alt="Why Movement Bridges the Fitness Gap"
            className="blog-fitness-middle-img"
          />
        </div>

        {/* Section 1 Bullet List */}
        <ul className="blog-fitness-list">
          <li><strong>Builds Functional Strength:</strong> Healthy eating supports muscle health, but resistance and movement build muscle tissue and strengthen bone density.</li>
          <li><strong>Enhances Cardiovascular Vitality:</strong> Physical activity encourages efficient circulation, delivering oxygen and nutrients deeper into your tissues.</li>
          <li><strong>Improves Joint Mobility &amp; Flexibility:</strong> Sustained movement keeps joints lubricated, preventing stiffness and maintaining long-term physical agility.</li>
        </ul>

        {/* Section 2 Heading */}
        <h2 className="blog-fitness-section-heading">
          How Yoga Transforms Your Fitness Journey
        </h2>

        <p className="blog-paragraph blog-fitness-paragraph">
          Rather than viewing exercise as a strenuous task, yoga turns physical activity into an empowering, mindful practice. It creates harmony between nourishment and movement, offering a holistic path to total wellness.
        </p>

        {/* Section 2 Bullet List */}
        <ul className="blog-fitness-list">
          <li><strong>Full-Body Conditioning:</strong> Dynamic yoga flows—such as Sun Salutations (Surya Namaskar)—engage every major muscle group, building functional strength and stamina without jarring impact.</li>
          <li><strong>Mindful Eating Synergy:</strong> Yoga cultivates deep body awareness. As you become more attuned to your physical self on the mat, you naturally align your dietary choices with what truly nourishes your energy levels.</li>
          <li><strong>Stress Reduction &amp; Hormonal Balance:</strong> High cortisol levels from unmanaged stress can stall physical progress regardless of how clean your diet is. The breathwork (Pranayama) and meditative aspects of yoga soothe the nervous system, encouraging recovery and deep rest.</li>
          <li><strong>Sustainable Longevity:</strong> Unlike high-intensity regimens that can lead to burnout or injury, yoga is adaptable for every stage of life, building longevity, balance, and core stability.</li>
        </ul>

        {/* Concluding Paragraph */}
        <p className="blog-paragraph blog-fitness-paragraph blog-fitness-conclusion">
          True fitness is not a choice between clean eating or movement—it is the harmonious integration of both. By pairing your nutritious meals with a consistent yoga practice, you nourish your body inside and out, creating sustainable vitality that lasts a lifetime.
        </p>

        {/* Workshop Banner & Register CTA Card */}
        <div className="blog8-cta-box">
          <div className="blog8-content-img-wrapper">
            <img src={blog8WorkshopBannerImg} alt="Start your Free 5 DAYS ONLINE YOGA WORKSHOP" className="blog8-content-img" />
          </div>
          <button className="blog8-register-btn" onClick={handleRegisterClick}>
            <span>Register Now</span>
            <div className="blog8-btn-arrow">
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
