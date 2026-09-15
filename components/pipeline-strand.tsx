/**
 * Page-level background motif: a faint "pipeline strand".
 *
 * A helix bleeds into a straight pipeline line and resolves into a terminal
 * chevron — biology → data → computation → insight. Purely decorative,
 * extremely subtle, pointer-events none. Hidden on mobile.
 */

export function PipelineStrand() {
  return (
    <div className="pipeline-strand" aria-hidden="true">
      <svg
        viewBox="0 0 240 2000"
        preserveAspectRatio="xMidYMin meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="strand-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d8f36b" />
            <stop offset="55%" stopColor="#d8f36b" />
            <stop offset="100%" stopColor="#7fd4c8" />
          </linearGradient>
        </defs>

        {/* Helix → line → chevron, expressed as one continuous strand. */}
        <path
          d="M120 0
             C72 60, 176 120, 120 180
             C72 240, 176 300, 120 360
             C84 400, 160 430, 120 460
             C96 480, 150 490, 120 510
             L120 1540
             L140 1560
             L120 1580
             L100 1560
             Z"
          fill="none"
          stroke="url(#strand-grad)"
          strokeWidth="1.5"
        />

        {/* Base-pair rungs along the helix section only. */}
        <g stroke="url(#strand-grad)" strokeWidth="1" opacity="0.65">
          <line x1="96" y1="88" x2="146" y2="92" />
          <line x1="94" y1="152" x2="146" y2="208" />
          <line x1="96" y1="270" x2="146" y2="210" />
          <line x1="96" y1="330" x2="146" y2="390" />
        </g>

        {/* Data markers along the straight section. */}
        <g fill="url(#strand-grad)">
          <circle cx="120" cy="620" r="2" />
          <circle cx="120" cy="860" r="3" />
          <circle cx="120" cy="1120" r="2" />
          <circle cx="120" cy="1380" r="3" />
        </g>
      </svg>
    </div>
  )
}