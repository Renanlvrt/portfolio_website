export type ProjectDetail = {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  achievements: string[];
  features: string[];
  highlights: { title: string; value: string }[];
  images: string[];
  startDate: string;
  endDate: string;
  duration: string;
  github?: string;
  live?: string;
};

export const projectDetails: Record<string, ProjectDetail> = {
  medical: {
    id: "medical",
    title: "Artificial Heart R&D Command",
    description:
      "Monitor servo-controlled ventricles, compliance tests, and patient-ready safety loops across the Vienna mission.",
    fullDescription:
      "Selected as one of 40 student engineers collaborating with clinicians and hardware specialists on Total Artificial Heart concepts ahead of the Vienna Finals hackathon. This mission involves supporting CAD modelling, prototyping, and failure-mode analysis for ventricular pumping systems. I coordinate test protocols and documentation so surgeons can validate safety thresholds, championing inclusive communication between biomedical researchers, software analysts, and patient advocates.",
    technologies: ["CAD", "Prototyping", "Medical Devices", "R&D", "Safety Compliance"],
    achievements: [
      "Selected for Vienna Finals hackathon",
      "40-member interdisciplinary team collaboration",
      "Medical-grade safety compliance",
      "Cross-functional communication leadership",
    ],
    features: [
      "CAD modeling and system architecture",
      "Prototype testing and validation",
      "Failure-mode analysis",
      "Safety threshold documentation",
      "Clinical collaboration",
    ],
    highlights: [
      { title: "Team Size", value: "40 engineers" },
      { title: "Impact", value: "64M+ patients" },
      { title: "Status", value: "Vienna Finals" },
    ],
    images: ["/images/profile-portrait.jpg"],
    startDate: "2024-10-01",
    endDate: "2025-02-28",
    duration: "5 months",
  },
  "vr-ai": {
    id: "vr-ai",
    title: "IBM Granite VR Learning Grid",
    description:
      "Adaptive VR classroom that fuses haptics, Unity, and Granite AI tutors to personalize every mission briefing.",
    fullDescription:
      "Led a 5-person IBM SkillsBuild team to craft an immersive VR education experience that adapts to each learner. As the orchestration lead, I aligned designers, AI specialists, and gameplay engineers to deliver a VR experience that evolves with the player. We integrated IBM Granite AI APIs to provide real-time adaptive feedback, conditional reasoning, and personalized objectives across four SkillsBuild AI modules. The result is a guided, motivating path through interactive quizzes and restorative training missions.",
    technologies: ["Unity", "C#", "IBM Granite AI", "SkillsBuild APIs", "Azure Functions", "VR"],
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
      { title: "Status", value: "Active" },
    ],
    images: ["/images/photography.jpg", "/images/photography-2.jpg", "/images/photography-3.jpg"],
    startDate: "2025-09-01",
    endDate: "2025-12-31",
    duration: "Ongoing",
  },
  robotics: {
    id: "robotics",
    title: "Autonomous Robotics Sandboxed Arena",
    description:
      "360° LIDAR scanning, self-healing navigation, and servo-driven perception for fully autonomous scouting units.",
    fullDescription:
      "Built an autonomous robot capable of obstacle avoidance using sensors and Python. The robot uses multiple sensors to detect its surroundings and makes real-time decisions to navigate safely. Through extensive testing and optimization, I achieved high reliability and precision in the robot's movement and obstacle detection capabilities. Conducted more than 50 tests across various scenarios to optimize performance and reliability, focusing on obstacle detection accuracy, response time, navigation efficiency, and edge case handling.",
    technologies: ["Python", "Sensors", "Servo Motors", "Arduino", "Raspberry Pi", "LIDAR"],
    achievements: [
      "Conducted 50+ tests to optimize performance",
      "Achieved 180-degree real-time scanning field",
      "Improved movement precision significantly",
      "Enhanced environmental awareness",
    ],
    features: [
      "Real-time obstacle detection",
      "180-degree sensor scanning",
      "Autonomous navigation",
      "Servo motor control",
      "Performance optimization",
    ],
    highlights: [
      { title: "Tests Conducted", value: "50+" },
      { title: "Scanning Field", value: "180°" },
      { title: "Accuracy", value: "94%" },
    ],
    images: ["/images/arduino-robot.jpg", "/images/IMG_7703.jpg"],
    startDate: "2025-07-01",
    endDate: "2025-09-30",
    duration: "3 months",
  },
  web: {
    id: "web",
    title: "Full-Stack Athletics Intelligence",
    description:
      "Real-time athlete telemetry, REST pipelines, and cross-device dashboards for high-stakes, data-heavy squads.",
    fullDescription:
      "Developed a full-stack Track & Field web app with JavaScript and RESTful APIs, enabling advanced athlete/sport search and real-time data retrieval across mobile and laptop devices. The application provides real-time data retrieval, advanced search functionality, and a seamless user experience across all devices. The project involved building robust API endpoints, implementing secure data handling, and creating an intuitive user interface. Designed robust GET/POST requests and implemented systematic API testing, reducing server-side bugs by 85%.",
    technologies: ["JavaScript", "RESTful APIs", "HTML5", "CSS3", "Node.js", "Express"],
    achievements: [
      "Reduced server-side bugs by 85%",
      "Implemented secure user submissions",
      "Full responsive design",
      "Real-time data retrieval",
    ],
    features: [
      "Advanced athlete search",
      "Sport-specific filtering",
      "Real-time data updates",
      "Mobile-responsive design",
      "Secure API endpoints",
      "User submission system",
    ],
    highlights: [
      { title: "Bug Reduction", value: "85%" },
      { title: "Platforms", value: "Mobile & Desktop" },
      { title: "API Testing", value: "Systematic" },
    ],
    images: ["/images/track-and-field.jpg", "/images/track-and-field-2.jpg"],
    startDate: "2025-02-01",
    endDate: "2025-04-30",
    duration: "3 months",
  },
};

