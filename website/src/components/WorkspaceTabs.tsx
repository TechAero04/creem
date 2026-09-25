"use client";

import { useState } from "react";
import clsx from "clsx";
import { AgentCards, AppWindow, ChatPanel, ConnectionsPanel, FlowCanvas, RunsTable, TablesPanel } from "./ProductMocks";

const TABS = [
  { id: "chat", label: "Ask in plain words", blurb: "Describe the job. It builds the automation for you.", panel: <ChatPanel /> },
  { id: "flows", label: "Automations", blurb: "See every step, change anything, add an approval where it matters.", panel: <FlowCanvas /> },
  { id: "agents", label: "AI assistants", blurb: "Standing assistants that handle a whole job across your apps.", panel: <AgentCards /> },
  { id: "runs", label: "History", blurb: "Every run, what it did and how long it took.", panel: <RunsTable /> },
  { id: "tables", label: "Your data", blurb: "Keep lists and records right next to the automations that use them.", panel: <TablesPanel /> },
  { id: "connections", label: "Connected apps", blurb: "Connect an app once. Everyone can use it, nobody sees the password.", panel: <ConnectionsPanel /> },
];

export function WorkspaceTabs() {
  const [active, setActive] = useState(TABS[0].id);
  const current = TABS.find((t) => t.id === active) ?? TABS[0];

  return (
    <div>
      <div role="tablist" aria-label="What is inside the workspace" className="flex flex-wrap justify-center gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={t.id === active}
            onClick={() => setActive(t.id)}
            className={clsx(
              "rounded-full px-4 py-2 text-sm font-semibold transition",
              t.id === active ? "bg-ink text-paper shadow-md" : "bg-white text-ink/60 ring-1 ring-ink/10 hover:text-ink"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <p className="mx-auto mt-6 max-w-xl text-center text-ink/60">{current.blurb}</p>

      <AppWindow className="mx-auto mt-8 max-w-3xl" title={`app.deepshikha.ai — ${current.label.toLowerCase()}`}>
        <div key={current.id} style={{ animation: "stepIn 0.35s ease-out both" }}>
          {current.panel}
        </div>
      </AppWindow>
    </div>
  );
}
