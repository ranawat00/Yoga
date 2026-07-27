const fs = require('fs');
const path = require('path');

const move = (oldPath, newPath) => {
  const fullOld = path.join(__dirname, oldPath);
  const fullNew = path.join(__dirname, newPath);
  if (fs.existsSync(fullOld)) {
    fs.mkdirSync(path.dirname(fullNew), { recursive: true });
    fs.renameSync(fullOld, fullNew);
    console.log('Moved', oldPath, '->', newPath);
  }
};

// Pages
move('src/components/BooksPage', 'src/pages/BooksPage');
move('src/components/ProductsPage', 'src/pages/ProductsPage');
move('src/components/OrdersPage', 'src/pages/OrdersPage');
move('src/components/AboutUs', 'src/pages/AboutUsPage');
move('src/components/Contact', 'src/pages/ContactPage');
move('src/components/Careers', 'src/pages/CareersPage');

// Common
move('src/components/Loader', 'src/components/common/Loader');
move('src/components/Notification', 'src/components/common/Notification');
move('src/components/Preloader', 'src/components/common/Preloader');
move('src/components/Celebration', 'src/components/common/Celebration');
move('src/components/Logo', 'src/components/common/Logo');
move('src/components/MediaLogos', 'src/components/common/MediaLogos');

// Layout
move('src/components/Navbar', 'src/components/layout/Navbar');
move('src/components/Footer', 'src/components/layout/Footer');
move('src/components/CartDrawer', 'src/components/layout/CartDrawer');
move('src/components/ProfileDrawer', 'src/components/layout/ProfileDrawer');
move('src/components/CheckoutModal', 'src/components/layout/CheckoutModal');
move('src/components/AuthModal', 'src/components/layout/AuthModal');

// Features
move('src/components/Hero', 'src/components/features/Hero');
move('src/components/Books', 'src/components/features/Books');
move('src/components/Products', 'src/components/features/Products');
move('src/components/Workshops', 'src/components/features/Workshops');
move('src/components/Verticals', 'src/components/features/Verticals');
move('src/components/Educators', 'src/components/features/Educators');
move('src/components/SuccessStories', 'src/components/features/SuccessStories');
move('src/components/FAQ', 'src/components/features/FAQ');
move('src/components/DailyYogaBanner', 'src/components/features/DailyYogaBanner');
move('src/components/HealthScore', 'src/components/features/HealthScore');
move('src/components/ChatAssistant', 'src/components/features/ChatAssistant');
