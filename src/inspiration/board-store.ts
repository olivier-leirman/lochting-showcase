// ── Inspiration Board persistence (localStorage) ──

const STORAGE_KEY = 'bw-inspiration-boards';

export interface BoardImage {
  id: string;
  /** Base64 data URL */
  dataUrl: string;
  name: string;
  width: number;
  height: number;
  addedAt: string;
}

export interface InspirationBoard {
  styleId: string;
  name: string;
  description: string;
  images: BoardImage[];
  updatedAt: string;
}

function readAll(): Record<string, InspirationBoard> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, InspirationBoard>;
  } catch {
    return {};
  }
}

function writeAll(boards: Record<string, InspirationBoard>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(boards));
}

/** Load board for a specific style, or create empty one */
export function loadBoard(styleId: string): InspirationBoard {
  const all = readAll();
  return (
    all[styleId] ?? {
      styleId,
      name: '',
      description: '',
      images: [],
      updatedAt: new Date().toISOString(),
    }
  );
}

/** Save board for a style */
export function saveBoard(board: InspirationBoard): void {
  const all = readAll();
  all[board.styleId] = { ...board, updatedAt: new Date().toISOString() };
  writeAll(all);
}

/** Add images to a board */
export function addImages(styleId: string, images: BoardImage[]): InspirationBoard {
  const board = loadBoard(styleId);
  board.images.push(...images);
  saveBoard(board);
  return board;
}

/** Remove image from a board */
export function removeImage(styleId: string, imageId: string): InspirationBoard {
  const board = loadBoard(styleId);
  board.images = board.images.filter((img) => img.id !== imageId);
  saveBoard(board);
  return board;
}

/** Convert File to BoardImage via FileReader */
export function fileToBoardImage(file: File): Promise<BoardImage> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        resolve({
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          dataUrl: reader.result as string,
          name: file.name,
          width: img.naturalWidth,
          height: img.naturalHeight,
          addedAt: new Date().toISOString(),
        });
      };
      img.onerror = () => reject(new Error(`Failed to load image: ${file.name}`));
      img.src = reader.result as string;
    };
    reader.onerror = () => reject(new Error(`Failed to read file: ${file.name}`));
    reader.readAsDataURL(file);
  });
}

/** Fetch image from URL and convert to BoardImage */
export async function urlToBoardImage(url: string): Promise<BoardImage> {
  const res = await fetch(url);
  const blob = await res.blob();
  const file = new File([blob], url.split('/').pop() || 'image', { type: blob.type });
  return fileToBoardImage(file);
}
