const hour = new Date().getHours();

export const LANDING_TEXTS = [
  "Grab a hot chocolate and relax.",
  "Take a break and let us help you relax.",
  "Unwind with our cozy ambiance.",
  "Sit back, relax, and enjoy the calming ambiance.",
  "Come on in and get cozy.",
  hour - 20 >= 0
    ? "Hope you had a great day."
    : "Hope you're having a great day.",
];

export const LISTENERS_TEXTS = [
  "Number of people reminiscing about their childhood cat:",
  "Number of people relaxing in the virtual longue:",
  "Number of people seeing how the cat reacts to the purring:",
  "Number of people checking out the fireplace:",
];
