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
    console.log(cell)
    const localPortNames = cell.tile.connectors.filter((c,i,a)=>c&&a.indexOf(c)==i)

    //console.log(localLandscapes)

    //let localPorts = cell.tile.connectors 
}


function landTypeToName(landType:LandType):string{
    if(LandType.Pole == landType){ return "Pole"}
    if(LandType.Zamok == landType){ return "Zamok"}
    if(LandType.Doroga == landType){ return "Doroga"}
    return "Cerkov"
}
function connectorNameToLandType(connectorName:string|null): LandType | null{
    if(!connectorName){
        return null
    }
    if(connectorName.charAt(0)=='z'){
        return LandType.Zamok
    }
    if(connectorName.charAt(0)=='p'){
        return LandType.Pole
    }
    if(connectorName.charAt(0)=='d'){
        return LandType.Doroga
    }
    return null
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
