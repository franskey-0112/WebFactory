// Gmail Clone - Static Email Data
// This file contains comprehensive email data for a fully functional Gmail clone

// User Account Information
export const currentUser = {
  id: 'user-001',
  email: 'john.doe@email.com',
  name: 'John Doe',
  firstName: 'John',
  lastName: 'Doe',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  signature: `
    <div style="margin-top: 20px; border-top: 1px solid #e0e0e0; padding-top: 10px; color: #666;">
      <strong>John Doe</strong><br/>
      Senior Software Engineer<br/>
      TechCorp Solutions<br/>
      📧 john.doe@email.com | 📱 +1 (555) 123-4567<br/>
      🌐 <a href="https://johndoe.dev">johndoe.dev</a>
    </div>
  `,
  settings: {
    language: 'en',
    timezone: 'America/New_York',
    emailsPerPage: 25,
    autoAdvance: 'archive',
    keyboardShortcuts: true,
    desktopNotifications: true
  }
};

// Contacts Database
export const contacts = [
  {
    id: 'contact-001',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@techcorp.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    company: 'TechCorp Solutions',
    position: 'Product Manager',
    notes: 'Works on mobile app features',
    lastContactDate: '2024-01-15',
    frequency: 'weekly'
  },
  {
    id: 'contact-002',
    name: 'Michael Chen',
    email: 'michael.chen@designstudio.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    company: 'Design Studio Pro',
    position: 'UX Designer',
    notes: 'Freelance designer for UI projects',
    lastContactDate: '2024-01-12',
    frequency: 'monthly'
  },
  {
    id: 'contact-003',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@marketing.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    company: 'Marketing Solutions',
    position: 'Marketing Director',
    notes: 'Handles digital marketing campaigns',
    lastContactDate: '2024-01-10',
    frequency: 'bi-weekly'
  },
  {
    id: 'contact-004',
    name: 'David Kim',
    email: 'david.kim@startup.io',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    company: 'Startup Innovations',
    position: 'CEO',
    notes: 'Startup founder, potential collaboration',
    lastContactDate: '2024-01-08',
    frequency: 'quarterly'
  },
  {
    id: 'contact-005',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@university.edu',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    company: 'State University',
    position: 'Professor',
    notes: 'Computer Science Department',
    lastContactDate: '2024-01-05',
    frequency: 'monthly'
  },
  {
    id: 'contact-006',
    name: 'James Wilson',
    email: 'james.wilson@consulting.com',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    company: 'Wilson Consulting',
    position: 'Senior Consultant',
    notes: 'Business strategy and operations',
    lastContactDate: '2024-01-03',
    frequency: 'monthly'
  }
];

// Labels/Categories
export const labels = [
  { id: 'work', name: 'Work', color: '#1a73e8', type: 'custom' },
  { id: 'personal', name: 'Personal', color: '#137333', type: 'custom' },
  { id: 'travel', name: 'Travel', color: '#ea4335', type: 'custom' },
  { id: 'finance', name: 'Finance', color: '#ff6d01', type: 'custom' },
  { id: 'social', name: 'Social', color: '#9c27b0', type: 'custom' },
  { id: 'shopping', name: 'Shopping', color: '#f439a0', type: 'custom' },
  { id: 'newsletters', name: 'Newsletters', color: '#00acc1', type: 'custom' },
  { id: 'important', name: 'Important', color: '#d50000', type: 'system' },
  { id: 'urgent', name: 'Urgent', color: '#ff9800', type: 'custom' },
  { id: 'follow-up', name: 'Follow-up', color: '#795548', type: 'custom' }
];

// Email Folders
export const folders = [
  { id: 'inbox', name: 'Inbox', icon: '📥', count: 847, type: 'system' },
  { id: 'starred', name: 'Starred', icon: '⭐', count: 23, type: 'system' },
  { id: 'sent', name: 'Sent', icon: '📤', count: 156, type: 'system' },
  { id: 'drafts', name: 'Drafts', icon: '📝', count: 8, type: 'system' },
  { id: 'spam', name: 'Spam', icon: '🚫', count: 45, type: 'system' },
  { id: 'trash', name: 'Trash', icon: '🗑️', count: 12, type: 'system' },
  { id: 'archive', name: 'Archive', icon: '📦', count: 2847, type: 'system' }
];

// Comprehensive Email Database
export const emails = [
  // Recent Work Emails
  {
    id: 'email-001',
    from: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@techcorp.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    to: [{ name: 'John Doe', email: 'john.doe@email.com' }],
    cc: [],
    bcc: [],
    subject: 'Project Timeline Update - Mobile App Release',
    body: `
      <p>Hi John,</p>
      
      <p>I hope this email finds you well. I wanted to provide you with an update on our mobile app release timeline.</p>
      
      <p><strong>Current Status:</strong></p>
      <ul>
        <li>✅ Backend API development completed</li>
        <li>✅ iOS app in beta testing</li>
        <li>🔄 Android app finalizing UI components</li>
        <li>⏳ App store review processes initiated</li>
      </ul>
      
      <p><strong>Updated Timeline:</strong></p>
      <ul>
        <li><strong>January 25:</strong> Android app beta release</li>
        <li><strong>February 1:</strong> Final testing and bug fixes</li>
        <li><strong>February 8:</strong> Production deployment</li>
        <li><strong>February 15:</strong> Marketing campaign launch</li>
      </ul>
      
      <p>The team has been working incredibly hard, and I'm confident we'll meet these deadlines. Please let me know if you have any questions or concerns.</p>
      
      <p>Best regards,<br/>Sarah</p>
    `,
    timestamp: new Date('2024-01-15T14:30:00Z'),
    read: false,
    starred: true,
    archived: false,
    labels: ['work', 'important'],
    folder: 'inbox',
    attachments: [
      {
        id: 'att-001',
        name: 'Project_Timeline_Q1_2024.pdf',
        size: '2.4 MB',
        type: 'application/pdf',
        url: '#'
      }
    ],
    priority: 'high',
    thread: ['email-001']
  },
  {
    id: 'email-002',
    from: {
      name: 'Michael Chen',
      email: 'michael.chen@designstudio.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    to: [{ name: 'John Doe', email: 'john.doe@email.com' }],
    cc: [],
    bcc: [],
    subject: 'UI Design Mockups Ready for Review',
    body: `
      <p>Hey John!</p>
      
      <p>I've completed the UI design mockups for the new dashboard interface. Here's what I've prepared:</p>
      
      <h3>Design Deliverables:</h3>
      <ol>
        <li><strong>Dashboard Overview</strong> - Main analytics view</li>
        <li><strong>User Management</strong> - Admin panel designs</li>
        <li><strong>Settings Pages</strong> - Configuration interfaces</li>
        <li><strong>Mobile Responsive</strong> - Tablet and phone layouts</li>
      </ol>
      
      <h3>Key Features Highlighted:</h3>
      <ul>
        <li>🎨 Modern, clean aesthetic following Material Design 3</li>
        <li>📱 Fully responsive across all device sizes</li>
        <li>♿ WCAG 2.1 AA accessibility compliance</li>
        <li>🌙 Dark mode support</li>
        <li>⚡ Optimized for performance and fast loading</li>
      </ul>
      
      <p>I've uploaded all files to the shared Figma workspace. Please review and let me know your thoughts. I'm particularly interested in your feedback on the color scheme and navigation structure.</p>
      
      <p>Available for a design review call this week if needed!</p>
      
      <p>Cheers,<br/>Michael</p>
    `,
    timestamp: new Date('2024-01-15T11:15:00Z'),
    read: false,
    starred: false,
    archived: false,
    labels: ['work'],
    folder: 'inbox',
    attachments: [
      {
        id: 'att-002',
        name: 'Dashboard_Mockups_v2.1.zip',
        size: '15.8 MB',
        type: 'application/zip',
        url: '#'
      },
      {
        id: 'att-003',
        name: 'Design_Specifications.pdf',
        size: '4.2 MB',
        type: 'application/pdf',
        url: '#'
      }
    ],
    priority: 'medium',
    thread: ['email-002']
  },
  {
    id: 'email-003',
    from: {
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@marketing.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    to: [{ name: 'John Doe', email: 'john.doe@email.com' }],
    cc: [
      { name: 'Sarah Johnson', email: 'sarah.johnson@techcorp.com' },
      { name: 'Marketing Team', email: 'marketing@techcorp.com' }
    ],
    bcc: [],
    subject: 'Q1 Marketing Campaign Strategy Discussion',
    body: `
      <p>Hi John and Sarah,</p>
      
      <p>I hope you're both doing well! As we approach the Q1 campaign launch, I wanted to schedule a strategy alignment meeting.</p>
      
      <h3>Meeting Agenda:</h3>
      <ol>
        <li><strong>Campaign Objectives Review</strong> (15 minutes)</li>
        <li><strong>Target Audience Analysis</strong> (20 minutes)</li>
        <li><strong>Channel Strategy Discussion</strong> (25 minutes)</li>
        <li><strong>Budget Allocation</strong> (15 minutes)</li>
        <li><strong>Timeline Coordination</strong> (10 minutes)</li>
        <li><strong>Q&A and Next Steps</strong> (15 minutes)</li>
      </ol>
      
      <h3>Proposed Meeting Times:</h3>
      <ul>
        <li>📅 <strong>Option 1:</strong> Wednesday, Jan 17 at 2:00 PM EST</li>
        <li>📅 <strong>Option 2:</strong> Thursday, Jan 18 at 10:00 AM EST</li>
        <li>📅 <strong>Option 3:</strong> Friday, Jan 19 at 3:00 PM EST</li>
      </ul>
      
      <p><strong>Pre-meeting Preparation:</strong></p>
      <ul>
        <li>Review attached campaign brief</li>
        <li>Prepare any technical requirements or constraints</li>
        <li>Consider integration points with product launch timeline</li>
      </ul>
      
      <p>Please let me know which time works best for both of you. Looking forward to collaborating on this exciting campaign!</p>
      
      <p>Best,<br/>Emily<br/>
      <em>Marketing Director</em><br/>
      📞 (555) 123-4567 | 📧 emily.rodriguez@marketing.com</p>
    `,
    timestamp: new Date('2024-01-15T09:45:00Z'),
    read: true,
    starred: false,
    archived: false,
    labels: ['work', 'follow-up'],
    folder: 'inbox',
    attachments: [
      {
        id: 'att-004',
        name: 'Q1_Campaign_Brief_2024.docx',
        size: '1.8 MB',
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        url: '#'
      }
    ],
    priority: 'medium',
    thread: ['email-003']
  },
  {
    id: 'email-004',
    from: {
      name: 'Netflix',
      email: 'info@netflix.com',
      avatar: 'https://cdn.worldvectorlogo.com/logos/netflix-2.svg'
    },
    to: [{ name: 'John Doe', email: 'john.doe@email.com' }],
    cc: [],
    bcc: [],
    subject: 'New releases this week on Netflix',
    body: `
      <div style="background-color: #000; color: #fff; padding: 20px; font-family: Arial, sans-serif;">
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="https://cdn.worldvectorlogo.com/logos/netflix-2.svg" alt="Netflix" style="height: 40px;">
        </div>
        
        <h1 style="color: #e50914; text-align: center; margin-bottom: 30px;">This Week's New Releases</h1>
        
        <div style="margin-bottom: 30px;">
          <h2 style="color: #fff; border-bottom: 2px solid #e50914; padding-bottom: 10px;">🎬 New Movies</h2>
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 15px; padding: 15px; background-color: #141414; border-radius: 8px;">
              <strong style="color: #e50914;">The Night Agent: Bangkok</strong><br/>
              <span style="color: #ccc;">Action Thriller • 2024 • 2h 8m</span><br/>
              <span style="color: #999;">An FBI agent uncovers a conspiracy while on a mission in Thailand.</span>
            </li>
            <li style="margin-bottom: 15px; padding: 15px; background-color: #141414; border-radius: 8px;">
              <strong style="color: #e50914;">Love Actually 2: All You Need</strong><br/>
              <span style="color: #ccc;">Romantic Comedy • 2024 • 1h 52m</span><br/>
              <span style="color: #999;">The beloved ensemble cast returns for another heartwarming holiday tale.</span>
            </li>
          </ul>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h2 style="color: #fff; border-bottom: 2px solid #e50914; padding-bottom: 10px;">📺 New Series</h2>
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 15px; padding: 15px; background-color: #141414; border-radius: 8px;">
              <strong style="color: #e50914;">Silicon Valley Secrets</strong><br/>
              <span style="color: #ccc;">Tech Drama • Season 1 • 8 Episodes</span><br/>
              <span style="color: #999;">Behind-the-scenes drama at a fictional tech giant.</span>
            </li>
          </ul>
        </div>
        
        <div style="text-align: center; margin-top: 40px;">
          <a href="#" style="background-color: #e50914; color: #fff; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">Watch Now</a>
        </div>
        
        <div style="text-align: center; margin-top: 30px; color: #666; font-size: 12px;">
          <p>You're receiving this because you're subscribed to Netflix updates.</p>
          <p><a href="#" style="color: #666;">Unsubscribe</a> | <a href="#" style="color: #666;">Update Preferences</a></p>
        </div>
      </div>
    `,
    timestamp: new Date('2024-01-15T08:00:00Z'),
    read: true,
    starred: false,
    archived: false,
    labels: ['newsletters'],
    folder: 'inbox',
    attachments: [],
    priority: 'low',
    thread: ['email-004']
  },
  {
    id: 'email-005',
    from: {
      name: 'David Kim',
      email: 'david.kim@startup.io',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    },
    to: [{ name: 'John Doe', email: 'john.doe@email.com' }],
    cc: [],
    bcc: [],
    subject: 'Partnership Opportunity - AI Integration Project',
    body: `
      <p>Dear John,</p>
      
      <p>I hope this message finds you in good health and high spirits. My name is David Kim, and I'm the CEO of Startup Innovations, a cutting-edge AI technology company.</p>
      
      <p>I've been following your work in software engineering and was particularly impressed by your recent contributions to the TechCorp mobile application. Your expertise in scalable architecture and innovative problem-solving approaches align perfectly with a project we're developing.</p>
      
      <h3>🚀 Project Overview: AI-Powered Developer Assistant</h3>
      <p>We're building an AI assistant specifically designed for software developers that can:</p>
      <ul>
        <li><strong>Code Generation:</strong> Intelligent code completion and generation</li>
        <li><strong>Bug Detection:</strong> Real-time code analysis and issue identification</li>
        <li><strong>Performance Optimization:</strong> Automated suggestions for code efficiency</li>
        <li><strong>Documentation:</strong> Automatic generation of code documentation</li>
        <li><strong>Testing:</strong> Intelligent test case generation and execution</li>
      </ul>
      
      <h3>💼 Collaboration Opportunity</h3>
      <p>We're seeking experienced developers to join our beta testing program and potentially explore long-term partnership opportunities. This could involve:</p>
      <ul>
        <li>Technical consultation and feedback</li>
        <li>Integration expertise for enterprise environments</li>
        <li>Potential equity participation for key contributors</li>
        <li>Flexible remote collaboration options</li>
      </ul>
      
      <h3>📈 Market Potential</h3>
      <p>Our preliminary market research indicates:</p>
      <ul>
        <li>$50B+ global developer tools market</li>
        <li>Growing demand for AI-assisted development</li>
        <li>Early-stage funding already secured ($2.5M seed round)</li>
        <li>Strategic partnerships with major cloud providers in discussion</li>
      </ul>
      
      <p>I'd love to schedule a brief 30-minute call to discuss this opportunity further. Are you available for a conversation this week or next?</p>
      
      <p>Looking forward to hearing from you!</p>
      
      <p>Best regards,<br/>
      David Kim<br/>
      <em>CEO & Founder</em><br/>
      Startup Innovations<br/>
      📱 +1 (555) 987-6543<br/>
      🌐 <a href="https://startup.io">startup.io</a><br/>
      📍 San Francisco, CA</p>
    `,
    timestamp: new Date('2024-01-14T16:20:00Z'),
    read: false,
    starred: true,
    archived: false,
    labels: ['work', 'important'],
    folder: 'inbox',
    attachments: [
      {
        id: 'att-005',
        name: 'Startup_Innovations_Pitch_Deck.pdf',
        size: '8.5 MB',
        type: 'application/pdf',
        url: '#'
      },
      {
        id: 'att-006',
        name: 'AI_Assistant_Technical_Specs.docx',
        size: '3.2 MB',
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        url: '#'
      }
    ],
    priority: 'high',
    thread: ['email-005']
  },
  {
    id: 'email-006',
    from: {
      name: 'Amazon',
      email: 'shipment-tracking@amazon.com',
      avatar: 'https://cdn.worldvectorlogo.com/logos/amazon-icon-1.svg'
    },
    to: [{ name: 'John Doe', email: 'john.doe@email.com' }],
    cc: [],
    bcc: [],
    subject: 'Your package has been delivered - Order #112-7834567-8901234',
    body: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #232F3E; padding: 20px; text-align: center;">
          <img src="https://cdn.worldvectorlogo.com/logos/amazon-icon-1.svg" alt="Amazon" style="height: 40px;">
        </div>
        
        <div style="padding: 30px; background-color: #f9f9f9;">
          <h1 style="color: #232F3E; margin-bottom: 20px;">📦 Package Delivered!</h1>
          
          <div style="background-color: #fff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #007600; margin-top: 0;">✅ Delivered Today</h2>
            <p><strong>Delivery Time:</strong> 2:34 PM</p>
            <p><strong>Delivered to:</strong> Front door</p>
            <p><strong>Order #:</strong> 112-7834567-8901234</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin-top: 0; color: #232F3E;">📱 Items in this shipment:</h3>
            <div style="border-bottom: 1px solid #e7e7e7; padding-bottom: 15px; margin-bottom: 15px;">
              <strong>Apple AirPods Pro (2nd Generation)</strong><br/>
              <span style="color: #666;">Quantity: 1</span><br/>
              <span style="color: #666;">Price: $249.00</span>
            </div>
            <div>
              <strong>Anker Portable Charger, PowerCore 10000</strong><br/>
              <span style="color: #666;">Quantity: 1</span><br/>
              <span style="color: #666;">Price: $29.99</span>
            </div>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin-top: 0; color: #232F3E;">📋 Order Summary:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 5px 0;">Items Subtotal:</td>
                <td style="text-align: right;">$278.99</td>
              </tr>
              <tr>
                <td style="padding: 5px 0;">Shipping & Handling:</td>
                <td style="text-align: right;">FREE</td>
              </tr>
              <tr>
                <td style="padding: 5px 0;">Tax:</td>
                <td style="text-align: right;">$22.32</td>
              </tr>
              <tr style="border-top: 1px solid #e7e7e7; font-weight: bold;">
                <td style="padding: 10px 0 5px 0;">Order Total:</td>
                <td style="text-align: right; padding: 10px 0 5px 0;">$301.31</td>
              </tr>
            </table>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="#" style="background-color: #ff9900; color: #000; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">Track Package</a>
            <a href="#" style="background-color: #232F3E; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-left: 10px;">Leave Feedback</a>
          </div>
          
          <div style="color: #666; font-size: 12px; text-align: center;">
            <p>Need help with your order? Visit our <a href="#" style="color: #0066cc;">Help Center</a></p>
            <p>This email was sent from a notification-only address that cannot accept incoming email.</p>
          </div>
        </div>
      </div>
    `,
    timestamp: new Date('2024-01-14T14:34:00Z'),
    read: true,
    starred: false,
    archived: false,
    labels: ['shopping'],
    folder: 'inbox',
    attachments: [],
    priority: 'low',
    thread: ['email-006']
  }
];

// Add more emails to create a comprehensive database
const additionalEmails = [
  // Financial emails
  {
    id: 'email-007',
    from: {
      name: 'Chase Bank',
      email: 'alerts@chase.com',
      avatar: 'https://cdn.worldvectorlogo.com/logos/chase-1.svg'
    },
    to: [{ name: 'John Doe', email: 'john.doe@email.com' }],
    cc: [],
    bcc: [],
    subject: 'Your January Statement is Ready',
    body: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f5f5f5;">
        <div style="background-color: #005bbf; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Chase Bank</h1>
        </div>
        
        <div style="padding: 30px; background-color: white;">
          <h2 style="color: #005bbf;">📊 Your Statement is Ready</h2>
          
          <p>Dear John Doe,</p>
          
          <p>Your January 2024 statement for account ending in 4567 is now available.</p>
          
          <div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #005bbf;">Account Summary</h3>
            <table style="width: 100%;">
              <tr>
                <td>Previous Balance:</td>
                <td style="text-align: right; font-weight: bold;">$3,247.83</td>
              </tr>
              <tr>
                <td>Deposits & Credits:</td>
                <td style="text-align: right; color: green;">+ $4,250.00</td>
              </tr>
              <tr>
                <td>Withdrawals & Debits:</td>
                <td style="text-align: right; color: red;">- $2,189.45</td>
              </tr>
              <tr style="border-top: 1px solid #ccc;">
                <td><strong>Current Balance:</strong></td>
                <td style="text-align: right; font-weight: bold; font-size: 18px;">$5,308.38</td>
              </tr>
            </table>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="#" style="background-color: #005bbf; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px;">View Full Statement</a>
          </div>
          
          <p style="color: #666; font-size: 12px;">This is an automated message. Please do not reply to this email.</p>
        </div>
      </div>
    `,
    timestamp: new Date('2024-01-14T10:00:00Z'),
    read: true,
    starred: false,
    archived: false,
    labels: ['finance'],
    folder: 'inbox',
    attachments: [
      {
        id: 'att-007',
        name: 'January_2024_Statement.pdf',
        size: '1.2 MB',
        type: 'application/pdf',
        url: '#'
      }
    ],
    priority: 'medium',
    thread: ['email-007']
  },

  // More work emails
  {
    id: 'email-008',
    from: {
      name: 'Jennifer Miller',
      email: 'jennifer.miller@techcorp.com',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face'
    },
    to: [{ name: 'John Doe', email: 'john.doe@email.com' }],
    cc: [{ name: 'Sarah Johnson', email: 'sarah.johnson@techcorp.com' }],
    bcc: [],
    subject: 'Code Review Request - Authentication Module',
    body: `
      <p>Hi John,</p>
      
      <p>I've completed the authentication module for our new user management system and would appreciate your review.</p>
      
      <h3>🔧 Changes Made:</h3>
      <ul>
        <li><strong>JWT Token Implementation:</strong> Secure token-based authentication</li>
        <li><strong>Password Hashing:</strong> bcrypt implementation with salt rounds</li>
        <li><strong>Rate Limiting:</strong> Protection against brute force attacks</li>
        <li><strong>Multi-factor Authentication:</strong> TOTP support for enhanced security</li>
        <li><strong>Session Management:</strong> Secure session handling and cleanup</li>
      </ul>
      
      <h3>📋 Review Checklist:</h3>
      <ul>
        <li>Security best practices compliance</li>
        <li>Error handling and edge cases</li>
        <li>Performance considerations</li>
        <li>Code documentation and comments</li>
        <li>Unit test coverage</li>
      </ul>
      
      <p><strong>Priority:</strong> High - needed for next sprint</p>
      <p><strong>Deadline:</strong> January 18, 2024</p>
      
      <p>The pull request is ready at: <a href="#">PR #247 - Authentication Module</a></p>
      
      <p>Please let me know if you have any questions or need clarification on any implementation details.</p>
      
      <p>Thanks for your time!</p>
      
      <p>Best regards,<br/>
      Jennifer Miller<br/>
      <em>Backend Developer</em><br/>
      TechCorp Solutions</p>
    `,
    timestamp: new Date('2024-01-13T15:20:00Z'),
    read: false,
    starred: true,
    archived: false,
    labels: ['work', 'urgent'],
    folder: 'inbox',
    attachments: [],
    priority: 'high',
    thread: ['email-008']
  },

  // Social emails
  {
    id: 'email-009',
    from: {
      name: 'LinkedIn',
      email: 'notifications@linkedin.com',
      avatar: 'https://cdn.worldvectorlogo.com/logos/linkedin-icon-2.svg'
    },
    to: [{ name: 'John Doe', email: 'john.doe@email.com' }],
    cc: [],
    bcc: [],
    subject: 'You have 5 new profile views this week',
    body: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #0077b5; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">LinkedIn</h1>
        </div>
        
        <div style="padding: 30px; background-color: white;">
          <h2 style="color: #0077b5;">👀 Your Profile This Week</h2>
          
          <p>Hi John,</p>
          
          <p>Your profile is gaining attention! Here's your weekly summary:</p>
          
          <div style="background-color: #f3f6f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
              <span>Profile views:</span>
              <strong style="color: #0077b5;">5 (+25%)</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
              <span>Search appearances:</span>
              <strong style="color: #0077b5;">12 (+15%)</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Post views:</span>
              <strong style="color: #0077b5;">89 (+45%)</strong>
            </div>
          </div>
          
          <h3>🔍 Who's been viewing your profile:</h3>
          <ul>
            <li>Tech Recruiter at Google</li>
            <li>Senior Engineer at Microsoft</li>
            <li>Startup Founder in San Francisco</li>
            <li>Product Manager at Meta</li>
            <li>CTO at emerging fintech company</li>
          </ul>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="#" style="background-color: #0077b5; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px;">View Full Analytics</a>
          </div>
          
          <p style="color: #666; font-size: 12px;">To stop receiving these updates, update your email preferences.</p>
        </div>
      </div>
    `,
    timestamp: new Date('2024-01-13T09:30:00Z'),
    read: true,
    starred: false,
    archived: false,
    labels: ['social'],
    folder: 'inbox',
    attachments: [],
    priority: 'low',
    thread: ['email-009']
  },

  // Travel emails
  {
    id: 'email-010',
    from: {
      name: 'Expedia',
      email: 'confirmations@expedia.com',
      avatar: 'https://cdn.worldvectorlogo.com/logos/expedia-1.svg'
    },
    to: [{ name: 'John Doe', email: 'john.doe@email.com' }],
    cc: [],
    bcc: [],
    subject: 'Your San Francisco Trip Confirmation - Booking #EXP789456',
    body: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #003580; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">✈️ Trip Confirmed!</h1>
        </div>
        
        <div style="padding: 30px; background-color: white;">
          <h2 style="color: #003580;">Your San Francisco Adventure Awaits</h2>
          
          <p>Hi John,</p>
          
          <p>Great news! Your San Francisco trip is all set. Here are your confirmation details:</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #003580;">
            <h3 style="margin-top: 0; color: #003580;">🏨 Hotel Booking</h3>
            <p><strong>Hotel:</strong> The Westin St. Francis San Francisco</p>
            <p><strong>Address:</strong> 335 Powell St, San Francisco, CA 94102</p>
            <p><strong>Check-in:</strong> March 15, 2024 (3:00 PM)</p>
            <p><strong>Check-out:</strong> March 18, 2024 (11:00 AM)</p>
            <p><strong>Room:</strong> Deluxe King Room with City View</p>
            <p><strong>Guests:</strong> 1 Adult</p>
            <p><strong>Confirmation:</strong> WSF123456789</p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #003580;">
            <h3 style="margin-top: 0; color: #003580;">✈️ Flight Details</h3>
            <p><strong>Outbound:</strong> March 15, 2024</p>
            <p>United Airlines UA 1234 | 8:30 AM - 10:45 AM</p>
            <p>New York (JFK) → San Francisco (SFO)</p>
            <br>
            <p><strong>Return:</strong> March 18, 2024</p>
            <p>United Airlines UA 5678 | 6:15 PM - 11:30 PM</p>
            <p>San Francisco (SFO) → New York (JFK)</p>
            <p><strong>Confirmation:</strong> UA987654321</p>
          </div>
          
          <h3>🌟 Trip Recommendations:</h3>
          <ul>
            <li>Visit the Golden Gate Bridge at sunset</li>
            <li>Explore Fisherman's Wharf and Pier 39</li>
            <li>Take a cable car ride through the city</li>
            <li>Tour Alcatraz Island (book in advance!)</li>
            <li>Experience the vibrant food scene in Chinatown</li>
          </ul>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="#" style="background-color: #003580; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; margin-right: 10px;">View Full Itinerary</a>
            <a href="#" style="background-color: #28a745; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px;">Check-in Online</a>
          </div>
          
          <p><strong>Total Cost:</strong> $1,247.50</p>
          <p><strong>Booking Reference:</strong> EXP789456</p>
          
          <p>Have an amazing trip!</p>
          
          <p>The Expedia Team</p>
        </div>
      </div>
    `,
    timestamp: new Date('2024-01-12T14:15:00Z'),
    read: false,
    starred: true,
    archived: false,
    labels: ['travel', 'important'],
    folder: 'inbox',
    attachments: [
      {
        id: 'att-008',
        name: 'SF_Trip_Confirmation.pdf',
        size: '892 KB',
        type: 'application/pdf',
        url: '#'
      },
      {
        id: 'att-009',
        name: 'Flight_Tickets.pdf',
        size: '445 KB',
        type: 'application/pdf',
        url: '#'
      }
    ],
    priority: 'medium',
    thread: ['email-010']
  }
];

// Extend emails array
emails.push(...additionalEmails);

// Draft emails
export const drafts = [
  {
    id: 'draft-001',
    to: [{ name: 'Sarah Johnson', email: 'sarah.johnson@techcorp.com' }],
    cc: [],
    bcc: [],
    subject: 'Re: Project Timeline Update - Mobile App Release',
    body: `
      <p>Hi Sarah,</p>
      
      <p>Thank you for the detailed timeline update. This looks very promising!</p>
      
      <p>A few quick questions:</p>
      <ul>
        <li>Do we have contingency plans if the Android beta reveals any major issues?</li>
        <li>Has the marketing team reviewed the February 15 launch date?</li>
        <li>Should we schedule a go/no-go meeting for February 1st?</li>
      </ul>
      
      <p>Looking forward to discussing this further.</p>
      
      <p>Best,<br/>John</p>
    `,
    timestamp: new Date('2024-01-15T15:45:00Z'),
    labels: ['work']
  },
  {
    id: 'draft-002',
    to: [{ name: 'David Kim', email: 'david.kim@startup.io' }],
    cc: [],
    bcc: [],
    subject: 'Re: Partnership Opportunity - AI Integration Project',
    body: `
      <p>Hi David,</p>
      
      <p>Thank you for reaching out about the AI developer assistant project. The concept sounds fascinating and aligns well with current industry trends.</p>
      
      <p>I'd be interested in learning more about:</p>
      <ul>
        <li>The underlying AI technology and models you're using</li>
        <li>Current development stage and timeline</li>
        <li>Expected commitment level for beta testing</li>
        <li>Integration requirements with existing development workflows</li>
      </ul>
      
      <p>I'm available for a call next week. Please let me know what time works best for you.</p>
      
      <p>Best regards,<br/>John</p>
    `,
    timestamp: new Date('2024-01-15T16:20:00Z'),
    labels: ['work', 'important']
  }
];

// Sent emails
export const sentEmails = [
  {
    id: 'sent-001',
    from: {
      name: 'John Doe',
      email: 'john.doe@email.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    to: [{ name: 'Lisa Anderson', email: 'lisa.anderson@university.edu' }],
    cc: [],
    bcc: [],
    subject: 'Guest Lecture Availability - Software Architecture',
    body: `
      <p>Dear Professor Anderson,</p>
      
      <p>I hope this email finds you well. I wanted to follow up on our previous conversation about guest lectures for your Software Engineering course.</p>
      
      <p>I would be delighted to give a guest lecture on "Scalable Software Architecture in Modern Applications." Based on my experience at TechCorp, I could cover:</p>
      
      <ul>
        <li><strong>Microservices Architecture:</strong> Design patterns and best practices</li>
        <li><strong>Cloud-Native Development:</strong> Building for scalability and resilience</li>
        <li><strong>Performance Optimization:</strong> Real-world case studies</li>
        <li><strong>Team Collaboration:</strong> Agile development in large teams</li>
      </ul>
      
      <p><strong>Available Dates (tentative):</strong></p>
      <ul>
        <li>February 14th (Wednesday) - 2:00 PM to 4:00 PM</li>
        <li>February 21st (Wednesday) - 2:00 PM to 4:00 PM</li>
        <li>March 7th (Thursday) - 1:00 PM to 3:00 PM</li>
      </ul>
      
      <p>I'm flexible with the format - whether it's a traditional lecture, workshop, or Q&A session. I can also provide students with real project examples and potential internship opportunities at TechCorp.</p>
      
      <p>Please let me know if any of these dates work for your schedule, and if you'd like me to prepare any specific materials.</p>
      
      <p>Looking forward to contributing to your students' learning experience!</p>
      
      <p>Best regards,<br/>
      John Doe<br/>
      Senior Software Engineer<br/>
      TechCorp Solutions<br/>
      📧 john.doe@email.com<br/>
      📱 +1 (555) 123-4567</p>
    `,
    timestamp: new Date('2024-01-13T11:30:00Z'),
    read: true,
    starred: false,
    archived: false,
    labels: ['work', 'personal'],
    folder: 'sent',
    attachments: [],
    priority: 'medium',
    thread: ['sent-001']
  }
];

// Utility functions for email management
export const getEmailById = (emailId) => {
  return emails.find(email => email.id === emailId) || 
         drafts.find(draft => draft.id === emailId) ||
         sentEmails.find(sent => sent.id === emailId);
};

export const getEmailsByFolder = (folderId) => {
  switch (folderId) {
    case 'inbox':
      return emails.filter(email => email.folder === 'inbox' && !email.archived);
    case 'starred':
      return emails.filter(email => email.starred);
    case 'sent':
      return sentEmails;
    case 'drafts':
      return drafts;
    case 'trash':
      return emails.filter(email => email.folder === 'trash');
    case 'spam':
      return emails.filter(email => email.folder === 'spam');
    case 'archive':
      return emails.filter(email => email.archived);
    default:
      return [];
  }
};

export const getEmailsByLabel = (labelId) => {
  return emails.filter(email => email.labels && email.labels.includes(labelId));
};

export const searchEmails = (query) => {
  const searchTerm = query.toLowerCase();
  return emails.filter(email => 
    email.subject.toLowerCase().includes(searchTerm) ||
    email.body.toLowerCase().includes(searchTerm) ||
    email.from.name.toLowerCase().includes(searchTerm) ||
    email.from.email.toLowerCase().includes(searchTerm)
  );
};

export const getUnreadCount = () => {
  return emails.filter(email => !email.read && email.folder === 'inbox').length;
};

export const getStarredCount = () => {
  return emails.filter(email => email.starred).length;
};

export const markAsRead = (emailId) => {
  const email = emails.find(e => e.id === emailId);
  if (email) {
    email.read = true;
  }
};

export const markAsUnread = (emailId) => {
  const email = emails.find(e => e.id === emailId);
  if (email) {
    email.read = false;
  }
};

export const toggleStar = (emailId) => {
  const email = emails.find(e => e.id === emailId);
  if (email) {
    email.starred = !email.starred;
  }
};

export const moveToFolder = (emailId, folderId) => {
  const email = emails.find(e => e.id === emailId);
  if (email) {
    email.folder = folderId;
    if (folderId === 'archive') {
      email.archived = true;
    }
  }
};

export const addLabel = (emailId, labelId) => {
  const email = emails.find(e => e.id === emailId);
  if (email && email.labels && !email.labels.includes(labelId)) {
    email.labels.push(labelId);
  }
};

export const removeLabel = (emailId, labelId) => {
  const email = emails.find(e => e.id === emailId);
  if (email && email.labels) {
    email.labels = email.labels.filter(l => l !== labelId);
  }
};

export const getRecentContacts = (limit = 10) => {
  return contacts
    .sort((a, b) => new Date(b.lastContactDate) - new Date(a.lastContactDate))
    .slice(0, limit);
};

export const formatEmailDate = (timestamp) => {
  const now = new Date();
  const emailDate = new Date(timestamp);
  const diffInHours = (now - emailDate) / (1000 * 60 * 60);
  
  if (diffInHours < 24) {
    return emailDate.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
  } else if (diffInHours < 168) { // Less than a week
    return emailDate.toLocaleDateString('en-US', { weekday: 'short' });
  } else {
    return emailDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  }
};

const staticEmailData = {
  currentUser,
  contacts,
  labels,
  folders,
  emails,
  drafts,
  sentEmails,
  getEmailById,
  getEmailsByFolder,
  getEmailsByLabel,
  searchEmails,
  getUnreadCount,
  getStarredCount,
  markAsRead,
  markAsUnread,
  toggleStar,
  moveToFolder,
  addLabel,
  removeLabel,
  getRecentContacts,
  formatEmailDate
};

export default staticEmailData;
