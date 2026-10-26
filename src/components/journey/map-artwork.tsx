import { LOCATIONS } from '@/data/locations';

export const MAP_WIDTH = 1000;
export const MAP_HEIGHT = 700;

const WATER = '#9FB6C9';
const WATER_LIGHT = '#B9CCDA';

/** Đường nét đứt nối các địa điểm theo thứ tự, uốn nhẹ cho cảm giác bản đồ vẽ tay. */
function routePath() {
  const points = LOCATIONS.map((location) => location.map);
  return points.reduce((d, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`;
    const prev = points[index - 1];
    const midX = (prev.x + point.x) / 2;
    const midY = (prev.y + point.y) / 2;
    const bend = index % 2 === 0 ? 40 : -40;
    const length = Math.hypot(point.x - prev.x, point.y - prev.y) || 1;
    const cx = midX + (-(point.y - prev.y) / length) * bend;
    const cy = midY + ((point.x - prev.x) / length) * bend;
    return `${d} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${point.x} ${point.y}`;
  }, '');
}

function CompassRose({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <g transform={`translate(${x} ${y})`} opacity={0.75}>
      <circle r={r} fill='none' stroke='#8A6420' strokeWidth={1.5} />
      <circle r={r * 0.78} fill='none' stroke='#8A6420' strokeWidth={0.75} strokeDasharray='2 4' />
      <path d={`M0 ${-r * 1.15} L${r * 0.16} 0 L0 ${r * 1.15} L${-r * 0.16} 0 Z`} fill='#1F3A5F' />
      <path d={`M${-r * 1.15} 0 L0 ${r * 0.16} L${r * 1.15} 0 L0 ${-r * 0.16} Z`} fill='#C8963E' />
      <path d={`M0 ${-r * 1.15} L${r * 0.16} 0 L0 0 Z`} fill='#B5432F' />
      <text
        y={-r * 1.32}
        textAnchor='middle'
        fontSize={r * 0.42}
        fontWeight={700}
        fill='#1F3A5F'
        fontFamily='var(--font-display)'
      >
        B
      </text>
    </g>
  );
}

export function MapArtwork({
  showRoute = true,
  animateRoute = false,
}: { showRoute?: boolean; animateRoute?: boolean }) {
  return (
    <svg
      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
      className='absolute inset-0 h-full w-full'
      aria-hidden='true'
      focusable='false'
    >
      <defs>
        <pattern id='map-grid' width='50' height='50' patternUnits='userSpaceOnUse'>
          <path d='M50 0H0V50' fill='none' stroke='#1F3A5F' strokeOpacity='0.06' strokeWidth='1' />
        </pattern>
        <pattern id='map-streets' width='34' height='34' patternUnits='userSpaceOnUse' patternTransform='rotate(42)'>
          <path d='M34 0H0V34' fill='none' stroke='#1F3A5F' strokeOpacity='0.07' strokeWidth='1.5' />
        </pattern>
        <radialGradient id='map-vignette' cx='50%' cy='50%' r='70%'>
          <stop offset='60%' stopColor='#F5EBD7' stopOpacity='0' />
          <stop offset='100%' stopColor='#C8963E' stopOpacity='0.28' />
        </radialGradient>
      </defs>

      <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill='#F3E6CA' />
      <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill='url(#map-streets)' />
      <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill='url(#map-grid)' />

      {/* Bờ đông sông Sài Gòn (Thủ Thiêm) */}
      <path d='M905 0 C860 120 930 220 860 320 S760 470 840 560 S960 640 1000 650 V0 Z' fill='#E6DDBF' stroke='none' />

      {/* Công viên */}
      <ellipse cx='455' cy='480' rx='48' ry='30' fill='#B7C49A' opacity='0.55' transform='rotate(-30 455 480)' />
      <ellipse cx='600' cy='300' rx='40' ry='22' fill='#B7C49A' opacity='0.5' transform='rotate(-30 600 300)' />

      {/* Sông Sài Gòn, kênh Nhiêu Lộc – Thị Nghè, kênh Bến Nghé */}
      <path
        id='river-path'
        d='M905 0 C860 120 930 220 860 320 S760 470 840 560 S960 640 1000 650'
        fill='none'
        stroke={WATER}
        strokeWidth='54'
        strokeLinecap='round'
      />
      <path
        d='M905 0 C860 120 930 220 860 320 S760 470 840 560 S960 640 1000 650'
        fill='none'
        stroke={WATER_LIGHT}
        strokeWidth='22'
        strokeDasharray='40 30'
        strokeLinecap='round'
        opacity='0.7'
      />
      <path
        d='M0 210 C150 240 260 170 380 205 S600 250 700 235 S820 230 878 262'
        fill='none'
        stroke={WATER}
        strokeWidth='14'
        strokeLinecap='round'
      />
      <path
        d='M0 668 C200 640 420 690 600 662 S780 628 850 596'
        fill='none'
        stroke={WATER}
        strokeWidth='20'
        strokeLinecap='round'
      />

      {/* Trục đường chính (nét mảnh) */}
      <g stroke='#1F3A5F' strokeOpacity='0.18' strokeWidth='3' fill='none' strokeLinecap='round'>
        <path d='M120 520 L760 120' />
        <path d='M200 640 L620 300 L700 250' />
        <path d='M330 690 L820 330' />
        <path d='M180 300 L620 640' />
        <path d='M520 210 L820 470' />
      </g>

      <g
        fontFamily='var(--font-display)'
        fill='#1F3A5F'
        fillOpacity='0.38'
        fontWeight={700}
        letterSpacing='6'
        fontSize='22'
      >
        <text x='150' y='560'>
          QUẬN 3
        </text>
        <text x='470' y='630' transform='rotate(-8 470 630)'>
          QUẬN 1
        </text>
        <text x='330' y='95'>
          BÌNH THẠNH
        </text>
        <text x='915' y='430' fontSize='16' transform='rotate(90 915 430)'>
          THỦ THIÊM
        </text>
      </g>
      <text fontFamily='var(--font-display)' fontStyle='italic' fontSize='17' fill='#1F3A5F' fillOpacity='0.6'>
        <textPath href='#river-path' startOffset='14%'>
          Sông Sài Gòn
        </textPath>
      </text>
      <text
        x='40'
        y='200'
        fontFamily='var(--font-display)'
        fontStyle='italic'
        fontSize='14'
        fill='#1F3A5F'
        fillOpacity='0.55'
      >
        Kênh Nhiêu Lộc – Thị Nghè
      </text>
      <text
        x='250'
        y='690'
        fontFamily='var(--font-display)'
        fontStyle='italic'
        fontSize='14'
        fill='#1F3A5F'
        fillOpacity='0.55'
      >
        Kênh Bến Nghé
      </text>

      <CompassRose x={80} y={92} r={38} />

      {/* Thước tỉ lệ minh hoạ */}
      <g transform='translate(40 610)' fontFamily='var(--font-body)' fontSize='11' fill='#1F3A5F' fillOpacity='0.7'>
        <rect width='60' height='6' fill='#1F3A5F' fillOpacity='0.7' />
        <rect x='60' width='60' height='6' fill='none' stroke='#1F3A5F' strokeOpacity='0.7' />
        <text y='22'>0</text>
        <text x='108' y='22'>
          1 km
        </text>
      </g>

      {showRoute && (
        <path
          d={routePath()}
          fill='none'
          stroke='#B5432F'
          strokeWidth='4'
          strokeLinecap='round'
          strokeDasharray='2 12'
          opacity='0.85'
          className={animateRoute ? 'motion-safe:animate-fade-in' : undefined}
        />
      )}

      <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill='url(#map-vignette)' />
      <rect
        x='6'
        y='6'
        width={MAP_WIDTH - 12}
        height={MAP_HEIGHT - 12}
        fill='none'
        stroke='#8A6420'
        strokeOpacity='0.6'
        strokeWidth='2'
      />
      <rect
        x='14'
        y='14'
        width={MAP_WIDTH - 28}
        height={MAP_HEIGHT - 28}
        fill='none'
        stroke='#8A6420'
        strokeOpacity='0.35'
        strokeWidth='1'
      />
    </svg>
  );
}
