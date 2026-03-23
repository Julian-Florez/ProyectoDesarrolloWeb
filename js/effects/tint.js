/**
 * Aplica un tinte de color a una imagen y retorna un dataURL.
 * @param {string} imgUrl - URL de la imagen original.
 * @param {string} color - Color CSS a aplicar como tinte (ej: 'rgba(26,79,255,0.7)').
 * @param {function} callback - Recibe el dataURL resultante.
 */
function tint(imgUrl, color, callback) {
  const img = new window.Image();
  img.crossOrigin = "anonymous";
  img.onload = function() {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'destination-over';
    ctx.drawImage(img, 0, 0);
    callback(canvas.toDataURL());
  };
  img.onerror = function() {
    callback(null);
  };
  img.src = imgUrl;
}

// Aplica el tinte a todas las secciones .section-title usando el color definido en data-tint-color
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.section-title').forEach(function(sectionTitle) {
    const bgUrlMatch = getComputedStyle(sectionTitle).backgroundImage.match(/url\(["']?([^"')]+)["']?\)/);
    if (!bgUrlMatch) return;
    // Permite definir el color por sección usando data-tint-color, si no existe usa azul por defecto
    const color = sectionTitle.getAttribute('data-tint-color') || 'rgba(26,79,255,0.6)';
    tint(bgUrlMatch[1], color, function(tintedDataUrl) {
      if (tintedDataUrl) {
        sectionTitle.style.backgroundImage = `url('${tintedDataUrl}')`;
      }
    });
  });
});