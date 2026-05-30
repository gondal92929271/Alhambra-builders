const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { sendQuoteEmail, sendContactEmail, sendConfirmationEmail } = require('./config/emailService');
require('dotenv').config();

// Initialize express app
const app = express();

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Alhamra Builders - Home' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Us - Alhamra Builders' });
});

app.get('/services', (req, res) => {
  res.render('services', { title: 'Our Services - Alhamra Builders' });
});

app.get('/projects', (req, res) => {
  res.render('projects', { title: 'Our Projects - Alhamra Builders' });
});

app.get('/testimonials', (req, res) => {
  res.render('testimonials', { title: 'Testimonials - Alhamra Builders' });
});

app.get('/eco4', (req, res) => {
  res.render('eco4', { title: 'ECO4 Grant Info - Alhamra Builders' });
});

app.get('/quote', (req, res) => {
  res.render('quote', { 
    title: 'Request a Quote - Alhamra Builders',
    success: req.query.success === 'true',
    error: req.query.error
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', { 
    title: 'Contact Us - Alhamra Builders',
    success: req.query.success === 'true',
    error: req.query.error
  });
});

app.get('/blog', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const blogsPerPage = 6;
  
  // All blog posts data
  const allBlogs = [
    // Page 1 blogs
    {
      id: 1,
      title: "Planning Your Home Extension: A Comprehensive Guide",
      excerpt: "Thinking about extending your home? Our comprehensive guide covers everything from initial planning and budgeting to choosing the right design and navigating planning permissions.",
      content: "Planning a home extension is one of the most effective ways to add value and space to your property...",
      date: "May 15, 2025",
      image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&h=600&fit=crop",
      slug: "planning-home-extension-guide"
    },
    {
      id: 2,
      title: "ECO4 Grants Explained: Are You Eligible?",
      excerpt: "The ECO4 scheme offers significant funding for energy efficiency improvements, but understanding eligibility can be confusing. We break down the criteria and explain how to check if you qualify.",
      content: "The ECO4 scheme is a government initiative designed to help reduce carbon emissions...",
      date: "April 28, 2025",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      slug: "eco4-grants-eligibility-explained"
    },
    {
      id: 3,
      title: "Top Kitchen Renovation Trends for 2025",
      excerpt: "Looking to update your kitchen? Discover the latest trends in kitchen design, from sustainable materials and smart appliances to innovative storage solutions and color schemes.",
      content: "Kitchen renovation trends for 2025 focus on sustainability, technology, and functionality...",
      date: "April 10, 2025",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
      slug: "kitchen-renovation-trends-2025"
    },
    {
      id: 4,
      title: "Maximizing Space with Loft Conversions: Types and Benefits",
      excerpt: "A loft conversion is one of the most cost-effective ways to add living space to your home. We explore different types of conversions and their benefits for various property styles.",
      content: "Loft conversions are an excellent way to maximize the potential of your home...",
      date: "March 22, 2025",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      slug: "loft-conversions-types-benefits"
    },
    {
      id: 5,
      title: "Navigating Planning Permission in Manchester: What You Need to Know",
      excerpt: "Understanding local planning regulations is crucial for any home improvement project. Our guide explains the planning process in Manchester and how to increase your chances of approval.",
      content: "Planning permission in Manchester can seem daunting, but understanding the process...",
      date: "March 5, 2025",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
      slug: "manchester-planning-permission-guide"
    },
    {
      id: 6,
      title: "Sustainable Building Practices for Modern Homes",
      excerpt: "Sustainability is increasingly important in construction. Learn about eco-friendly building materials, energy-efficient designs, and how to reduce the environmental impact of your home improvement project.",
      content: "Sustainable building practices are no longer just a trend but a necessity...",
      date: "February 18, 2025",
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop",
      slug: "sustainable-building-practices"
    },
    // Page 2 blogs
    {
      id: 7,
      title: "Understanding Building Regulations for Home Extensions",
      excerpt: "Building regulations ensure your extension is safe and compliant. Learn about the key requirements and how to ensure your project meets all necessary standards.",
      content: "Building regulations are a set of standards that ensure the health and safety...",
      date: "February 5, 2025",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop",
      slug: "building-regulations-home-extensions"
    },
    {
      id: 8,
      title: "The Ultimate Guide to Bathroom Renovations",
      excerpt: "Transform your bathroom into a modern sanctuary. Our guide covers design trends, space optimization, and essential considerations for a successful renovation.",
      content: "Bathroom renovations can completely transform your daily routine and add significant value...",
      date: "January 22, 2025",
      image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=600&fit=crop",
      slug: "ultimate-bathroom-renovation-guide"
    },
    {
      id: 9,
      title: "Smart Home Technology Integration During Construction",
      excerpt: "Future-proof your home with smart technology. Learn how to integrate modern systems during your construction or renovation project for maximum efficiency.",
      content: "Smart home technology is revolutionizing how we interact with our living spaces...",
      date: "January 8, 2025",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop",
      slug: "smart-home-technology-integration"
    },
    {
      id: 10,
      title: "Cost-Effective Ways to Add Value to Your Property",
      excerpt: "Maximize your property investment with strategic improvements. Discover which renovations offer the best return on investment and how to prioritize your projects.",
      content: "Adding value to your property doesn't always require major renovations...",
      date: "December 20, 2024",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
      slug: "cost-effective-property-value-improvements"
    },
    {
      id: 11,
      title: "Winter Construction: Challenges and Solutions",
      excerpt: "Building during winter months presents unique challenges. Learn how professional builders overcome weather-related obstacles and maintain project timelines.",
      content: "Winter construction requires careful planning and specialized techniques...",
      date: "December 5, 2024",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      slug: "winter-construction-challenges-solutions"
    },
    {
      id: 12,
      title: "Choosing the Right Materials for Your Extension",
      excerpt: "Material selection impacts both aesthetics and durability. Our guide helps you choose the right materials for your extension project, balancing cost, quality, and style.",
      content: "Selecting the right materials is crucial for any successful extension project...",
      date: "November 18, 2024",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
      slug: "choosing-right-materials-extension"
    },
    // Page 3 blogs
    {
      id: 13,
      title: "Energy Efficiency Tips for Older Homes",
      excerpt: "Improve your older home's energy efficiency without compromising its character. Learn about insulation, heating upgrades, and modern solutions for period properties.",
      content: "Older homes have unique charm but often struggle with energy efficiency...",
      date: "November 3, 2024",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
      slug: "energy-efficiency-tips-older-homes"
    },
    {
      id: 14,
      title: "Garden Room Extensions: Bringing the Outdoors In",
      excerpt: "Create a seamless connection between indoor and outdoor living. Explore design ideas and practical considerations for garden room extensions.",
      content: "Garden room extensions are becoming increasingly popular as homeowners...",
      date: "October 20, 2024",
      image: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=800&h=600&fit=crop",
      slug: "garden-room-extensions-design-ideas"
    },
    {
      id: 15,
      title: "Structural Engineering: When Do You Need an Expert?",
      excerpt: "Understanding when to involve structural engineers can save time and money. Learn about load-bearing walls, foundation work, and complex structural modifications.",
      content: "Structural engineering expertise is essential for many home improvement projects...",
      date: "October 5, 2024",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop",
      slug: "when-need-structural-engineer"
    },
    {
      id: 16,
      title: "Maintenance Tips for Your New Extension",
      excerpt: "Protect your investment with proper maintenance. Our guide covers seasonal care, preventive measures, and how to keep your extension looking new for years.",
      content: "Proper maintenance ensures your extension remains in excellent condition...",
      date: "September 22, 2024",
      image: "https://images.unsplash.com/photo-1585128903759-6c924ad1fb9e?w=800&h=600&fit=crop",
      slug: "extension-maintenance-tips"
    },
    {
      id: 17,
      title: "Working with Architects: A Homeowner's Guide",
      excerpt: "Collaborate effectively with architects to bring your vision to life. Learn about the design process, communication tips, and how to get the most from your partnership.",
      content: "Working with an architect is a collaborative process that requires clear communication...",
      date: "September 8, 2024",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      slug: "working-with-architects-guide"
    },
    {
      id: 18,
      title: "Insurance Considerations for Home Extensions",
      excerpt: "Ensure your extension is properly covered. Understand insurance requirements, building coverage, and how to protect your investment during and after construction.",
      content: "Insurance considerations for home extensions are often overlooked...",
      date: "August 25, 2024",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop",
      slug: "insurance-considerations-home-extensions"
    }
  ];
  
  const totalBlogs = allBlogs.length;
  const totalPages = Math.ceil(totalBlogs / blogsPerPage);
  const startIndex = (page - 1) * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;
  const blogsForPage = allBlogs.slice(startIndex, endIndex);
  
  res.render('blog', { 
    title: 'Blog - Alhamra Builders',
    blogs: blogsForPage,
    currentPage: page,
    totalPages: totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1
  });
});

// Individual blog post route
app.get('/blog/:slug', (req, res) => {
  const slug = req.params.slug;
  
  // Get all blog posts data (same as the main blog list)
  const allBlogs = [
    // Page 1 blogs
    {
      id: 1,
      title: "Planning Your Home Extension: A Comprehensive Guide",
      excerpt: "Thinking about extending your home? Our comprehensive guide covers everything from initial planning and budgeting to choosing the right design and navigating planning permissions.",
      content: `
        <p>Planning a home extension is one of the most effective ways to add value and space to your property. Whether you're looking to create more living space for a growing family or add functionality to your home, proper planning is essential for success.</p>
        
        <h3>Initial Considerations</h3>
        <p>Before diving into designs and construction, consider your motivations and long-term goals. Are you extending to accommodate a growing family, create a home office, or increase property value? Understanding your primary objectives will guide every decision throughout the process.</p>
        
        <h3>Budgeting for Your Extension</h3>
        <p>Setting a realistic budget is crucial. Extensions can cost anywhere from £15,000 for a simple single-storey addition to £50,000+ for complex multi-storey projects. Factor in:</p>
        <ul>
          <li>Construction costs</li>
          <li>Planning permission fees</li>
          <li>Architect and engineer fees</li>
          <li>Building control fees</li>
          <li>Contingency fund (10-20% of total budget)</li>
        </ul>
        
        <h3>Design and Planning Permission</h3>
        <p>Work with qualified architects and builders to create designs that complement your existing home. Many extensions fall under permitted development rights, but larger or more complex projects may require full planning permission.</p>
        
        <h3>Choosing the Right Builder</h3>
        <p>Select a builder with extensive experience in home extensions. At Alhamra Builders, we've completed hundreds of successful extension projects across Manchester, ensuring quality workmanship and adherence to timelines.</p>
        
        <h3>Timeline and Project Management</h3>
        <p>Most extensions take 8-16 weeks to complete, depending on size and complexity. Good project management ensures minimal disruption to your daily life while maintaining quality standards.</p>
      `,
      date: "May 15, 2025",
      image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&h=600&fit=crop",
      slug: "planning-home-extension-guide",
      author: "Ahmed Khan",
      category: "Extensions"
    },
    {
      id: 2,
      title: "ECO4 Grants Explained: Are You Eligible?",
      excerpt: "The ECO4 scheme offers significant funding for energy efficiency improvements, but understanding eligibility can be confusing. We break down the criteria and explain how to check if you qualify.",
      content: `
        <p>The ECO4 scheme is a government initiative designed to help reduce carbon emissions and tackle fuel poverty by improving the energy efficiency of homes across the UK. Understanding eligibility criteria can help you access significant funding for home improvements.</p>
        
        <h3>What is ECO4?</h3>
        <p>ECO4 (Energy Company Obligation) is the fourth phase of the government's energy efficiency scheme, running until 2026. It requires large energy suppliers to fund energy efficiency improvements in domestic properties.</p>
        
        <h3>Eligibility Criteria</h3>
        <p>To qualify for ECO4 funding, you typically need to meet one of the following criteria:</p>
        <ul>
          <li>Receiving certain benefits (Housing Benefit, Income Support, etc.)</li>
          <li>Low household income (under £30,000 annually)</li>
          <li>Living in social housing</li>
          <li>Having a property with poor energy efficiency (EPC rating D, E, F, or G)</li>
        </ul>
        
        <h3>Available Improvements</h3>
        <p>ECO4 funding can cover various energy efficiency measures:</p>
        <ul>
          <li>Cavity wall insulation</li>
          <li>Loft insulation</li>
          <li>Solid wall insulation</li>
          <li>Heating system upgrades</li>
          <li>Solar panels and renewable energy systems</li>
        </ul>
        
        <h3>How to Apply</h3>
        <p>At Alhamra Builders, we're approved ECO4 installers and can help you navigate the application process. We'll assess your property, check eligibility, and handle the paperwork on your behalf.</p>
        
        <h3>Benefits of ECO4 Improvements</h3>
        <p>ECO4 improvements can reduce energy bills by up to 40%, improve home comfort, and increase property value. Most measures come with long-term warranties and require minimal maintenance.</p>
      `,
      date: "April 28, 2025",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      slug: "eco4-grants-eligibility-explained",
      author: "Sarah Johnson",
      category: "Energy Efficiency"
    },
    {
      id: 3,
      title: "Top Kitchen Renovation Trends for 2025",
      excerpt: "Looking to update your kitchen? Discover the latest trends in kitchen design, from sustainable materials and smart appliances to innovative storage solutions and color schemes.",
      content: `
        <p>Kitchen renovation trends for 2025 focus on sustainability, technology, and functionality. Modern kitchens are becoming the heart of the home, combining cooking, dining, and entertaining spaces in innovative ways.</p>
        
        <h3>Sustainable Materials</h3>
        <p>Eco-friendly materials are at the forefront of kitchen design. Recycled countertops, bamboo cabinetry, and reclaimed wood elements create beautiful, environmentally conscious spaces that reduce your home's carbon footprint.</p>
        
        <h3>Smart Appliances and Technology</h3>
        <p>Integration of smart technology continues to revolutionize kitchen functionality:</p>
        <ul>
          <li>Voice-controlled lighting and temperature</li>
          <li>Smart refrigerators with internal cameras</li>
          <li>Induction cooktops with precision temperature control</li>
          <li>Connected dishwashers and ovens</li>
        </ul>
        
        <h3>Color Schemes and Aesthetics</h3>
        <p>2025 trends favor warm, earthy tones combined with bold accent colors. Deep greens, rich blues, and warm terracotta create inviting spaces, while brass and copper fixtures add luxury touches.</p>
        
        <h3>Storage Innovation</h3>
        <p>Maximizing storage without compromising style is key. Hidden pantries, pull-out drawers, and multi-functional islands provide ample storage while maintaining clean lines and uncluttered surfaces.</p>
      `,
      date: "April 10, 2025",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
      slug: "kitchen-renovation-trends-2025",
      author: "Emma Williams",
      category: "Renovations"
    },
    {
      id: 4,
      title: "Maximizing Space with Loft Conversions: Types and Benefits",
      excerpt: "A loft conversion is one of the most cost-effective ways to add living space to your home. We explore different types of conversions and their benefits for various property styles.",
      content: `
        <p>Loft conversions are an excellent way to maximize the potential of your home without extending your property's footprint. They offer significant value addition while creating versatile living spaces tailored to your family's needs.</p>
        
        <h3>Types of Loft Conversions</h3>
        <p>Understanding different conversion types helps you choose the best option for your property:</p>
        <ul>
          <li><strong>Roof Light Conversion:</strong> The most cost-effective option, using existing roof space with minimal structural changes</li>
          <li><strong>Dormer Conversion:</strong> Adds headroom and floor space with structural extensions</li>
          <li><strong>Hip-to-Gable:</strong> Ideal for semi-detached houses, extending the roof to create more space</li>
          <li><strong>Mansard Conversion:</strong> Maximum space creation with flat roof and angled sides</li>
        </ul>
        
        <h3>Planning and Permissions</h3>
        <p>Most loft conversions fall under permitted development rights, but some may require planning permission. Building regulations approval is always necessary to ensure safety and compliance.</p>
        
        <h3>Cost Considerations</h3>
        <p>Loft conversions typically cost between £20,000 and £60,000, depending on complexity and finishes. The investment often adds 10-20% to your property value, making it an excellent return on investment.</p>
        
        <h3>Design Possibilities</h3>
        <p>Loft spaces can be transformed into bedrooms, home offices, studios, or entertainment areas. Clever design maximizes natural light and creates comfortable, functional environments.</p>
      `,
      date: "March 22, 2025",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      slug: "loft-conversions-types-benefits",
      author: "David Thompson",
      category: "Extensions"
    },
    {
      id: 5,
      title: "Navigating Planning Permission in Manchester: What You Need to Know",
      excerpt: "Understanding local planning regulations is crucial for any home improvement project. Our guide explains the planning process in Manchester and how to increase your chances of approval.",
      content: `
        <p>Planning permission in Manchester can seem daunting, but understanding the process and local requirements significantly improves your chances of approval. Manchester City Council has specific guidelines that affect how you can modify your property.</p>
        
        <h3>When Do You Need Planning Permission?</h3>
        <p>Not all home improvements require planning permission. Permitted development rights allow certain changes without formal applications. However, you'll need permission for:</p>
        <ul>
          <li>Large extensions exceeding permitted development limits</li>
          <li>New builds or significant structural changes</li>
          <li>Properties in conservation areas</li>
          <li>Listed buildings</li>
          <li>Changes affecting neighbors or public areas</li>
        </ul>
        
        <h3>Manchester-Specific Considerations</h3>
        <p>Manchester has unique planning policies considering the city's heritage, density, and development goals. Understanding local character areas and design guidelines is crucial for successful applications.</p>
        
        <h3>The Application Process</h3>
        <p>A successful planning application requires detailed drawings, supporting documents, and clear demonstration of how your project fits local planning policies. Professional architects familiar with Manchester's requirements can significantly improve approval chances.</p>
        
        <h3>Tips for Success</h3>
        <p>Engage with neighbors early, research local precedents, and consider the impact on the area's character. Pre-application advice from the council can identify potential issues before formal submission.</p>
      `,
      date: "March 5, 2025",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
      slug: "manchester-planning-permission-guide",
      author: "James Mitchell",
      category: "Planning"
    },
    {
      id: 6,
      title: "Sustainable Building Practices for Modern Homes",
      excerpt: "Sustainability is increasingly important in construction. Learn about eco-friendly building materials, energy-efficient designs, and how to reduce the environmental impact of your home improvement project.",
      content: `
        <p>Sustainable building practices are no longer just a trend but a necessity for responsible construction. Modern homes can achieve excellent environmental performance while maintaining comfort, aesthetics, and functionality.</p>
        
        <h3>Eco-Friendly Materials</h3>
        <p>Choosing sustainable materials reduces environmental impact and often provides superior performance:</p>
        <ul>
          <li>Reclaimed timber for structural and decorative elements</li>
          <li>Recycled steel and aluminum for frameworks</li>
          <li>Natural insulation materials like wool and hemp</li>
          <li>Low-impact concrete alternatives</li>
          <li>Locally sourced materials to reduce transport emissions</li>
        </ul>
        
        <h3>Energy Efficiency Design</h3>
        <p>Passive design principles maximize natural heating, cooling, and lighting. Proper orientation, insulation, and ventilation reduce energy consumption while improving comfort.</p>
        
        <h3>Renewable Energy Integration</h3>
        <p>Solar panels, heat pumps, and other renewable technologies make homes energy-positive. Government incentives and reducing technology costs make renewable integration increasingly attractive.</p>
        
        <h3>Water Conservation</h3>
        <p>Rainwater harvesting, greywater systems, and efficient fixtures significantly reduce water consumption. These systems often pay for themselves through reduced utility bills.</p>
        
        <h3>Long-term Benefits</h3>
        <p>Sustainable building practices reduce operating costs, improve indoor air quality, and increase property values. They also contribute to broader environmental goals and climate change mitigation.</p>
      `,
      date: "February 18, 2025",
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop",
      slug: "sustainable-building-practices",
      author: "Lisa Green",
      category: "Construction Tips"
    },
    // Page 2 blogs
    {
      id: 7,
      title: "Understanding Building Regulations for Home Extensions",
      excerpt: "Building regulations ensure your extension is safe and compliant. Learn about the key requirements and how to ensure your project meets all necessary standards.",
      content: `
        <p>Building regulations are a set of standards that ensure the health and safety of people in and around buildings. For home extensions, compliance is mandatory and covers structural integrity, fire safety, insulation, and accessibility.</p>
        
        <h3>Key Areas Covered by Building Regulations</h3>
        <p>Building regulations cover several critical aspects of construction:</p>
        <ul>
          <li>Structural safety and load-bearing calculations</li>
          <li>Fire safety measures and escape routes</li>
          <li>Thermal efficiency and insulation standards</li>
          <li>Ventilation and air quality requirements</li>
          <li>Electrical safety and installation standards</li>
          <li>Accessibility and mobility considerations</li>
        </ul>
        
        <h3>The Approval Process</h3>
        <p>Building control approval involves submitting detailed plans and specifications before construction begins. Inspections occur at key stages to ensure compliance with approved plans and regulations.</p>
        
        <h3>Common Compliance Issues</h3>
        <p>Many projects face delays due to inadequate insulation, incorrect structural calculations, or insufficient fire safety measures. Professional design and experienced builders help avoid these pitfalls.</p>
        
        <h3>Working with Building Control</h3>
        <p>Building control officers are there to help ensure your project meets standards. Early engagement and clear communication prevent issues and ensure smooth project progression.</p>
      `,
      date: "February 5, 2025",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop",
      slug: "building-regulations-home-extensions",
      author: "Michael Roberts",
      category: "Planning"
    },
    {
      id: 8,
      title: "The Ultimate Guide to Bathroom Renovations",
      excerpt: "Transform your bathroom into a modern sanctuary. Our guide covers design trends, space optimization, and essential considerations for a successful renovation.",
      content: `
        <p>Bathroom renovations can completely transform your daily routine and add significant value to your home. Whether you're updating a small powder room or creating a luxurious master suite, careful planning ensures outstanding results.</p>
        
        <h3>Planning Your Layout</h3>
        <p>Efficient layout design maximizes functionality in any space. Consider workflow between fixtures, storage needs, and accessibility requirements. Sometimes small changes in layout create dramatic improvements in usability.</p>
        
        <h3>Modern Design Trends</h3>
        <p>Contemporary bathroom design emphasizes clean lines, natural materials, and spa-like atmospheres:</p>
        <ul>
          <li>Walk-in showers with rainfall heads</li>
          <li>Floating vanities for visual space</li>
          <li>Natural stone and wood textures</li>
          <li>Smart fixtures and LED lighting</li>
          <li>Heated floors and towel warmers</li>
        </ul>
        
        <h3>Budget Considerations</h3>
        <p>Bathroom renovations range from £5,000 for basic updates to £25,000+ for luxury makeovers. Prioritize essential improvements first, then add luxury features as budget allows.</p>
        
        <h3>Technical Requirements</h3>
        <p>Bathrooms require specialized plumbing, electrical, and ventilation systems. Professional installation ensures safety, compliance, and long-term reliability of all systems.</p>
      `,
      date: "January 22, 2025",
      image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=600&fit=crop",
      slug: "ultimate-bathroom-renovation-guide",
      author: "Sophie Clarke",
      category: "Renovations"
    },
    {
      id: 9,
      title: "Smart Home Technology Integration During Construction",
      excerpt: "Future-proof your home with smart technology. Learn how to integrate modern systems during your construction or renovation project for maximum efficiency.",
      content: `
        <p>Smart home technology is revolutionizing how we interact with our living spaces. Integrating these systems during construction or renovation is more cost-effective and provides better performance than retrofitting.</p>
        
        <h3>Essential Smart Home Systems</h3>
        <p>Core smart home technologies provide the foundation for advanced automation:</p>
        <ul>
          <li>Central hub systems for device coordination</li>
          <li>Smart lighting with automated controls</li>
          <li>Climate control and heating optimization</li>
          <li>Security systems with remote monitoring</li>
          <li>Audio-visual integration throughout the home</li>
        </ul>
        
        <h3>Infrastructure Planning</h3>
        <p>Proper wiring and network infrastructure support current and future smart devices. Structured cabling, robust Wi-Fi coverage, and adequate power supply are essential foundations.</p>
        
        <h3>Energy Management</h3>
        <p>Smart energy systems monitor and optimize consumption, reducing bills and environmental impact. Solar integration, battery storage, and smart meters provide comprehensive energy management.</p>
        
        <h3>Future-Proofing Strategies</h3>
        <p>Technology evolves rapidly, so flexible infrastructure accommodates future upgrades. Modular systems and open standards ensure your smart home remains current and functional.</p>
      `,
      date: "January 8, 2025",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop",
      slug: "smart-home-technology-integration",
      author: "Tom Anderson",
      category: "Construction Tips"
    },
    {
      id: 10,
      title: "Cost-Effective Ways to Add Value to Your Property",
      excerpt: "Maximize your property investment with strategic improvements. Discover which renovations offer the best return on investment and how to prioritize your projects.",
      content: `
        <p>Adding value to your property doesn't always require major renovations. Strategic improvements can significantly increase your home's worth while enhancing your living experience.</p>
        
        <h3>High-Impact, Low-Cost Improvements</h3>
        <p>Some improvements offer exceptional return on investment:</p>
        <ul>
          <li>Fresh paint in neutral, contemporary colors</li>
          <li>Updated kitchen hardware and fixtures</li>
          <li>Improved lighting throughout the home</li>
          <li>Landscaping and curb appeal enhancements</li>
          <li>Energy efficiency upgrades</li>
        </ul>
        
        <h3>Major Value-Adding Projects</h3>
        <p>Larger investments can provide substantial returns when done correctly. Kitchen renovations, bathroom updates, and extensions typically offer good value if properly executed.</p>
        
        <h3>Market Research and Timing</h3>
        <p>Understanding your local market helps prioritize improvements. Research comparable properties and current buyer preferences to guide investment decisions.</p>
        
        <h3>Professional vs. DIY</h3>
        <p>While some improvements suit DIY approaches, others require professional expertise. Electrical, plumbing, and structural work should always involve qualified professionals.</p>
      `,
      date: "December 20, 2024",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
      slug: "cost-effective-property-value-improvements",
      author: "Rachel Turner",
      category: "Renovations"
    },
    {
      id: 11,
      title: "Winter Construction: Challenges and Solutions",
      excerpt: "Building during winter months presents unique challenges. Learn how professional builders overcome weather-related obstacles and maintain project timelines.",
      content: `
        <p>Winter construction requires careful planning and specialized techniques to overcome weather-related challenges. With proper preparation, projects can proceed successfully even in harsh conditions.</p>
        
        <h3>Weather-Related Challenges</h3>
        <p>Winter construction faces several unique obstacles:</p>
        <ul>
          <li>Temperature effects on materials and curing</li>
          <li>Reduced daylight hours limiting work time</li>
          <li>Ground freezing affecting excavation</li>
          <li>Precipitation creating safety and quality issues</li>
          <li>Material delivery and storage complications</li>
        </ul>
        
        <h3>Protective Measures</h3>
        <p>Professional builders use various strategies to maintain quality and safety during winter construction. Temporary enclosures, heating systems, and weather monitoring ensure projects proceed safely.</p>
        
        <h3>Material Considerations</h3>
        <p>Some materials require special handling in cold weather. Concrete work needs heating and curing protection, while other materials may require temperature-controlled storage.</p>
        
        <h3>Benefits of Winter Construction</h3>
        <p>Winter projects often have advantages including better contractor availability, potentially lower costs, and completion for spring enjoyment.</p>
      `,
      date: "December 5, 2024",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      slug: "winter-construction-challenges-solutions",
      author: "Mark Johnson",
      category: "Construction Tips"
    },
    {
      id: 12,
      title: "Choosing the Right Materials for Your Extension",
      excerpt: "Material selection impacts both aesthetics and durability. Our guide helps you choose the right materials for your extension project, balancing cost, quality, and style.",
      content: `
        <p>Selecting the right materials is crucial for any successful extension project. The choices you make affect not only the appearance but also the durability, maintenance requirements, and overall value of your investment.</p>
        
        <h3>Structural Materials</h3>
        <p>Foundation and framing materials must provide long-term stability and performance:</p>
        <ul>
          <li>Concrete and steel for foundations and structural elements</li>
          <li>Timber framing for traditional and modern applications</li>
          <li>Masonry materials for walls and decorative elements</li>
          <li>Engineered materials for enhanced performance</li>
        </ul>
        
        <h3>External Finishes</h3>
        <p>External materials must withstand weather while complementing your existing home. Brick, render, timber cladding, and modern composite materials each offer distinct advantages.</p>
        
        <h3>Insulation and Performance</h3>
        <p>Modern insulation materials dramatically improve energy efficiency and comfort. Choose materials that provide excellent thermal performance while meeting building regulations.</p>
        
        <h3>Cost vs. Quality Balance</h3>
        <p>Balancing upfront costs with long-term performance ensures the best value. Sometimes spending more initially on quality materials saves money through reduced maintenance and improved durability.</p>
      `,
      date: "November 18, 2024",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
      slug: "choosing-right-materials-extension",
      author: "Anna Wilson",
      category: "Construction Tips"
    },
    // Page 3 blogs
    {
      id: 13,
      title: "Energy Efficiency Tips for Older Homes",
      excerpt: "Improve your older home's energy efficiency without compromising its character. Learn about insulation, heating upgrades, and modern solutions for period properties.",
      content: `
        <p>Older homes have unique charm but often struggle with energy efficiency. Modern solutions can dramatically improve performance while preserving character and historical value.</p>
        
        <h3>Insulation Strategies</h3>
        <p>Effective insulation is crucial for energy efficiency in older homes:</p>
        <ul>
          <li>Loft insulation for significant heat loss reduction</li>
          <li>Cavity wall insulation where suitable</li>
          <li>Internal or external wall insulation for solid walls</li>
          <li>Floor insulation to reduce heat loss</li>
          <li>Draught-proofing around windows and doors</li>
        </ul>
        
        <h3>Heating System Upgrades</h3>
        <p>Modern heating systems provide better efficiency and control. Heat pumps, condensing boilers, and smart controls can significantly reduce energy consumption.</p>
        
        <h3>Window and Door Improvements</h3>
        <p>Upgrading windows and doors improves thermal performance and security. Secondary glazing and careful restoration can enhance efficiency while preserving character.</p>
        
        <h3>Preserving Character</h3>
        <p>Energy improvements should complement rather than compromise your home's character. Sympathetic materials and traditional techniques maintain authenticity while improving performance.</p>
      `,
      date: "November 3, 2024",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
      slug: "energy-efficiency-tips-older-homes",
      author: "Peter Davis",
      category: "Energy Efficiency"
    },
    {
      id: 14,
      title: "Garden Room Extensions: Bringing the Outdoors In",
      excerpt: "Create a seamless connection between indoor and outdoor living. Explore design ideas and practical considerations for garden room extensions.",
      content: `
        <p>Garden room extensions are becoming increasingly popular as homeowners seek to maximize their connection with outdoor spaces. These versatile additions provide year-round enjoyment of garden views and natural light.</p>
        
        <h3>Design Principles</h3>
        <p>Successful garden rooms blur the boundaries between inside and outside:</p>
        <ul>
          <li>Large glazed areas for maximum natural light</li>
          <li>Sliding or folding doors opening to the garden</li>
          <li>Natural materials reflecting outdoor environments</li>
          <li>Flexible layouts accommodating various activities</li>
          <li>Integration with existing landscape design</li>
        </ul>
        
        <h3>Construction Considerations</h3>
        <p>Garden rooms require careful attention to thermal performance, ventilation, and weather protection. Proper design ensures comfort throughout the year.</p>
        
        <h3>Planning and Permissions</h3>
        <p>Many garden rooms fall under permitted development rights, but larger structures may require planning permission. Consider neighbor impact and local planning policies.</p>
        
        <h3>Multiple Uses</h3>
        <p>Garden rooms can serve as dining areas, home offices, studios, or entertainment spaces. Flexible design accommodates changing needs over time.</p>
      `,
      date: "October 20, 2024",
      image: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=800&h=600&fit=crop",
      slug: "garden-room-extensions-design-ideas",
      author: "Helen Taylor",
      category: "Extensions"
    },
    {
      id: 15,
      title: "Structural Engineering: When Do You Need an Expert?",
      excerpt: "Understanding when to involve structural engineers can save time and money. Learn about load-bearing walls, foundation work, and complex structural modifications.",
      content: `
        <p>Structural engineering expertise is essential for many home improvement projects. Understanding when to involve a structural engineer can prevent costly mistakes and ensure safety.</p>
        
        <h3>When Structural Engineering is Required</h3>
        <p>Certain projects always require structural engineering input:</p>
        <ul>
          <li>Removing or modifying load-bearing walls</li>
          <li>Foundation work and underpinning</li>
          <li>Large beam installations and steel work</li>
          <li>Multi-storey extensions and loft conversions</li>
          <li>Buildings with structural problems or defects</li>
        </ul>
        
        <h3>The Structural Design Process</h3>
        <p>Structural engineers analyze loads, calculate requirements, and design solutions that ensure safety while meeting architectural requirements. Their work forms the basis for building control approval.</p>
        
        <h3>Cost Considerations</h3>
        <p>While structural engineering fees represent additional cost, they often save money by optimizing designs and preventing over-engineering. Proper structural design also ensures insurance validity.</p>
        
        <h3>Choosing the Right Engineer</h3>
        <p>Select engineers with relevant experience and proper qualifications. Chartered engineers provide professional indemnity insurance and follow strict professional standards.</p>
      `,
      date: "October 5, 2024",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop",
      slug: "when-need-structural-engineer",
      author: "Robert Brown",
      category: "Planning"
    },
    {
      id: 16,
      title: "Maintenance Tips for Your New Extension",
      excerpt: "Protect your investment with proper maintenance. Our guide covers seasonal care, preventive measures, and how to keep your extension looking new for years.",
      content: `
        <p>Proper maintenance ensures your extension remains in excellent condition for years to come. Regular care prevents small issues from becoming major problems and protects your investment.</p>
        
        <h3>Seasonal Maintenance Schedule</h3>
        <p>Different seasons require specific maintenance activities:</p>
        <ul>
          <li><strong>Spring:</strong> Check for winter damage, clean gutters, inspect seals</li>
          <li><strong>Summer:</strong> External painting, window maintenance, garden care</li>
          <li><strong>Autumn:</strong> Gutter clearing, heating system servicing, weatherproofing</li>
          <li><strong>Winter:</strong> Monitor for condensation, check insulation, protect pipes</li>
        </ul>
        
        <h3>Preventive Measures</h3>
        <p>Regular inspections and prompt attention to minor issues prevent costly repairs. Keep records of maintenance activities and warranty information.</p>
        
        <h3>Professional Servicing</h3>
        <p>Some maintenance requires professional attention. Annual servicing of heating systems, electrical inspections, and structural checks ensure continued safety and performance.</p>
        
        <h3>Long-term Care</h3>
        <p>Plan for major maintenance cycles including external redecoration, roof maintenance, and equipment replacement. Budgeting for these items prevents surprise expenses.</p>
      `,
      date: "September 22, 2024",
      image: "https://images.unsplash.com/photo-1585128903759-6c924ad1fb9e?w=800&h=600&fit=crop",
      slug: "extension-maintenance-tips",
      author: "Jennifer White",
      category: "Construction Tips"
    },
    {
      id: 17,
      title: "Working with Architects: A Homeowner's Guide",
      excerpt: "Collaborate effectively with architects to bring your vision to life. Learn about the design process, communication tips, and how to get the most from your partnership.",
      content: `
        <p>Working with an architect is a collaborative process that requires clear communication and mutual understanding. The right partnership transforms your vision into a functional, beautiful reality.</p>
        
        <h3>Choosing the Right Architect</h3>
        <p>Select architects based on relevant experience, design style compatibility, and professional qualifications. Review their portfolio and speak with previous clients about their experience.</p>
        
        <h3>The Design Process</h3>
        <p>Architectural design typically follows distinct phases:</p>
        <ul>
          <li>Initial consultation and brief development</li>
          <li>Concept design and feasibility studies</li>
          <li>Detailed design and planning applications</li>
          <li>Technical design and building regulations</li>
          <li>Construction administration and project oversight</li>
        </ul>
        
        <h3>Effective Communication</h3>
        <p>Clear communication ensures your vision is understood and realized. Provide detailed briefs, ask questions, and maintain regular contact throughout the design process.</p>
        
        <h3>Budget Management</h3>
        <p>Architects help manage costs through value engineering and specification choices. Be transparent about budget constraints to enable appropriate design decisions.</p>
      `,
      date: "September 8, 2024",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      slug: "working-with-architects-guide",
      author: "Christopher Lee",
      category: "Planning"
    },
    {
      id: 18,
      title: "Insurance Considerations for Home Extensions",
      excerpt: "Ensure your extension is properly covered. Understand insurance requirements, building coverage, and how to protect your investment during and after construction.",
      content: `
        <p>Insurance considerations for home extensions are often overlooked but are crucial for protecting your investment. Proper coverage during construction and afterward ensures peace of mind.</p>
        
        <h3>Construction Insurance</h3>
        <p>During construction, several insurance types protect against different risks:</p>
        <ul>
          <li>Contract works insurance covering materials and partially completed work</li>
          <li>Public liability insurance protecting against third-party claims</li>
          <li>Employer's liability insurance for worker protection</li>
          <li>Professional indemnity insurance for design and advice</li>
        </ul>
        
        <h3>Home Insurance Updates</h3>
        <p>Notify your home insurer before starting construction work. Extensions increase your property value and may require policy adjustments to ensure adequate coverage.</p>
        
        <h3>Warranty Protection</h3>
        <p>Structural warranties provide long-term protection against defects. Choose builders who offer comprehensive warranties backed by reputable insurance providers.</p>
        
        <h3>Risk Management</h3>
        <p>Proper insurance is part of comprehensive risk management. Work with qualified professionals who carry appropriate insurance and follow industry best practices.</p>
      `,
      date: "August 25, 2024",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop",
      slug: "insurance-considerations-home-extensions",
      author: "Daniel Cooper",
      category: "Planning"
    }
  ];
  
  // Find the blog post by slug
  const post = allBlogs.find(blog => blog.slug === slug);
  
  if (!post) {
    return res.status(404).render('404', { title: 'Blog Post Not Found - Alhamra Builders' });
  }
  
  res.render('blog-detail', { 
    title: `${post.title} - Alhamra Builders Blog`,
    post: post
  });
});

// Handle form submissions
app.post('/submit-contact', async (req, res) => {
  try {
    const formData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone || '',
      subject: req.body.subject || '',
      message: req.body.message
    };

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return res.redirect('/contact?error=missing_fields');
    }

    // Send email to admin
    const adminEmailResult = await sendContactEmail(formData);
    
    if (adminEmailResult.success) {
      // Send confirmation email to customer
      await sendConfirmationEmail(formData.email, formData.name, 'contact');
      res.redirect('/contact?success=true');
    } else {
      console.error('Failed to send contact email:', adminEmailResult.error);
      res.redirect('/contact?error=email_failed');
    }
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.redirect('/contact?error=server_error');
  }
});

app.post('/submit-quote', async (req, res) => {
  try {
    const formData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      project_type: req.body.project_type,
      other_project: req.body.other_project || '',
      project_description: req.body.project_description,
      budget: req.body.budget || '',
      timeframe: req.body.timeframe || '',
      additional_info: req.body.additional_info || '',
      hear_about_us: req.body.hear_about_us || ''
    };

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.address || 
        !formData.project_type || !formData.project_description) {
      return res.redirect('/quote?error=missing_fields');
    }

    // Send email to admin
    const adminEmailResult = await sendQuoteEmail(formData);
    
    if (adminEmailResult.success) {
      // Send confirmation email to customer
      await sendConfirmationEmail(formData.email, formData.name, 'quote');
      res.redirect('/quote?success=true');
    } else {
      console.error('Failed to send quote email:', adminEmailResult.error);
      res.redirect('/quote?error=email_failed');
    }
  } catch (error) {
    console.error('Error processing quote form:', error);
    res.redirect('/quote?error=server_error');
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found - Alhamra Builders' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
app.get('/api/test-email', async (req, res) => {
  try {
    const result = await sendConfirmationEmail(
      process.env.ADMIN_EMAIL,
      'Test User',
      'quote'
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});
