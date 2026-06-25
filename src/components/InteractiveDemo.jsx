import { useMemo, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import rasterLandscape from '../assets/raster-landscape.png';

function Slider({ label, value, onChange, min = 0, max = 100, step = 1 }) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between text-xs font-black text-slate-500 dark:text-slate-400">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-blue-600"
      />
    </label>
  );
}

function Lerp1D() {
  const [t, setT] = useState(50);
  const x = 24 + (276 * t) / 100;
  return (
    <div className="space-y-4">
      <div className="relative h-24 rounded-lg bg-slate-100 p-6 dark:bg-slate-800">
        <div className="absolute left-6 right-6 top-1/2 h-2 -translate-y-1/2 rounded-full bg-slate-300 dark:bg-slate-700" />
        <div className="absolute top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-blue-600 shadow-lg" style={{ left: x }} />
        <span className="absolute left-6 top-3 text-xs font-black text-slate-500">A</span>
        <span className="absolute right-6 top-3 text-xs font-black text-slate-500">B</span>
      </div>
      <Slider label="t" value={t} onChange={setT} />
      <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">Formula: start + (end - start) * t. The marker moves between two 1D endpoints.</p>
    </div>
  );
}

function Lerp2D() {
  const [t, setT] = useState(35);
  const x = 28 + (230 * t) / 100;
  const y = 140 - (100 * t) / 100;
  return (
    <div className="space-y-4">
      <div className="demo-grid relative h-52 rounded-lg bg-slate-100 dark:bg-slate-800">
        <svg className="absolute inset-0 h-full w-full">
          <line x1="40" y1="150" x2="270" y2="50" stroke="#2563eb" strokeWidth="3" strokeDasharray="8 8" />
        </svg>
        <div className="absolute h-7 w-7 rounded-full bg-emerald-600 shadow-lg" style={{ left: x, top: y }} />
      </div>
      <Slider label="t" value={t} onChange={setT} />
      <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">2D lerp applies the same interpolation separately to x and y coordinates.</p>
    </div>
  );
}

function RubberBand() {
  const [drag, setDrag] = useState(80);
  const limit = 180;
  const visual = drag > limit ? limit + (drag - limit) * 0.35 : drag;
  return (
    <div className="space-y-4">
      <div className="relative h-32 rounded-lg bg-slate-100 p-6 dark:bg-slate-800">
        <div className="absolute left-6 top-1/2 h-1 w-[180px] -translate-y-1/2 rounded-full bg-emerald-500" />
        <div className="absolute left-[204px] top-4 bottom-4 w-1 rounded-full bg-red-500" />
        <div className="absolute top-1/2 h-12 w-12 -translate-y-1/2 rounded-lg bg-blue-600 shadow-lg" style={{ left: 24 + visual }} />
      </div>
      <Slider label="drag distance" value={drag} onChange={setDrag} max={300} />
      <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">Beyond the red boundary, damping reduces movement so the object feels elastic and then can snap back.</p>
    </div>
  );
}

function TransformDemo() {
  const [tx, setTx] = useState(35);
  const [rotation, setRotation] = useState(20);
  const [scale, setScale] = useState(1.1);
  return (
    <div className="space-y-4">
      <div className="demo-grid grid h-56 place-items-center rounded-lg bg-slate-100 dark:bg-slate-800">
        <div
          className="grid h-24 w-24 place-items-center rounded-lg bg-blue-600 text-sm font-black text-white shadow-lg"
          style={{ transform: `translateX(${tx}px) rotate(${rotation}deg) scale(${scale})` }}
        >
          Object
        </div>
      </div>
      <Slider label="translation x" value={tx} onChange={setTx} min={-80} max={80} />
      <Slider label="rotation" value={rotation} onChange={setRotation} min={-180} max={180} />
      <Slider label="scale" value={scale} onChange={setScale} min={0.5} max={1.8} step={0.1} />
    </div>
  );
}

function PixelPoint() {
  const [density, setDensity] = useState(2);
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-slate-100 p-4 dark:bg-slate-800">
          <p className="text-sm font-black text-slate-900 dark:text-white">Point-sized UI</p>
          <div className="mt-4 h-20 w-20 rounded-lg bg-blue-600" />
        </div>
        <div className="rounded-lg bg-slate-100 p-4 dark:bg-slate-800">
          <p className="text-sm font-black text-slate-900 dark:text-white">Hardware pixels used</p>
          <div className="mt-4 grid h-20 w-20 gap-px" style={{ gridTemplateColumns: `repeat(${density * 4}, 1fr)` }}>
            {Array.from({ length: density * density * 16 }).map((_, index) => (
              <span key={index} className="bg-emerald-500" />
            ))}
          </div>
        </div>
      </div>
      <Slider label="device density" value={density} onChange={setDensity} min={1} max={4} />
      <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">A point or CSS pixel can map to multiple hardware pixels on high-density displays.</p>
    </div>
  );
}

function RasterVector() {
  const [zoom, setZoom] = useState(1.5);
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="overflow-hidden rounded-lg bg-slate-100 p-4 dark:bg-slate-800">
          <p className="mb-3 text-sm font-black text-slate-900 dark:text-white">Raster</p>
          <div className="h-44 overflow-hidden rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-950">
            <img
              src={rasterLandscape}
              alt="Small raster landscape bitmap"
              className="h-24 w-32 rounded-md object-cover shadow-sm"
              style={{
                imageRendering: 'pixelated',
                transform: `scale(${zoom})`,
                transformOrigin: 'top left',
              }}
            />
          </div>
          <p className="mt-3 text-xs font-semibold leading-5 text-slate-500 dark:text-slate-400">
            PNG bitmap: zoom karne par pixels/blockiness visible hoti hai.
          </p>
        </div>
        <div className="overflow-hidden rounded-lg bg-slate-100 p-4 dark:bg-slate-800">
          <p className="mb-3 text-sm font-black text-slate-900 dark:text-white">Vector</p>
          <div className="h-44 overflow-hidden rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-950">
            <svg width="128" height="96" viewBox="0 0 128 96" style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}>
              <rect width="128" height="96" rx="10" fill="#dbeafe" />
              <circle cx="95" cy="23" r="12" fill="#facc15" />
              <path d="M0 70 L37 32 L75 70 Z" fill="#4338ca" />
              <path d="M32 70 L76 38 L128 70 Z" fill="#16a34a" />
              <rect y="67" width="128" height="29" fill="#22c55e" />
              <path d="M58 80 C75 67 95 88 128 75" fill="none" stroke="#2563eb" strokeWidth="8" strokeLinecap="round" />
            </svg>
          </div>
          <p className="mt-3 text-xs font-semibold leading-5 text-slate-500 dark:text-slate-400">
            SVG vector: same zoom par edges mathematically sharp rehte hain.
          </p>
        </div>
      </div>
      <Slider label="zoom" value={zoom} onChange={setZoom} min={1} max={3} step={0.5} />
    </div>
  );
}

function FittsLaw() {
  const [distance, setDistance] = useState(180);
  const [size, setSize] = useState(44);
  const index = Math.log2(distance / size + 1).toFixed(2);
  return (
    <div className="space-y-4">
      <div className="relative h-52 rounded-lg bg-slate-100 p-6 dark:bg-slate-800">
        <div className="absolute left-8 top-1/2 h-9 w-9 -translate-y-1/2 rounded-full bg-slate-900 dark:bg-white" />
        <div className="absolute top-1/2 -translate-y-1/2 rounded-full bg-blue-600 shadow-lg" style={{ left: 52 + distance, width: size, height: size }} />
        <div className="absolute left-8 right-8 bottom-5 text-sm font-black text-slate-600 dark:text-slate-300">Index of difficulty: {index}</div>
      </div>
      <Slider label="distance" value={distance} onChange={setDistance} min={60} max={260} />
      <Slider label="target size" value={size} onChange={setSize} min={24} max={90} />
    </div>
  );
}

function NormanStages() {
  const [stage, setStage] = useState(0);
  const stages = ['Goal', 'Intention', 'Specify', 'Execute', 'Perceive', 'Interpret', 'Evaluate'];
  return (
    <div className="space-y-4">
      <div className="grid gap-2 sm:grid-cols-7">
        {stages.map((item, index) => (
          <button
            key={item}
            type="button"
            onClick={() => setStage(index)}
            className={`rounded-lg p-3 text-sm font-black transition ${
              stage === index ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="rounded-lg bg-slate-100 p-4 text-sm leading-6 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
        Stage {stage + 1}: {stages[stage]}. Designers reduce gulfs by making each step visible, understandable, and reversible.
      </p>
    </div>
  );
}

function MhpDemo() {
  const [perception, setPerception] = useState(100);
  const [cognition, setCognition] = useState(70);
  const [motor, setMotor] = useState(70);
  const total = perception + cognition + motor;
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ['Perceptual', perception, 'bg-blue-600'],
          ['Cognitive', cognition, 'bg-amber-500'],
          ['Motor', motor, 'bg-emerald-600'],
        ].map(([label, value, color]) => (
          <div key={label} className="rounded-lg bg-slate-100 p-4 dark:bg-slate-800">
            <div className={`h-3 rounded-full ${color}`} style={{ width: `${Math.min(100, value)}%` }} />
            <p className="mt-3 text-sm font-black text-slate-900 dark:text-white">{label}</p>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{value} ms</p>
          </div>
        ))}
      </div>
      <p className="rounded-lg bg-blue-50 p-4 text-sm font-black text-blue-800 dark:bg-blue-500/10 dark:text-blue-200">
        Estimated interaction cycle: {total} ms
      </p>
      <Slider label="perception" value={perception} onChange={setPerception} min={40} max={180} />
      <Slider label="cognition" value={cognition} onChange={setCognition} min={40} max={180} />
      <Slider label="motor" value={motor} onChange={setMotor} min={40} max={180} />
    </div>
  );
}

const demos = [
  { id: 'lerp1d', title: '1D lerp', component: Lerp1D },
  { id: 'lerp2d', title: '2D lerp', component: Lerp2D },
  { id: 'rubber', title: 'Rubber banding', component: RubberBand },
  { id: 'transform', title: 'Translation, rotation, scaling', component: TransformDemo },
  { id: 'pixel', title: 'Pixel vs point', component: PixelPoint },
  { id: 'raster', title: 'Raster vs vector', component: RasterVector },
  { id: 'fitts', title: 'Fitts Law', component: FittsLaw },
  { id: 'norman', title: 'Norman 7 stages', component: NormanStages },
  { id: 'mhp', title: 'MHP', component: MhpDemo },
];

export default function InteractiveDemo() {
  const [active, setActive] = useState(demos[0].id);
  const ActiveDemo = useMemo(() => demos.find((demo) => demo.id === active)?.component || Lerp1D, [active]);

  return (
    <div className="space-y-5">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black text-slate-950 dark:text-white">Interactive mini demos</h1>
            <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">Move sliders and compare how the theory behaves visually.</p>
          </div>
          <button
            type="button"
            onClick={() => setActive(demos[0].id)}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-black text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <RotateCcw size={17} />
            First demo
          </button>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[300px_1fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {demos.map((demo) => (
            <button
              key={demo.id}
              type="button"
              onClick={() => setActive(demo.id)}
              className={`mb-2 w-full rounded-lg px-3 py-3 text-left text-sm font-black transition last:mb-0 ${
                active === demo.id
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {demo.title}
            </button>
          ))}
        </div>
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-5 text-xl font-black text-slate-950 dark:text-white">
            {demos.find((demo) => demo.id === active)?.title}
          </h2>
          <ActiveDemo />
        </section>
      </div>
    </div>
  );
}
