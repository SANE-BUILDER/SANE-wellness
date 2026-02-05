const gameText = document.getElementById('game-text');
const choicesDiv = document.getElementById('choices');
const nextBtn = document.getElementById('nextBtn');
const sectionTitle = document.getElementById('section-title');
const gameContainer = document.getElementById('game-container');
const chapterCount = document.getElementById('chapter-count');
const chapterTotal = document.getElementById('chapter-total');

let step = 0;

// HUD button handlers
document.getElementById('btn-home')?.addEventListener('click', () => {
  window.location.href = '/';
});

document.getElementById('btn-restart')?.addEventListener('click', () => {
  replayGame();
});

// Insight tracking (quiet, supportive, no shame)
let insightScore = 0;
let patterns = {
  balance: 0,
  hydration: 0,
  timing: 0,
  wholefoods: 0,
  processed: 0,
  sugar: 0,
  planning: 0,
  misinformation: 0
};

// Mature section titles (no "Chapter 1/2...")
const sections = [
  "Orientation",
  "Foundations",
  "Foundations",
  "Fuel & Energy",
  "Fuel & Energy",
  "Patterns & Habits",
  "Patterns & Habits",
  "Disruptors",
  "Disruptors",
  "Practical Choices",
  "Practical Choices",
  "Micronutrients",
  "Micronutrients",
  "Food Labels",
  "Food Labels",
  "Integration"
];

// Reuse your theme classes (if you already added them)
const themeBySection = {
  "Orientation": "theme-awareness",
  "Foundations": "theme-awareness",
  "Fuel & Energy": "theme-comparison",
  "Patterns & Habits": "theme-compassion",
  "Disruptors": "theme-comparison",
  "Practical Choices": "theme-compassion",
  "Micronutrients": "theme-awareness",
  "Food Labels": "theme-comparison",
  "Integration": "theme-integration"
};

// Reflection prompts (reflective + empowering + instructional)
const reflections = [
  "Pause. What does your body usually ask for - food, water, rest, or routine?",
  "What is ONE small change you can keep for 7 days?",
  "If a friend had this habit, what kind advice would you give them?",
  "Name the habit. Choose the next step. Keep it realistic."
];

// Rotating faith reflections (optional, end only)
const faithReflections = [
  "\"Your body is a temple of the Holy Spirit... therefore honor God with your body.\" - 1 Corinthians 6:19-20",
  "\"Whether you eat or drink, do it all to the glory of God.\" - 1 Corinthians 10:31",
  "\"He gives food to every creature.\" - Psalm 136:25",
  "\"Do not be wise in your own eyes... this will bring health to your body and nourishment to your bones.\" - Proverbs 3:7-8"
];

// ---------- UX helpers ----------
function feedback(message) {
  gameText.style.opacity = 0;

  setTimeout(() => {
    const reflection = reflections[step % reflections.length];
    gameText.innerText = `${message}\n\n🌿 Reflection:\n${reflection}`;
    choicesDiv.innerHTML = '';
    nextBtn.style.display = 'inline-block';
    nextBtn.innerText = "Continue";
    gameText.style.opacity = 1;
  }, 200);
}

function startStep() {
  gameText.style.opacity = 0;

  setTimeout(() => {
    // Update HUD
    if (chapterCount) chapterCount.textContent = step + 1;
    if (chapterTotal) chapterTotal.textContent = steps.length;

    const sec = sections[step];
    sectionTitle.innerText = "Nourishment - " + sec;
    gameContainer.className = themeBySection[sec] || "theme-awareness";

    gameText.innerText = steps[step].text;
    choicesDiv.innerHTML = '';
    nextBtn.style.display = 'none';
    nextBtn.innerText = "Next";

    steps[step].choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.innerText = choice.text;
      btn.onclick = choice.action;
      choicesDiv.appendChild(btn);
    });

    gameText.style.opacity = 1;
  }, 200);
}

function nextStep() {
  step++;
  if (step < steps.length) startStep();
}

nextBtn.onclick = () => {
  nextBtn.style.display = 'none';
  nextStep();
};

function replayGame() {
  step = 0;
  insightScore = 0;
  patterns = {
    balance: 0,
    hydration: 0,
    timing: 0,
    wholefoods: 0,
    processed: 0,
    sugar: 0,
    planning: 0,
    misinformation: 0
  };
  nextBtn.style.display = 'none';
  startStep();
}

// ---------- NOURISHMENT CONTENT ----------
const steps = [
  // Orientation
  {
    text:
`Welcome to SANE.

This is Nourishment - building a healthier diet that supports energy, mood, clarity, and long-term strength.

You'll make everyday food choices.
You'll learn why they help or harm.
Then you'll choose realistic improvements.

No pressure.
Just honest practice.`,
    choices: [{ text: "Begin", action: () => nextStep() }]
  },

  // Foundations 1 - what a balanced plate means
  {
    text:
`Foundations

When we say "healthy diet", we're not talking about extremes.
We're talking about balance.

Which is the best "everyday plate" idea?`,
    choices: [
      { text: "Mostly one food group (e.g., only carbs)", action: () => { patterns.misinformation++; feedback("That's common, but it often leads to poor balance. A healthy plate usually needs carbs + protein + healthy fats + fruits/vegetables."); } },
      { text: "Carbs + Protein + Vegetables/Fruit (plus some healthy fats)", action: () => { patterns.balance++; patterns.wholefoods++; insightScore += 2; feedback("Yes. That's a strong foundation. Balance supports steady energy and better satiety."); } },
      { text: "Skip meals to \"control weight\"", action: () => { patterns.misinformation++; patterns.timing++; feedback("Skipping meals can backfire (fatigue, cravings, overeating). Nourishment is about steady care, not punishment."); } }
    ]
  },

  // Foundations 2 - hydration
  {
    text:
`Foundations

Hydration matters more than people think.
Low water intake can feel like fatigue, headache, or poor concentration.

What's the best first move if you barely drink water daily?`,
    choices: [
      { text: "Drink a huge amount all at once and forget later", action: () => { patterns.hydration++; feedback("Big intake once helps a bit, but consistency is better. Small regular sips win."); } },
      { text: "Start with a bottle target (e.g., 1 bottle morning + 1 later)", action: () => { patterns.hydration++; patterns.planning++; insightScore += 2; feedback("Great. Simple structure makes hydration realistic and sustainable."); } },
      { text: "Replace water with sweet drinks", action: () => { patterns.sugar++; patterns.processed++; feedback("Sweet drinks can increase sugar spikes. Water is the foundation; sweet drinks should be occasional, not the default."); } }
    ]
  },

  // Fuel & Energy 1 - sugar crash
  {
    text:
`Fuel & Energy

You need energy fast, so you grab a sugary snack or sweet drink.
It works... then you crash.

What's the most stable alternative for energy?`,
    choices: [
      { text: "A sugary snack again (repeat cycle)", action: () => { patterns.sugar++; feedback("That often creates a spike-and-crash cycle. You feel tired again soon."); } },
      { text: "A balanced snack (protein + fiber): e.g., nuts + fruit / yogurt + fruit", action: () => { patterns.balance++; patterns.wholefoods++; insightScore += 2; feedback("Yes. Protein + fiber supports steadier energy and better focus."); } },
      { text: "Skip eating completely", action: () => { patterns.timing++; feedback("Skipping can worsen fatigue and lead to stronger cravings later."); } }
    ]
  },

  // Fuel & Energy 2 - brain fog + breakfast
  {
    text:
`Fuel & Energy

Many students/workers experience mid-morning brain fog.
Often it's linked to: no breakfast + low water + heavy sugary intake.

If you skip breakfast, what's the best realistic start?`,
    choices: [
      { text: "A small but balanced breakfast (even simple)", action: () => { patterns.timing++; patterns.balance++; insightScore += 2; feedback("Perfect. Even a small balanced breakfast can improve mood, energy, and concentration."); } },
      { text: "Nothing until late afternoon", action: () => { patterns.timing++; feedback("That often increases cravings and makes energy swings worse."); } },
      { text: "Only tea/coffee and hope for the best", action: () => { patterns.timing++; feedback("Caffeine can help briefly, but without food/water it can worsen jitters or fatigue later."); } }
    ]
  },

  // Patterns & Habits 1 - consistency
  {
    text:
`Patterns & Habits

Healthy eating is less about "perfect days" and more about consistency.

Which habit builds consistency fastest?`,
    choices: [
      { text: "Planning 1-2 simple meals you can repeat", action: () => { patterns.planning++; insightScore += 2; feedback("Yes. Repeating simple meals reduces stress and improves consistency."); } },
      { text: "Waiting for motivation to eat well", action: () => { patterns.misinformation++; feedback("Motivation comes and goes. A simple plan beats motivation."); } },
      { text: "Trying a strict diet overnight", action: () => { patterns.misinformation++; feedback("Strict overnight changes often don't last. Sustainable progress wins."); } }
    ]
  },

  // Patterns & Habits 2 - late-night eating
  {
    text:
`Patterns & Habits

Late-night eating happens a lot (study, work, stress).
It's not "bad", but patterns matter.

What's the best improvement if you always eat very late?`,
    choices: [
      { text: "Add a daytime meal/snack so you're not starving at night", action: () => { patterns.timing++; patterns.planning++; insightScore += 2; feedback("Great. This reduces extreme hunger and improves balance."); } },
      { text: "Ignore it and hope it stops", action: () => { patterns.planning++; feedback("Hope isn't a strategy. Small structure helps change patterns."); } },
      { text: "Punish yourself by fasting the next day", action: () => { patterns.misinformation++; patterns.timing++; feedback("Punishment usually creates a cycle. Nourishment is steady care, not payback."); } }
    ]
  },

  // Disruptors 1 - ultra-processed foods
  {
    text:
`Disruptors

Ultra-processed foods are convenient, but frequent reliance can reduce nourishment quality.

What's the best "upgrade" strategy (realistic, not extreme)?`,
    choices: [
      { text: "Replace ALL your meals immediately", action: () => { patterns.misinformation++; feedback("That's intense and hard to sustain. Start with one upgrade at a time."); } },
      { text: "Keep convenience, but add a whole-food side (fruit/veg/protein)", action: () => { patterns.wholefoods++; patterns.balance++; insightScore += 2; feedback("Excellent. This is realistic and improves quality without stress."); } },
      { text: "Do nothing because healthy food is \"too hard\"", action: () => { patterns.processed++; feedback("Small changes are possible. One upgrade per day builds momentum."); } }
    ]
  },

  // Disruptors 2 - misinformation
  {
    text:
`Disruptors

Online advice can be confusing: "carbs are bad", "fat is bad", "eat only X".

Which rule is safest and most useful?`,
    choices: [
      { text: "Follow any viral diet because it's trending", action: () => { patterns.misinformation++; feedback("Trends aren't always truth. Your body needs balance and sustainability."); } },
      { text: "Focus on balance and variety, not extremes", action: () => { patterns.balance++; insightScore += 2; feedback("Yes. Variety and balance are consistently safer and more sustainable."); } },
      { text: "Cut entire food groups without a reason", action: () => { patterns.misinformation++; feedback("Cutting entire groups can reduce nutrient variety. If you do, it should be for a clear reason - not fear."); } }
    ]
  },

  // Practical Choices 1 - low-budget / daily living
  {
    text:
`Practical Choices

Real life matters: budget, time, access.
Healthy eating is still possible.

What's the best "low-budget nourishment" approach?`,
    choices: [
      { text: "Buy only expensive \"health foods\"", action: () => { patterns.misinformation++; feedback("Not necessary. Simple whole foods can be affordable and nourishing."); } },
      { text: "Build around affordable staples + add protein + add fruit/veg", action: () => { patterns.balance++; patterns.planning++; insightScore += 2; feedback("Exactly. Staples + protein + fruit/veg creates strong nourishment on a budget."); } },
      { text: "Skip meals to save money", action: () => { patterns.timing++; feedback("Skipping meals can worsen fatigue and reduce performance. Better to simplify meals than remove them."); } }
    ]
  },

  // Practical Choices 2 - "one-week plan"
  {
    text:
`Practical Choices

Pick ONE change you can keep for 7 days.
Small wins build real transformation.

Which 7-day goal is best?`,
    choices: [
      { text: "Drink water consistently daily", action: () => { patterns.hydration++; insightScore += 2; feedback("Great 7-day goal. Hydration alone improves energy, digestion, and focus."); } },
      { text: "Add one fruit or vegetable daily", action: () => { patterns.wholefoods++; insightScore += 2; feedback("Excellent. This improves micronutrients and overall diet quality."); } },
      { text: "Do a strict diet with zero flexibility", action: () => { patterns.misinformation++; feedback("Strict, zero-flex plans often break. Sustainable nourishment is flexible, not fragile."); } }
    ]
  },

  // Micronutrients 1
  {
    text:
`Micronutrients

Sometimes fatigue, frequent illness, or poor focus isn't about calories -
it's about missing micronutrients.

Which pairing best supports energy and immunity?`,
    choices: [
      { text: "Iron + B vitamins (e.g., beans, leafy greens, eggs, whole grains)", action: () => { patterns.balance++; insightScore += 2; feedback("Correct. Iron supports oxygen delivery, and B vitamins support energy and brain function. These foods are common and accessible."); } },
      { text: "Sugar + caffeine only", action: () => { patterns.sugar++; feedback("Sugar and caffeine can give quick energy, but they don't fix underlying nutrient needs."); } },
      { text: "Skipping meals to 'rest the body'", action: () => { patterns.timing++; feedback("Skipping meals often worsens nutrient gaps and fatigue."); } }
    ]
  },

  // Micronutrients 2
  {
    text:
`Micronutrients

Strong bones, healing, and protection need more than one nutrient.

Which combination best supports long-term strength?`,
    choices: [
      { text: "Calcium + Vitamin D (e.g., dairy, fortified foods, fish, sunlight)", action: () => { patterns.balance++; insightScore += 2; feedback("Yes. Calcium builds structure, and Vitamin D helps absorb it. Together they protect bones and muscles."); } },
      { text: "Protein alone", action: () => { feedback("Protein is important, but without micronutrients, the body can't fully use it for repair."); } },
      { text: "Supplements without food", action: () => { patterns.misinformation++; feedback("Supplements can help sometimes, but food-first nourishment is the best foundation."); } }
    ]
  },

  // Food Labels 1
  {
    text:
`Food Labels

Many products look "healthy" from the front.
The truth is usually on the label.

What's the FIRST thing to check?`,
    choices: [
      { text: "Ingredients list (what's inside, and in what order)", action: () => { insightScore += 2; feedback("Correct. Ingredients are listed from highest to lowest amount. This tells you what the product is mostly made of."); } },
      { text: "Marketing words like 'natural' or 'fit'", action: () => { patterns.misinformation++; feedback("These words are often marketing, not nutrition guarantees."); } },
      { text: "Only the calorie number", action: () => { feedback("Calories matter, but they don't tell you about nutrient quality."); } }
    ]
  },

  // Food Labels 2
  {
    text:
`Food Labels

Two snacks have similar calories.
One keeps you full longer.

What label clue helps you decide?`,
    choices: [
      { text: "Higher fiber and protein", action: () => { insightScore += 2; feedback("Yes. Fiber and protein slow digestion, support fullness, and stabilize energy."); } },
      { text: "Lower fat only", action: () => { feedback("Low-fat doesn't always mean more nourishing or satisfying."); } },
      { text: "Bright packaging and claims", action: () => { patterns.misinformation++; feedback("Packaging is designed to sell, not nourish. Labels give better truth."); } }
    ]
  },

  // Integration
  {
    text:
`Integration

You've built Nourishment foundations.

Your Nourishment Toolkit:
1) Balance your plate (carbs + protein + fruits/veg + healthy fats)
2) Hydrate consistently
3) Keep steady meal timing (avoid extreme hunger)
4) Choose whole foods often; upgrade convenience, don't panic
5) Avoid extremes and viral diet fear
6) Pick ONE 7-day habit and repeat

Ready to finish?`,
    choices: [{ text: "Finish", action: () => finishGame() }]
  }
];

function finishGame() {
  gameText.style.opacity = 0;

  setTimeout(() => {
    const topPattern = Object.entries(patterns).sort((a,b) => b[1]-a[1])[0][0];
    const verse = faithReflections[Math.floor(Math.random() * faithReflections.length)];

    let personalLine = "You practiced making healthier choices with clarity - that's real nourishment.";
    let nextStep = "Pick ONE 7-day habit: water daily, or add one fruit/veg daily, or balance one meal daily.";

    if (topPattern === "misinformation") {
      personalLine = "You met diet confusion today - and that's common in a world full of mixed advice.";
      nextStep = "Next step: return to the basics: balance + variety + consistency. Avoid extremes.";
    } else if (topPattern === "timing") {
      personalLine = "Meal timing stood out today - steady routines can change energy and mood a lot.";
      nextStep = "Next step: add one predictable meal/snack time daily to reduce extreme hunger.";
    } else if (topPattern === "hydration") {
      personalLine = "Hydration was a strong point - this supports focus, energy, and overall health.";
      nextStep = "Next step: keep a simple water routine (morning + later). Consistency beats intensity.";
    } else if (topPattern === "processed") {
      personalLine = "Convenience foods showed up - real life happens. The goal is upgrades, not guilt.";
      nextStep = "Next step: keep convenience, but add a whole-food side (fruit/veg/protein) once daily.";
    } else if (topPattern === "sugar") {
      personalLine = "Sugar spikes were a theme - that's a common energy trap, not a character flaw.";
      nextStep = "Next step: swap ONE sugary snack daily for protein + fiber (nuts + fruit / yogurt + fruit).";
    } else if (topPattern === "planning") {
      personalLine = "Planning helped you - structure is one of the strongest diet tools.";
      nextStep = "Next step: choose 1-2 repeat meals for the week to reduce stress and improve consistency.";
    } else if (topPattern === "wholefoods" || topPattern === "balance") {
      personalLine = "You leaned toward balance and whole foods - that's a strong long-term foundation.";
      nextStep = "Next step: keep it simple: balance one meal daily and build from there.";
    }

    const scoreLine = `Nourishment score: ${insightScore} (higher = stronger, more consistent choices)`;

    gameText.innerText =
`🌿 You completed Nourishment.

${personalLine}

✨ What you practiced:
• Balanced meals (not extremes)
• Hydration consistency
• Stable energy choices
• Sustainable habits (not guilt)
• Filtering diet misinformation

${scoreLine}

🧠 Your next step:
${nextStep}

Optional faith reflection:
${verse}`;

    choicesDiv.innerHTML = '';

    const replayBtn = document.createElement('button');
    replayBtn.innerText = "Reflect Again";
    replayBtn.onclick = replayGame;
    choicesDiv.appendChild(replayBtn);

    nextBtn.style.display = 'none';
    gameText.style.opacity = 1;
  }, 250);
}

// Start
startStep();
