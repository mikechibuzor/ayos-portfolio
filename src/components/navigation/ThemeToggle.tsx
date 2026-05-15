import { useEffect, useState } from "react";
import { uiCopy } from "../../data/uiCopy";
import { ThemeMode } from "../../types/site";
import "./ThemeToggle.css";

const THEME_STORAGE_KEY = "ayomide-portfolio-theme";

function isThemeMode(value: string | null): value is ThemeMode {
  return value === ThemeMode.Dark || value === ThemeMode.Light;
}

function getStoredThemeMode(): ThemeMode {
  try {
    const storedThemeMode = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isThemeMode(storedThemeMode) ? storedThemeMode : ThemeMode.Dark;
  } catch {
    return ThemeMode.Dark;
  }
}

function getNextThemeMode(themeMode: ThemeMode): ThemeMode {
  return themeMode === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark;
}

export function ThemeToggle() {
  const [themeMode, setThemeMode] = useState<ThemeMode>(getStoredThemeMode);
  const isLightMode = themeMode === ThemeMode.Light;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode);

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, themeMode);
    } catch {
      // Theme still works for the session if storage is unavailable.
    }
  }, [themeMode]);

  return (
    <button
      className="theme-toggle"
      type="button"
      data-theme-mode={themeMode}
      aria-label={isLightMode ? uiCopy.themeToggleDarkAriaLabel : uiCopy.themeToggleLightAriaLabel}
      onClick={() => setThemeMode(getNextThemeMode)}
    >
      <span className="theme-toggle__track" aria-hidden="true">
        <span className="theme-toggle__knob">
          <span className="theme-toggle__moon" />
        </span>
      </span>
    </button>
  );
}
