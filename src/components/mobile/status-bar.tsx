// iOS-style status bar — built with CSS/SVG, no expiring asset URLs
export function StatusBar() {
  return (
    <div className="relative flex h-[44px] w-full items-center justify-between px-[23px]">
      {/* Time */}
      <span
        className="text-[15px] font-semibold text-black"
        style={{ fontFamily: "var(--font-geist-sans, 'Geist', sans-serif)" }}
      >
        9:41
      </span>

      {/* Right cluster */}
      <div className="flex items-center gap-[6px]">
        {/* Signal bars */}
        <div className="flex items-end gap-[1.5px]">
          {[4, 6, 8, 11].map((h, i) => (
            <div
              key={i}
              className="w-[3px] rounded-[0.5px] bg-black"
              style={{ height: h }}
            />
          ))}
        </div>

        {/* WiFi */}
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none" aria-hidden>
          <path
            d="M8 2.5C9.73 2.5 11.3 3.2 12.48 4.33L13.56 3.26C12.12 1.88 10.16 1 8 1C5.84 1 3.88 1.88 2.44 3.26L3.52 4.33C4.7 3.2 6.27 2.5 8 2.5Z"
            fill="black"
          />
          <path
            d="M8 5.5C9.1 5.5 10.08 5.97 10.77 6.72L11.85 5.65C10.88 4.63 9.51 4 8 4C6.49 4 5.12 4.63 4.15 5.65L5.23 6.72C5.92 5.97 6.9 5.5 8 5.5Z"
            fill="black"
          />
          <circle cx="8" cy="9.5" r="1.5" fill="black" />
        </svg>

        {/* Battery */}
        <div className="flex items-center">
          <div className="flex h-[12px] w-[24px] items-center rounded-[2.5px] border border-black p-[1.5px]">
            <div className="h-full w-[17px] rounded-[1px] bg-black" />
          </div>
          <div className="ml-[1px] h-[6px] w-[1.5px] rounded-r-[1px] bg-black" />
        </div>
      </div>
    </div>
  )
}
