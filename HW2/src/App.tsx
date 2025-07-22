import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const SVGCircle = ({size = 40}: {size?: number}) => (
  <svg width={size} height={size} viewBox='0 0 40 40'>
    <circle cx='20' cy='20' r='18' fill='none' stroke='black' strokeWidth='2' />
  </svg>
);
const SVGSquare = ({size = 40}: {size?: number}) => (
  <svg width={size} height={size} viewBox='0 0 40 40'>
    <rect x='2' y='2' width='36' height='36' fill='none' stroke='black' strokeWidth='2' />
  </svg>
);
const SVGTriangle = ({size = 40}: {size?: number}) => (
  <svg width={size} height={size} viewBox='0 0 40 40'>
    <polygon points='20,5 5,35 35,35' fill='none' stroke='black' strokeWidth='2' />
  </svg>
);

type ShapeType = 'circle' | 'square' | 'triangle';
interface DroppedShape {
  type: ShapeType;
  x: number;
  y: number;
}
interface CanvasData {
  title: string;
  shapes: DroppedShape[];
}

function App() {
  const [title, setTitle] = useState<string>('Untitled Painting');
  const [shapes, setShapes] = useState<DroppedShape[]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('savedData');
    if (stored) {
      try {
        const data: CanvasData = JSON.parse(stored);
        setTitle(data.title);
        setShapes(data.shapes);
      } catch {
        console.warn('failed to parse stored canvas data');
      }
    }
  }, []);

  useEffect(() => {
    const data: CanvasData = { title, shapes };
    localStorage.setItem('savedData', JSON.stringify(data));
  }, [title, shapes]);

  const onDragStart = (e: React.DragEvent, type: ShapeType) => {
    e.dataTransfer.setData('shape-type', type);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('shape-type') as ShapeType;
    if (!canvasRef.current || !type) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - 20;
    const y = e.clientY - rect.top - 20;

    setShapes(prev => [...prev, { type, x, y }]);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const countByType = (type: ShapeType) => shapes.filter(s => s.type === type).length;

  const exportCanvas = () => {
    const data: CanvasData = { title, shapes };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'save.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data: CanvasData = JSON.parse(reader.result as string);
          setTitle(data.title);
          setShapes(data.shapes);
        } catch {
          alert('invalid input');
        }
      };
      reader.readAsText(file);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleShapeDoubleClick = (indexToRemove: number) => {
    setShapes(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className='container'>
      <div className='top-bar'>
        <input
          type='text'
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ fontSize: '16px', fontWeight: 'bold', border: 'none', background: 'transparent' }}
        />
        <div>
          <button style={{ marginRight: '10px' }} onClick={exportCanvas}>Export</button>
          <button onClick={() => fileInputRef.current?.click()}>Import</button>
          <input
            type='file'
            accept='application/json'
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleImport}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, minHeight: '400px' }}>
        <div
          ref={canvasRef}
          className='canvas'
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          {shapes.map((shape, idx) => (
            <div
              key={idx}
              onDoubleClick={() => handleShapeDoubleClick(idx)}
              style={{ position: 'absolute', left: shape.x, top: shape.y, cursor: 'move' }}
            >
              {shape.type === 'circle' && <SVGCircle />}
              {shape.type === 'square' && <SVGSquare />}
              {shape.type === 'triangle' && <SVGTriangle />}
            </div>
          ))}
        </div>

        <div className='side-bar'>
          <strong>Tools</strong>
          <div draggable onDragStart={e => onDragStart(e, 'circle')}><SVGCircle /></div>
          <div draggable onDragStart={e => onDragStart(e, 'square')}><SVGSquare /></div>
          <div draggable onDragStart={e => onDragStart(e, 'triangle')}><SVGTriangle /></div>
        </div>
      </div>

      <div className='bottom-bar'>
        <div className='shape-count'><SVGCircle size={30} /> <span>{countByType('circle')}</span></div>
        <div className='shape-count'><SVGSquare size={30}/> <span>{countByType('square')}</span></div>
        <div className='shape-count'><SVGTriangle size={30}/> <span>{countByType('triangle')}</span></div>
      </div>
    </div>
  );
}

export default App;
