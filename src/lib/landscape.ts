import type { C } from "vitest/dist/reporters-cb94c88b"
import type { GridCell } from "./grid"

export type Landscape = {
    name: string
    type: LandType
    locations: Array<Port>
}
enum LandType {
    Pole,
    Zamok,
    Doroga,
    Cerkov,
}

export type Port = {
    x: number
    y: number
    index: ConnectorIndex
    closed: boolean
}

export type ConnectorIndex = number // 0..11


export function addLocations(cell:GridCell){
    const localPortNames = cell.tile.connectors.filter((c,i,a)=>c&&a.indexOf(c)==i)
    let localLandscapes = localPortNames.map(p=>{
        return {}
    }) 
    let localPorts = cell.tile.connectors 
}


// landscapeList - > Landscape (name,type) - >  Location (x,y,nodeList)


// local objects 
// connectors - 9|p0, 3|p0
// connectedTo - Name (linked to Global name) 

// В рамках каждого объекта все конекты из соседних клеток
// Функция - Merge - добавляет все элементы в первый 
// Сложение очков + длина цепочки + обновление статуса Занят + проверка статуса Завершен?

//

// смещение Х смещение Y коннектор клетки - целевой коннектор  | (+1,0) 3 - 9   (Pole 1)
// смещение Х смещение Y коннектор клетки - целевой коннектор  | (+1,0) 2 - 10  (Pole 2)
// смещение Х смещение Y коннектор клетки - целевой коннектор  | ()
// смещение Х смещение Y коннектор клетки - целевой коннектор
// смещение Х смещение Y коннектор клетки - целевой коннектор
// смещение Х смещение Y коннектор клетки - целевой коннектор
// смещение Х смещение Y коннектор клетки - целевой коннектор
// смещение Х смещение Y коннектор клетки - целевой коннектор
// смещение Х смещение Y коннектор клетки - целевой коннектор
// смещение Х смещение Y коннектор клетки - целевой коннектор
// смещение Х смещение Y коннектор клетки - целевой коннектор
