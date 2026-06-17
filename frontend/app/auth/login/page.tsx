'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [loginValue, setLoginValue] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Canvas refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ login: loginValue, password });
      // После успешного входа запускаем анимацию
      setIsSuccess(true);
      startPacmanAnimation();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  // === Анимация Пакмана (аналогична регистрации) ===
  const startPacmanAnimation = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Показываем canvas
    canvas.style.display = 'block';
    const successMsg = document.querySelector('.success-message') as HTMLElement;
    if (successMsg) successMsg.style.display = 'none';

    const PACMAN_RADIUS = 20;
    const DOT_RADIUS = 3;
    const DOT_COUNT = 12;
    const START_X = 30;
    const END_X = canvas.width - 30;
    const STEP = 2;

    let posX = START_X;
    let animationCompleted = false;
    let smileFrame = 0;
    let pacmanMouthAngle = 0;
    let mouthDirection = 1;

    let dots: { x: number; y: number; active: boolean }[] = [];
    const initDots = () => {
      dots = [];
      const spacing = (canvas.width - 80) / (DOT_COUNT - 1);
      for (let i = 0; i < DOT_COUNT; i++) {
        dots.push({
          x: 40 + i * spacing,
          y: canvas.height / 2,
          active: true,
        });
      }
    };
    initDots();

    const drawPacman = (x: number, y: number, angle: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.beginPath();
      ctx.arc(0, 0, PACMAN_RADIUS, angle, 2 * Math.PI - angle);
      ctx.lineTo(0, 0);
      ctx.fillStyle = '#ff0';
      ctx.fill();
      ctx.restore();
    };

    const drawSmile = (x: number, y: number) => {
      ctx.beginPath();
      ctx.arc(x, y, PACMAN_RADIUS * 0.7, 0.1 * Math.PI, 0.9 * Math.PI, false);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x - 8, y - 5, 3, 0, 2 * Math.PI);
      ctx.fillStyle = '#000';
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let dot of dots) {
        if (dot.active) {
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, 2 * Math.PI);
          ctx.fillStyle = '#fff';
          ctx.fill();
        }
      }

      if (!animationCompleted) {
        posX += STEP;
        if (posX > END_X) {
          posX = END_X;
          animationCompleted = true;
          for (let dot of dots) dot.active = false;
        } else {
          for (let dot of dots) {
            if (dot.active && Math.abs(dot.x - posX) < PACMAN_RADIUS + DOT_RADIUS) {
              dot.active = false;
            }
          }
        }

        pacmanMouthAngle += 0.05 * mouthDirection;
        if (pacmanMouthAngle > 0.7) mouthDirection = -1;
        if (pacmanMouthAngle < 0.2) mouthDirection = 1;
        const mouth = 0.2 + pacmanMouthAngle * 0.3;

        drawPacman(posX, canvas.height / 2, mouth);
      } else {
        drawPacman(posX, canvas.height / 2, 0.1);
        drawSmile(posX, canvas.height / 2);

        if (successMsg) successMsg.style.display = 'block';

        if (smileFrame === 0) {
          setTimeout(() => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            // Редирект на главную через 2 секунды
            setTimeout(() => {
              router.push('/');
            }, 2000);
          }, 1500);
          smileFrame = 1;
        }
      }

      if (!animationCompleted || smileFrame === 0) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  // Очистка анимации при размонтировании
  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="flex justify-center w-full pt-8">
      <div className="w-full max-w-md px-4">
        <div className="form-container">
          <h2>🎮 ВХОД В ИГРУ 🎮</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>👤 ИМЯ ПОЛЬЗОВАТЕЛЯ</label>
              <input
                type="text"
                placeholder="PLAYER1"
                value={loginValue}
                onChange={(e) => setLoginValue(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>🔒 ПАРОЛЬ</label>
              <input
                type="password"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-xs mb-4">{error}</p>}
            <button type="submit" className="arcade-button" disabled={loading}>
              {loading ? 'ВХОД...' : '➡ ВОЙТИ'}
            </button>
            <div className="form-footer">
              Нет аккаунта? <Link href="/auth/register">ЗАРЕГИСТРИРОВАТЬСЯ →</Link>
            </div>
          </form>

          <div className="pacman-canvas-container">
            <canvas ref={canvasRef} id="pacmanCanvas" width="400" height="80"></canvas>
          </div>
          <div className="success-message">✅ ДОБРО ПОЖАЛОВАТЬ! ✅</div>
        </div>
      </div>
    </div>
  );
}