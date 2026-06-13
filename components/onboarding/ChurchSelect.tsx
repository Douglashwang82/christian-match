"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Church as ChurchIcon, Search, Check } from "lucide-react";
import { useMemo, useState } from "react";
import { CHURCHES } from "@/lib/mock-data";
import type { Church } from "@/lib/types";

interface ChurchSelectProps {
  value: Church | null;
  onChange: (church: Church) => void;
}

/**
 * 可搜尋的教會下拉選單。
 * Demo 以本地清單做即時過濾；正式環境改接後端搜尋 API（含分頁、模糊比對、
 * 「找不到我的教會 → 申請新增」流程）。
 */
export function ChurchSelect({ value, onChange }: ChurchSelectProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    const q = query.trim();
    if (!q) return CHURCHES;
    return CHURCHES.filter(
      (c) =>
        c.name.includes(q) || c.denomination.includes(q) || c.city.includes(q),
    );
  }, [query]);

  return (
    <div className="relative">
      <div className="glass glass-ring flex items-center gap-2 rounded-2xl px-4 py-3">
        <Search className="h-4 w-4 shrink-0 text-silver-400" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={value ? value.name : "搜尋教會名稱、宗派或城市"}
          className="w-full bg-transparent text-sm text-silver-700 placeholder:text-silver-400 focus:outline-none"
        />
        {value && (
          <span className="flex items-center gap-1 whitespace-nowrap text-xs text-gold-600">
            <Check className="h-3.5 w-3.5" /> 已選
          </span>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="glass-strong glass-ring absolute z-20 mt-2 max-h-64 w-full overflow-auto rounded-2xl p-1.5"
          >
            {results.length === 0 ? (
              <li className="px-3 py-4 text-center text-sm text-silver-400">
                找不到符合的教會，稍後可申請新增
              </li>
            ) : (
              results.map((c) => {
                const selected = value?.id === c.id;
                return (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange(c);
                        setQuery("");
                        setOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-white/60 ${
                        selected ? "bg-white/60" : ""
                      }`}
                    >
                      <ChurchIcon className="h-4 w-4 shrink-0 text-gold-500" />
                      <span className="flex-1">
                        <span className="block text-sm font-medium text-silver-700">
                          {c.name}
                        </span>
                        <span className="block text-xs text-silver-400">
                          {c.denomination} · {c.city}
                        </span>
                      </span>
                      {selected && <Check className="h-4 w-4 text-gold-600" />}
                    </button>
                  </li>
                );
              })
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
