const hour = new Date().getHours();

export const LANDING_TEXTS = [
  "Welcome to our virtual oasis, take a moment to unwind.",
  "Grab a hot chocolate and relax.",
  "Take a break and let us help you relax.",
  "Unwind with our cozy ambiance.",
  "Sit back, relax, and enjoy the calming ambiance.",
  "Come on in and get cozy.",
  hour - 20 >= 0
    ? "Hope you had a great day."
    : "Hope you're having a great day.",
  "Indulge in a moment of peace.",
  "Let us transport you to a world of serenity and comfort.",
  "Join us for a moment of stillness.",
  "Relax your mind and body, you deserve it.",
  "Take a moment to slow down.",
];

export const LISTENERS_TEXTS = [
  "Number of people reminiscing about cozy moments from their past:",
  "Number of people relaxing in the virtual longue:",
  "Number of people seeing how the cat reacts to the purring:",
  "Number of people enjoying the company of a virtual feline friend:",
  "Number of people feeling nostalgic for simpler times:",
  "Number of people taking a mental break from the world around them:",
  "Number of people finding inner peace in the midst of chaos:",
  "Number of people transported to a virtual oasis:",
  "Number of people enjoying a moment of calm:",
  "Number of people embracing a moment of stillness:",
  "Number of people feeling the stress melt away:",
  "Number of people feeling the warmth of a cozy atmosphere:",
  "Number of people finding solace:",
  "Number of people experiencing a moment of relaxation:",
  "Number of people enjoying a moment of respite:",
];
