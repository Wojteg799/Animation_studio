// Low-poly geometric facets, meshes, and polygon math for background aesthetic

export interface LowPolyVertex {
  x: number;
  y: number;
}

export interface LowPolyTriangle {
  p1: LowPolyVertex;
  p2: LowPolyVertex;
  p3: LowPolyVertex;
  color: string;
  stroke: string;
}

export interface FloatingPolygon {
  id: number;
  x: number;
  y: number;
  size: number;
  sides: number;
  rotSpeed: number;
  driftSpeedY: number;
  opacity: number;
  color: string;
}

// Generate an ambient low-poly wireframe background grid
export function generateLowPolyMesh(
  width: number,
  height: number,
  rows: number = 6,
  cols: number = 8,
  accentColor: string = "#38bdf8"
): LowPolyTriangle[] {
  const cellW = width / cols;
  const cellH = height / rows;
  const grid: LowPolyVertex[][] = [];

  // Seeded pseudo-random generator for stable render across frames
  function pseudoRandom(seed: number) {
    const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
    return x - Math.floor(x);
  }

  // Create perturbed vertices
  for (let r = 0; r <= rows; r++) {
    grid[r] = [];
    for (let c = 0; c <= cols; c++) {
      const isEdge = r === 0 || r === rows || c === 0 || c === cols;
      const jitterX = isEdge ? 0 : (pseudoRandom(r * 31 + c * 17) - 0.5) * cellW * 0.45;
      const jitterY = isEdge ? 0 : (pseudoRandom(r * 53 + c * 71) - 0.5) * cellH * 0.45;
      grid[r][c] = {
        x: c * cellW + jitterX,
        y: r * cellH + jitterY,
      };
    }
  }

  const triangles: LowPolyTriangle[] = [];

  // Triangulate grid cells
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const v00 = grid[r][c];
      const v10 = grid[r + 1][c];
      const v01 = grid[r][c + 1];
      const v11 = grid[r + 1][c + 1];

      const shade1 = 0.02 + pseudoRandom(r * 11 + c * 19) * 0.04;
      const shade2 = 0.02 + pseudoRandom(r * 23 + c * 29) * 0.04;

      // Triangle 1
      triangles.push({
        p1: v00,
        p2: v10,
        p3: v01,
        color: `rgba(255, 255, 255, ${shade1})`,
        stroke: "rgba(255, 255, 255, 0.05)",
      });

      // Triangle 2
      triangles.push({
        p1: v10,
        p2: v11,
        p3: v01,
        color: `rgba(255, 255, 255, ${shade2})`,
        stroke: "rgba(255, 255, 255, 0.05)",
      });
    }
  }

  return triangles;
}

// Generate drifting geometric polygon tokens
export function generateFloatingPolygons(count: number = 18): FloatingPolygon[] {
  const colors = ["#38bdf8", "#eab308", "#a855f7", "#ec4899", "#10b981", "#ffffff"];
  const list: FloatingPolygon[] = [];

  for (let i = 0; i < count; i++) {
    const seed = (i + 1) * 73.19;
    const x = ((Math.sin(seed * 1.7) * 0.5 + 0.5) * 100);
    const y = ((Math.cos(seed * 2.3) * 0.5 + 0.5) * 100);
    const size = 16 + (i % 5) * 8;
    const sides = 3 + (i % 3); // 3 (triangle), 4 (diamond), 5 (pentagon)
    const rotSpeed = ((i % 2 === 0 ? 1 : -1) * (0.4 + (i % 3) * 0.3));
    const driftSpeedY = 0.3 + (i % 4) * 0.25;
    const opacity = 0.12 + (i % 5) * 0.07;
    const color = colors[i % colors.length];

    list.push({
      id: i,
      x,
      y,
      size,
      sides,
      rotSpeed,
      driftSpeedY,
      opacity,
      color,
    });
  }

  return list;
}
