export type PortalNode = {
  id: string;
  label: string;
  title: string;
  summary: string;
  color: string;
  position: [number, number, number];
  metrics: { label: string; value: string }[];
};

export const portalNodes: PortalNode[] = [
  {
    id: "medical",
    label: "HEART-LAB",
    title: "Artificial Heart R&D Command",
    summary:
      "Monitor servo-controlled ventricles, compliance tests, and patient-ready safety loops across the Vienna mission.",
    color: "#f43f5e",
    position: [0, 0, 0],
    metrics: [
      { label: "Team", value: "40 engineers" },
      { label: "Lives", value: "64M+ impact" },
    ],
  },
  {
    id: "vr-ai",
    label: "NEURAL-VR",
    title: "IBM Granite VR Learning Grid",
    summary:
      "Adaptive VR classroom that fuses haptics, Unity, and Granite AI tutors to personalize every mission briefing.",
    color: "#a855f7",
    position: [2.5, 1, -1.2],
    metrics: [
      { label: "Modules", value: "4 AI loops" },
      { label: "Team", value: "5 creators" },
    ],
  },
  {
    id: "robotics",
    label: "ATLAS-BOT",
    title: "Autonomous Robotics Sandboxed Arena",
    summary:
      "360° LIDAR scanning, self-healing navigation, and servo-driven perception for fully autonomous scouting units.",
    color: "#22d3ee",
    position: [-2.2, -1.3, 0.8],
    metrics: [
      { label: "Tests", value: "50+" },
      { label: "Accuracy", value: "94%" },
    ],
  },
  {
    id: "web",
    label: "NET-SPRINT",
    title: "Full-Stack Athletics Intelligence",
    summary:
      "Real-time athlete telemetry, REST pipelines, and cross-device dashboards for high-stakes, data-heavy squads.",
    color: "#10b981",
    position: [-0.5, 2, 1.6],
    metrics: [
      { label: "Bug Drop", value: "85%" },
      { label: "Devices", value: "Mobile+" },
    ],
  },
  {
    id: "about",
    label: "BIO-NEXUS",
    title: "Renan Lavirotte | Mission Control",
    summary:
      "Durham CS, Track & Field captaincy, and cross-disciplinary leadership powering a new breed of humane robotics.",
    color: "#f97316",
    position: [2, -2, -1.5],
    metrics: [
      { label: "Athletes", value: "20 led" },
      { label: "Languages", value: "3" },
    ],
  },
];

export type MissionCard = {
  id: string;
  quadrant: string;
  headline: string;
  description: string;
  tags: string[];
  status: "active" | "standby" | "prototype";
};

export const missionDeck: MissionCard[] = [
  {
    id: "servo-heart",
    quadrant: "MEDTECH",
    headline: "Total Artificial Heart | Servo-regulated ventricles",
    description:
      "Design reviews, compliance matrices, and AI-driven failure simulations for Vienna-bound heart prosthetics.",
    tags: ["R&D", "Hardware", "Safety"],
    status: "active",
  },
  {
    id: "granite-vr",
    quadrant: "VR/AI",
    headline: "Granite VR Academy | Adaptive intelligence tutor",
    description:
      "Unity-built VR classroom with Granite APIs delivering personalized coaching, mission tiers, and analytics.",
    tags: ["Unity", "AI", "Haptics"],
    status: "active",
  },
  {
    id: "autobot",
    quadrant: "ROBOTICS",
    headline: "Autonomous Scout | Sensor fusion + 180° LIDAR",
    description:
      "50+ field tests, servo-swiveled LiDAR sweeps, and predictive routing to keep the rover collision-free.",
    tags: ["C++", "Embedded", "Testing"],
    status: "prototype",
  },
  {
    id: "track-stack",
    quadrant: "WEB OPS",
    headline: "Athletic Intelligence Stack | Full-stack telemetry",
    description:
      "Real-time rankings, secure submissions, and progressive web dashboards for Track & Field command posts.",
    tags: ["Full-Stack", "REST", "UI"],
    status: "standby",
  },
];

