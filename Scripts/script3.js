 // ===== МЕНЮ =====
  document.querySelectorAll('.navbar li').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.navbar li').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });


document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('mouseCanvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let trail = [];

    window.addEventListener('mousemove', (e) => {
        // Основная точка
        trail.push({ x: e.clientX, y: e.clientY, radius: 300, alpha: 0.5 });

        // Вспомогательная точка рядом (чуть меньше)
        const offsetX = (Math.random() - 0.5) * 30;
        const offsetY = (Math.random() - 0.5) * 30;
        trail.push({ x: e.clientX + offsetX, y: e.clientY + offsetY, radius: 150, alpha: 0.7 });
    });

    function getColor(x, alpha) {
        const width = canvas.width;
        const leftColor = { r: 12, g: 0, b: 89 };
        const rightColor = { r: 72, g: 0, b: 31 };

        const r = Math.round(leftColor.r + (rightColor.r - leftColor.r) * (x / width));
        const g = Math.round(leftColor.g + (rightColor.g - leftColor.g) * (x / width));
        const b = Math.round(leftColor.b + (rightColor.b - leftColor.b) * (x / width));

        return `rgba(${r},${g},${b},${alpha})`;
    }

    function animate() {
        // Стираем старые следы
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Режим свечения
        ctx.globalCompositeOperation = 'lighter';
        ctx.globalAlpha = 0.5;

        for (let i = 0; i < trail.length; i++) {
            const point = trail[i];

            const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.radius);
            gradient.addColorStop(0, getColor(point.x, point.alpha * 0.5));
            gradient.addColorStop(1, 'rgba(0,0,0,0)');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
            ctx.fill();

            point.alpha -= 0.003; // скорость исчезновения
        }

        ctx.globalAlpha = 1; // сброс прозрачности

        // Удаляем полностью прозрачные точки
        trail = trail.filter(point => point.alpha > 0);

        requestAnimationFrame(animate);
    }

    animate();
});






document.querySelectorAll(".fav-btn").forEach(btn => {
    btn.addEventListener("click", function () {
        const card = this.closest(".product-card");
        card.remove(); // удаляет карточку и оставшиеся сдвигаются
    });
});



function checkEmpty() {
    const cards = document.querySelectorAll(".product-card");
    const emptyMsg = document.getElementById("empty-message");

    if (cards.length === 0) {
        emptyMsg.style.display = "block";
    }
}

document.querySelectorAll(".fav-btn").forEach(btn => {
    btn.addEventListener("click", function () {
        const card = this.closest(".product-card");
        card.remove(); 
        checkEmpty(); // Проверяем, остались ли карточки
    });
});

