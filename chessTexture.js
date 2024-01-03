export default function chessTexture() {
  const canv = document.createElement('canvas');
  const ctx = canv.getContext('2d');

  canv.width = canv.height = 256;

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 256, 256);
  ctx.fillStyle = 'black';

  for (var y = 0; y < 16; y++) {
    for (var x = 0; x < 16; x++) {
      if ((x & 1) != (y & 1)) ctx.fillRect(x * 16, y * 16, 16, 16);
    }
  }

  return canv;
}
