const gameText = document.getElementById('game-text');
const choicesDiv = document.getElementById('choices');
const nextBtn = document.getElementById('nextBtn');
const sectionTitle = document.getElementById('section-title');
const gameContainer = document.getElementById('game-container');

let step = 0;

// Insight tracking (empathy skills)
let insightScore = 0;
let patterns = {
  validate: 0,
  listen: 0,
  fix: 0,
  judge: 0,
  boundary: 0,
  repair: 0,
  avoid: 0
};

// Mature section titles
const sections = [
  "Orientation",
  "Listening",
  "Listening",
  "Validation",
  "Validation",
  "Perspective",
  "Perspective",
  "Boundaries",
  "Boundaries",
  "Repair",
  "Repair",
  "Integration"
];

// Themes (reuse your theme classes)
const themeBySection = {
  "Orientation": "theme-awareness",
  "Listening": "theme-awareness",
  "Validation": "theme-compassion",
  "Perspective": "theme-compassion",
  "Boundaries": "theme-comparison",
  "Repair": "theme-integration",
  "Integration": "theme-integration"
};

// Reflection prompts (reflective + empowering + instructional)
const reflections = [
  "Pause. Did you listen to understand, or listen to respond?",
  "What emotion might the person be feeling under their words?",
  "What is one sentence of validation you can offer right now?",
  "How can you be kind and still keep your boundary?"
];

// Rotating faith reflections (optional, end only)
const faithReflections = [
  "\"Be kind and compassionate to one another.\" - Ephesians 4:32",
  "\"Love is patient, love is kind.\" - 1 Corinthians 13:4",
  "\"Carry each other's burdens.\" - Galatians 6:2",
  "\"Let your conversation be always full of grace.\" - Colossians 4:6"
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
    const sec = sections[step];
    sectionTitle.innerText = "Empathy - " + sec;
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
  patterns = { validate: 0, listen: 0, fix: 0, judge: 0, boundary: 0, repair: 0, avoid: 0 };
  nextBtn.style.display = 'none';
  startStep();
}

// ---------- EMPATHY CONTENT ----------
const steps = [
  {
    text:
`Welcome to SANE.

This is Empathy - understanding people and responding with care.
Empathy is not agreeing with everything.
It is listening, validating, and choosing a wise response.

No pressure.
Just honest practice.`,
    choices: [{ text: "Begin", action: () => nextStep() }]
  },

  // Listening 1
  {
    text:
`Listening

A friend says:
"I'm tired of everything. Nobody really gets me."

What's the best first response?`,
    choices: [
      { text: "\"Tell me more. What's been the hardest part lately?\"", action: () => { patterns.listen++; insightScore += 2; feedback("Great. This invites them to share and shows you're present."); } },
      { text: "\"You'll be fine, don't think about it.\"", action: () => { patterns.judge++; feedback("This can feel dismissive, even if you mean well."); } },
      { text: "\"Here's what you should do...\" (immediate advice)", action: () => { patterns.fix++; feedback("Advice can help later, but empathy often starts with listening first."); } }
    ]
  },

  // Listening 2
  {
    text:
`Listening

They continue:
"I've been carrying so much alone."

What's the empathy skill here?`,
    choices: [
      { text: "Reflect back what you heard: \"It sounds heavy and lonely.\"", action: () => { patterns.listen++; patterns.validate++; insightScore += 2; feedback("Yes. Reflection makes people feel understood."); } },
      { text: "Change topic to distract them", action: () => { patterns.avoid++; feedback("Distraction can help sometimes, but not when someone is asking to be heard."); } },
      { text: "Question their feelings: \"Are you sure it's that serious?\"", action: () => { patterns.judge++; feedback("This can make them doubt themselves and shut down."); } }
    ]
  },

  // Validation 1
  {
    text:
`Validation

A colleague says:
"I'm embarrassed. I messed up."

Which response validates without excusing mistakes?`,
    choices: [
      { text: "\"That makes sense. Mistakes feel painful. Want to talk through what happened?\"", action: () => { patterns.validate++; insightScore += 2; feedback("Perfect. You validate the emotion and offer support."); } },
      { text: "\"You shouldn't feel embarrassed.\"", action: () => { patterns.judge++; feedback("Telling someone what they 'should' feel can sound dismissive."); } },
      { text: "\"It's not a big deal, forget it.\"", action: () => { patterns.avoid++; feedback("Minimizing can make people feel unseen."); } }
    ]
  },

  // Validation 2
  {
    text:
`Validation

Your friend says:
"I feel like I'm falling behind in life."

What's the best empathy statement?`,
    choices: [
      { text: "\"That feeling is real. What's making you feel behind right now?\"", action: () => { patterns.validate++; patterns.listen++; insightScore += 2; feedback("Yes. You validate, then explore gently."); } },
      { text: "\"Stop comparing yourself.\"", action: () => { patterns.fix++; feedback("True, but too fast. Validation first makes advice easier to accept."); } },
      { text: "\"Others have it worse.\"", action: () => { patterns.judge++; feedback("Comparing pain usually increases shame instead of helping."); } }
    ]
  },

  // Perspective 1
  {
    text:
`Perspective

Someone is unusually rude today.
They snap at you and walk away.

What is the most empathetic (and wise) interpretation?`,
    choices: [
      { text: "\"They're stressed - I won't take it personally, but I can address it calmly later.\"", action: () => { patterns.validate++; patterns.listen++; insightScore += 2; feedback("Excellent. This is mature empathy: you don't absorb the insult, but you stay human and thoughtful."); } },
      { text: "\"They're a bad person.\"", action: () => { patterns.judge++; feedback("That labels their whole identity from one moment. Perspective-taking helps you stay fair and calm."); } },
      { text: "\"Let me insult them back so they learn.\"", action: () => { patterns.judge++; feedback("That escalates conflict. Empathy doesn't mean silence - it means responding with wisdom."); } }
    ]
  },

  // Perspective 2
  {
    text:
`Perspective

Later, you learn they're dealing with something heavy.
But their behavior still hurt you.

What does "empathetic + healthy" response look like?`,
    choices: [
      { text: "\"I'm sorry you're going through that. Also, please don't speak to me that way.\"", action: () => { patterns.boundary++; patterns.validate++; insightScore += 2; feedback("Perfect. This is deep empathy: compassion plus boundaries."); } },
      { text: "\"Since they're struggling, I should accept any treatment.\"", action: () => { patterns.avoid++; feedback("Empathy is not self-abandonment. You can care and still protect your peace."); } },
      { text: "\"Their pain is not my problem.\"", action: () => { patterns.judge++; feedback("That shuts down compassion. The goal is to stay kind without becoming a doormat."); } }
    ]
  },

  // Boundaries 1
  {
    text:
`Boundaries

Someone keeps calling you late at night to vent.
You care, but you're drained.

What's an empathetic boundary?`,
    choices: [
      { text: "\"I care about you. I can talk tomorrow. Tonight I need rest.\"", action: () => { patterns.boundary++; insightScore += 2; feedback("Excellent. Kind + clear. Empathy with boundaries is healthy."); } },
      { text: "Answer every time even when it harms you", action: () => { patterns.avoid++; feedback("That can become burnout. Empathy shouldn't destroy you."); } },
      { text: "Ignore them completely without explanation", action: () => { patterns.avoid++; feedback("Sometimes space is needed, but clarity is kinder when possible."); } }
    ]
  },

  // Boundaries 2
  {
    text:
`Boundaries

A friend insults you "as a joke".
You feel hurt.

Best response?`,
    choices: [
      { text: "\"I know you may be joking, but that hurt. Please don't speak to me like that.\"", action: () => { patterns.boundary++; patterns.repair++; insightScore += 2; feedback("Strong and respectful. This protects the relationship and your dignity."); } },
      { text: "Laugh it off but feel resentful later", action: () => { patterns.avoid++; feedback("Avoiding the truth often turns into resentment."); } },
      { text: "Insult them back", action: () => { patterns.judge++; feedback("That escalates conflict and reduces trust."); } }
    ]
  },

  // Repair 1
  {
    text:
`Repair

You snapped at someone because you were stressed.
You want to fix it.

What is the best repair move?`,
    choices: [
      { text: "Apologize clearly: \"I was wrong. I'm sorry. You didn't deserve that.\"", action: () => { patterns.repair++; insightScore += 2; feedback("Yes. Clear accountability rebuilds trust."); } },
      { text: "\"Sorry if you felt bad.\"", action: () => { patterns.judge++; feedback("This can sound like avoiding responsibility. A direct apology helps more."); } },
      { text: "Avoid them until it blows over", action: () => { patterns.avoid++; feedback("Avoidance leaves tension unresolved. Repair is brave."); } }
    ]
  },

  // Repair 2
  {
    text:
`Repair

They say:
"Thanks... but it really hurt."

Best empathy response?`,
    choices: [
      { text: "\"I understand. I'll be more careful. Thank you for telling me.\"", action: () => { patterns.validate++; patterns.repair++; insightScore += 2; feedback("Perfect. You validate and commit to change."); } },
      { text: "\"You're too sensitive.\"", action: () => { patterns.judge++; feedback("That invalidates them and usually increases conflict."); } },
      { text: "Change topic quickly", action: () => { patterns.avoid++; feedback("This can leave the hurt unaddressed. Staying present matters."); } }
    ]
  },

  // Integration
  {
    text:
`Integration

Empathy Toolkit:
1) Listen to understand
2) Reflect what you heard
3) Validate emotions before advice
4) Keep kind boundaries
5) Repair quickly and clearly

Ready to finish?`,
    choices: [{ text: "Finish", action: () => finishGame() }]
  }
];

function finishGame() {
  gameText.style.opacity = 0;

  setTimeout(() => {
    const topPattern = Object.entries(patterns).sort((a,b) => b[1]-a[1])[0][0];
    const verse = faithReflections[Math.floor(Math.random() * faithReflections.length)];

    let personalLine = "You practiced empathy - listening, validating, and responding with care.";
    let nextStep = "Next step: use one empathy sentence today: \"That makes sense. Tell me more.\"";

    if (topPattern === "fix") {
      personalLine = "You tended to jump into fixing quickly - your heart wants to help.";
      nextStep = "Next step: pause before advice. Ask one listening question first.";
    } else if (topPattern === "judge") {
      personalLine = "Judgment showed up - often when we're stressed or tired.";
      nextStep = "Next step: replace judgment with curiosity: \"What might they be feeling?\"";
    } else if (topPattern === "avoid") {
      personalLine = "Avoidance showed up - it's common when conversations feel uncomfortable.";
      nextStep = "Next step: practice one small moment of presence: stay, listen, reflect one sentence.";
    } else if (topPattern === "boundary") {
      personalLine = "You practiced healthy boundaries - that's empathy with wisdom.";
      nextStep = "Next step: keep your boundaries kind and clear. Your health matters too.";
    } else if (topPattern === "repair") {
      personalLine = "You practiced repair - a skill that strengthens relationships.";
      nextStep = "Next step: when you miss it, return quickly with honesty and accountability.";
    } else if (topPattern === "listen" || topPattern === "validate") {
      personalLine = "You leaned into listening and validation - that builds trust and safety.";
      nextStep = "Next step: keep practicing reflection: \"It sounds like...\"";
    }

    const scoreLine = `Empathy score: ${insightScore} (higher = stronger empathy skills)`;

    gameText.innerText =
`🌿 You completed Empathy.

${personalLine}

✨ What you practiced:
• Listening to understand
• Emotional validation
• Kind boundaries
• Relationship repair

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
