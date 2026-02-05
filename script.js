const gameText = document.getElementById('game-text');
const choicesDiv = document.getElementById('choices');
const nextBtn = document.getElementById('nextBtn');
const sectionTitle = document.getElementById('section-title');
const gameContainer = document.getElementById('game-container');
const chapterCount = document.getElementById('chapter-count');
const chapterTotal = document.getElementById('chapter-total');

let chapter = 0;

// HUD button handlers
document.getElementById('btn-home')?.addEventListener('click', () => {
  window.location.href = '/';
});

document.getElementById('btn-restart')?.addEventListener('click', () => {
  replayGame();
});

// Insight tracking
let insightScore = 0; // higher = more adaptive coping
let patterns = { threat: 0, challenge: 0, avoid: 0, solve: 0, support: 0, calm: 0 };

// Section titles (mature, not "Chapter 1/2")
const sections = [
  "Orientation",
  "Appraisal",
  "Appraisal",
  "Coping",
  "Coping",
  "Bounce Back",
  "Bounce Back",
  "Integration"
];

// Theme switching (reuse your theme classes)
const themeBySection = {
  "Orientation": "theme-awareness",
  "Appraisal": "theme-comparison",
  "Coping": "theme-compassion",
  "Bounce Back": "theme-awareness",
  "Integration": "theme-integration"
};

// Faith reflections for ending
const faithReflections = [
  "\"God is our refuge and strength, an ever-present help in trouble.\" - Psalm 46:1",
  "\"Do not fear, for I am with you... I will strengthen you and help you.\" - Isaiah 41:10",
  "\"When you pass through the waters, I will be with you.\" - Isaiah 43:2",
  "\"My grace is sufficient for you, for my power is made perfect in weakness.\" - 2 Corinthians 12:9"
];

// Reflection prompts
const reflections = [
  "Pause. What story did your mind tell you — threat or challenge?",
  "If this happened to a friend, what would you tell them to do next?",
  "Try this: breathe in… breathe out… What is one helpful action you can take?",
  "What part is in your control — even if it's small?"
];

// Utility: show a gentle reflection pause after feedback
function feedback(message) {
  gameText.style.opacity = 0;

  setTimeout(() => {
    const reflection = reflections[chapter % reflections.length];
    gameText.innerText = `${message}\n\n🌿 Reflection:\n${reflection}`;
    choicesDiv.innerHTML = '';
    nextBtn.style.display = 'inline-block';
    nextBtn.innerText = "Continue";
    gameText.style.opacity = 1;
  }, 200);
}

function startChapter() {
  gameText.style.opacity = 0;

  setTimeout(() => {
    // Update HUD
    if (chapterCount) chapterCount.textContent = chapter + 1;
    if (chapterTotal) chapterTotal.textContent = chapters.length;

    // Title line
    sectionTitle.innerText = "Adaptability · " + sections[chapter];

    // Theme
    const sec = sections[chapter];
    gameContainer.className = themeBySection[sec] || "theme-awareness";

    // Content
    gameText.innerText = chapters[chapter].text;
    choicesDiv.innerHTML = '';
    nextBtn.innerText = "Next";

    chapters[chapter].choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.innerText = choice.text;
      btn.onclick = choice.action;
      choicesDiv.appendChild(btn);
    });

    gameText.style.opacity = 1;
  }, 200);
}

nextBtn.onclick = () => {
  nextBtn.style.display = 'none';
  nextChapter();
};

function nextChapter() {
  chapter++;
  if (chapter < chapters.length) startChapter();
}

function replayGame() {
  chapter = 0;
  insightScore = 0;
  patterns = { threat: 0, challenge: 0, avoid: 0, solve: 0, support: 0, calm: 0 };
  nextBtn.style.display = 'none';
  startChapter();
}

// ----- GAME CONTENT (ALL FOUR SCENARIOS) -----
const chapters = [
  {
    text:
`Welcome to SANE.

This is Adaptability — responding to stress and change with wisdom.

You'll notice how your mind appraises situations.
You'll learn how to steady yourself.
Then you'll choose a response that supports growth.

No pressure.
Just honest practice.`,
    choices: [{ text: "Begin", action: () => nextChapter() }]
  },

  // Scenario A — criticism (Appraisal)
  {
    text:
`A colleague criticizes your report.
Your body tenses.
A thought appears: "I'm going to fail."`,
    choices: [
      { text: 'Threat: "This is a disaster."', action: () => { patterns.threat++; feedback("That's a threat appraisal: it makes the situation feel bigger than your ability to handle it."); } },
      { text: 'Challenge: "I can learn and improve."', action: () => { patterns.challenge++; insightScore += 2; feedback("That's a challenge appraisal: it creates options and reduces panic."); } },
      { text: 'Personal attack: "They hate me."', action: () => { patterns.threat++; feedback("This adds mind-reading. It increases stress without evidence."); } }
    ]
  },
  {
    text:
`Now choose your response.\n\nWhat do you do next?`,
    choices: [
      { text: "Ask for 1–2 clear improvement points", action: () => { patterns.solve++; insightScore += 2; feedback("Great. You turned stress into action. That's adaptability."); } },
      { text: "Shut down and avoid them", action: () => { patterns.avoid++; feedback("Avoidance can feel safe short-term, but it often increases fear later."); } },
      { text: "Take a 30-second calm breath, then respond", action: () => { patterns.calm++; insightScore += 1; feedback("Nice. Regulating first helps you respond wisely, not react emotionally."); } }
    ]
  },

  // Scenario B — failure/setback (Coping)
  {
    text:
`You fail something you tried hard at.
Your chest feels heavy.
A thought appears: "I'm not good enough."`,
    choices: [
      { text: 'Threat: "I\'ll never get it right."', action: () => { patterns.threat++; feedback("That's a threat story — it predicts a hopeless future from one event."); } },
      { text: 'Challenge: "This is feedback, not a verdict."', action: () => { patterns.challenge++; insightScore += 2; feedback("That's adaptive. It separates your identity from the outcome."); } },
      { text: 'Self-attack: "I\'m a failure."', action: () => { patterns.threat++; feedback("Harsh labels increase stress and reduce motivation to try again."); } }
    ]
  },
  {
    text:
`Choose your coping strategy.`,
    choices: [
      { text: "Break the goal into a smaller next step", action: () => { patterns.solve++; insightScore += 2; feedback("Excellent coping. Small steps rebuild momentum."); } },
      { text: "Talk to someone supportive", action: () => { patterns.support++; insightScore += 2; feedback("Strong choice. Support reduces shame and strengthens resilience."); } },
      { text: "Escape and distract for hours", action: () => { patterns.avoid++; feedback("A short break is okay — but long avoidance usually makes the stress return stronger."); } }
    ]
  },

  // Scenario C — sudden change (Bounce Back)
  {
    text:
`A plan changes suddenly.
Your stomach drops.
A thought appears: "This always happens to me."`,
    choices: [
      { text: 'Threat: "Everything is ruined."', action: () => { patterns.threat++; feedback("That's threat thinking: it collapses the whole future into one moment."); } },
      { text: 'Challenge: "This is hard, but I can adjust."', action: () => { patterns.challenge++; insightScore += 2; feedback("That's adaptability. You accept the change without surrendering your power."); } },
      { text: 'Blame: "Someone must be punished."', action: () => { patterns.threat++; feedback("Blame can feel energizing, but it often blocks problem-solving."); } }
    ]
  },
  {
    text:
`What's your bounce-back move?`,
    choices: [
      { text: "Pick a Plan B (even a small one)", action: () => { patterns.solve++; insightScore += 2; feedback("Perfect. A Plan B turns shock into direction."); } },
      { text: "Take a calm pause, then decide your next action", action: () => { patterns.calm++; insightScore += 1; feedback("Nice. Calm creates clarity. Clarity creates better choices."); } },
      { text: "Freeze and do nothing", action: () => { patterns.avoid++; feedback("Freezing is human — but staying stuck keeps the stress alive. One small step helps."); } }
    ]
  },

  // Scenario D — conflict/misunderstanding (Integration)
  {
    text:
`A friend misunderstands you.
Your heart sinks.
A thought appears: "They don't care about me."`,
    choices: [
      { text: 'Threat: "This relationship is over."', action: () => { patterns.threat++; feedback("That's a threat conclusion — it jumps to the worst ending too quickly."); } },
      { text: 'Challenge: "Let me clarify calmly."', action: () => { patterns.challenge++; insightScore += 2; feedback("That's mature adaptability: calm + communication."); } },
      { text: 'Mind-reading: "They\'re against me."', action: () => { patterns.threat++; feedback("Mind-reading increases conflict. Clarifying reduces it."); } }
    ]
  },
  {
    text:
`Choose your response.`,
    choices: [
      { text: "Send a calm message asking to talk", action: () => { patterns.solve++; insightScore += 2; feedback("Great. You chose connection and clarity over assumptions."); } },
      { text: "Ask a trusted person for perspective", action: () => { patterns.support++; insightScore += 2; feedback("Excellent. Support helps you respond wisely instead of reacting emotionally."); } },
      { text: "Ignore them and spiral", action: () => { patterns.avoid++; feedback("Ignoring can protect you briefly, but it often grows the misunderstanding."); } }
    ]
  },

  // Final Toolkit
  {
    text:
`You practiced skills that can be used again — in real moments, in real life.

Adaptability isn't pretending it's easy.
It's choosing wise responses when life is hard.

Your toolkit:
1) Appraise: Threat or Challenge?
2) Regulate: Calm first
3) Choose: Solve / Support / Small Step
4) Bounce back: Plan B + progress`,
    choices: [{ text: "Finish", action: () => finishGame() }]
  }
];

function finishGame() {
  gameText.style.opacity = 0;

  setTimeout(() => {
    // Find top pattern
    const topPattern = Object.entries(patterns).sort((a,b) => b[1]-a[1])[0][0];

    let personalLine = "You practiced responding with intention — that's real growth.";
    let nextStep = "Next step: when stress hits, ask: 'Threat or challenge?' then take one small helpful action.";

    if (topPattern === "avoid") {
      personalLine = "You leaned toward avoidance today — that's human when you feel overwhelmed.";
      nextStep = "Next step: choose one small action (even 2 minutes). Small steps break avoidance.";
    } else if (topPattern === "threat") {
      personalLine = "Your mind told a lot of threat-stories today — not because you're weak, but because you care.";
      nextStep = "Next step: challenge one threat thought: 'What's another possible outcome?'";
    } else if (topPattern === "solve") {
      personalLine = "You leaned into problem-solving — that's strong adaptability.";
      nextStep = "Next step: keep it balanced: solve + rest. Don't carry everything alone.";
    } else if (topPattern === "support") {
      personalLine = "You reached for support — that's wise resilience, not dependence.";
      nextStep = "Next step: identify one safe person you can reach out to when stress rises.";
    } else if (topPattern === "calm") {
      personalLine = "You used calm first — that's emotional intelligence in action.";
      nextStep = "Next step: practice one 30-second calm skill daily so it's available when you need it.";
    } else if (topPattern === "challenge") {
      personalLine = "You chose challenge thinking — honest, but hopeful. That's adaptability.";
      nextStep = "Next step: keep using 'I can adjust' when plans change.";
    }

    const scoreLine = `Insight score: ${insightScore} (higher = more adaptive choices)`;

    gameText.innerText =
`🌿 You completed Adaptability.

${personalLine}

✨ What you practiced:
• Appraisal (threat vs challenge)
• Calm-first responses
• Problem-solving and support
• Bouncing back after setbacks

${scoreLine}

🧠 Your next step:
${nextStep}

You are growing.
You are learning.
You are not alone.

Optional faith reflection:
${faithReflections[Math.floor(Math.random() * faithReflections.length)]}`;

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
startChapter();
