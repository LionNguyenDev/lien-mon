/** Nền trang bắt đầu: bản đồ cổ mờ + đường chân trời Sài Gòn (Nhà thờ Đức Bà, chợ Bến Thành, Bitexco, Landmark 81, Dinh Độc Lập). */
export function HeroBackdrop() {
  return (
    <div
      className='absolute inset-0 overflow-hidden bg-gradient-to-b from-navy-deep via-navy to-navy-dark'
      aria-hidden='true'
    >
      <svg className='absolute inset-0 h-full w-full' preserveAspectRatio='xMidYMid slice' viewBox='0 0 1440 900'>
        <defs>
          <pattern id='hero-grid' width='60' height='60' patternUnits='userSpaceOnUse'>
            <path d='M60 0H0V60' fill='none' stroke='#F5F9FD' strokeOpacity='0.05' />
          </pattern>
        </defs>
        <rect width='1440' height='900' fill='url(#hero-grid)' />
        <g fill='none' stroke='#7FA9D6' strokeOpacity='0.2' strokeWidth='2'>
          <path
            d='M1180 -20 C1100 160 1260 300 1120 460 S980 700 1140 900'
            strokeWidth='46'
            stroke='#1D4C86'
            strokeOpacity='0.55'
          />
          <path
            d='M-20 300 C220 340 420 250 640 300 S980 360 1130 330'
            strokeWidth='12'
            stroke='#1D4C86'
            strokeOpacity='0.5'
          />
          <path d='M200 120 C380 200 520 90 720 160' strokeDasharray='4 10' />
          <path
            d='M160 480 Q400 380 560 520 T980 470'
            strokeDasharray='2 12'
            stroke='#7FA9D6'
            strokeOpacity='0.45'
            strokeWidth='3'
          />
        </g>
        <g transform='translate(1250 150)' stroke='#E8F8B0' strokeOpacity='0.3' fill='none'>
          <circle r='90' />
          <circle r='70' strokeDasharray='3 6' />
          <path d='M0 -110 L14 0 L0 110 L-14 0 Z M-110 0 L0 14 L110 0 L0 -14 Z' fill='#E8F8B0' fillOpacity='0.12' />
        </g>
        {[
          [260, 480],
          [560, 520],
          [980, 470],
        ].map(([x, y]) => (
          <g key={x} transform={`translate(${x} ${y})`}>
            <circle r='7' fill='#7FA9D6' fillOpacity='0.7' />
            <circle r='16' fill='none' stroke='#7FA9D6' strokeOpacity='0.35' />
          </g>
        ))}
      </svg>

      <svg
        className='absolute inset-x-0 bottom-0 h-[42%] w-full sm:h-[48%]'
        preserveAspectRatio='xMidYMax slice'
        viewBox='0 0 1440 400'
      >
        <g fill='#07213F'>
          {/* Khối nhà nền */}
          <path d='M0 300h60v-40h50v60h40v-90h70v100h30v-50h40v80H0Z' />
          {/* Nhà thờ Đức Bà */}
          <path d='M300 400V250h120v150Z' />
          <path d='M308 250v-80l17-60 17 60v80Z M378 250v-80l17-60 17 60v80Z' />
          <path d='M325 104v-14M319 96h12 M395 104v-14M389 96h12' stroke='#07213F' strokeWidth='3' />
          <path d='M440 400v-110h70v110Z M520 400v-70h40v70Z' />
          {/* Chợ Bến Thành */}
          <path d='M580 400v-90h80v-20h70v20h80v90Z' />
          <path d='M670 290v-70h50v70Z M664 222l31-26 31 26Z' />
          {/* Bitexco */}
          <path d='M860 400L874 130Q900 104 926 130L940 400Z' />
          <path d='M890 180h70a10 4 0 0 1 0 8h-70Z' />
          <path d='M960 400v-150h60v150Z' />
          {/* Landmark 81 */}
          <path d='M1040 400V90h70v310Z M1050 90V60h50v30Z M1060 60V36h30v24Z M1070 36V6h10v30Z' />
          {/* Dinh Độc Lập */}
          <path d='M1140 400v-80h230v80Z M1170 320v-22h170v22Z' />
          <path d='M1255 298v-56' stroke='#07213F' strokeWidth='3' />
          <path d='M1370 400v-60h70v60Z' />
        </g>
        <path d='M1257 244h26v14h-26Z' fill='#5088C0' />
        <circle cx='695' cy='255' r='9' fill='#E2BE7A' fillOpacity='0.8' />
        <g fill='#E2BE7A' fillOpacity='0.45'>
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={`lm-${i}`} x={1052 + (i % 3) * 18} y={110 + Math.floor(i / 3) * 60} width='8' height='16' />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <rect key={`bx-${i}`} x={884 + (i % 2) * 22} y={220 + Math.floor(i / 2) * 50} width='8' height='14' />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <rect key={`dl-${i}`} x={1156 + i * 24} y='340' width='14' height='4' />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <rect key={`dl2-${i}`} x={1156 + i * 24} y='362' width='14' height='4' />
          ))}
        </g>
        <g fill='#051730'>
          {[40, 140, 250, 470, 560, 830, 1000, 1130, 1400].map((x, i) => (
            <circle key={x} cx={x} cy={392 - (i % 2) * 6} r={18 + (i % 3) * 6} />
          ))}
        </g>
        <rect y='388' width='1440' height='12' fill='#051730' />
      </svg>
    </div>
  );
}
