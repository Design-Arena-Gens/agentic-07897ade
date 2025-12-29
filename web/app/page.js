"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";

const categories = [
  {
    name: "Passing",
    angle: -90,
    spread: 60,
    color: "#30F6FF",
    skills: [
      {
        name: "Ping Trivella",
        hex: "#30F6FF",
        quest: "Deliver 80 successful ping trivella switches over 25m during competitive drills.",
      },
      {
        name: "Ground Laser",
        hex: "#46F4C1",
        quest: "Thread 120 ground ball assists through mannequins with 90% pace control.",
      },
      {
        name: "Vision Sync",
        hex: "#1DE6FF",
        quest: "Complete 150 one-touch wall passes with under 3s decision time in scrimmages.",
      },
    ],
  },
  {
    name: "Shooting",
    angle: 0,
    spread: 70,
    color: "#FF6FFF",
    skills: [
      {
        name: "Rabona Powershot",
        hex: "#FF6FFF",
        quest: "Score 50 rabona power strikes above 80km/h recorded by smart goal sensors.",
      },
      {
        name: "Trivella Curl",
        hex: "#FF88D6",
        quest: "Bend 60 trivella passing shots into top corners from outside the box.",
      },
      {
        name: "Passing Volley",
        hex: "#FF55AA",
        quest: "Convert 40 first-time volleys from teammate layoffs with 85% target accuracy.",
      },
    ],
  },
  {
    name: "Receiving",
    angle: 90,
    spread: 65,
    color: "#69FFAD",
    skills: [
      {
        name: "Inside Cushion",
        hex: "#69FFAD",
        quest: "Absorb 100 driven passes with inside-foot control under 1.5m rebound.",
      },
      {
        name: "Outside Shield",
        hex: "#45F7C6",
        quest: "Secure 85 outside-foot traps while protecting lane against pressure dummies.",
      },
      {
        name: "Chest Vault",
        hex: "#7BFFC9",
        quest: "Bring down 70 aerial balls to playable height using chest control in drills.",
      },
    ],
  },
  {
    name: "Freestyle",
    angle: 180,
    spread: 70,
    color: "#FFC85C",
    skills: [
      {
        name: "ATW Flow",
        hex: "#FFC85C",
        quest: "String 120 around-the-world combos without drops across three difficulty tempos.",
      },
      {
        name: "AKKA Burst",
        hex: "#FF9E5C",
        quest: "Execute 90 AKKA variations transitioning into forward dribble within 2s.",
      },
      {
        name: "Eclipse Orbit",
        hex: "#FFB66B",
        quest: "Perform 60 eclipse flicks finishing with controlled stall on dominant foot.",
      },
    ],
  },
];

const toRadians = (degrees) => (degrees * Math.PI) / 180;

export default function Home() {
  const [copied, setCopied] = useState(false);

  const prompt = useMemo(() => {
    const categorySegments = categories.map((category) => {
      const skillSegments = category.skills
        .map(
          (skill) =>
            `${skill.name} ${skill.hex} quest ${skill.quest.replaceAll(".", "")}`
        )
        .join(" | ");
      return `${category.name} ${category.color} skills ${skillSegments}`;
    });

    return [
      "Build a futuristic football progression tracker web app with a dark grey #0B0F14 glassmorphism interface and neon holo grid, inspired by RPG radial skill trees like Wings Calisthenics.",
      "Center hub shows core XP, spokes render animated nodes with category-specific glow and unlock animations.",
      "Integrate progress bars, quest counters, success rate telemetry, and radial connectors with subtle particle effects.",
      "Palette anchors: Passing #30F6FF, Shooting #FF6FFF, Receiving #69FFAD, Freestyle #FFC85C with complementary gradients for each skill node.",
      `Every skill requires quests; ${categorySegments.join("; ")}.`,
      "Include copy-to-clipboard prompt exporter, responsive layout ready for Vercel deployment, and lore snippets that reference unlocking trick-based mastery.",
    ]
      .join(" ")
      .replace(/\s+/g, " ");
  }, []);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(timeout);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Neon Skill Arc</h1>
        <p className={styles.subheading}>
          Plot every football ability across a radial skill tree. Unlock mastery
          by completing precision quests that mirror pro training metrics and
          freestyle flows.
        </p>
      </header>

      <section className={styles.skillTreeShell}>
        <div className={styles.skillTree}>
          <span className={styles.grid} aria-hidden="true" />
          <div className={styles.core}>
            <span>Core Sync</span>
            <strong>XP Nexus</strong>
            <span>Track &amp; unlock</span>
          </div>

          {categories.map((category) => {
            const count = category.skills.length;
            const spread =
              count > 1 ? category.spread : 0;
            return category.skills.map((skill, index) => {
              const step = count > 1 ? spread / (count - 1 || 1) : 0;
              const deg =
                category.angle - spread / 2 + index * (count === 1 ? 0 : step);
              const angleRad = toRadians(deg);
              const radius = 150 + index * 95;
              const x = Math.cos(angleRad) * radius;
              const y = Math.sin(angleRad) * radius;

              return (
                <article
                  key={`${category.name}-${skill.name}`}
                  className={styles.node}
                  style={{
                    "--x": `${x}px`,
                    "--y": `${y}px`,
                    "--angle": `${deg + 90}deg`,
                    "--color": skill.hex,
                    borderColor: `${skill.hex}44`,
                    boxShadow: `inset 0 0 18px ${skill.hex}40, 0 0 18px ${skill.hex}30`,
                  }}
                >
                  <div className={styles.nodeContent}>
                    <span className={styles.nodeCategory}>
                      {category.name} Quest
                    </span>
                    <h3>{skill.name}</h3>
                    <p className={styles.quest}>{skill.quest}</p>
                  </div>
                </article>
              );
            });
          })}
        </div>
      </section>

      <section className={styles.promptCard}>
        <span className={styles.promptLabel}>Prompt Chain</span>
        <div className={styles.promptBox}>{prompt}</div>
        <button type="button" className={styles.copyButton} onClick={handleCopy}>
          Copy Prompt
        </button>
        {copied ? (
          <span className={styles.copyConfirmation}>Prompt copied</span>
        ) : null}
      </section>
    </div>
  );
}
