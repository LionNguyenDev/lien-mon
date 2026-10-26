import { LOCATIONS } from '@/data/locations';

export const CERT_WIDTH = 2000;
export const CERT_HEIGHT = 1414;

const NAVY = '#1F3A5F';
const BRICK = '#B5432F';
const BRASS = '#C8963E';
const BRASS_DARK = '#8A6420';
const PAPER = '#FBF5E9';

type Fonts = { display: string; body: string };

/** Lấy font Playfair / Be Vietnam Pro mà next/font đã nạp, chờ tải xong để canvas vẽ đúng dấu tiếng Việt. */
export async function loadCertificateFonts(): Promise<Fonts> {
  const style = getComputedStyle(document.body);
  const display = style.getPropertyValue('--font-display').trim() || 'Georgia, serif';
  const body = style.getPropertyValue('--font-body').trim() || 'system-ui, sans-serif';
  const sample = 'GIẤY CHỨNG NHẬN Nguyễn Thị Ánh Hồng ữặỹ';
  try {
    await Promise.all([
      document.fonts.load(`800 100px ${display}`, sample),
      document.fonts.load(`italic 700 100px ${display}`, sample),
      document.fonts.load(`700 100px ${display}`, sample),
      document.fonts.load(`italic 500 40px ${display}`, sample),
      document.fonts.load(`400 40px ${body}`, sample),
      document.fonts.load(`600 40px ${body}`, sample),
    ]);
  } catch {
    // Không tải được font thì vẫn vẽ bằng font dự phòng.
  }
  return { display, body };
}

function spacedText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, spacing: number) {
  const chars = Array.from(text);
  const width = chars.reduce((sum, ch) => sum + ctx.measureText(ch).width, 0) + spacing * (chars.length - 1);
  let cursor = x - width / 2;
  const align = ctx.textAlign;
  ctx.textAlign = 'left';
  for (const ch of chars) {
    ctx.fillText(ch, cursor, y);
    cursor += ctx.measureText(ch).width + spacing;
  }
  ctx.textAlign = align;
}

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function diamond(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x, y - r);
  ctx.lineTo(x + r, y);
  ctx.lineTo(x, y + r);
  ctx.lineTo(x - r, y);
  ctx.closePath();
  ctx.fill();
}

function drawMapMotif(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.strokeStyle = NAVY;
  ctx.globalAlpha = 0.045;
  ctx.lineWidth = 2;
  for (let x = 140; x < CERT_WIDTH - 120; x += 90) {
    ctx.beginPath();
    ctx.moveTo(x, 130);
    ctx.lineTo(x, CERT_HEIGHT - 130);
    ctx.stroke();
  }
  for (let y = 140; y < CERT_HEIGHT - 120; y += 90) {
    ctx.beginPath();
    ctx.moveTo(130, y);
    ctx.lineTo(CERT_WIDTH - 130, y);
    ctx.stroke();
  }

  // Sông và kênh rạch cách điệu
  ctx.globalAlpha = 0.07;
  ctx.lineCap = 'round';
  ctx.lineWidth = 70;
  ctx.beginPath();
  ctx.moveTo(1780, 120);
  ctx.bezierCurveTo(1640, 380, 1880, 560, 1680, 820);
  ctx.bezierCurveTo(1540, 1000, 1760, 1180, 1880, 1300);
  ctx.stroke();
  ctx.lineWidth = 18;
  ctx.beginPath();
  ctx.moveTo(130, 420);
  ctx.bezierCurveTo(500, 470, 800, 330, 1200, 420);
  ctx.bezierCurveTo(1450, 470, 1600, 430, 1700, 470);
  ctx.stroke();

  // Lộ trình chấm đỏ
  ctx.globalAlpha = 0.16;
  ctx.strokeStyle = BRICK;
  ctx.lineWidth = 6;
  ctx.setLineDash([3, 22]);
  ctx.beginPath();
  LOCATIONS.forEach((location, i) => {
    const x = 260 + (location.map.x / 1000) * 1480;
    const y = 160 + (location.map.y / 700) * 1100;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
  ctx.setLineDash([]);

  // La bàn mờ
  ctx.globalAlpha = 0.09;
  ctx.fillStyle = NAVY;
  ctx.translate(300, 1080);
  ctx.beginPath();
  ctx.moveTo(0, -170);
  ctx.lineTo(26, 0);
  ctx.lineTo(0, 170);
  ctx.lineTo(-26, 0);
  ctx.closePath();
  ctx.moveTo(-170, 0);
  ctx.lineTo(0, 26);
  ctx.lineTo(170, 0);
  ctx.lineTo(0, -26);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = NAVY;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(0, 0, 130, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawBorder(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.strokeStyle = NAVY;
  ctx.lineWidth = 10;
  ctx.strokeRect(40, 40, CERT_WIDTH - 80, CERT_HEIGHT - 80);

  // Dải hoa văn giữa hai lớp khung
  ctx.fillStyle = BRASS;
  const band = 72;
  const step = 34;
  for (let x = 90; x <= CERT_WIDTH - 90; x += step) {
    diamond(ctx, x, band, 7);
    diamond(ctx, x, CERT_HEIGHT - band, 7);
  }
  for (let y = 90 + step; y <= CERT_HEIGHT - 90 - step; y += step) {
    diamond(ctx, band, y, 7);
    diamond(ctx, CERT_WIDTH - band, y, 7);
  }

  ctx.strokeStyle = BRASS_DARK;
  ctx.lineWidth = 4;
  ctx.strokeRect(100, 100, CERT_WIDTH - 200, CERT_HEIGHT - 200);
  ctx.strokeStyle = NAVY;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(114, 114, CERT_WIDTH - 228, CERT_HEIGHT - 228);

  // Hoa văn bốn góc
  const corners = [
    [114, 114],
    [CERT_WIDTH - 114, 114],
    [114, CERT_HEIGHT - 114],
    [CERT_WIDTH - 114, CERT_HEIGHT - 114],
  ];
  for (const [cx, cy] of corners) {
    ctx.fillStyle = PAPER;
    ctx.beginPath();
    ctx.arc(cx, cy, 40, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = BRASS_DARK;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = BRICK;
    for (let i = 0; i < 4; i++) {
      const a = (Math.PI / 2) * i + Math.PI / 4;
      diamond(ctx, cx + Math.cos(a) * 18, cy + Math.sin(a) * 18, 9);
    }
    ctx.fillStyle = BRASS;
    diamond(ctx, cx, cy, 10);
  }
  ctx.restore();
}

function drawDivider(ctx: CanvasRenderingContext2D, y: number, half: number) {
  const cx = CERT_WIDTH / 2;
  ctx.save();
  ctx.strokeStyle = BRASS;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx - half, y);
  ctx.lineTo(cx - 26, y);
  ctx.moveTo(cx + 26, y);
  ctx.lineTo(cx + half, y);
  ctx.stroke();
  ctx.fillStyle = BRICK;
  diamond(ctx, cx, y, 12);
  ctx.fillStyle = BRASS;
  diamond(ctx, cx - half - 12, y, 6);
  diamond(ctx, cx + half + 12, y, 6);
  ctx.restore();
}

function drawStamp(ctx: CanvasRenderingContext2D, fonts: Fonts, x: number, y: number, year: number) {
  const r = 172;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(-0.2);
  ctx.globalAlpha = 0.88;
  ctx.strokeStyle = BRICK;
  ctx.fillStyle = BRICK;

  ctx.lineWidth = 9;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, r - 20, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, r - 72, 0, Math.PI * 2);
  ctx.stroke();

  // Chữ chạy vòng quanh con dấu
  const text = 'HÀNH TRÌNH KHÁM PHÁ • TP. HỒ CHÍ MINH • ';
  ctx.font = `700 26px ${fonts.body}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const chars = Array.from(text);
  const widths = chars.map((ch) => ctx.measureText(ch).width);
  const total = widths.reduce((a, b) => a + b, 0);
  const radius = r - 46;
  const scale = (Math.PI * 2 * radius) / total;
  let angle = -Math.PI / 2;
  chars.forEach((ch, i) => {
    const w = widths[i] * scale;
    angle += w / 2 / radius;
    ctx.save();
    ctx.rotate(angle + Math.PI / 2);
    ctx.fillText(ch, 0, -radius);
    ctx.restore();
    angle += w / 2 / radius;
  });

  ctx.font = `800 19px ${fonts.body}`;
  ctx.fillText('ĐÃ HOÀN THÀNH', 0, -30);
  ctx.font = `800 54px ${fonts.body}`;
  ctx.fillText(String(year), 0, 18);
  diamond(ctx, 0, 62, 7);
  diamond(ctx, -26, 62, 4);
  diamond(ctx, 26, 62, 4);
  ctx.restore();
}

export function drawCertificate(
  ctx: CanvasRenderingContext2D,
  { name, date, fonts }: { name: string; date: Date; fonts: Fonts }
) {
  const cx = CERT_WIDTH / 2;
  ctx.clearRect(0, 0, CERT_WIDTH, CERT_HEIGHT);

  const bg = ctx.createRadialGradient(cx, CERT_HEIGHT / 2, 200, cx, CERT_HEIGHT / 2, 1250);
  bg.addColorStop(0, PAPER);
  bg.addColorStop(1, '#EEDDBB');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, CERT_WIDTH, CERT_HEIGHT);

  drawMapMotif(ctx);
  drawBorder(ctx);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';

  ctx.fillStyle = BRICK;
  ctx.font = `600 30px ${fonts.body}`;
  spacedText(ctx, 'HÀNH TRÌNH KHÁM PHÁ TP. HỒ CHÍ MINH', cx, 235, 9);

  ctx.fillStyle = NAVY;
  ctx.font = `800 118px ${fonts.display}`;
  ctx.fillText('GIẤY CHỨNG NHẬN', cx, 380);
  drawDivider(ctx, 435, 300);

  ctx.fillStyle = '#4F5D70';
  ctx.font = `400 38px ${fonts.body}`;
  ctx.fillText('Trân trọng ghi nhận', cx, 530);

  const displayName = name.trim() || 'Tên của bạn';
  let size = 124;
  ctx.font = `italic 700 ${size}px ${fonts.display}`;
  while (ctx.measureText(displayName).width > 1360 && size > 56) {
    size -= 4;
    ctx.font = `italic 700 ${size}px ${fonts.display}`;
  }
  ctx.fillStyle = BRICK;
  ctx.globalAlpha = name.trim() ? 1 : 0.3;
  ctx.fillText(displayName, cx, 680);
  ctx.globalAlpha = 1;

  ctx.strokeStyle = BRASS;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx - 560, 722);
  ctx.lineTo(cx + 560, 722);
  ctx.stroke();

  ctx.fillStyle = NAVY;
  ctx.font = `700 54px ${fonts.display}`;
  ctx.fillText('ĐÃ HOÀN THÀNH HÀNH TRÌNH KHÁM PHÁ TP.HCM', cx, 820);

  ctx.fillStyle = '#4F5D70';
  ctx.font = `400 32px ${fonts.body}`;
  const places = `qua ${LOCATIONS.length} điểm di sản: ${LOCATIONS.map((l) => l.name).join(' · ')}`;
  wrapLines(ctx, places, 1450).forEach((line, i) => ctx.fillText(line, cx, 890 + i * 46));

  // Ngày hoàn thành
  const dateText = `TP. Hồ Chí Minh, ngày ${date.getDate()} tháng ${date.getMonth() + 1} năm ${date.getFullYear()}`;
  const footY = 1150;
  ctx.fillStyle = BRASS_DARK;
  ctx.font = `600 24px ${fonts.body}`;
  spacedText(ctx, 'NGÀY HOÀN THÀNH', 640, footY - 60, 6);
  ctx.fillStyle = NAVY;
  ctx.font = `italic 500 40px ${fonts.display}`;
  ctx.fillText(dateText, 640, footY);
  ctx.strokeStyle = NAVY;
  ctx.globalAlpha = 0.3;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(380, footY + 28);
  ctx.lineTo(900, footY + 28);
  ctx.stroke();
  ctx.globalAlpha = 1;

  drawStamp(ctx, fonts, 1490, 1080, date.getFullYear());
}
