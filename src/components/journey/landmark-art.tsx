import type { ReactNode } from 'react';

const DARK = '#0B1729';
const DEEP = '#081221';
const LIGHT = '#E2BE7A';

/** Mái cong kiểu đình chùa: `y` là mép dưới, đầu mái hơi vểnh lên. */
function curvedRoof(left: number, right: number, y: number, height: number) {
  return `M${left - 26} ${y - 16} Q${left} ${y} ${left + 22} ${y} L${right - 22} ${y} Q${right} ${y} ${right + 26} ${y - 16} L${right - 12} ${y - height} L${left + 12} ${y - height} Z`;
}

function windows(x: number, y: number, count: number, gap: number, w = 14, h = 26) {
  return Array.from({ length: count }, (_, i) => (
    <rect key={`${x}-${y}-${i}`} x={x + i * gap} y={y} width={w} height={h} rx={w / 2} />
  ));
}

const LANDMARKS: Record<string, ReactNode> = {
  // Trường học cổ thời Pháp: hai tầng, sảnh giữa mái dốc
  'le-quy-don': (
    <>
      <path d='M380 820V640h680v180Z M370 640l20-26h660l20 26Z' fill={DARK} />
      <path d='M630 820V560h180v260Z M610 560l110-74 110 74Z' fill={DARK} />
      <path d='M720 486v-60' stroke={DARK} strokeWidth='4' />
      <path d='M722 428h34v20h-34Z' fill='#B5432F' />
      <circle cx='720' cy='600' r='16' fill={LIGHT} fillOpacity='0.6' />
      <g fill={LIGHT} fillOpacity='0.45'>
        {windows(410, 662, 5, 42)}
        {windows(410, 740, 5, 42)}
        {windows(836, 662, 5, 42)}
        {windows(836, 740, 5, 42)}
        {windows(660, 650, 3, 52, 18, 34)}
      </g>
      <path d='M690 820v-60a30 30 0 0 1 60 0v60Z' fill={DEEP} />
    </>
  ),
  // Bảo tàng: khối nhà hiện đại, máy bay và xe tăng trưng bày ngoài sân
  'bao-tang-chung-tich': (
    <>
      <path d='M480 820V610h480v210Z M460 610v-18h520v18Z' fill={DARK} />
      <rect x='500' y='630' width='440' height='34' fill={LIGHT} fillOpacity='0.2' />
      <g fill={LIGHT} fillOpacity='0.4'>
        {Array.from({ length: 10 }, (_, i) => (
          <rect key={i} x={512 + i * 43} y='690' width='22' height='96' />
        ))}
      </g>
      <path d='M650 820v-44h140v44Z' fill={DEEP} />
      {/* Máy bay */}
      <path
        d='M990 770c40-8 150-10 230-6l30-24h18l-14 30c20 4 20 14 0 18H1000c-16-2-22-14-10-18Z M1080 766l-30 34h22l50-34Z'
        fill={DARK}
      />
      {/* Xe tăng */}
      <path d='M250 820v-36h170v36Z M290 784v-26h80v26Z M370 768h80v8h-80Z' fill={DARK} />
      <g fill={DEEP}>
        {[270, 305, 340, 375, 405].map((x) => (
          <circle key={x} cx={x} cy='812' r='12' />
        ))}
      </g>
    </>
  ),
  // Dinh Độc Lập: mái bằng, mặt tiền rèm hoa đá, cột cờ
  'dinh-doc-lap': (
    <>
      <path d='M360 820v-56h720v56Z' fill={DARK} />
      <path d='M430 764V610h580v154Z M410 610v-18h620v18Z M600 592v-44h240v44Z M590 548v-10h260v10Z' fill={DARK} />
      <path d='M720 538V420' stroke={DARK} strokeWidth='5' />
      <path d='M723 422h52v34h-52Z' fill='#B5432F' />
      <g fill={LIGHT} fillOpacity='0.32'>
        {Array.from({ length: 40 }, (_, i) => (
          <rect key={i} x={442 + i * 14} y='622' width='6' height='130' />
        ))}
      </g>
      <rect x='430' y='680' width='580' height='6' fill={DARK} />
      <ellipse cx='720' cy='822' rx='300' ry='14' fill={DEEP} />
      <ellipse cx='720' cy='808' rx='40' ry='8' fill={LIGHT} fillOpacity='0.35' />
    </>
  ),
  // Chợ Bến Thành: tháp đồng hồ ở cổng chính
  'cho-ben-thanh': (
    <>
      <path d='M360 820V690h720v130Z M350 690l16-22h708l16 22Z' fill={DARK} />
      <path d='M660 820V560h120v260Z M650 560l70-80 70 80Z M640 690v-40h160v40Z' fill={DARK} />
      <circle cx='720' cy='600' r='28' fill={LIGHT} fillOpacity='0.75' />
      <path d='M720 600v-18M720 600l12 8' stroke={DARK} strokeWidth='4' strokeLinecap='round' />
      <text
        x='720'
        y='676'
        textAnchor='middle'
        fontSize='19'
        fontWeight='700'
        letterSpacing='3'
        fill={LIGHT}
        fillOpacity='0.85'
        fontFamily='var(--font-display)'
      >
        BẾN THÀNH
      </text>
      <path d='M690 820v-80a30 30 0 0 1 60 0v80Z' fill={DEEP} />
      <path d='M450 820v-60a24 24 0 0 1 48 0v60Z M942 820v-60a24 24 0 0 1 48 0v60Z' fill={DEEP} />
      <g fill={LIGHT} fillOpacity='0.35'>
        {windows(530, 714, 3, 40)}
        {windows(830, 714, 3, 40)}
      </g>
    </>
  ),
  // Lăng Ông: cổng tam quan mái cong hai tầng
  'lang-ong-ba-chieu': (
    <>
      <path d='M640 820V630h160v190Z M480 820V700h130v120Z M830 820V700h130v120Z' fill={DARK} />
      <path d={curvedRoof(620, 820, 640, 30)} fill={DARK} />
      <path d='M664 610V572h112v38Z' fill={DARK} />
      <path d={curvedRoof(650, 790, 576, 26)} fill={DARK} />
      <path d={curvedRoof(470, 620, 704, 22)} fill={DARK} />
      <path d={curvedRoof(820, 970, 704, 22)} fill={DARK} />
      <circle cx='720' cy='540' r='10' fill={LIGHT} fillOpacity='0.8' />
      <path
        d='M690 820v-90a30 30 0 0 1 60 0v90Z M524 820v-56a21 21 0 0 1 42 0v56Z M874 820v-56a21 21 0 0 1 42 0v56Z'
        fill={DEEP}
      />
      <rect x='684' y='648' width='72' height='22' fill={LIGHT} fillOpacity='0.5' />
      <g fill={DARK}>
        <rect x='610' y='640' width='16' height='180' />
        <rect x='814' y='640' width='16' height='180' />
      </g>
    </>
  ),
};

/**
 * Tranh minh họa công trình (dùng khi chưa có ảnh thật).
 * Công trình được đặt quanh tâm x = 720 để vẫn thấy rõ khi cắt khung dọc trên điện thoại.
 */
export function LandmarkArt({ id, className }: { id: string; className?: string }) {
  return (
    <svg
      viewBox='0 0 1440 900'
      preserveAspectRatio='xMidYMax slice'
      className={className}
      aria-hidden='true'
      focusable='false'
    >
      <defs>
        <linearGradient id={`sky-${id}`} x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0' stopColor='#0E1D31' />
          <stop offset='0.65' stopColor='#1F3A5F' />
          <stop offset='1' stopColor='#2E5383' />
        </linearGradient>
        <pattern id={`grid-${id}`} width='60' height='60' patternUnits='userSpaceOnUse'>
          <path d='M60 0H0V60' fill='none' stroke='#F5EBD7' strokeOpacity='0.05' />
        </pattern>
      </defs>
      <rect width='1440' height='900' fill={`url(#sky-${id})`} />
      <rect width='1440' height='900' fill={`url(#grid-${id})`} />
      <circle cx='1010' cy='600' r='54' fill={LIGHT} fillOpacity='0.22' />
      <path
        d='M0 700 C200 650 360 690 520 660 S860 640 1040 670 S1300 650 1440 680 V900 H0Z'
        fill='#132945'
        fillOpacity='0.8'
      />
      <path
        d='M120 520 Q400 420 560 560 T1000 500'
        fill='none'
        stroke='#D4664F'
        strokeOpacity='0.35'
        strokeWidth='3'
        strokeDasharray='2 12'
      />
      {/* Thu nhỏ quanh chân công trình để chừa chỗ cho tiêu đề ở trang chủ */}
      <g transform='translate(720 816) scale(0.72) translate(-720 -816)'>{LANDMARKS[id]}</g>
      <g fill={DEEP}>
        {[150, 230, 1190, 1290, 1370].map((x, i) => (
          <circle key={x} cx={x} cy={800 - (i % 2) * 10} r={30 + (i % 3) * 8} />
        ))}
      </g>
      <rect y='816' width='1440' height='84' fill={DEEP} />
    </svg>
  );
}
