import blog1Img from '../assets/blog/blog1.jpg';
import blog2Img from '../assets/blog/blog2.jpg';
import blog3Img from '../assets/blog/blog3.jpg';
import blog4Img from '../assets/blog/blog4.jpg';
import blog5Img from '../assets/blog/blog5.jpg';
import blog6Img from '../assets/blog/blog6.jpg';
import blog7Img from '../assets/blog/blog7.jpg';
import blog8Img from '../assets/blog/blog8.jpg';
import blog9Img from '../assets/blog/blog9.jpg';

export const BLOGS_DATA = [
  {
    id: 'mental-health-silent-pandemic',
    title: 'Mental Health - A Silent Pandemic',
    subtitle: 'Nurturing Mental Strength in the Age of Acceleration',
    excerpt: 'We live in an era defined by extraordinary innovation. Artificial Intelligence speeds up our tasks, digital transformation connects us globally in milliseconds, and opportunities to learn and grow are everywhere. Yet, alongside this fast-paced shift to put speed and achievement first, a quiet phenomenon has emerged: the silent pandemic of neglected mental health.',
    image: blog1Img,
    category: 'Mental Wellness',
    readTime: '5 min read',
    type: 'mental-health'
  },
  {
    id: 'climate-change-collective-action',
    title: 'The Time to Act Is Yesterday: Why Climate Change Demands Immediate Collective Action',
    subtitle: 'Why Climate Change Demands Immediate Collective Action',
    excerpt: 'Climate change is no longer a distant theoretical scenario or a worry reserved for future generations. It is here, unfolding in real time across every continent. From record-shattering heatwaves and erratic monsoon seasons to catastrophic floods and accelerating glacier melt, the signals are unambiguous. The science is settled, the impacts are visible, and the urgency to act grows with every fraction of a degree in global temperature rise.',
    image: blog2Img,
    category: 'Environment & Climate',
    readTime: '6 min read',
    type: 'climate-change',
    content: {
      lead: 'Climate change is no longer a distant theoretical scenario or a worry reserved for future generations. It is here, unfolding in real time across every continent. From record-shattering heatwaves and erratic monsoon seasons to catastrophic floods and accelerating glacier melt, the signals are unambiguous. The science is settled, the impacts are visible, and the urgency to act grows with every fraction of a degree in global temperature rise.',
      section1: {
        heading: 'The Reality Facing Our Planet',
        intro: 'The warming of the Earth\'s surface is driven primarily by human activities—specifically the burning of fossil fuels, widespread deforestation, and industrial practices that release massive quantities of greenhouse gases like carbon dioxide and methane into the atmosphere. These gases trap heat that would otherwise escape into space, steadily altering global climate systems.',
        points: [
          {
            boldTitle: 'Rising Global Temperatures',
            description: 'Extreme heat records are routinely broken year after year, disrupting ecosystems and threatening public health.'
          },
          {
            boldTitle: 'Extreme Weather Events',
            description: 'Hurricanes are growing more intense, droughts are lasting longer, and rainfall patterns are shifting unpredictably, compromising food and water security.'
          },
          {
            boldTitle: 'Rising Sea Levels',
            description: 'Thermal expansion of oceans combined with melting glaciers threatens coastal cities and island nations worldwide.'
          }
        ]
      },
      section2: {
        heading: 'Moving From Awareness to Action',
        intro: 'Understanding the crisis is only the first step; meaningful change requires rapid, structural, and individual responses. Waiting for a perfect global consensus is no longer an option. Every sector of society has a role to play in curbing emissions and building resilience.',
        subsections: [
          {
            title: 'Accelerating the Clean Energy Transition',
            description: 'Transitioning away from coal, oil, and gas toward renewable energy sources—such as solar, wind, and geothermal power—is essential to stopping carbon buildup at its source.'
          },
          {
            title: 'Protecting and Restoring Ecosystems',
            description: 'Forests, wetlands, and oceans act as natural carbon sinks. Reforestation, stopping illegal deforestation, and preserving coastal mangroves significantly strengthen our planet\'s ability to absorb excess carbon.'
          },
          {
            title: 'Rethinking Consumption and Infrastructure',
            description: 'Sustainable urban planning, electrification of public transit, efficient agriculture, and reducing food waste are high-impact interventions that lower our collective footprint while improving quality of life.'
          },
          {
            title: 'Holding Systems and Leaders Accountable',
            description: 'Policy drives scale. Supporting climate-conscious policy, holding corporations accountable for their emissions, and advocating for environmental protection within local communities turns individual concern into systemic change.'
          }
        ]
      },
      conclusion: {
        paragraph: 'The window to avoid the most severe consequences of climate change is narrowing, but it remains open. The choices made today will directly define the stability, health, and habitability of our shared planet for decades to come.',
        cta: 'Action is no longer optional—it is essential.'
      }
    }
  },
  {
    id: 'youth-substance-abuse-silent-epidemic',
    title: 'Youth Substance Abuse: A Silent Epidemic',
    subtitle: 'Strengthening Mental Health & Protective Factors in Youth',
    excerpt: 'The teenage and young adult years are a whirlwind of self-discovery, growth, and independence. But alongside the excitement, today\'s youth face unprecedented pressure—from academic expectations to complex family dynamics. Strengthening mental health equips young people with emotional resilience and healthy coping mechanisms.',
    image: blog3Img,
    category: 'Youth & Wellbeing',
    readTime: '5 min read',
    type: 'youth-substance'
  },
  {
    id: 'pcos-is-now-pmos-polyendocrine-metabolic-ovarian-syndrome',
    title: 'PCOS is now PMOS',
    subtitle: 'Polyendocrine Metabolic Ovarian Syndrome: Understanding Terminology & Holistic Care',
    excerpt: 'For decades, millions of women have been diagnosed with PCOS (Polycystic Ovary Syndrome)—a name that often caused confusion. Medical experts have updated the terminology: PCOS is now recognized as PMOS (Polyendocrine Metabolic Ovarian Syndrome).',
    image: blog4Img,
    category: 'Women\'s Health',
    readTime: '5 min read',
    type: 'pcos-pmos'
  },
  {
    id: 'sustainable-soil-management-global-peace',
    title: 'Sustainable Soil Management',
    subtitle: 'Healing the Earth from the Ground Up: Sustainable Soil Management as a Pathway to Global Peace',
    excerpt: 'The foundation of human civilization lies quietly beneath our feet. Healthy soil is not simply dirt; it is a living ecosystem that nurtures agriculture, filters water, and stabilizes global climate systems.',
    image: blog6Img,
    category: 'Soil & Environment',
    readTime: '6 min read',
    type: 'soil-preservation'
  },
  {
    id: 'reclaiming-health-diabetes-surge-yoga',
    title: 'Why Diabetes Is Surging & How Yoga Can Help',
    subtitle: 'Reclaiming Your Health: Why Diabetes Is Surging and How Yoga Can Help',
    excerpt: 'The rise of Type 2 diabetes has become a global epidemic, with millions diagnosed each year, including many younger individuals. Ancient practices like yoga offer a powerful, natural approach for prevention and management.',
    image: blog5Img,
    category: 'Health & Yoga',
    readTime: '6 min read',
    type: 'diabetes-yoga'
  },
  {
    id: 'parental-mental-health-matters-yho',
    title: 'Why Parental Mental Health Matters',
    subtitle: 'Nurturing the Nurturers: Why Parental Mental Health Matters (And How Yoga Healers Organisation Can Help)',
    excerpt: 'In today\'s fast-paced, hyper-connected world, parenting has become more demanding than ever. Between juggling career responsibilities and household logistics, modern parents are often pushed to their limits.',
    image: blog7Img,
    category: 'Parental Wellness',
    readTime: '6 min read',
    type: 'parental-mental-health'
  },
  {
    id: 'nourishment-movement-complete-fitness-yoga',
    title: 'Why Nourishment Is Only Half the Equation',
    subtitle: 'Why Nourishment Is Only Half the Equation—And How Yoga Unlocks Complete Fitness',
    excerpt: 'It is easy to believe that clean eating is all it takes for optimal health. However, true fitness requires movement. Nutrition fuels the engine, but physical movement conditions your body to thrive.',
    image: blog8Img,
    category: 'Fitness & Nutrition',
    readTime: '6 min read',
    type: 'nourishment-fitness'
  },
  {
    id: 'sacred-breath-world-india-capital-yoga',
    title: 'The Sacred Breath of the World',
    subtitle: 'The Sacred Breath of the World: Why India Remains the Global Capital of Yoga and Holistic Healing',
    excerpt: 'Across geography, culture, and background, human beings share the exact same fundamental core: the desire for inner peace, health, and connection. Today, India stands globally recognized as the Yoga Capital of the World.',
    image: blog9Img,
    category: 'Yoga & Global Wellness',
    readTime: '6 min read',
    type: 'india-yoga-capital'
  }
];
