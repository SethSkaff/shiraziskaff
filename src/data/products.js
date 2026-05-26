export const products = [
  {
    id: "coach",
    name: "Coach",
    route: "/products/coach",
    logo: "/assets/coach-logo-cropped.png",
    heroImage: "/assets/coach-logo-cropped.png",
    heroPhoto: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1600&q=80",
    primary: "#0F3D2E",
    accent: "#A8C4B4",
    status: "IN DEVELOPMENT",
    launch: "Q3 2026",
    price: "$30 / MONTH",
    summary:
      "A personal AI tutor that watches your work through a camera or AR glasses and catches mistakes as they happen.",
    cardCopy:
      "A personal AI tutor that watches what you're doing and tells you how to fix it. Starting with math. Coming next: golf, music, cooking, lifting, tech support.",
    detailCopy: [
      "Coach is a personal AI tutor that watches what you're doing and tells you how to fix it. Point a camera at your math homework and it catches errors as you make them. Point it at your golf swing and it shows you exactly where your form broke down. The first version watches your paper while you work through problems. Future versions will coach golf, guitar, baking, lifting, and tech support, like walking you through fixing your router when your parents call asking why the wifi is out. Real-time feedback that used to cost two hundred dollars an hour, now thirty dollars a month.",
    ],
  },
  {
    id: "airmix",
    name: "AirMix",
    route: "/products/airmix",
    logo: "/assets/airmix-logo-cropped.png",
    heroImage: "/assets/airmix-logo-cropped.png",
    heroPhoto: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80",
    primary: "#D81E5B",
    accent: "#FF8FB1",
    status: "IN DEVELOPMENT",
    launch: "Q3 2026",
    price: "$3.99 / MONTH",
    summary:
      "A virtual DJ board for AR glasses that turns any table into a party setup and connects to Bluetooth speakers.",
    cardCopy:
      "A full virtual mixing board for parties, tailgates, and dorm rooms without the hardware bill.",
    detailCopy: [
      "AirMix turns any flat surface into a DJ board. Put on a pair of AR glasses and a full virtual mixing setup appears on the table in front of you: turntables, faders, cue points, all responding to your hands. Press play and it streams to whatever Bluetooth speaker is in the room.",
      "For $3.99 a month, you can DJ a house party, a tailgate, or a dorm without spending ten thousand dollars on hardware. The premium tier teaches you to actually mix, with AI coaching that gives feedback as you go.",
    ],
  },
  {
    id: "crave",
    name: "Crave",
    route: "/products/crave",
    logo: "/assets/crave-logo-cropped.png",
    heroImage: "/assets/crave-logo-cropped.png",
    heroPhoto: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1600&q=80",
    primary: "#A04030",
    accent: "#E8B8A0",
    status: "IN DEVELOPMENT",
    launch: "Q4 2026",
    price: "Nutrition coach",
    summary:
      "An AI nutrition coach that rewrites any meal from a photo or TikTok to match your macros while keeping the craving intact.",
    cardCopy:
      "Turn the meal you want into the macro-fit version, then get the ingredients delivered.",
    detailCopy: [
      "Crave is the gap between food inspiration and groceries in your hand. Snap a TikTok or photo of any meal you want to make. Crave pulls the recipe, rewrites it to hit your macros, swaps in substitutions that actually taste good, and gets the ingredients to your door in thirty minutes.",
      "Built for people who care what they eat but do not want to spend Sundays meal-prepping. Built for the creators whose followers will tap once to order the macro-optimized version of whatever they just cooked.",
    ],
  },
];

export const getProductById = (id) => products.find((product) => product.id === id);
