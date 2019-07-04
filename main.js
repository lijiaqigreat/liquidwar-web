const ascii1 =
  "          "+
  "          "+
  "          "+
  "          "+
  "          "+
  "          "+
  "          "+
  "          "+
  "          "+
  "          ";
const ascii2 = 
  "        "+
  "        "+
  "        "+
  "        "+
  "        "+
  "        "+
  "        "+
  "        ";
const f1 = (ascii, w, h) => {
  rtn = new Array();
  rtn2 = new Array();
  for(let x = 0; x<w;x++){
    for(let y =0;y<h;y++){
      let i = x+y*w;
      rtn[i] = new Array();
      rtn2[i] = new Array();
      for(let ii = 0; ii<w*h;ii++){
        rtn[i][ii]=1e100;
        rtn2[i][ii]=8;
      }
      const initRtn = (x2,y2,d, dd) => {
        if((x2<0) || (x2>=w) || (y2<0) ||(y2 >= h)){
          return;
        }
        let i2 = x2+y2*w;
        if((ascii[i2] !== " ") || (ascii[i] !== " ")) {
          return;
        }
        rtn[i][i2] = d;
        rtn2[i][i2] = dd;
      }
      rtn[i][i]=0;
      rtn2[i][i]=9;
      initRtn(x+1, y  , 1, 0);
      initRtn(x+1, y+1, 1, 1);
      initRtn(x, y+1  , 1, 2);
      initRtn(x-1, y+1, 1, 3);
      initRtn(x-1, y  , 1, 4);
      initRtn(x-1, y-1, 1, 5);
      initRtn(x, y-1  , 1, 6);
      initRtn(x+1, y-1, 1, 7);
    }
  }
  //return rtn;
  for(let i1 =0;i1<w*h;i1++){
    for(let i2 =0;i2<w*h;i2++){
      for(let i3 =0;i3<w*h;i3++){
        if(rtn[i2][i1]+rtn[i1][i3] < rtn[i2][i3]){
          rtn[i2][i3] = rtn[i2][i1]+rtn[i1][i3];
          rtn2[i2][i3] = rtn2[i2][i1];
        }
      }
    }
  }
  const rtn3 = new Array();
  const rtn4 = new Array();
  for(let y1 =0;y1<h;y1++){
    rtn3[y1] = new Array();
    rtn4[y1] = new Array();
    for(let x1 = 0; x1<w;x1++){
      rtn3[y1][x1] = new Array();
      rtn4[y1][x1] = new Array();
      for(let y2 =0;y2<h;y2++){
        rtn3[y1][x1][y2] = new Array();
        rtn4[y1][x1][y2] = new Array();
        for(let x2 = 0; x2<w;x2++){
          rtn3[y1][x1][y2][x2] = rtn[y1*w+x1][y2*w+x2];
          rtn4[y1][x1][y2][x2] = rtn2[y1*w+x1][y2*w+x2];
        }
      }
    }
  }

  return {distance: rtn3, direction: rtn4};
}

// link: [base, index]
// number: all link
// array: [link1, link2, ...]
const meshf = (grid, w, h) => {
  const hash = new Map();
  const rtn = new Array();
  const dict = new Map();
  const dictRtn = new Array();
  const record = (data) => {
    const key = data.toString();
    let rtn = dict.get(key);
    if(rtn === undefined) {
      rtn = dictRtn.length;
      dict.set(key, rtn);
      dictRtn.push(data);
    }
    return rtn;
  }
  record([]);

  for(let y1 =0;y1<h;y1++){
    rtn[y1] = new Array();
    for(let x1 = 0; x1<w;x1++){
      rtn[y1][x1] = new Array();
      for(let y2 =0;y2<h;y2++){
        rtn[y1][x1][y2] = new Array();
        for(let x2 = 0; x2<w;x2++){
          rtn[y1][x1][y2][x2] = [grid[y1][x1][y2][x2], 0];
        }
      }
    }
  }
  let step = 1;
  while(step < w) {
    for(let y1 =0;y1<h;y1+=step*2){
      for(let x1 = 0; x1<w;x1+=step*2){
        for(let y2 =0;y2<h;y2+=step*2){
          for(let x2 = 0; x2<w;x2+=step*2){
            const tmp = new Array();
            const s = step;
            tmp[0 ] = rtn[y1  ][x1  ][y2  ][x2  ];
            tmp[1 ] = rtn[y1  ][x1  ][y2  ][x2+s];
            tmp[2 ] = rtn[y1  ][x1  ][y2+s][x2  ];
            tmp[3 ] = rtn[y1  ][x1  ][y2+s][x2+s];
            tmp[4 ] = rtn[y1  ][x1+s][y2  ][x2  ];
            tmp[5 ] = rtn[y1  ][x1+s][y2  ][x2+s];
            tmp[6 ] = rtn[y1  ][x1+s][y2+s][x2  ];
            tmp[7 ] = rtn[y1  ][x1+s][y2+s][x2+s];
            tmp[8 ] = rtn[y1+s][x1  ][y2  ][x2  ];
            tmp[9 ] = rtn[y1+s][x1  ][y2  ][x2+s];
            tmp[10] = rtn[y1+s][x1  ][y2+s][x2  ];
            tmp[11] = rtn[y1+s][x1  ][y2+s][x2+s];
            tmp[12] = rtn[y1+s][x1+s][y2  ][x2  ];
            tmp[13] = rtn[y1+s][x1+s][y2  ][x2+s];
            tmp[14] = rtn[y1+s][x1+s][y2+s][x2  ];
            tmp[15] = rtn[y1+s][x1+s][y2+s][x2+s];
            let min = Infinity;
            for(let i=0;i<16;i++){
              if(tmp[i][0] < min) {
                min = tmp[i][0];
              }
            }
            for(let i=0;i<16;i++){
              tmp[i][0] -= min;
            }
            let index = record(tmp);
            rtn[y1][x1][y2][x2] = [min, index];
          }
        }
      }
    }
    step *= 2;
  }
  return {map: dictRtn, base: rtn[0][0][0][0]};
}

const getFromMesh = (mesh, w, h, y1, x1, y2, x2) => {
  let n = 0;
  while(w!=1){
    n++;
    w=(w/2)|0;
  }
  const toBits = (x) => {
    const rtn = [];
    for(let i=0;i<n;i++){
      rtn.push(x%2);
      x=(x/2)|0;
    }
    return rtn;
  }
  const x1a = toBits(x1);
  const y1a = toBits(y1);
  const x2a = toBits(x2);
  const y2a = toBits(y2);
  
  let rtn = 0;
  let box = mesh.base;
  for(let i = n-1;i>=0;i--){
    rtn += box[0];
    box = mesh.map[box[1]];
    box = box[y1a[i]*8+x1a[i]*4+y2a[i]*2+x2a[i]];
  }
  return rtn + box[0];
}
const gridf = (mesh, w, h) => {
  const rtn = [];
  for(let y1=0;y1<h;y1++){
    rtn[y1]=[];
    for(let x1=0;x1<w;x1++){
      rtn[y1][x1]=[];
      for(let y2=0;y2<h;y2++){
        rtn[y1][x1][y2]=[];
        for(let x2=0;x2<w;x2++){
          rtn[y1][x1][y2][x2] = getFromMesh(mesh, w, h, y1,x1,y2,x2);
        }
      }
    }
  }
  return rtn;
}
const print = (grid) => {
  console.log(grid.map(a => a.join(",")).join("\n"));
}
let size = 8;
const tmp12 = f1(ascii2, size,size);
const tmp22 = meshf(tmp12.direction, size,size);
const tmp32 = gridf(tmp22, size, size);

size =32;
const ascii3= ' '.repeat(size*size);
const tmp1 = f1(ascii3, size,size);
const tmp2 = meshf(tmp1.direction, size,size);
const tmp3 = gridf(tmp2, size, size);






// const map = {
//   width: 100,
//   height: 100,
//   cell: ascii.split("").map((c) => c!==" ")
// }

// buildGame = (map) => {
//   const size = map.width * map.height;
//   let mesh = new Array();
//   for(let x=0;x<map.width;x++){
//     for(let y=0;y<map.height;y++){
//       let t=x+y*map.width;
//       mesh[t]={
//         x: x,
//         y: y,
//         s: 0,
//         t: map.cells[t],
//         l: new Array(),
//       }
//     }
//   }
//   for(let x=0;x<map.width;x++){
//     for(let y=0;y<map.height;y++){
//       let t=x+y*map.width;
//       mesh[t]={
//         x: x,
//         y: y,
//         s: 0,
//         t: map.cells[t],
//         l: new Array(),
//       }
//     }
//   }
//   for(let step=2;step<map.width;step*=2){
//     for(let x=0;x<map.width;x++){
//       for(let y=0;y<map.height;y++){
//         mesh[t]={
//           x: x,
//           y: y,
//           s: 0,
//           t: map.cells[t],
//         }
//       }
//     }
//   }

  
//   return {
//     width: map.width,
//     height: map.height,
//   };
// }






