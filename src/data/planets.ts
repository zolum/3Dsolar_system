export interface PlanetData {
  name: string;
  radius: number; // visual radius in scene units
  distance: number; // distance from sun in scene units
  orbitalPeriod: number; // in Earth years
  realRadius: string; // real radius description
  realDistance: string; // real distance from sun
  realOrbitalPeriod: string; // real orbital period
  color: string;
  emissive?: string;
  description: string;
  rotationSpeed: number;
}

export const SUN_DATA = {
  name: "Sun",
  radius: 3,
  realRadius: "696,340 km",
  color: "#FDB813",
  description: "The Sun is the star at the center of our Solar System. It is a nearly perfect ball of hot plasma, heated to incandescence by nuclear fusion reactions in its core.",
};

export const PLANETS: PlanetData[] = [
  {
    name: "Mercury",
    radius: 0.3,
    distance: 6,
    orbitalPeriod: 0.24,
    realRadius: "2,439.7 km",
    realDistance: "57.9 million km",
    realOrbitalPeriod: "88 days",
    color: "#A0522D",
    description: "Mercury is the smallest planet and closest to the Sun. It has no atmosphere and experiences extreme temperature variations.",
    rotationSpeed: 0.004,
  },
  {
    name: "Venus",
    radius: 0.6,
    distance: 9,
    orbitalPeriod: 0.62,
    realRadius: "6,051.8 km",
    realDistance: "108.2 million km",
    realOrbitalPeriod: "225 days",
    color: "#DEB887",
    description: "Venus is the second planet from the Sun and the hottest planet in our solar system, with surface temperatures of about 465°C due to its thick atmosphere.",
    rotationSpeed: 0.002,
  },
  {
    name: "Earth",
    radius: 0.65,
    distance: 12,
    orbitalPeriod: 1,
    realRadius: "6,371 km",
    realDistance: "149.6 million km",
    realOrbitalPeriod: "365.25 days",
    color: "#4169E1",
    description: "Earth is the third planet from the Sun and the only known planet to harbor life. It has liquid water on its surface and a protective atmosphere.",
    rotationSpeed: 0.01,
  },
  {
    name: "Mars",
    radius: 0.45,
    distance: 15.5,
    orbitalPeriod: 1.88,
    realRadius: "3,389.5 km",
    realDistance: "227.9 million km",
    realOrbitalPeriod: "687 days",
    color: "#CD5C5C",
    description: "Mars is the fourth planet from the Sun, known as the Red Planet due to iron oxide on its surface. It has the largest volcano and canyon in the solar system.",
    rotationSpeed: 0.009,
  },
  {
    name: "Jupiter",
    radius: 1.8,
    distance: 21,
    orbitalPeriod: 11.86,
    realRadius: "69,911 km",
    realDistance: "778.5 million km",
    realOrbitalPeriod: "11.86 years",
    color: "#DAA520",
    description: "Jupiter is the largest planet in our solar system. It's a gas giant with a Great Red Spot — a storm larger than Earth that has raged for hundreds of years.",
    rotationSpeed: 0.02,
  },
  {
    name: "Saturn",
    radius: 1.5,
    distance: 27,
    orbitalPeriod: 29.46,
    realRadius: "58,232 km",
    realDistance: "1.43 billion km",
    realOrbitalPeriod: "29.46 years",
    color: "#F4A460",
    description: "Saturn is the sixth planet from the Sun, famous for its stunning ring system made of ice and rock particles. It is the least dense planet — it could float in water!",
    rotationSpeed: 0.018,
  },
  {
    name: "Uranus",
    radius: 1.0,
    distance: 33,
    orbitalPeriod: 84.01,
    realRadius: "25,362 km",
    realDistance: "2.87 billion km",
    realOrbitalPeriod: "84.01 years",
    color: "#87CEEB",
    description: "Uranus is an ice giant that rotates on its side. It has a blue-green color due to methane in its atmosphere and has 27 known moons.",
    rotationSpeed: 0.012,
  },
  {
    name: "Neptune",
    radius: 0.95,
    distance: 38,
    orbitalPeriod: 164.8,
    realRadius: "24,622 km",
    realDistance: "4.5 billion km",
    realOrbitalPeriod: "164.8 years",
    color: "#4169E1",
    description: "Neptune is the farthest planet from the Sun. It's an ice giant with the strongest winds in the solar system, reaching speeds of 2,100 km/h.",
    rotationSpeed: 0.011,
  },
];
