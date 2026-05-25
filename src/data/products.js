export const products = [
  {
    id: "coach",
    name: "Coach",
    route: "/products/coach",
    logo: "/assets/coach-logo-sm.png",
    heroImage: "/assets/coach-logo-sm.png",
    primary: "#0F3D2E",
    accent: "#A8C4B4",
    status: "IN DEVELOPMENT",
    launch: "Q3 2026",
    price: "Launch wedge: math tutoring",
    summary:
      "A personal AI tutor that watches your work through a camera or AR glasses and catches mistakes as they happen.",
    cardCopy:
      "Coach starts with math: your paper stays in front of you, the model watches each step, and feedback arrives before the mistake compounds.",
    sections: [
      {
        label: "01 / PROBLEM",
        title: "Tutoring is expensive, delayed, and scarce.",
        body:
          "Students usually get help after the confusion has already hardened. Parents pay for limited hours. Teachers cannot watch every line of work in real time.",
      },
      {
        label: "02 / PRODUCT",
        title: "A tutor that sees the work, not just the answer.",
        body:
          "Coach reads the page as it develops, notices arithmetic slips and reasoning gaps, and gives small corrections while the student is still thinking.",
      },
      {
        label: "03 / HOW IT WORKS",
        title: "Camera first. Glasses when the hardware is ready.",
        body:
          "The first version uses a phone camera over the desk. The long-term version runs through AR glasses, so the feedback follows the student without turning study time into screen time.",
      },
      {
        label: "04 / WHO IT’S FOR",
        title: "One learner, one assignment, one correction at a time.",
        body:
          "The wedge is high school math, where the work is visible, mistakes are frequent, and immediate feedback changes the session.",
      },
      {
        label: "05 / BUSINESS MODEL",
        title: "A subscription priced below one hour of tutoring.",
        body:
          "Coach can start as a consumer subscription and expand through families, tutoring centers, and school pilots once the feedback loop is proven.",
      },
      {
        label: "06 / LONG-TERM VISION",
        title: "Real-time coaching for any physical skill.",
        body:
          "Math is the first surface. The same pattern can move into golf, music, cooking, lifting, and any domain where expert feedback is usually expensive.",
      },
    ],
  },
  {
    id: "airmix",
    name: "AirMix",
    route: "/products/airmix",
    logo: "/assets/airmix-logo-sm.png",
    heroImage: "/assets/airmix-logo-sm.png",
    primary: "#FF2D6F",
    accent: "#C0C0C8",
    status: "IN DEVELOPMENT",
    launch: "Q3 2026",
    price: "$3.99 / MONTH",
    summary:
      "A virtual DJ board for AR glasses that turns any table into a party setup and connects to Bluetooth speakers.",
    cardCopy:
      "AirMix gives college parties a controller without the controller: a virtual deck on the table, AI feedback in the flow, and music out through speakers already in the room.",
    sections: [
      {
        label: "01 / PROBLEM",
        title: "DJ hardware is priced for the one percent of parties.",
        body:
          "Most students want control over the room without carrying a controller, learning a professional rig, or spending thousands before the first set.",
      },
      {
        label: "02 / PRODUCT",
        title: "A DJ board that appears wherever the table is.",
        body:
          "AirMix overlays decks, tempo controls, cue points, and transitions through AR glasses, then routes sound to the Bluetooth speaker already nearby.",
      },
      {
        label: "03 / HOW IT WORKS",
        title: "Gesture control, speaker output, AI feedback.",
        body:
          "The interface tracks hands and surfaces, responds like a board, and gives feedback on blends, transitions, and room energy without taking over the set.",
      },
      {
        label: "04 / WHO IT’S FOR",
        title: "Dorms, houses, rooftops, and the friend with the aux.",
        body:
          "The first users are college students who host often enough to care, but not enough to justify a professional setup.",
      },
      {
        label: "05 / BUSINESS MODEL",
        title: "$3.99 a month for the board most people will actually use.",
        body:
          "The price keeps the product in the impulse-subscription range while leaving room for shared party modes, premium packs, and campus growth loops.",
      },
      {
        label: "06 / LONG-TERM VISION",
        title: "Creative software that does not need a desk.",
        body:
          "AirMix starts with DJing, then points toward a broader class of spatial creative tools that appear only when you need them.",
      },
    ],
  },
  {
    id: "crave",
    name: "Crave",
    route: "/products/crave",
    logo: "/assets/crave-logo-sm.png",
    heroImage: "/assets/crave-logo-sm.png",
    primary: "#C8553D",
    accent: "#F5EDE2",
    status: "IN DEVELOPMENT",
    launch: "Q4 2026",
    price: "Nutrition coach",
    summary:
      "An AI nutrition coach that rewrites any meal from a photo or TikTok to match your macros while keeping the craving intact.",
    cardCopy:
      "Crave translates the meal you actually want into the version your goals can absorb, then turns the rewrite into ingredients you can order.",
    sections: [
      {
        label: "01 / PROBLEM",
        title: "Most nutrition apps punish taste.",
        body:
          "People do not fail because they lack a database. They fail because the food they want and the plan they are following feel like separate worlds.",
      },
      {
        label: "02 / PRODUCT",
        title: "A rewrite engine for real meals.",
        body:
          "Crave reads a photo, recipe, or TikTok meal, identifies the craving underneath it, and suggests substitutions that protect flavor while moving the macros.",
      },
      {
        label: "03 / HOW IT WORKS",
        title: "Snap, rewrite, order.",
        body:
          "The app estimates the meal, maps it to the user’s goals, generates taste-preserving changes, and can DoorDash the exact ingredients for the revised version.",
      },
      {
        label: "04 / WHO IT’S FOR",
        title: "People who want results without eating like a spreadsheet.",
        body:
          "The wedge is fitness-minded consumers who already save food content and need a coach that adapts meals instead of replacing them.",
      },
      {
        label: "05 / BUSINESS MODEL",
        title: "Subscription plus commerce moments.",
        body:
          "Crave can monetize through coaching subscriptions, ingredient ordering, and partnerships with grocery and delivery platforms.",
      },
      {
        label: "06 / LONG-TERM VISION",
        title: "Personal nutrition that starts from desire.",
        body:
          "The long-term product is a coach that understands taste, constraints, goals, and availability, then turns cravings into sustainable meals.",
      },
    ],
  },
];

export const getProductById = (id) => products.find((product) => product.id === id);
