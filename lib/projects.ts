export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  category: "web" | "robotics" | "research" | "low-level";
  startDate: string;
  endDate: string;
  duration: string;
  achievements: string[];
  features: string[];
  image?: string;
  video?: string;
  github?: string;
  live?: string;
  pdf?: string;
  highlights: {
    title: string;
    value: string;
  }[];
}

export const projects: Project[] = [
  {
    id: "robotics",
    title: "Autonomous Robot with Obstacle Avoidance",
    slug: "autonomous-robot",
    description: "Built an autonomous robot capable of obstacle avoidance using sensors and Python. Conducted more than 50 tests to optimize performance and reliability.",
    fullDescription: "This project involved designing and building a fully autonomous robot that can navigate environments while avoiding obstacles. The robot uses multiple sensors to detect its surroundings and makes real-time decisions to navigate safely. Through extensive testing and optimization, I achieved high reliability and precision in the robot's movement and obstacle detection capabilities.",
    technologies: ["Python", "Sensors", "Servo Motors", "Arduino", "Raspberry Pi"],
    category: "robotics",
    startDate: "2025-07-01",
    endDate: "2025-09-30",
    duration: "3 months",
    image: "/images/arduino-robot.jpg",
    video: "/images/robotic-arduino.mov",
    achievements: [
      "Conducted 50+ tests to optimize performance",
      "Achieved 180-degree real-time scanning field",
      "Improved movement precision significantly",
      "Enhanced environmental awareness"
    ],
    features: [
      "Real-time obstacle detection",
      "180-degree sensor scanning",
      "Autonomous navigation",
      "Servo motor control",
      "Performance optimization"
    ],
    highlights: [
      { title: "Tests Conducted", value: "50+" },
      { title: "Scanning Field", value: "180°" },
      { title: "Reliability", value: "High" }
    ]
  },
  {
    id: "track-field",
    title: "Track & Field Web Application",
    slug: "track-field-app",
    description: "Developed a full-stack Track & Field web app with JavaScript and RESTful APIs, enabling advanced athlete/sport search and real-time data retrieval across mobile and laptop devices.",
    fullDescription: "A comprehensive web application designed for Track & Field enthusiasts, coaches, and athletes. The application provides real-time data retrieval, advanced search functionality, and a seamless user experience across all devices. The project involved building robust API endpoints, implementing secure data handling, and creating an intuitive user interface.",
    technologies: ["JavaScript", "RESTful APIs", "HTML5", "CSS3", "Node.js", "Express"],
    category: "web",
    startDate: "2025-02-01",
    endDate: "2025-04-30",
    duration: "3 months",
    image: "/images/track-and-field.jpg",
    achievements: [
      "Reduced server-side bugs by 85%",
      "Implemented secure user submissions",
      "Full responsive design",
      "Real-time data retrieval"
    ],
    features: [
      "Advanced athlete search",
      "Sport-specific filtering",
      "Real-time data updates",
      "Mobile-responsive design",
      "Secure API endpoints",
      "User submission system"
    ],
    highlights: [
      { title: "Bug Reduction", value: "85%" },
      { title: "Platforms", value: "Mobile & Desktop" },
      { title: "API Testing", value: "Systematic" }
    ]
  },
  {
    id: "vr-ibm",
    title: "VR Learning Game for IBM",
    slug: "vr-learning-game",
    description:
      "Led a 5-person IBM SkillsBuild team to craft an immersive VR education experience that adapts to each learner.",
    fullDescription:
      "As the orchestration lead of an IBM Group Project, I aligned designers, AI specialists, and gameplay engineers to deliver a VR experience that evolves with the player. We integrated IBM Granite AI APIs to provide real-time adaptive feedback, conditional reasoning, and personalized objectives across four SkillsBuild AI modules. The result is a guided, motivating path through interactive quizzes and restorative training missions.",
    technologies: ["Unity", "C#", "IBM Granite AI", "SkillsBuild APIs", "Azure Functions"],
    category: "web",
    startDate: "2025-09-01",
    endDate: "2025-12-31",
    duration: "Ongoing",
    image: "/images/photography-2.jpg",
    achievements: [
      "Coordinated 5 cross-functional contributors",
      "Integrated 4 IBM SkillsBuild AI modules",
      "Delivered adaptive learning journeys",
      "Implemented conditional reasoning feedback",
    ],
    features: [
      "Immersive VR classrooms",
      "Adaptive AI tutor using Granite",
      "Personalized quizzes and missions",
      "Team-based narrative progression",
      "Analytics on skill acquisition",
    ],
    highlights: [
      { title: "Team Members", value: "5" },
      { title: "AI Modules", value: "4" },
      { title: "Status", value: "In Progress" },
    ],
  },
  {
    id: "discrete-math",
    title: "Discrete Math Research Project",
    slug: "discrete-math-research",
    description: "Conducted a research project on mathematical partitions with a team of 5 mathematicians, proving key theorems and deriving new formulas through rigorous analysis.",
    fullDescription: "A collaborative research project focused on mathematical partitions, involving rigorous mathematical analysis and theorem proving. Working with a team of 5 mathematicians, I contributed to proving key theorems and developing new formulas. The project resulted in a comprehensive 10-page research report documenting our findings, proof strategies, and outcomes.",
    technologies: ["Mathematics", "LaTeX", "Research Methodology", "Theorem Proving"],
    category: "research",
    startDate: "2025-03-01",
    endDate: "2025-05-31",
    duration: "3 months",
    image: "/images/IMG_7703.jpg",
    achievements: [
      "Proved key theorems",
      "Derived new formulas",
      "Produced 10-page research report",
      "Adhered to strict project timelines"
    ],
    features: [
      "Mathematical partition analysis",
      "Theorem proving",
      "Formula derivation",
      "Collaborative research",
      "Academic documentation"
    ],
    highlights: [
      { title: "Team Size", value: "5 Mathematicians" },
      { title: "Report Length", value: "10 pages" },
      { title: "Timeline", value: "On Schedule" }
    ]
  },
  {
    id: "lmc-assembly",
    title: "LMC Assembly Programming",
    slug: "lmc-assembly",
    description: "Implemented a Little Man Computer (LMC) assembly program, applying analytical thinking by creating functional algorithms and demonstrated deep understanding of machine-level instruction handling.",
    fullDescription: "A computer architecture project involving the implementation of a complex program using Little Man Computer (LMC) assembly language. The project demonstrated efficient memory management, handling edge cases, and creating robust algorithms at the machine level. By using only 27 out of 100 available memory mailboxes, I achieved optimal performance while maintaining code clarity and reliability.",
    technologies: ["Assembly Language", "LMC", "Computer Architecture", "Memory Management"],
    category: "low-level",
    startDate: "2024-11-01",
    endDate: "2024-12-31",
    duration: "2 months",
    image: "/images/high-school-logo.png",
    achievements: [
      "Used only 27/100 memory mailboxes",
      "Faster program performance",
      "Comprehensive edge case handling",
      "Reduced vulnerability to errors"
    ],
    features: [
      "Efficient memory management",
      "Edge case handling",
      "Machine-level programming",
      "Algorithm optimization",
      "Error prevention"
    ],
    highlights: [
      { title: "Memory Used", value: "27/100" },
      { title: "Performance", value: "Optimized" },
      { title: "Edge Cases", value: "Handled" }
    ]
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug);
}

export function getProjectsByCategory(category: Project["category"]): Project[] {
  return projects.filter(project => project.category === category);
}

