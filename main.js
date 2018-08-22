
map = {
  width: 100,
  height: 100,
  cell: [],
}

buildGame = (map) => {
  const size = map.width * map.height;
  let mesh = new Array();
  for(let x=0;x<map.width;x++){
    for(let y=0;y<map.height;y++){
      let t=x+y*map.width;
      mesh[t]={
        x: x,
        y: y,
        s: 0,
        t: map.cells[t],
        l: new Array(),
      }
    }
  }
  for(let x=0;x<map.width;x++){
    for(let y=0;y<map.height;y++){
      let t=x+y*map.width;
      mesh[t]={
        x: x,
        y: y,
        s: 0,
        t: map.cells[t],
        l: new Array(),
      }
    }
  }
  for(let step=2;step<map.width;step*=2){
    for(let x=0;x<map.width;x++){
      for(let y=0;y<map.height;y++){
        mesh[t]={
          x: x,
          y: y,
          s: 0,
          t: map.cells[t],
        }
      }
    }
  }

  
  return {
    width: map.width,
    height: map.height,
  };
}

game = {
  width
}





