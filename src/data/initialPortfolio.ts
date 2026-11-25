import { PortfolioState } from '../types/portfolio';

export const initialPortfolioState: PortfolioState = {
  profile: {
    firstName: 'Gehad',
    lastName: 'Zaghlol',
    roleTitle: 'Software & Flutter Developer',
    bio: 'Motivated Information Technology student passionate about Flutter, web development, networking, and building innovative software solutions.',
    aboutSummary:
      'Motivated Information Technology student seeking opportunities in Software Development. Passionate about Flutter and mobile app development, web development, networking, and database systems. Eager to apply technical skills, contribute to real-world projects, and continuously learn new technologies.',
    education: 'Bachelor of Information Technology (Third Year)',
    institution: 'Faculty of Industrial Technology and Energy, Fayoum',
    educationDuration: '10/2024 - Present',
    location: 'Fayoum, Egypt',
    languages: 'Arabic (Native) · English (Good Command)',
    strengths: 'Fast learner · Problem solver · Team player',
    availability: 'Open to Internships & Collaborations',
    email: 'gehadzaghlol726@gmail.com',
    phone: '01067755017',
    whatsapp: '+201067755017',
    githubUrl: 'https://github.com/gehadzaghlol726-ship-it',
    linkedinUrl: 'https://www.linkedin.com/in/gehad-zaghlol-443456373/',
    portraitUrl: '/assets/aistudio/WhatsApp_Image_2026-11-25_at_2.17.10_PM_802712c2.jpeg',
    cvUrl: '',
  },
  certifications: [
    {
      id: 'cert-1',
      title: 'Flutter Development Course',
      issuer: 'National Telecommunication Institute (NTI)',
      period: 'Certified Program',
      focus:
        'Cross-platform mobile application engineering with Dart, Flutter widget architecture, state management, REST APIs, and responsive UI systems.',
      category: 'Mobile',
    },
    {
      id: 'cert-2',
      title: 'Web Development Course',
      issuer: 'Web Design & Development Fundamentals',
      period: '07/2025 - 12/2025',
      focus:
        'Modern web design principles, semantic HTML5, responsive CSS3/Tailwind layouts, interactive JavaScript, and frontend architecture fundamentals.',
      category: 'Web',
    },
    {
      id: 'cert-3',
      title: 'Internet of Things (IoT) Course',
      issuer: 'Technical Training Program',
      period: 'Completed',
      focus:
        'Connected embedded systems, sensor integration, IoT communication protocols, and bridging hardware telemetry with software applications.',
      category: 'Hardware & IoT',
    },
    {
      id: 'cert-4',
      title: 'Linux Course',
      issuer: 'Systems & Administration Track',
      period: 'Completed',
      focus:
        'Linux command-line proficiency, file system management, permissions, shell scripting basics, process control, and networking utilities.',
      category: 'Systems & OS',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Smart Car Project (Arduino)',
      category: 'IoT & Hardware',
      summary:
        'Designed and programmed an autonomous smart car using sensors and servos to detect obstacles and navigate.',
      description:
        'Engineered and programmed an autonomous robotic vehicle using Arduino and C++. Integrated ultrasonic distance sensors and servo actuators for real-time obstacle scanning, path clearance evaluation, and responsive directional navigation.',
      stack: ['Arduino', 'C++', 'Sensors', 'Servos'],
      year: '05/2025 - 11/2025',
      repoUrl: 'https://github.com/gehadzaghlol726-ship-it',
      liveUrl: 'https://github.com/gehadzaghlol726-ship-it',
      featured: true,
      imageUrl: '/assets/aistudio/Screenshot_2025-07-09_231626_85d6f681.png',
    },
    {
      id: 'proj-2',
      title: 'Restaurant Management Website',
      category: 'Web',
      summary:
        'Full-stack restaurant website featuring interactive menu management and database connectivity.',
      description:
        'Developed a responsive full-stack restaurant platform with interactive menu browsing, category filtering, order handling, and dynamic MySQL database connectivity powered by PHP.',
      stack: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
      year: '2025',
      repoUrl: 'https://github.com/gehadzaghlol726-ship-it',
      liveUrl: 'https://github.com/gehadzaghlol726-ship-it',
      featured: true,
    },
    {
      id: 'proj-3',
      title: 'Enterprise Network Design',
      category: 'Networking',
      summary:
        'Designed and configured a multi-department network topology including VLANs, Router-on-a-Stick, Static Routing, Trunk Links, and Port Security.',
      description:
        'Built and verified a segmented multi-department enterprise network in Cisco Packet Tracer. Configured department VLANs, 802.1Q trunk links, Router-on-a-Stick inter-VLAN routing, static routes across routers, and switch port security policies.',
      stack: ['Cisco Packet Tracer', 'Networking'],
      year: '2025',
      repoUrl: 'https://github.com/gehadzaghlol726-ship-it',
      liveUrl: 'https://github.com/gehadzaghlol726-ship-it',
      featured: true,
      imageUrl: '/assets/aistudio/Screenshot_2026-11-25_150933_82b06685.jpeg',
    },
  ],
  skills: [
    // 1. Programming Languages
    { id: 'sk-1', name: 'C', category: 'Programming Languages', level: 85 },
    { id: 'sk-2', name: 'C++', category: 'Programming Languages', level: 85 },
    { id: 'sk-3', name: 'Python', category: 'Programming Languages', level: 84 },
    { id: 'sk-4', name: 'Java', category: 'Programming Languages', level: 82 },
    { id: 'sk-5', name: 'JavaScript', category: 'Programming Languages', level: 88 },
    { id: 'sk-6', name: 'PHP', category: 'Programming Languages', level: 82 },
    { id: 'sk-7', name: 'SQL', category: 'Programming Languages', level: 86 },

    // 2. Mobile Development
    { id: 'sk-8', name: 'Flutter (NTI Certified)', category: 'Mobile Development', level: 92 },
    { id: 'sk-9', name: 'Dart Basics', category: 'Mobile Development', level: 88 },

    // 3. Web Development
    { id: 'sk-10', name: 'HTML5', category: 'Web Development', level: 94 },
    { id: 'sk-11', name: 'CSS3', category: 'Web Development', level: 92 },
    { id: 'sk-12', name: 'JavaScript', category: 'Web Development', level: 88 },
    { id: 'sk-13', name: 'PHP', category: 'Web Development', level: 82 },
    { id: 'sk-14', name: 'Responsive Web Design', category: 'Web Development', level: 92 },

    // 4. Databases
    { id: 'sk-15', name: 'MySQL', category: 'Databases', level: 88 },
    { id: 'sk-16', name: 'SQL', category: 'Databases', level: 86 },
    { id: 'sk-17', name: 'Database Design', category: 'Databases', level: 85 },

    // 5. Networking
    { id: 'sk-18', name: 'Cisco Packet Tracer', category: 'Networking', level: 88 },
    { id: 'sk-19', name: 'VLAN', category: 'Networking', level: 85 },
    { id: 'sk-20', name: 'Static Routing', category: 'Networking', level: 84 },
    { id: 'sk-21', name: 'Router-on-a-Stick', category: 'Networking', level: 82 },
    { id: 'sk-22', name: 'Basic Network Configuration', category: 'Networking', level: 86 },

    // 6. Tools & Hardware
    { id: 'sk-23', name: 'Visual Studio Code', category: 'Tools & Hardware', level: 94 },
    { id: 'sk-24', name: 'Android Studio', category: 'Tools & Hardware', level: 88 },
    { id: 'sk-25', name: 'Arduino IDE', category: 'Tools & Hardware', level: 84 },
    { id: 'sk-26', name: 'XAMPP', category: 'Tools & Hardware', level: 86 },
    { id: 'sk-27', name: 'Arduino', category: 'Tools & Hardware', level: 84 },
    { id: 'sk-28', name: 'Basic Hardware Knowledge', category: 'Tools & Hardware', level: 82 },
  ],
  posts: [
    {
      id: 'post-1',
      title: 'Getting Started with Flutter State Management',
      category: 'Mobile Development',
      date: 'November 2026',
      readTime: '5 min read',
      excerpt:
        'A practical guide to choosing between setState, Provider, and structured state patterns as your Flutter app grows.',
      content:
        'In Flutter, everything on screen is driven by widget state. While setState works smoothly for local UI interactions like toggling a tab or animating a button, larger screens benefit from lifting shared state into dedicated controllers or Providers.\n\nBy keeping business logic separate from widget build methods, your UI stays declarative, easier to test, and predictable across navigation flows. Start simple with ChangeNotifier or Riverpod, and focus on clean unidirectional data flow from the very first screen.',
    },
    {
      id: 'post-2',
      title: 'Understanding VLANs & Router-on-a-Stick',
      category: 'Networking',
      date: 'October 2026',
      readTime: '6 min read',
      excerpt:
        'How virtual LAN segmentation, 802.1Q trunking, and router sub-interfaces isolate traffic across enterprise departments.',
      content:
        'Segmenting an enterprise network into VLANs reduces broadcast domains and strengthens security between departments like HR, Engineering, and Finance. However, devices in separate VLANs cannot communicate directly at Layer 2.\n\nRouter-on-a-Stick solves this cleanly using a single physical trunk link between the switch and router. On the router side, we create logical sub-interfaces (such as Gig0/0.10 and Gig0/0.20), assign 802.1Q encapsulation tags, and configure each sub-interface as the default gateway for its VLAN.',
    },
    {
      id: 'post-3',
      title: 'Integrating PHP with MySQL',
      category: 'Web & Databases',
      date: 'September 2026',
      readTime: '5 min read',
      excerpt:
        'Connecting dynamic web frontends to relational MySQL schemas safely using prepared statements and clean query structure.',
      content:
        'Building dynamic web applications such as a restaurant management system requires reliable communication between PHP backend scripts and a MySQL database.\n\nUsing PDO or MySQLi prepared statements prevents SQL injection while keeping CRUD operations (Create, Read, Update, Delete) structured and fast. Pairing normalized database tables with clean JSON or HTML responses lets HTML5, CSS3, and JavaScript interfaces stay responsive and maintainable.',
    },
  ],
  messages: [
    {
      id: 'msg-1',
      name: 'Nadia Hassan',
      email: 'nadia.hassan@example.com',
      subject: 'Flutter Mobile Internship Opportunity',
      message:
        'Hi Gehad, we loved reviewing your portfolio and NTI Flutter work and would love to invite you for an engineering chat next week.',
      createdAt: '2026-11-22',
      read: false,
    },
  ],
};
