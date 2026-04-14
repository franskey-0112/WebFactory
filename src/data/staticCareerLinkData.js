// Static data for CareerLink - LinkedIn clone

// Industries
const industries = [
  { id: 'technology', name: 'Technology', icon: '💻' },
  { id: 'finance', name: 'Financial Services', icon: '💰' },
  { id: 'healthcare', name: 'Healthcare', icon: '🏥' },
  { id: 'education', name: 'Education', icon: '🎓' },
  { id: 'consulting', name: 'Management Consulting', icon: '📊' },
  { id: 'media', name: 'Media & Communications', icon: '📺' },
  { id: 'retail', name: 'Retail', icon: '🛍️' },
  { id: 'manufacturing', name: 'Manufacturing', icon: '🏭' },
  { id: 'real-estate', name: 'Real Estate', icon: '🏢' },
  { id: 'automotive', name: 'Automotive', icon: '🚗' },
  { id: 'energy', name: 'Energy & Utilities', icon: '⚡' },
  { id: 'government', name: 'Government', icon: '🏛️' }
];

// Companies
const companies = [
  {
    id: 'google',
    name: 'Google',
    industry: 'technology',
    size: '100,000+ employees',
    headquarters: 'Mountain View, CA',
    founded: 1998,
    website: 'google.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    coverImage: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?w=1200&h=400&fit=crop',
    description: 'Our mission is to organize the world\'s information and make it universally accessible and useful.',
    specialties: ['Search', 'Advertising', 'Cloud Computing', 'Software', 'Hardware'],
    followers: 15200000,
    employees: 156000,
    jobOpenings: 12000,
    about: 'Google\'s mission is to organize the world\'s information and make it universally accessible and useful. Since our founding in 1998, Google has grown by leaps and bounds. From offering search in a single language we now offer dozens of products and services—including various forms of advertising and web applications for all kinds of tasks—in scores of languages. And starting from two computer science students in a university dorm room, we now have thousands of employees and offices around the world.',
    culture: [
      'Innovation at scale',
      'Data-driven decisions',
      'User-focused approach',
      'Collaboration and openness',
      'Bold thinking and moonshots'
    ]
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    industry: 'technology',
    size: '100,000+ employees',
    headquarters: 'Redmond, WA',
    founded: 1975,
    website: 'microsoft.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    coverImage: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?w=1200&h=400&fit=crop',
    description: 'Our mission is to empower every person and every organization on the planet to achieve more.',
    specialties: ['Cloud Computing', 'Productivity Software', 'Operating Systems', 'Gaming', 'AI'],
    followers: 18500000,
    employees: 221000,
    jobOpenings: 8500,
    about: 'Microsoft\'s mission is to empower every person and every organization on the planet to achieve more. We\'re a global technology company that creates products that help people and businesses throughout the world realize their full potential.',
    culture: [
      'Growth mindset',
      'Inclusive culture',
      'Customer obsession',
      'Partner success',
      'One Microsoft'
    ]
  },
  {
    id: 'apple',
    name: 'Apple',
    industry: 'technology',
    size: '100,000+ employees',
    headquarters: 'Cupertino, CA',
    founded: 1976,
    website: 'apple.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    coverImage: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?w=1200&h=400&fit=crop',
    description: 'Apple is dedicated to bringing the best user experience through innovative hardware, software, and services.',
    specialties: ['Consumer Electronics', 'Software', 'Services', 'Design', 'Innovation'],
    followers: 22100000,
    employees: 164000,
    jobOpenings: 3200,
    about: 'Apple is a place where extraordinary people gather to do their best work. Together we create products and experiences people once couldn\'t have imagined — and now can\'t imagine living without.',
    culture: [
      'Think different',
      'Attention to detail',
      'User-centric design',
      'Excellence in execution',
      'Environmental responsibility'
    ]
  },
  {
    id: 'amazon',
    name: 'Amazon',
    industry: 'technology',
    size: '1,000,000+ employees',
    headquarters: 'Seattle, WA',
    founded: 1994,
    website: 'amazon.com',
    logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
    description: 'Earth\'s Most Customer-Centric Company, where customers can find and discover anything they want to buy online.',
    specialties: ['E-commerce', 'Cloud Computing', 'Digital Streaming', 'Artificial Intelligence'],
    followers: 28900000,
    employees: 1540000,
    jobOpenings: 25000,
    about: 'Amazon is guided by four principles: customer obsession rather than competitor focus, passion for invention, commitment to operational excellence, and long-term thinking.',
    culture: [
      'Customer obsession',
      'Ownership',
      'Invent and simplify',
      'Learn and be curious',
      'Think big'
    ]
  },
  {
    id: 'goldman-sachs',
    name: 'Goldman Sachs',
    industry: 'finance',
    size: '10,000-50,000 employees',
    headquarters: 'New York, NY',
    founded: 1869,
    website: 'goldmansachs.com',
    logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=400&fit=crop',
    description: 'A leading global investment banking, securities and investment management firm.',
    specialties: ['Investment Banking', 'Securities', 'Investment Management', 'Consumer Banking'],
    followers: 4200000,
    employees: 49100,
    jobOpenings: 1800,
    about: 'The Goldman Sachs Group, Inc. is a leading global investment banking, securities and investment management firm that provides a wide range of financial services.',
    culture: [
      'Client service',
      'Excellence',
      'Integrity',
      'Innovation',
      'Diversity and inclusion'
    ]
  },
  {
    id: 'mckinsey',
    name: 'McKinsey & Company',
    industry: 'consulting',
    size: '10,000-50,000 employees',
    headquarters: 'New York, NY',
    founded: 1926,
    website: 'mckinsey.com',
    logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=400&fit=crop',
    description: 'A global management consulting firm serving leading businesses, governments, and institutions.',
    specialties: ['Strategy Consulting', 'Operations', 'Organization', 'Technology', 'Implementation'],
    followers: 3800000,
    employees: 38000,
    jobOpenings: 2200,
    about: 'McKinsey & Company is a global management consulting firm committed to helping organizations create positive, enduring change.',
    culture: [
      'Client impact',
      'Professional development',
      'Inclusive culture',
      'Intellectual rigor',
      'Global perspective'
    ]
  },
  
  // Additional Companies
  {
    id: 'netflix',
    name: 'Netflix',
    industry: 'technology',
    size: '10,000-50,000 employees',
    headquarters: 'Los Gatos, CA',
    founded: 1997,
    website: 'netflix.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
    coverImage: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?w=1200&h=400&fit=crop',
    description: 'The world\'s leading streaming entertainment service with over 230 million paid memberships.',
    specialties: ['Streaming', 'Content Creation', 'Technology', 'Data Science', 'Global Distribution'],
    followers: 8900000,
    employees: 12800,
    jobOpenings: 450,
    about: 'Netflix is the world\'s leading streaming entertainment service with 230+ million paid memberships in over 190 countries enjoying TV series, documentaries and feature films.',
    culture: [
      'Freedom and responsibility',
      'Innovation',
      'Inclusion',
      'Passion',
      'Curiosity'
    ]
  },
  {
    id: 'tesla',
    name: 'Tesla',
    industry: 'automotive',
    size: '50,000-100,000 employees',
    headquarters: 'Austin, TX',
    founded: 2003,
    website: 'tesla.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Tesla_T_symbol.svg',
    coverImage: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?w=1200&h=400&fit=crop',
    description: 'Accelerating the world\'s transition to sustainable energy through electric vehicles and clean energy products.',
    specialties: ['Electric Vehicles', 'Energy Storage', 'Solar Energy', 'Autonomous Driving', 'Manufacturing'],
    followers: 12500000,
    employees: 127855,
    jobOpenings: 3200,
    about: 'Tesla\'s mission is to accelerate the world\'s transition to sustainable energy. We design, develop, manufacture and sell high-performance fully electric vehicles.',
    culture: [
      'Innovation',
      'Sustainability',
      'Excellence',
      'Speed',
      'Impact'
    ]
  },
  {
    id: 'uber',
    name: 'Uber Technologies',
    industry: 'technology',
    size: '10,000-50,000 employees',
    headquarters: 'San Francisco, CA',
    founded: 2009,
    website: 'uber.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg',
    coverImage: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?w=1200&h=400&fit=crop',
    description: 'Technology platform that connects drivers and riders, and facilitates food delivery and freight transportation.',
    specialties: ['Ridesharing', 'Food Delivery', 'Freight', 'Technology Platform', 'Mobility'],
    followers: 5200000,
    employees: 32800,
    jobOpenings: 1800,
    about: 'Uber\'s mission is to create opportunity through movement. We started in 2010 to solve a simple problem: how do you get access to a ride at the touch of a button?',
    culture: [
      'We build globally, we live locally',
      'We are customer obsessed',
      'We celebrate differences',
      'We do the right thing',
      'We act like owners'
    ]
  },
  {
    id: 'airbnb',
    name: 'Airbnb',
    industry: 'technology',
    size: '1,000-10,000 employees',
    headquarters: 'San Francisco, CA',
    founded: 2008,
    website: 'airbnb.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg',
    coverImage: 'https://images.pexels.com/photos/574069/pexels-photo-574069.jpeg?w=1200&h=400&fit=crop',
    description: 'Online marketplace for lodging, primarily homestays for vacation rentals, and tourism activities.',
    specialties: ['Travel', 'Hospitality', 'Marketplace', 'Community', 'Experience Platform'],
    followers: 3400000,
    employees: 6800,
    jobOpenings: 320,
    about: 'Airbnb was born in 2007 when two Hosts welcomed three guests to their San Francisco home, and has since grown to over 4 million Hosts.',
    culture: [
      'Belong anywhere',
      'Champion the mission',
      'Be a host',
      'Embrace the adventure',
      'Be a cereal entrepreneur'
    ]
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    industry: 'technology',
    size: '50,000-100,000 employees',
    headquarters: 'San Francisco, CA',
    founded: 1999,
    website: 'salesforce.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg',
    coverImage: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?w=1200&h=400&fit=crop',
    description: 'Global leader in CRM, helping companies connect with customers in a whole new way.',
    specialties: ['CRM', 'Cloud Computing', 'AI', 'Analytics', 'Platform as a Service'],
    followers: 6800000,
    employees: 79390,
    jobOpenings: 2100,
    about: 'Salesforce is the global leader in Customer Relationship Management (CRM), bringing companies and customers together.',
    culture: [
      'Trust',
      'Customer success',
      'Innovation',
      'Equality',
      'Sustainability'
    ]
  },
  {
    id: 'stripe',
    name: 'Stripe',
    industry: 'finance',
    size: '1,000-10,000 employees',
    headquarters: 'San Francisco, CA',
    founded: 2010,
    website: 'stripe.com',
    logo: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?w=200&h=200&fit=crop',
    coverImage: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?w=1200&h=400&fit=crop',
    description: 'Financial infrastructure for the internet, powering online commerce for millions of businesses.',
    specialties: ['Payments', 'Financial Infrastructure', 'APIs', 'E-commerce', 'Fintech'],
    followers: 1200000,
    employees: 8000,
    jobOpenings: 680,
    about: 'Stripe is a technology company that builds economic infrastructure for the internet. Our suite of products powers online commerce.',
    culture: [
      'Move with urgency',
      'Think rigorously',
      'Trust and amplify',
      'Optimize for learning',
      'Global mindset'
    ]
  },
  {
    id: 'zoom',
    name: 'Zoom Video Communications',
    industry: 'technology',
    size: '1,000-10,000 employees',
    headquarters: 'San Jose, CA',
    founded: 2011,
    website: 'zoom.us',
    logo: 'https://images.pexels.com/photos/4050344/pexels-photo-4050344.jpeg?w=200&h=200&fit=crop',
    coverImage: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?w=1200&h=400&fit=crop',
    description: 'Leader in modern enterprise video communications, with a cloud platform for video and audio conferencing.',
    specialties: ['Video Communications', 'Cloud Platform', 'Remote Work', 'Collaboration', 'Enterprise Software'],
    followers: 1800000,
    employees: 8300,
    jobOpenings: 420,
    about: 'Zoom is for you. We help you express ideas, connect to others, and build toward a future limited only by your imagination.',
    culture: [
      'Deliver happiness',
      'Make it easy',
      'Care',
      'Innovation',
      'Security'
    ]
  }
];

// Job Functions
const jobFunctions = [
  { id: 'engineering', name: 'Engineering', icon: '⚙️' },
  { id: 'product', name: 'Product Management', icon: '📱' },
  { id: 'design', name: 'Design', icon: '🎨' },
  { id: 'marketing', name: 'Marketing', icon: '📢' },
  { id: 'sales', name: 'Sales', icon: '💼' },
  { id: 'finance', name: 'Finance', icon: '💰' },
  { id: 'hr', name: 'Human Resources', icon: '👥' },
  { id: 'operations', name: 'Operations', icon: '⚡' },
  { id: 'consulting', name: 'Consulting', icon: '📊' },
  { id: 'research', name: 'Research', icon: '🔬' },
  { id: 'legal', name: 'Legal', icon: '⚖️' },
  { id: 'customer-success', name: 'Customer Success', icon: '🤝' }
];

// Skills
const skills = [
  // Technical Skills
  'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'AWS', 'Machine Learning', 'Data Science',
  'SQL', 'MongoDB', 'Docker', 'Kubernetes', 'Git', 'Agile', 'DevOps', 'REST APIs',
  
  // Business Skills
  'Project Management', 'Strategic Planning', 'Business Analysis', 'Market Research', 'Sales',
  'Marketing', 'Leadership', 'Team Management', 'Communication', 'Negotiation',
  
  // Industry-Specific
  'Financial Modeling', 'Investment Banking', 'Consulting', 'Product Strategy', 'UX Design',
  'Digital Marketing', 'Content Strategy', 'Customer Relations', 'Supply Chain', 'Operations'
];

// Users/Professionals
const users = [
  {
    id: 'sarah-chen',
    firstName: 'Sarah',
    lastName: 'Chen',
    headline: 'Senior Software Engineer at Google | Full-Stack Developer | Tech Lead',
    location: 'San Francisco Bay Area',
    profilePicture: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=400&h=400&fit=crop',
    backgroundImage: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?w=1200&h=400&fit=crop',
    connections: 1250,
    followers: 3200,
    isInfluencer: false,
    isVerified: true,
    currentCompany: 'google',
    currentPosition: 'Senior Software Engineer',
    industry: 'technology',
    summary: 'Passionate full-stack developer with 8+ years of experience building scalable web applications. Currently leading a team of 6 engineers at Google, focusing on search infrastructure and machine learning integration. Strong advocate for clean code, test-driven development, and inclusive engineering culture.',
    experience: [
      {
        id: 'exp-1',
        title: 'Senior Software Engineer',
        company: 'Google',
        companyId: 'google',
        location: 'Mountain View, CA',
        startDate: '2021-03',
        endDate: null,
        current: true,
        description: 'Leading development of search infrastructure improvements, managing a team of 6 engineers, and implementing ML-powered features that serve millions of users daily.'
      },
      {
        id: 'exp-2',
        title: 'Software Engineer',
        company: 'Microsoft',
        companyId: 'microsoft',
        location: 'Seattle, WA',
        startDate: '2018-07',
        endDate: '2021-02',
        current: false,
        description: 'Developed cloud-based solutions for Azure platform, contributing to 25% performance improvement in data processing pipelines.'
      }
    ],
    education: [
      {
        id: 'edu-1',
        school: 'Stanford University',
        degree: 'Master of Science',
        field: 'Computer Science',
        startDate: '2016',
        endDate: '2018',
        grade: '3.8 GPA'
      },
      {
        id: 'edu-2',
        school: 'UC Berkeley',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startDate: '2012',
        endDate: '2016',
        grade: '3.7 GPA'
      }
    ],
    skills: ['JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'Machine Learning', 'Leadership', 'Team Management'],
    languages: [
      { name: 'English', proficiency: 'Native' },
      { name: 'Mandarin', proficiency: 'Native' },
      { name: 'Spanish', proficiency: 'Conversational' }
    ],
    certifications: [
      {
        name: 'AWS Certified Solutions Architect',
        issuer: 'Amazon Web Services',
        date: '2022-08'
      }
    ],
    volunteer: [
      {
        organization: 'Girls Who Code',
        role: 'Mentor',
        startDate: '2020-01',
        description: 'Mentoring young women in technology and computer science education.'
      }
    ]
  },
  {
    id: 'james-wilson',
    firstName: 'James',
    lastName: 'Wilson',
    headline: 'Product Manager at Apple | Innovation Leader | MBA',
    location: 'Cupertino, CA',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    backgroundImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
    connections: 890,
    followers: 2100,
    isInfluencer: false,
    isVerified: true,
    currentCompany: 'apple',
    currentPosition: 'Senior Product Manager',
    industry: 'technology',
    summary: 'Strategic product manager with 6+ years driving innovation in consumer technology. Currently leading product development for iOS features used by over 1 billion users. Expert in user research, data-driven decision making, and cross-functional team leadership.',
    experience: [
      {
        id: 'exp-1',
        title: 'Senior Product Manager',
        company: 'Apple',
        companyId: 'apple',
        location: 'Cupertino, CA',
        startDate: '2020-08',
        endDate: null,
        current: true,
        description: 'Leading product strategy for iOS core features, managing roadmap for 1B+ users, and driving 15% improvement in user engagement metrics.'
      }
    ],
    education: [
      {
        id: 'edu-1',
        school: 'Wharton School',
        degree: 'Master of Business Administration',
        field: 'Technology Management',
        startDate: '2017',
        endDate: '2019'
      }
    ],
    skills: ['Product Strategy', 'User Research', 'Data Analysis', 'Leadership', 'Agile', 'iOS Development'],
    languages: [
      { name: 'English', proficiency: 'Native' },
      { name: 'French', proficiency: 'Conversational' }
    ]
  },
  {
    id: 'maria-rodriguez',
    firstName: 'Maria',
    lastName: 'Rodriguez',
    headline: 'Investment Banking Associate at Goldman Sachs | CFA Candidate',
    location: 'New York, NY',
    profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    backgroundImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=400&fit=crop',
    connections: 650,
    followers: 980,
    isInfluencer: false,
    isVerified: true,
    currentCompany: 'goldman-sachs',
    currentPosition: 'Investment Banking Associate',
    industry: 'finance',
    summary: 'Investment banking professional with expertise in M&A transactions and capital markets. Currently working on deals worth $2B+ in the technology sector. CFA Level 2 candidate with strong analytical and modeling skills.',
    experience: [
      {
        id: 'exp-1',
        title: 'Investment Banking Associate',
        company: 'Goldman Sachs',
        companyId: 'goldman-sachs',
        location: 'New York, NY',
        startDate: '2021-07',
        endDate: null,
        current: true,
        description: 'Executing M&A transactions and equity offerings in the technology sector, managing client relationships, and leading financial modeling and valuation analysis.'
      }
    ],
    education: [
      {
        id: 'edu-1',
        school: 'Harvard Business School',
        degree: 'Master of Business Administration',
        field: 'Finance',
        startDate: '2019',
        endDate: '2021'
      }
    ],
    skills: ['Financial Modeling', 'Investment Banking', 'M&A', 'Valuation', 'Capital Markets', 'Client Relations'],
    languages: [
      { name: 'English', proficiency: 'Native' },
      { name: 'Spanish', proficiency: 'Native' }
    ]
  },
  {
    id: 'david-kim',
    firstName: 'David',
    lastName: 'Kim',
    headline: 'Management Consultant at McKinsey & Company | Strategy Expert',
    location: 'New York, NY',
    profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    backgroundImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=400&fit=crop',
    connections: 1100,
    followers: 1800,
    isInfluencer: false,
    isVerified: true,
    currentCompany: 'mckinsey',
    currentPosition: 'Senior Associate',
    industry: 'consulting',
    summary: 'Strategy consultant with 5+ years helping Fortune 500 companies drive digital transformation and operational excellence. Expertise in technology strategy, organizational design, and change management.',
    experience: [
      {
        id: 'exp-1',
        title: 'Senior Associate',
        company: 'McKinsey & Company',
        companyId: 'mckinsey',
        location: 'New York, NY',
        startDate: '2020-09',
        endDate: null,
        current: true,
        description: 'Leading strategic initiatives for Fortune 500 clients, focusing on digital transformation and operational improvement projects worth $50M+ in value creation.'
      }
    ],
    education: [
      {
        id: 'edu-1',
        school: 'MIT Sloan',
        degree: 'Master of Business Administration',
        field: 'Strategy',
        startDate: '2018',
        endDate: '2020'
      }
    ],
    skills: ['Strategy Consulting', 'Digital Transformation', 'Change Management', 'Data Analysis', 'Client Management'],
    languages: [
      { name: 'English', proficiency: 'Native' },
      { name: 'Korean', proficiency: 'Native' }
    ]
  },
  
  // Additional Tech Professionals
  {
    id: 'alex-thompson',
    firstName: 'Alex',
    lastName: 'Thompson',
    headline: 'Lead Data Scientist at Microsoft | AI/ML Expert | PhD Computer Science',
    location: 'Seattle, WA',
    profilePicture: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?w=400&h=400&fit=crop',
    backgroundImage: 'https://images.pexels.com/photos/574069/pexels-photo-574069.jpeg?w=1200&h=400&fit=crop',
    connections: 2100,
    followers: 4500,
    isInfluencer: true,
    isVerified: true,
    currentCompany: 'microsoft',
    currentPosition: 'Lead Data Scientist',
    industry: 'technology',
    summary: 'Leading AI/ML initiatives at Microsoft with 10+ years experience in data science, machine learning, and AI research. Published researcher with 25+ papers in top-tier conferences.',
    experience: [
      {
        id: 'exp-1',
        title: 'Lead Data Scientist',
        company: 'Microsoft',
        companyId: 'microsoft',
        location: 'Seattle, WA',
        startDate: '2019-03',
        endDate: null,
        current: true,
        description: 'Leading a team of 12 data scientists working on Azure AI services, developing ML models that serve 100M+ users daily.'
      }
    ],
    education: [
      {
        id: 'edu-1',
        school: 'Carnegie Mellon University',
        degree: 'PhD',
        field: 'Computer Science',
        startDate: '2012',
        endDate: '2017'
      }
    ],
    skills: ['Machine Learning', 'Python', 'TensorFlow', 'Azure', 'Deep Learning', 'NLP', 'Computer Vision'],
    languages: [
      { name: 'English', proficiency: 'Native' }
    ]
  },
  {
    id: 'priya-patel',
    firstName: 'Priya',
    lastName: 'Patel',
    headline: 'UX Design Director at Apple | Design Systems | Human-Computer Interaction',
    location: 'Cupertino, CA',
    profilePicture: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?w=400&h=400&fit=crop',
    backgroundImage: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?w=1200&h=400&fit=crop',
    connections: 1800,
    followers: 3200,
    isInfluencer: false,
    isVerified: true,
    currentCompany: 'apple',
    currentPosition: 'UX Design Director',
    industry: 'technology',
    summary: 'Design leader passionate about creating intuitive user experiences. Leading design for iOS core apps used by 1B+ users worldwide.',
    experience: [
      {
        id: 'exp-1',
        title: 'UX Design Director',
        company: 'Apple',
        companyId: 'apple',
        location: 'Cupertino, CA',
        startDate: '2018-06',
        endDate: null,
        current: true,
        description: 'Leading design direction for iOS core applications, managing a team of 15 designers across multiple product lines.'
      }
    ],
    education: [
      {
        id: 'edu-1',
        school: 'Stanford University',
        degree: 'Master of Science',
        field: 'Human-Computer Interaction',
        startDate: '2014',
        endDate: '2016'
      }
    ],
    skills: ['UX Design', 'Design Systems', 'Figma', 'Prototyping', 'User Research', 'iOS', 'Team Leadership'],
    languages: [
      { name: 'English', proficiency: 'Native' },
      { name: 'Hindi', proficiency: 'Native' }
    ]
  },
  {
    id: 'michael-brown',
    firstName: 'Michael',
    lastName: 'Brown',
    headline: 'VP Engineering at Amazon | Cloud Infrastructure | DevOps Leader',
    location: 'Seattle, WA',
    profilePicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=400&h=400&fit=crop',
    backgroundImage: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?w=1200&h=400&fit=crop',
    connections: 3500,
    followers: 8900,
    isInfluencer: true,
    isVerified: true,
    currentCompany: 'amazon',
    currentPosition: 'VP Engineering',
    industry: 'technology',
    summary: 'Engineering leader with 15+ years building scalable cloud infrastructure. Currently overseeing AWS core services that power millions of applications worldwide.',
    experience: [
      {
        id: 'exp-1',
        title: 'VP Engineering',
        company: 'Amazon',
        companyId: 'amazon',
        location: 'Seattle, WA',
        startDate: '2017-01',
        endDate: null,
        current: true,
        description: 'Leading engineering teams responsible for AWS core infrastructure, managing 200+ engineers across multiple services.'
      }
    ],
    education: [
      {
        id: 'edu-1',
        school: 'MIT',
        degree: 'Master of Science',
        field: 'Computer Science',
        startDate: '2005',
        endDate: '2007'
      }
    ],
    skills: ['Cloud Architecture', 'AWS', 'DevOps', 'Distributed Systems', 'Leadership', 'Kubernetes', 'Microservices'],
    languages: [
      { name: 'English', proficiency: 'Native' }
    ]
  },
  
  // Finance Professionals
  {
    id: 'lisa-wang',
    firstName: 'Lisa',
    lastName: 'Wang',
    headline: 'Managing Director at Goldman Sachs | Investment Banking | M&A Expert',
    location: 'New York, NY',
    profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=400&h=400&fit=crop',
    backgroundImage: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?w=1200&h=400&fit=crop',
    connections: 2800,
    followers: 5200,
    isInfluencer: false,
    isVerified: true,
    currentCompany: 'goldman-sachs',
    currentPosition: 'Managing Director',
    industry: 'finance',
    summary: 'Investment banking veteran with 12+ years executing complex M&A transactions. Led deals worth $50B+ across technology and healthcare sectors.',
    experience: [
      {
        id: 'exp-1',
        title: 'Managing Director',
        company: 'Goldman Sachs',
        companyId: 'goldman-sachs',
        location: 'New York, NY',
        startDate: '2020-01',
        endDate: null,
        current: true,
        description: 'Leading M&A advisory for Fortune 500 clients, managing client relationships and deal execution across multiple sectors.'
      }
    ],
    education: [
      {
        id: 'edu-1',
        school: 'Wharton School',
        degree: 'MBA',
        field: 'Finance',
        startDate: '2010',
        endDate: '2012'
      }
    ],
    skills: ['Investment Banking', 'M&A', 'Financial Modeling', 'Valuation', 'Client Relations', 'Deal Execution'],
    languages: [
      { name: 'English', proficiency: 'Native' },
      { name: 'Mandarin', proficiency: 'Native' }
    ]
  },
  {
    id: 'robert-davis',
    firstName: 'Robert',
    lastName: 'Davis',
    headline: 'Principal at McKinsey & Company | Digital Strategy | Transformation Expert',
    location: 'Chicago, IL',
    profilePicture: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?w=400&h=400&fit=crop',
    backgroundImage: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?w=1200&h=400&fit=crop',
    connections: 2200,
    followers: 4100,
    isInfluencer: false,
    isVerified: true,
    currentCompany: 'mckinsey',
    currentPosition: 'Principal',
    industry: 'consulting',
    summary: 'Strategic consultant specializing in digital transformation and organizational change. Helped 100+ companies modernize operations and drive growth.',
    experience: [
      {
        id: 'exp-1',
        title: 'Principal',
        company: 'McKinsey & Company',
        companyId: 'mckinsey',
        location: 'Chicago, IL',
        startDate: '2021-07',
        endDate: null,
        current: true,
        description: 'Leading digital transformation engagements for Fortune 100 clients, focusing on technology adoption and organizational change.'
      }
    ],
    education: [
      {
        id: 'edu-1',
        school: 'Harvard Business School',
        degree: 'MBA',
        field: 'Strategy',
        startDate: '2015',
        endDate: '2017'
      }
    ],
    skills: ['Digital Strategy', 'Transformation', 'Change Management', 'Analytics', 'Client Management'],
    languages: [
      { name: 'English', proficiency: 'Native' }
    ]
  },
  
  // Startup & Entrepreneurship
  {
    id: 'jennifer-lee',
    firstName: 'Jennifer',
    lastName: 'Lee',
    headline: 'Founder & CEO at TechStart | Y Combinator Alum | AI Startup',
    location: 'San Francisco, CA',
    profilePicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=400&h=400&fit=crop',
    backgroundImage: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?w=1200&h=400&fit=crop',
    connections: 1500,
    followers: 12000,
    isInfluencer: true,
    isVerified: true,
    currentCompany: 'techstart',
    currentPosition: 'Founder & CEO',
    industry: 'technology',
    summary: 'Serial entrepreneur building AI-powered solutions. Successfully raised $50M Series B for my current company. Passionate about using technology to solve real-world problems.',
    experience: [
      {
        id: 'exp-1',
        title: 'Founder & CEO',
        company: 'TechStart',
        companyId: 'techstart',
        location: 'San Francisco, CA',
        startDate: '2019-01',
        endDate: null,
        current: true,
        description: 'Building AI-powered productivity tools for remote teams. Scaled company from 0 to 100+ employees and $10M ARR.'
      }
    ],
    education: [
      {
        id: 'edu-1',
        school: 'Stanford University',
        degree: 'Master of Science',
        field: 'Computer Science',
        startDate: '2015',
        endDate: '2017'
      }
    ],
    skills: ['Entrepreneurship', 'AI/ML', 'Fundraising', 'Product Strategy', 'Team Building', 'Python'],
    languages: [
      { name: 'English', proficiency: 'Native' },
      { name: 'Korean', proficiency: 'Native' }
    ]
  },
  
  // Marketing & Sales
  {
    id: 'carlos-martinez',
    firstName: 'Carlos',
    lastName: 'Martinez',
    headline: 'VP Marketing at Apple | Brand Strategy | Digital Marketing Leader',
    location: 'Cupertino, CA',
    profilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=400&h=400&fit=crop',
    backgroundImage: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?w=1200&h=400&fit=crop',
    connections: 2600,
    followers: 6800,
    isInfluencer: false,
    isVerified: true,
    currentCompany: 'apple',
    currentPosition: 'VP Marketing',
    industry: 'technology',
    summary: 'Marketing executive with 12+ years building global brands. Currently leading marketing strategy for Apple\'s flagship products reaching billions of customers.',
    experience: [
      {
        id: 'exp-1',
        title: 'VP Marketing',
        company: 'Apple',
        companyId: 'apple',
        location: 'Cupertino, CA',
        startDate: '2019-08',
        endDate: null,
        current: true,
        description: 'Leading global marketing campaigns for iPhone and iPad, managing $2B+ marketing budget and driving brand awareness worldwide.'
      }
    ],
    education: [
      {
        id: 'edu-1',
        school: 'Northwestern Kellogg',
        degree: 'MBA',
        field: 'Marketing',
        startDate: '2010',
        endDate: '2012'
      }
    ],
    skills: ['Brand Strategy', 'Digital Marketing', 'Campaign Management', 'Analytics', 'Team Leadership'],
    languages: [
      { name: 'English', proficiency: 'Native' },
      { name: 'Spanish', proficiency: 'Native' }
    ]
  },
  
  // HR & People Operations
  {
    id: 'emily-clark',
    firstName: 'Emily',
    lastName: 'Clark',
    headline: 'Chief People Officer at Google | HR Strategy | Culture & Inclusion',
    location: 'Mountain View, CA',
    profilePicture: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?w=400&h=400&fit=crop',
    backgroundImage: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?w=1200&h=400&fit=crop',
    connections: 3200,
    followers: 7500,
    isInfluencer: true,
    isVerified: true,
    currentCompany: 'google',
    currentPosition: 'Chief People Officer',
    industry: 'technology',
    summary: 'People leader focused on building inclusive, high-performing cultures. Overseeing talent strategy for 150,000+ employees across 70+ countries.',
    experience: [
      {
        id: 'exp-1',
        title: 'Chief People Officer',
        company: 'Google',
        companyId: 'google',
        location: 'Mountain View, CA',
        startDate: '2020-03',
        endDate: null,
        current: true,
        description: 'Leading global people strategy, talent acquisition, and culture initiatives. Driving diversity and inclusion programs across all business units.'
      }
    ],
    education: [
      {
        id: 'edu-1',
        school: 'Stanford Graduate School of Business',
        degree: 'MBA',
        field: 'Organizational Behavior',
        startDate: '2008',
        endDate: '2010'
      }
    ],
    skills: ['HR Strategy', 'Talent Management', 'Culture Development', 'Leadership', 'Diversity & Inclusion'],
    languages: [
      { name: 'English', proficiency: 'Native' }
    ]
  }
];

// Jobs
const jobs = [
  {
    id: 'job-1',
    title: 'Senior Software Engineer - Machine Learning',
    company: 'Google',
    companyId: 'google',
    location: 'Mountain View, CA',
    type: 'Full-time',
    level: 'Senior level',
    function: 'engineering',
    industry: 'technology',
    postedDate: '2024-03-10',
    applicants: 234,
    description: 'Join Google\'s Search team to build the next generation of ML-powered search experiences. You\'ll work on large-scale distributed systems serving billions of queries daily.',
    requirements: [
      'MS/PhD in Computer Science or related field',
      '5+ years of software development experience',
      'Strong background in machine learning and distributed systems',
      'Experience with Python, C++, or Java',
      'Experience with TensorFlow or PyTorch'
    ],
    responsibilities: [
      'Design and implement ML algorithms for search ranking',
      'Optimize performance of large-scale distributed systems',
      'Collaborate with research teams on cutting-edge ML techniques',
      'Mentor junior engineers and provide technical leadership'
    ],
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'Distributed Systems', 'C++'],
    salary: {
      min: 180000,
      max: 280000,
      currency: 'USD',
      period: 'annual'
    },
    benefits: [
      'Comprehensive health insurance',
      'Stock options',
      'Flexible work arrangements',
      '20% time for personal projects',
      'Professional development budget'
    ],
    remote: false,
    urgent: false
  },
  {
    id: 'job-2',
    title: 'Product Manager - iOS',
    company: 'Apple',
    companyId: 'apple',
    location: 'Cupertino, CA',
    type: 'Full-time',
    level: 'Mid-Senior level',
    function: 'product',
    industry: 'technology',
    postedDate: '2024-03-08',
    applicants: 189,
    description: 'Lead product strategy for iOS core features used by over 1 billion users worldwide. Drive innovation in mobile user experience and platform capabilities.',
    requirements: [
      'MBA or equivalent experience',
      '4+ years of product management experience',
      'Experience with mobile platforms',
      'Strong analytical and communication skills',
      'Passion for user experience and design'
    ],
    responsibilities: [
      'Define product roadmap for iOS features',
      'Collaborate with engineering and design teams',
      'Conduct user research and data analysis',
      'Present to executive leadership'
    ],
    skills: ['Product Strategy', 'iOS', 'User Research', 'Data Analysis', 'Leadership'],
    salary: {
      min: 160000,
      max: 220000,
      currency: 'USD',
      period: 'annual'
    },
    benefits: [
      'Health and wellness programs',
      'Stock purchase plan',
      'Education reimbursement',
      'Product discounts'
    ],
    remote: false,
    urgent: true
  },
  {
    id: 'job-3',
    title: 'Investment Banking Analyst',
    company: 'Goldman Sachs',
    companyId: 'goldman-sachs',
    location: 'New York, NY',
    type: 'Full-time',
    level: 'Entry level',
    function: 'finance',
    industry: 'finance',
    postedDate: '2024-03-12',
    applicants: 567,
    description: 'Join our Technology, Media & Telecom group to work on high-profile M&A transactions and capital markets deals.',
    requirements: [
      'Bachelor\'s degree in Finance, Economics, or related field',
      'Strong academic record (3.5+ GPA)',
      'Previous internship in investment banking or finance',
      'Excellent analytical and modeling skills',
      'Proficiency in Excel and PowerPoint'
    ],
    responsibilities: [
      'Build financial models and perform valuation analysis',
      'Prepare pitch books and client presentations',
      'Support senior bankers in transaction execution',
      'Conduct industry and company research'
    ],
    skills: ['Financial Modeling', 'Excel', 'Valuation', 'Investment Banking', 'Client Relations'],
    salary: {
      min: 150000,
      max: 175000,
      currency: 'USD',
      period: 'annual'
    },
    benefits: [
      'Performance bonus',
      'Health insurance',
      'Commuter benefits',
      'Professional development'
    ],
    remote: false,
    urgent: false
  },
  {
    id: 'job-4',
    title: 'Management Consultant',
    company: 'McKinsey & Company',
    companyId: 'mckinsey',
    location: 'Chicago, IL',
    type: 'Full-time',
    level: 'Entry level',
    function: 'consulting',
    industry: 'consulting',
    postedDate: '2024-03-09',
    applicants: 312,
    description: 'Work with Fortune 500 clients on strategic initiatives spanning digital transformation, operations, and organizational design.',
    requirements: [
      'MBA from top-tier business school',
      'Previous consulting or strategy experience preferred',
      'Strong problem-solving and analytical skills',
      'Excellent communication and presentation abilities',
      'Willingness to travel 50-75%'
    ],
    responsibilities: [
      'Lead client workstreams on strategic projects',
      'Develop recommendations based on data analysis',
      'Present findings to C-level executives',
      'Mentor junior team members'
    ],
    skills: ['Strategy Consulting', 'Problem Solving', 'Client Management', 'Data Analysis'],
    salary: {
      min: 165000,
      max: 195000,
      currency: 'USD',
      period: 'annual'
    },
    benefits: [
      'Performance bonus up to 30%',
      'Comprehensive health coverage',
      'Professional development fund',
      'Global mobility opportunities'
    ],
    remote: false,
    urgent: true
  },
  
  // Netflix Jobs
  {
    id: 'job-4',
    title: 'Senior Data Scientist - Content Analytics',
    company: 'Netflix',
    companyId: 'netflix',
    location: 'Los Gatos, CA',
    type: 'Full-time',
    level: 'Senior level',
    function: 'data',
    industry: 'technology',
    postedDate: '2024-03-12',
    applicants: 89,
    description: 'Drive data-driven insights to optimize content recommendations and viewer engagement across Netflix\'s global platform serving 230M+ subscribers.',
    requirements: [
      'PhD in Statistics, Mathematics, Computer Science, or related quantitative field',
      '5+ years of experience in data science or machine learning',
      'Expertise in Python, R, SQL, and statistical modeling',
      'Experience with large-scale data processing (Spark, Hadoop)',
      'Strong communication skills for presenting insights to executives'
    ],
    responsibilities: [
      'Analyze viewer behavior patterns and content performance metrics',
      'Build predictive models for content recommendation algorithms',
      'Design and execute A/B testing for new features',
      'Partner with product teams to drive strategic decisions'
    ],
    skills: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics', 'Spark'],
    salary: {
      min: 200000,
      max: 350000,
      currency: 'USD',
      period: 'annual'
    },
    benefits: [
      'Unlimited vacation policy',
      'Comprehensive health coverage',
      'Stock options',
      'Learning and development budget',
      'Flexible work arrangements'
    ],
    remote: true,
    urgent: false
  },
  {
    id: 'job-5',
    title: 'Software Engineer - Autonomous Driving',
    company: 'Tesla',
    companyId: 'tesla',
    location: 'Austin, TX',
    type: 'Full-time',
    level: 'Mid-Senior level',
    function: 'engineering',
    industry: 'automotive',
    postedDate: '2024-03-11',
    applicants: 167,
    description: 'Join Tesla\'s Autopilot team to develop the future of autonomous driving technology. Work on cutting-edge AI systems that will revolutionize transportation.',
    requirements: [
      'BS/MS in Computer Science, Electrical Engineering, or related field',
      '3+ years of software development experience',
      'Strong background in computer vision, machine learning, or robotics',
      'Proficiency in C++, Python, and deep learning frameworks',
      'Experience with real-time systems and embedded programming'
    ],
    responsibilities: [
      'Develop and optimize neural networks for perception systems',
      'Implement real-time computer vision algorithms',
      'Collaborate with hardware teams on sensor integration',
      'Participate in vehicle testing and data collection'
    ],
    skills: ['C++', 'Python', 'Computer Vision', 'Deep Learning', 'Robotics'],
    salary: {
      min: 160000,
      max: 250000,
      currency: 'USD',
      period: 'annual'
    },
    benefits: [
      'Stock options with high growth potential',
      'Health and dental insurance',
      'Employee vehicle purchase program',
      'On-site gym and wellness programs',
      'Professional development opportunities'
    ],
    remote: false,
    urgent: true
  },
  {
    id: 'job-6',
    title: 'Senior Backend Engineer - Marketplace',
    company: 'Uber Technologies',
    companyId: 'uber',
    location: 'San Francisco, CA',
    type: 'Full-time',
    level: 'Senior level',
    function: 'engineering',
    industry: 'technology',
    postedDate: '2024-03-09',
    applicants: 203,
    description: 'Build and scale backend systems that power Uber\'s global marketplace, connecting millions of riders with drivers every day.',
    requirements: [
      'BS/MS in Computer Science or equivalent experience',
      '5+ years of backend development experience',
      'Expertise in distributed systems and microservices architecture',
      'Strong knowledge of Java, Go, or Python',
      'Experience with cloud platforms (AWS, GCP) and containerization'
    ],
    responsibilities: [
      'Design and implement scalable backend services',
      'Optimize system performance and reliability',
      'Mentor junior engineers and conduct code reviews',
      'Collaborate with product managers and frontend teams'
    ],
    skills: ['Java', 'Go', 'Distributed Systems', 'AWS', 'Microservices'],
    salary: {
      min: 175000,
      max: 275000,
      currency: 'USD',
      period: 'annual'
    },
    benefits: [
      'Equity compensation',
      'Comprehensive healthcare',
      'Commuter benefits including free Uber rides',
      'Flexible PTO',
      'Learning and development stipend'
    ],
    remote: true,
    urgent: false
  },
  {
    id: 'job-7',
    title: 'UX Designer - Host Experience',
    company: 'Airbnb',
    companyId: 'airbnb',
    location: 'San Francisco, CA',
    type: 'Full-time',
    level: 'Mid-Senior level',
    function: 'design',
    industry: 'technology',
    postedDate: '2024-03-13',
    applicants: 76,
    description: 'Design intuitive and delightful experiences for Airbnb hosts to manage their properties and connect with guests worldwide.',
    requirements: [
      'Bachelor\'s degree in Design, HCI, or related field',
      '4+ years of UX/UI design experience',
      'Portfolio demonstrating strong design process and problem-solving',
      'Proficiency in Figma, Sketch, and prototyping tools',
      'Experience with user research and usability testing'
    ],
    responsibilities: [
      'Design end-to-end user experiences for host-facing products',
      'Conduct user research and synthesize insights',
      'Create wireframes, prototypes, and high-fidelity designs',
      'Collaborate with product managers and engineers'
    ],
    skills: ['UX Design', 'UI Design', 'Figma', 'User Research', 'Prototyping'],
    salary: {
      min: 140000,
      max: 200000,
      currency: 'USD',
      period: 'annual'
    },
    benefits: [
      'Annual travel credit for Airbnb stays',
      'Health and wellness benefits',
      'Equity participation',
      'Professional development budget',
      'Flexible work arrangements'
    ],
    remote: true,
    urgent: false
  },
  {
    id: 'job-8',
    title: 'Sales Engineer - Enterprise',
    company: 'Salesforce',
    companyId: 'salesforce',
    location: 'San Francisco, CA',
    type: 'Full-time',
    level: 'Mid-Senior level',
    function: 'sales',
    industry: 'technology',
    postedDate: '2024-03-08',
    applicants: 134,
    description: 'Drive technical sales for Salesforce\'s enterprise customers, demonstrating platform capabilities and architecting solutions.',
    requirements: [
      'BS in Engineering, Computer Science, or Business',
      '3+ years of technical sales or solutions engineering experience',
      'Strong understanding of CRM and cloud technologies',
      'Experience with enterprise software sales cycles',
      'Excellent presentation and communication skills'
    ],
    responsibilities: [
      'Conduct technical demos and product presentations',
      'Design custom solutions for enterprise prospects',
      'Support sales team throughout the sales cycle',
      'Build relationships with technical stakeholders'
    ],
    skills: ['Technical Sales', 'CRM', 'Cloud Computing', 'Solution Architecture', 'Presentation'],
    salary: {
      min: 130000,
      max: 180000,
      currency: 'USD',
      period: 'annual'
    },
    benefits: [
      'Performance-based commission structure',
      'Comprehensive benefits package',
      'Stock purchase plan',
      'Professional certification reimbursement',
      'Flexible hybrid work model'
    ],
    remote: true,
    urgent: false
  },
  {
    id: 'job-9',
    title: 'Platform Engineer - Payment Infrastructure',
    company: 'Stripe',
    companyId: 'stripe',
    location: 'San Francisco, CA',
    type: 'Full-time',
    level: 'Senior level',
    function: 'engineering',
    industry: 'finance',
    postedDate: '2024-03-14',
    applicants: 91,
    description: 'Build and maintain the core payment infrastructure that powers millions of businesses worldwide on Stripe\'s platform.',
    requirements: [
      'BS/MS in Computer Science or related field',
      '5+ years of experience in infrastructure or platform engineering',
      'Strong background in distributed systems and databases',
      'Experience with Ruby, Go, or similar languages',
      'Knowledge of payment systems and financial regulations'
    ],
    responsibilities: [
      'Design and implement scalable payment processing systems',
      'Ensure 99.99% uptime for critical financial infrastructure',
      'Optimize system performance and reduce latency',
      'Collaborate with compliance and security teams'
    ],
    skills: ['Ruby', 'Go', 'Distributed Systems', 'Databases', 'Payment Systems'],
    salary: {
      min: 190000,
      max: 300000,
      currency: 'USD',
      period: 'annual'
    },
    benefits: [
      'Significant equity package',
      'Premium health insurance',
      'Annual learning budget',
      'Sabbatical program',
      'Flexible work location'
    ],
    remote: true,
    urgent: true
  },
  {
    id: 'job-10',
    title: 'Video Platform Engineer',
    company: 'Zoom Video Communications',
    companyId: 'zoom',
    location: 'San Jose, CA',
    type: 'Full-time',
    level: 'Mid-Senior level',
    function: 'engineering',
    industry: 'technology',
    postedDate: '2024-03-10',
    applicants: 112,
    description: 'Develop and optimize video communication technology that connects millions of users daily across Zoom\'s platform.',
    requirements: [
      'BS/MS in Computer Science, Electrical Engineering, or related field',
      '4+ years of experience in video/audio processing or real-time systems',
      'Strong knowledge of video codecs, networking protocols, and WebRTC',
      'Proficiency in C++, C, or similar low-level languages',
      'Experience with multimedia frameworks and optimization'
    ],
    responsibilities: [
      'Implement video encoding/decoding algorithms',
      'Optimize real-time video processing performance',
      'Debug and resolve video quality issues',
      'Collaborate with mobile and web client teams'
    ],
    skills: ['C++', 'Video Processing', 'WebRTC', 'Networking', 'Real-time Systems'],
    salary: {
      min: 155000,
      max: 220000,
      currency: 'USD',
      period: 'annual'
    },
    benefits: [
      'Stock option plan',
      'Comprehensive health coverage',
      'Work from home stipend',
      'Professional development opportunities',
      'Flexible PTO policy'
    ],
    remote: true,
    urgent: false
  },
  
  // Marketing & Growth Roles
  {
    id: 'job-11',
    title: 'Growth Marketing Manager',
    company: 'Netflix',
    companyId: 'netflix',
    location: 'Los Angeles, CA',
    type: 'Full-time',
    level: 'Mid-Senior level',
    function: 'marketing',
    industry: 'technology',
    postedDate: '2024-03-12',
    applicants: 145,
    description: 'Drive subscriber growth through data-driven marketing campaigns and optimization of user acquisition funnels.',
    requirements: [
      'Bachelor\'s degree in Marketing, Business, or related field',
      '4+ years of growth marketing or digital marketing experience',
      'Strong analytical skills and experience with A/B testing',
      'Proficiency in marketing automation and analytics tools',
      'Experience with performance marketing and attribution'
    ],
    responsibilities: [
      'Develop and execute growth marketing strategies',
      'Optimize conversion funnels and user onboarding',
      'Analyze campaign performance and ROI',
      'Collaborate with product and data science teams'
    ],
    skills: ['Growth Marketing', 'Analytics', 'A/B Testing', 'Digital Marketing', 'SQL'],
    salary: {
      min: 120000,
      max: 170000,
      currency: 'USD',
      period: 'annual'
    },
    benefits: [
      'Unlimited PTO',
      'Health and wellness benefits',
      'Stock options',
      'Professional development budget',
      'Netflix content access'
    ],
    remote: true,
    urgent: false
  },
  
  // Data Science Roles
  {
    id: 'job-12',
    title: 'Principal Data Scientist',
    company: 'Uber Technologies',
    companyId: 'uber',
    location: 'Seattle, WA',
    type: 'Full-time',
    level: 'Senior level',
    function: 'data',
    industry: 'technology',
    postedDate: '2024-03-11',
    applicants: 67,
    description: 'Lead advanced analytics initiatives to optimize pricing, demand forecasting, and marketplace efficiency across Uber\'s platform.',
    requirements: [
      'PhD in Statistics, Economics, Computer Science, or related quantitative field',
      '7+ years of experience in data science or quantitative analysis',
      'Expertise in causal inference, experimentation, and statistical modeling',
      'Strong programming skills in Python, R, and SQL',
      'Experience leading data science teams and projects'
    ],
    responsibilities: [
      'Design and implement sophisticated statistical models',
      'Lead strategic data science initiatives',
      'Mentor junior data scientists',
      'Present findings to executive leadership'
    ],
    skills: ['Python', 'R', 'Statistics', 'Causal Inference', 'Machine Learning'],
    salary: {
      min: 220000,
      max: 350000,
      currency: 'USD',
      period: 'annual'
    },
    benefits: [
      'Significant equity compensation',
      'Premium healthcare benefits',
      'Unlimited Uber credits',
      'Research conference budget',
      'Flexible work arrangements'
    ],
    remote: true,
    urgent: true
  }
];

// Posts/Feed Content
const posts = [
  {
    id: 'post-1',
    author: 'sarah-chen',
    authorName: 'Sarah Chen',
    authorHeadline: 'Senior Software Engineer at Google',
    authorPicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b4ac?w=100&h=100&fit=crop',
    timestamp: '2024-03-15T10:30:00Z',
    content: 'Just wrapped up an amazing tech talk on "Building Scalable ML Infrastructure at Google". Key takeaways: 1) Start with simple solutions, 2) Measure everything, 3) Culture of experimentation is crucial. Thanks to everyone who attended! 🚀',
    type: 'text',
    image: null,
    likes: 234,
    comments: 45,
    shares: 12,
    tags: ['MachineLearning', 'Infrastructure', 'Google', 'TechTalk'],
    isLiked: false,
    engagement: {
      reactions: [
        { type: 'like', count: 180 },
        { type: 'celebrate', count: 34 },
        { type: 'insightful', count: 20 }
      ]
    }
  },
  {
    id: 'post-2',
    author: 'james-wilson',
    authorName: 'James Wilson',
    authorHeadline: 'Product Manager at Apple',
    authorPicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    timestamp: '2024-03-14T15:45:00Z',
    content: 'Product management is fundamentally about empathy. Understanding user pain points, developer constraints, and business objectives simultaneously. Here\'s what I\'ve learned after 6 years in the field...',
    type: 'article',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop',
    likes: 567,
    comments: 89,
    shares: 34,
    tags: ['ProductManagement', 'UserExperience', 'Apple', 'Leadership'],
    isLiked: true,
    engagement: {
      reactions: [
        { type: 'like', count: 400 },
        { type: 'celebrate', count: 87 },
        { type: 'insightful', count: 80 }
      ]
    }
  },
  {
    id: 'post-3',
    author: 'maria-rodriguez',
    authorName: 'Maria Rodriguez',
    authorHeadline: 'Investment Banking Associate at Goldman Sachs',
    authorPicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    timestamp: '2024-03-13T09:20:00Z',
    content: 'Market volatility creates opportunities. In times of uncertainty, companies with strong fundamentals and clear strategic vision often emerge stronger. Key sectors to watch in Q2 2024: AI/ML, renewable energy, and healthcare innovation.',
    type: 'text',
    image: null,
    likes: 423,
    comments: 67,
    shares: 28,
    tags: ['Finance', 'Markets', 'Investment', 'Strategy'],
    isLiked: false,
    engagement: {
      reactions: [
        { type: 'like', count: 300 },
        { type: 'insightful', count: 123 }
      ]
    }
  },
  {
    id: 'post-4',
    author: 'alex-thompson',
    authorName: 'Alex Thompson',
    authorHeadline: 'Lead Data Scientist at Microsoft',
    authorPicture: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?w=100&h=100&fit=crop',
    timestamp: '2024-03-15T08:30:00Z',
    content: 'Excited to share that our AI research paper on "Efficient Neural Architecture Search for Edge Devices" has been accepted at NeurIPS 2024! 🎉 This work reduces model search time by 80% while maintaining accuracy. Huge thanks to my amazing team at Microsoft Research. The future of edge AI is looking bright! #AI #MachineLearning #Research',
    type: 'text',
    image: 'https://images.pexels.com/photos/574069/pexels-photo-574069.jpeg?w=600&h=400&fit=crop',
    likes: 892,
    comments: 156,
    shares: 73,
    tags: ['AI', 'MachineLearning', 'Research', 'Microsoft', 'NeurIPS'],
    isLiked: true,
    engagement: {
      reactions: [
        { type: 'like', count: 650 },
        { type: 'celebrate', count: 182 },
        { type: 'insightful', count: 60 }
      ]
    }
  },
  {
    id: 'post-5',
    author: 'priya-patel',
    authorName: 'Priya Patel',
    authorHeadline: 'UX Design Director at Apple',
    authorPicture: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?w=100&h=100&fit=crop',
    timestamp: '2024-03-15T07:15:00Z',
    content: 'Design systems aren\'t just about consistency—they\'re about empowering teams to build better products faster. After 3 years leading design systems at Apple, here are my top 5 lessons: 1) Start with principles, not components 2) Involve developers from day one 3) Document the "why," not just the "what" 4) Build for adoption, not perfection 5) Measure impact beyond just usage. What lessons have you learned from design systems work?',
    type: 'text',
    image: null,
    likes: 1247,
    comments: 203,
    shares: 95,
    tags: ['DesignSystems', 'UX', 'Design', 'Apple', 'ProductDesign'],
    isLiked: false,
    engagement: {
      reactions: [
        { type: 'like', count: 890 },
        { type: 'insightful', count: 257 },
        { type: 'love', count: 100 }
      ]
    }
  },
  {
    id: 'post-6',
    author: 'michael-brown',
    authorName: 'Michael Brown',
    authorHeadline: 'VP Engineering at Amazon',
    authorPicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100&h=100&fit=crop',
    timestamp: '2024-03-14T19:45:00Z',
    content: 'Just wrapped up a fascinating architecture review session. Key insight: the most elegant technical solution isn\'t always the right business solution. Sometimes "good enough" infrastructure that ships quickly beats "perfect" infrastructure that ships late. The art is knowing when to choose which path. Building at Amazon scale has taught me that pragmatism often wins over perfectionism.',
    type: 'text',
    image: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?w=600&h=400&fit=crop',
    likes: 734,
    comments: 89,
    shares: 41,
    tags: ['Engineering', 'Architecture', 'Leadership', 'Amazon', 'Technology'],
    isLiked: true,
    engagement: {
      reactions: [
        { type: 'like', count: 520 },
        { type: 'insightful', count: 174 },
        { type: 'celebrate', count: 40 }
      ]
    }
  },
  {
    id: 'post-7',
    author: 'lisa-wang',
    authorName: 'Lisa Wang',
    authorHeadline: 'Managing Director at Goldman Sachs',
    authorPicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=100&h=100&fit=crop',
    timestamp: '2024-03-14T16:20:00Z',
    content: 'The fintech landscape is evolving rapidly. In the past 6 months, I\'ve seen a shift from growth-at-all-costs to sustainable, profitable business models. Key trends I\'m tracking: 1) Embedded finance becoming mainstream 2) AI-driven risk assessment 3) Regulatory clarity driving innovation 4) B2B fintech showing stronger fundamentals than B2C 5) Cross-border payments still a massive opportunity. What trends are you seeing in your space?',
    type: 'text',
    image: null,
    likes: 623,
    comments: 145,
    shares: 58,
    tags: ['Fintech', 'Finance', 'Investment', 'Banking', 'Technology'],
    isLiked: false,
    engagement: {
      reactions: [
        { type: 'like', count: 445 },
        { type: 'insightful', count: 148 },
        { type: 'celebrate', count: 30 }
      ]
    }
  },
  {
    id: 'post-8',
    author: 'robert-davis',
    authorName: 'Robert Davis',
    authorHeadline: 'Principal at McKinsey & Company',
    authorPicture: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?w=100&h=100&fit=crop',
    timestamp: '2024-03-14T14:30:00Z',
    content: 'Digital transformation isn\'t about technology—it\'s about people. After working with 50+ Fortune 500 companies on their transformation journeys, the pattern is clear: successful transformations happen when you change culture first, process second, and technology third. The companies that start with tech and ignore culture? They struggle. Thoughts from fellow transformation leaders?',
    type: 'text',
    image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?w=600&h=400&fit=crop',
    likes: 456,
    comments: 78,
    shares: 34,
    tags: ['DigitalTransformation', 'Consulting', 'Leadership', 'Change', 'Culture'],
    isLiked: true,
    engagement: {
      reactions: [
        { type: 'like', count: 320 },
        { type: 'insightful', count: 106 },
        { type: 'celebrate', count: 30 }
      ]
    }
  },
  {
    id: 'post-9',
    author: 'jennifer-lee',
    authorName: 'Jennifer Lee',
    authorHeadline: 'Founder & CEO at TechStart',
    authorPicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100&h=100&fit=crop',
    timestamp: '2024-03-14T12:45:00Z',
    content: 'Bootstrapped to $10M ARR in 18 months! 🚀 Here\'s what I learned building TechStart: 1) Product-market fit > fundraising 2) Customer feedback is gold 3) Hire slow, fire fast 4) Cash flow management is everything 5) Remote-first culture attracts top talent. To fellow entrepreneurs: focus on sustainable growth over vanity metrics. The journey is challenging but incredibly rewarding. What would you add to this list?',
    type: 'text',
    image: null,
    likes: 2134,
    comments: 298,
    shares: 156,
    tags: ['Entrepreneurship', 'Startup', 'Growth', 'Leadership', 'Business'],
    isLiked: true,
    engagement: {
      reactions: [
        { type: 'celebrate', count: 890 },
        { type: 'like', count: 1024 },
        { type: 'insightful', count: 220 }
      ]
    }
  },
  {
    id: 'post-10',
    author: 'carlos-martinez',
    authorName: 'Carlos Martinez',
    authorHeadline: 'VP Marketing at Apple',
    authorPicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=100&h=100&fit=crop',
    timestamp: '2024-03-14T11:00:00Z',
    content: 'Developer experience is the new competitive advantage. At Apple, we\'ve learned that happy developers build better apps, which creates better user experiences. Our new Developer Relations strategy focuses on: reducing friction in our tools, creating comprehensive documentation, building community, and listening—really listening—to developer feedback. The results? 40% increase in app quality scores and 60% faster time-to-market for new features.',
    type: 'text',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?w=600&h=400&fit=crop',
    likes: 567,
    comments: 92,
    shares: 47,
    tags: ['DeveloperExperience', 'Marketing', 'Apple', 'Strategy', 'Community'],
    isLiked: false,
    engagement: {
      reactions: [
        { type: 'like', count: 412 },
        { type: 'insightful', count: 125 },
        { type: 'celebrate', count: 30 }
      ]
    }
  },
  {
    id: 'post-11',
    author: 'emily-clark',
    authorName: 'Emily Clark',
    authorHeadline: 'Chief People Officer at Google',
    authorPicture: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?w=100&h=100&fit=crop',
    timestamp: '2024-03-14T09:30:00Z',
    content: 'Hybrid work isn\'t just about where people work—it\'s about creating inclusive experiences that work for everyone. After 2 years of experimenting at Google, here\'s what we\'ve learned: 1) Over-communicate expectations 2) Invest in async collaboration tools 3) Be intentional about in-person time 4) Measure inclusion, not just productivity 5) Trust your team. The future of work is flexible, inclusive, and human-centered.',
    type: 'text',
    image: null,
    likes: 834,
    comments: 167,
    shares: 89,
    tags: ['HybridWork', 'HR', 'Inclusion', 'Leadership', 'Google'],
    isLiked: true,
    engagement: {
      reactions: [
        { type: 'like', count: 598 },
        { type: 'insightful', count: 186 },
        { type: 'love', count: 50 }
      ]
    }
  }
];

// Notifications
const notifications = [
  {
    id: 'notif-1',
    type: 'connection_request',
    actor: 'james-wilson',
    actorName: 'James Wilson',
    actorPicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    timestamp: '2024-03-15T14:30:00Z',
    read: false,
    message: 'wants to connect with you'
  },
  {
    id: 'notif-2',
    type: 'post_like',
    actor: 'maria-rodriguez',
    actorName: 'Maria Rodriguez',
    actorPicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    timestamp: '2024-03-15T11:15:00Z',
    read: false,
    message: 'liked your post about ML infrastructure'
  },
  {
    id: 'notif-3',
    type: 'job_alert',
    actor: 'system',
    timestamp: '2024-03-15T09:00:00Z',
    read: true,
    message: '5 new jobs matching your preferences'
  }
];

// Messages/Conversations
const conversations = [
  {
    id: 'conv-1',
    participants: ['sarah-chen', 'james-wilson'],
    participant: 'james-wilson',
    participantName: 'James Wilson',
    participantPicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100&h=100&fit=crop',
    lastMessage: 'Thanks for the connection! Would love to chat about product strategy sometime.',
    timestamp: '2024-03-15T16:20:00Z',
    unread: true,
    messages: [
      {
        id: 'msg-1',
        sender: 'james-wilson',
        content: 'Hi Sarah, thanks for accepting my connection request!',
        timestamp: '2024-03-15T16:15:00Z'
      },
      {
        id: 'msg-2',
        sender: 'james-wilson',
        content: 'Thanks for the connection! Would love to chat about product strategy sometime.',
        timestamp: '2024-03-15T16:20:00Z'
      },
      {
        id: 'msg-3',
        sender: 'sarah-chen',
        content: 'Hi James! Great to connect with you. I\'d love to discuss product strategy as well.',
        timestamp: '2024-03-15T16:25:00Z'
      },
      {
        id: 'msg-4',
        sender: 'james-wilson',
        content: 'Perfect! I\'ve been following your work on ML infrastructure at Google. Very impressive stuff.',
        timestamp: '2024-03-15T16:30:00Z'
      }
    ]
  },
  {
    id: 'conv-2',
    participants: ['sarah-chen', 'alex-thompson'],
    participant: 'alex-thompson',
    participantName: 'Alex Thompson',
    participantPicture: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?w=100&h=100&fit=crop',
    lastMessage: 'The TensorFlow optimization tips worked perfectly!',
    timestamp: '2024-03-15T14:45:00Z',
    unread: false,
    messages: [
      {
        id: 'msg-5',
        sender: 'alex-thompson',
        content: 'Hey Sarah! Saw your post about TensorFlow optimization. Could you share some insights?',
        timestamp: '2024-03-15T14:00:00Z'
      },
      {
        id: 'msg-6',
        sender: 'sarah-chen',
        content: 'Hi Alex! Absolutely. Are you dealing with training speed issues or inference optimization?',
        timestamp: '2024-03-15T14:05:00Z'
      },
      {
        id: 'msg-7',
        sender: 'alex-thompson',
        content: 'Both actually! We\'re migrating from TF 1.x to 2.x and seeing some performance regression.',
        timestamp: '2024-03-15T14:10:00Z'
      },
      {
        id: 'msg-8',
        sender: 'sarah-chen',
        content: 'Common issue. I\'d recommend starting with tf.function decorators and mixed precision training. Happy to share code examples.',
        timestamp: '2024-03-15T14:15:00Z'
      },
      {
        id: 'msg-9',
        sender: 'alex-thompson',
        content: 'The TensorFlow optimization tips worked perfectly!',
        timestamp: '2024-03-15T14:45:00Z'
      }
    ]
  },
  {
    id: 'conv-3',
    participants: ['sarah-chen', 'priya-patel'],
    participant: 'priya-patel',
    participantName: 'Priya Patel',
    participantPicture: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?w=100&h=100&fit=crop',
    lastMessage: 'Looking forward to collaborating on the design system project!',
    timestamp: '2024-03-15T13:30:00Z',
    unread: true,
    messages: [
      {
        id: 'msg-10',
        sender: 'priya-patel',
        content: 'Hi Sarah! I loved your insights on cross-functional collaboration during the tech talk.',
        timestamp: '2024-03-15T13:00:00Z'
      },
      {
        id: 'msg-11',
        sender: 'sarah-chen',
        content: 'Thank you, Priya! Your design systems work at Apple is truly inspiring.',
        timestamp: '2024-03-15T13:05:00Z'
      },
      {
        id: 'msg-12',
        sender: 'priya-patel',
        content: 'I\'d love to learn more about how engineering teams at Google approach design-dev handoffs.',
        timestamp: '2024-03-15T13:10:00Z'
      },
      {
        id: 'msg-13',
        sender: 'sarah-chen',
        content: 'We use a combination of Figma dev mode and custom tooling. The key is establishing shared vocabularies.',
        timestamp: '2024-03-15T13:15:00Z'
      },
      {
        id: 'msg-14',
        sender: 'priya-patel',
        content: 'Looking forward to collaborating on the design system project!',
        timestamp: '2024-03-15T13:30:00Z'
      }
    ]
  },
  {
    id: 'conv-4',
    participants: ['sarah-chen', 'michael-brown'],
    participant: 'michael-brown',
    participantName: 'Michael Brown',
    participantPicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100&h=100&fit=crop',
    lastMessage: 'Thanks for the AWS architecture review! The suggestions were spot on.',
    timestamp: '2024-03-15T12:15:00Z',
    unread: false,
    messages: [
      {
        id: 'msg-15',
        sender: 'michael-brown',
        content: 'Sarah, could you take a look at our new microservices architecture? We\'re planning a major refactor.',
        timestamp: '2024-03-15T11:30:00Z'
      },
      {
        id: 'msg-16',
        sender: 'sarah-chen',
        content: 'Sure! Send me the design docs and I\'ll review them. What\'s the main pain point you\'re trying to solve?',
        timestamp: '2024-03-15T11:35:00Z'
      },
      {
        id: 'msg-17',
        sender: 'michael-brown',
        content: 'Service discovery and load balancing are becoming bottlenecks. Plus we need better observability.',
        timestamp: '2024-03-15T11:40:00Z'
      },
      {
        id: 'msg-18',
        sender: 'sarah-chen',
        content: 'Classic problems at scale. Have you considered service mesh? Istio might be worth evaluating.',
        timestamp: '2024-03-15T11:45:00Z'
      },
      {
        id: 'msg-19',
        sender: 'michael-brown',
        content: 'Thanks for the AWS architecture review! The suggestions were spot on.',
        timestamp: '2024-03-15T12:15:00Z'
      }
    ]
  },
  {
    id: 'conv-5',
    participants: ['sarah-chen', 'lisa-wang'],
    participant: 'lisa-wang',
    participantName: 'Lisa Wang',
    participantPicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=100&h=100&fit=crop',
    lastMessage: 'The fintech market analysis was very insightful. Thanks!',
    timestamp: '2024-03-15T11:20:00Z',
    unread: true,
    messages: [
      {
        id: 'msg-20',
        sender: 'lisa-wang',
        content: 'Hi Sarah! I came across your article on tech trends in financial services. Very well written!',
        timestamp: '2024-03-15T10:30:00Z'
      },
      {
        id: 'msg-21',
        sender: 'sarah-chen',
        content: 'Thank you, Lisa! Your expertise in investment banking brings a unique perspective to tech valuations.',
        timestamp: '2024-03-15T10:35:00Z'
      },
      {
        id: 'msg-22',
        sender: 'lisa-wang',
        content: 'The fintech market analysis was very insightful. Thanks!',
        timestamp: '2024-03-15T11:20:00Z'
      }
    ]
  }
];

// Learning Courses
const courses = [
  {
    id: 'course-1',
    title: 'Machine Learning Fundamentals',
    instructor: 'Dr. Andrew Ng',
    provider: 'CareerLink Learning',
    duration: '6 weeks',
    level: 'Intermediate',
    rating: 4.8,
    students: 125000,
    price: 49,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop',
    description: 'Learn the fundamentals of machine learning and build practical skills in Python.',
    skills: ['Python', 'Machine Learning', 'Data Science', 'Neural Networks'],
    modules: [
      'Introduction to ML',
      'Supervised Learning',
      'Unsupervised Learning',
      'Neural Networks',
      'Deep Learning',
      'Practical Applications'
    ]
  },
  {
    id: 'course-2',
    title: 'Strategic Leadership in Technology',
    instructor: 'Prof. Sarah Johnson',
    provider: 'CareerLink Learning',
    duration: '4 weeks',
    level: 'Advanced',
    rating: 4.9,
    students: 45000,
    price: 79,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop',
    description: 'Develop leadership skills for managing technical teams and driving innovation.',
    skills: ['Leadership', 'Team Management', 'Strategy', 'Innovation'],
    modules: [
      'Leadership Foundations',
      'Technical Team Management',
      'Innovation Strategy',
      'Change Management'
    ]
  }
];

// Events
const events = [
  {
    id: 'event-1',
    title: 'Tech Leaders Summit 2024',
    organizer: 'TechCorp Events',
    date: '2024-04-15',
    time: '09:00',
    location: 'San Francisco, CA',
    type: 'Conference',
    attendees: 1200,
    price: 299,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=300&fit=crop',
    description: 'Join 1000+ tech leaders for keynotes, panels, and networking on the future of technology.',
    speakers: [
      'Sarah Chen (Google)',
      'James Wilson (Apple)',
      'Mark Thompson (Microsoft)'
    ],
    topics: ['AI & Machine Learning', 'Cloud Computing', 'Leadership', 'Innovation'],
    virtual: false
  }
];

// Export all data
const staticCareerLinkData = {
  industries,
  companies,
  jobFunctions,
  skills,
  users,
  jobs,
  posts,
  notifications,
  conversations,
  courses,
  events
};

export default staticCareerLinkData;
