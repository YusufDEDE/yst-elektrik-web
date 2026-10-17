"use client";

import { ToolLayout } from "@/components/tools/tool-layout";
import { FIRE_WIZARD_STEPS, resolveFireRecommendation } from "@/lib/tools/fire-data";
import { Flame } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export function FireSystemSelectorTool() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const step = FIRE_WIZARD_STEPS[stepIndex];
  const progress = done ? 100 : ((stepIndex + 1) / FIRE_WIZARD_STEPS.length) * 100;

  const recommendation = useMemo(
    () => (done ? resolveFireRecommendation(answers) : null),
    [done, answers],
  );

  function selectOption(value: string) {
    if (!step) return;
    const next = { ...answers, [step.id]: value };
    setAnswers(next);
    if (stepIndex >= FIRE_WIZARD_STEPS.length - 1) {
      setDone(true);
    } else {
      setStepIndex((i) => i + 1);
    }
  }

  function restart() {
    setStepIndex(0);
    setAnswers({});
    setDone(false);
  }

  return (
    <ToolLayout
      title="Yangın Söndürme Sistem Seçici"
      description="Alan türünüzü, büyüklüğünü ve tehlike sınıfını adım adım seçerek size uygun yangın söndürme sistemini öğrenin."
    >
      {!done ? (
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-secondary)" }}>
              Adım {stepIndex + 1} / {FIRE_WIZARD_STEPS.length}
            </span>
            <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>{Math.round(progress)}%</span>
          </div>
          <div
            style={{
              height: "6px",
              borderRadius: "999px",
              background: "var(--border-card)",
              overflow: "hidden",
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "linear-gradient(90deg, #ef4444, #f97316)",
                transition: "width 0.3s ease",
              }}
            />
          </div>
          <h2 style={{ margin: "0 0 1.25rem", fontSize: "1.125rem", fontWeight: 700, color: "var(--text-primary)" }}>
            {step?.question}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {step?.options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => selectOption(opt.value)}
                className="glass-card glass-card-hover"
                style={{
                  borderRadius: "1rem",
                  padding: "1rem 1.25rem",
                  textAlign: "left",
                  cursor: "pointer",
                  border: "1px solid var(--border-card)",
                  background: "var(--bg-card)",
                  fontFamily: "inherit",
                }}
              >
                <span style={{ display: "block", fontWeight: 700, color: "var(--text-primary)", marginBottom: opt.desc ? "0.25rem" : 0 }}>
                  {opt.label}
                </span>
                {opt.desc ? (
                  <span style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{opt.desc}</span>
                ) : null}
              </button>
            ))}
          </div>
          {stepIndex > 0 ? (
            <button
              type="button"
              className="btn-outline-custom"
              style={{ marginTop: "1.25rem" }}
              onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
            >
              Geri
            </button>
          ) : null}
        </div>
      ) : recommendation ? (
        <div style={{ animation: "fadeInUp 0.35s ease" }}>
          <div className="glass-card" style={{ borderRadius: "1.5rem", padding: "2rem", marginBottom: "1.25rem", textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>{recommendation.icon}</div>
            <p style={{ margin: "0 0 0.5rem", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", color: "#ef4444" }}>
              ÖNERİLEN SİSTEM
            </p>
            <h3 style={{ margin: "0 0 1rem", fontSize: "1.375rem", fontWeight: 800, color: "var(--text-primary)" }}>
              {recommendation.system}
            </h3>
            <p style={{ margin: "0 0 1rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>{recommendation.reason}</p>
            <p style={{ margin: 0, fontSize: "0.8125rem", color: "var(--text-muted)" }}>
              Standart: <strong>{recommendation.standard}</strong>
            </p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
            <button type="button" className="btn-outline-custom" onClick={restart}>
              <Flame size={16} />
              Yeniden Seç
            </button>
            <Link href="/contact" className="btn-primary-custom">
              Uzman Desteği Al
            </Link>
          </div>
        </div>
      ) : null}
    </ToolLayout>
  );
}
