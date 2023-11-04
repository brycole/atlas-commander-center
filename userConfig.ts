import { PublicKey, Keypair } from "@solana/web3.js"


export const privateKey = Keypair.fromSecretKey(
    Uint8Array.from([173, 46, 173,  ................., 104, 199]) //your private key in correct format
);

export const publicKey: PublicKey = new PublicKey("YOUR ADDRESS")
export const gameId: PublicKey = new PublicKey("GameYNgVLn9kd8BQcbHm8jNMqJHWhcZ1YTNy6Pn3FXo5")

export const owningProfile: PublicKey = new PublicKey("YOUR ADDRESS")
export const owningProfileFaction: PublicKey = new PublicKey("YOUR ADDRESS")

export const cargoPod: string = "YOUR ADDRESS"
export const cargoProgram: PublicKey = new PublicKey("Cargo8a1e6NkGyrjy4BQEW4ASGKs9KSyDyUrXMfpJoiH")
export const tokenProgram: PublicKey = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
export const cargoStardefinition: PublicKey = new PublicKey("YOUR ADDRESS")

export const incognite_1: string = "YOUR ADDRESS";
export const gameState: PublicKey = new PublicKey("EE3zofPPNRHBVy1t9nBTtt4hkkH7s4W1S63GRshk8hyu"); //UPDATE every Xdays
export const associatedToken: PublicKey = new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL");

export const tokenResourceHydrogen: string = "HYDR4EPHJcDPcaLYUcNCtrXUdt1PnaN4MvE655pevBYp";

//MyFleets
export const myFleets: string[][] = [
    ["YOUR ADDRESS", "Lowbie"],
    ["YOUR ADDRESS", "Lowbie 2"]
]


export const starBaseAndStarBasePlayer: string[][] = [
    ["EmZPZuUmHx8hvwqaiscVkt88GLDviDvbQDaZgBSsk3eg", "EeCvaisg4ZtetXABRVzZ2GZVmADn4AXwv58osfGJ9mT8"], //IRON [ 38, 25 ] ( UST-4 )
    ["J8aYFqhRnMmT5MUJg6JhBFUWJMty7VRTMZMpsJA56ttG", "86zHEz2SxcM5rzpLWVGibnM4qNuamF67wdyzvCzbHBpn"], //URSS
    ["8KysVHzj1spsR5kQZgy4N5iu9NGxcWWMdsfvEXvRmQtz", "Hv8erG3n6V5pbZDB2CWrPFHQ9mWFJre6AKNsQj55Ys8f"], // [ 30, 28 ] cooper ( UST-5 )
    ["GRTYCZ5vCtV71rNt1Y1NsXsCpD5x1AGoNZrbbZe3nw8N", "9w9eRFus6sJnGTYQCM4FZEsGwk7Nzk4VVuvcQpAAeztA"], //[ 42, 35 ] 	Biomass ( UST-2 )
    ["F9uCoY8mLhG5hURQ1aVMy9YPaaeFDvsjvRAw5b55GfzS", "8NJf2uxvHxqoQBW3DR86QhBDZt6VU3fLAjmDhcH8bkj1"],//[ 48, 32 ] carbon ( UST-3 )
    ["9Vpcu9bheTFBevaJeJJrvSw38wnC4PuzawiBHpQZAVnn","HzbLwZ1W5r4rxhWcvPgXVUdzEjWhPZmpxDLorgcU2S13"], //MRZ-16 39,-1  Iron x2?
    ["7f3z7FTzmQwQ3zBLgxXA95yjm36BcKX44UtTGNgcDT2S", "A7NcfeGui4Q4h9wTpq421sCCRqK2ZbGrYtrYbs5GxXSw"], //16,-5  ARCO
]

export const AMMOFleetCargoPodTo: string[] = [
    "YOUR ADDRESS", //Lowbie
    "YOUR ADDRESS" //Lowbie2
]

export const fuelFleetCargoPodTo: string[] = [
    "YOUR ADDRESS", //Lowbie
    "YOUR ADDRESS" //Lowbie2
]

export const foodFleetCargoPodTo: string[] = [
    "YOUR ADDRESS", //Lowbie------------------
    "YOUR ADDRESS" //Lowbie2
]

export const tokenTankFleetFood: string[] = [
    "YOUR ADDRESS", //Lowbie
    "YOUR ADDRESS" //lowbie2
]

export const tokenTankFleetFuel: string[] = [
    "YOUR ADDRESS", //Lowbie FULL REFUEL
    "YOUR ADDRESS" //Loiwbie 2
]

export const tokenTankFleetAmmo: string[] = [
    "YOUR ADDRESS", //Lowbie FULL Ammo
    "YOUR ADDRESS" //lowbie2
]

export const tokenFromBaseFuel: string[] = [
    "YOUR ADDRESS" //lowbie 
]


export const tokenFromBaseAmmo: string[] = [
    "YOUR ADDRESS", //Lowbie FULL AMMO
]

export const tokenFromBaseFood: string[] = [
    "YOUR ADDRESS", //FOOD for all fleets
]

export const tokenFromBaseIronx2: string[] = [
    "YOUR ADDRESS", //Lowbie es para todos?
]

export const tokenFromBaseBiomass: string[] = [
    "YOUR ADDRESS", //Lowbie es para todos?
]

export const tokenFromBaseHydrogen: string[] = [
    "YOUR ADDRESS", //Lowbie es para todos?
]

export const tokenFromBaseCarbon: string[] = [
    "YOUR ADDRESS", //Lowbie es para todos?
]

export const cargoType: string[] = [
    "YOUR ADDRESS", //AMMO
    "YOUR ADDRESS",//FUEL
    "YOUR ADDRESS",//FOOD
    "YOUR ADDRESS", //hydrogen
    "YOUR ADDRESS", //carbon
    "YOUR ADDRESS", //Iron
    "YOUR ADDRESS"//biomass
]

export const fleetCapacityFuel: number[] = [
    2780, //Lowbie MUST CHANGE
    6950 //Lowbie2
]

export const fleetCapacityAmmo: number[] = [
    576, //Lowbie
    1440,//Lowbie2
]

export const fleetCapacity: number[] = [
    3930, //Lowbie
    9825,//Lowbie2
]

export const tankFleetHydra: string[] = [
    "YOUR ADDRESS", //Lowbie
    "YOUR ADDRESS",//Lowbie2
]

export const tankFleetCarbon: string[] = [
    "YOUR ADDRESS",
    "YOUR ADDRESS"//Lowbie2
]

export const tankFleetBio: string[] = [
    "YOUR ADDRESS"//Lowbie
]

export const tankFleetIron: string[] = [
    "YOUR ADDRESS", //Low?? now test
    "YOUR ADDRESS"//Lowbie2
]

export const tokenMint: string[] = [
    "foodQJAztMzX1DKpLaiounNe2BDMds5RNuPC6jsNrDG", //food
    "fueL3hBZjLLLJHiFH9cqZoozTG3XQZ53diwFPwbzNim", //fuel
    "ammoK8AkX2wnebQb35cDAZtTkvsXQbi82cGeTnUvvfK", //ammo
    "HYDR4EPHJcDPcaLYUcNCtrXUdt1PnaN4MvE655pevBYp", //hydrogen
    "CARBWKWvxEuMcq3MqCxYfi7UoFVpL9c4rsQS99tw6i4X", //carbon
    "FeorejFjRRAfusN9Fg3WjEZ1dRCf74o6xwT5vDt3R34J",// Iron (x2)
    "MASS9GqtJz6ABisAxcUn3FeR4phMqH1XfG6LPKJePog" //Biomass
]

export const planetas: string[] = [
    "EbcNwRXwLAQDFiiTvW1oppCWrrXFUBPGSnUNSFSXyg7n", //[30,28]
    "22oUsXjN6Vz895qKmS5sDfshTpPWTFhozoQjGBQXozDL", //4-3 [38,25]
    "B4o6peamQyromtiWPVPiicWu8SWkNvyC6s6XuT8umLiz", //[48,32]
    "FrsvtcB3qLBHAj8L451nbTwg29xU7j1zcYEF9muJnrTx", //[40,30]URSS: 
    "5GprHuuwmUMSMvp4r1WV9DkmMqjBVcqSnjYvzQw8HhbL", //[39, -1] MRZ-16-2
    "CJWNinTSHY92KsYkiBNoWjrs5xsZWNJ4hUgAzAHvDWpj", //[42,35]
]

export const itemMine: string[] = [ //? depende de planeta
    "HxuoW1YmXTBfEyJqXGhmzQL1JYyrrTY4ZBP5GTh26wsN", //hydrogen
    "2gfKfpJ3Ne2Eb93XwDddLgjXLMLPgALJhYngJFCVve4x", //carbon
    "3M2oRa4iuu6fdFkhD3YuaLFzEBKyTxo89Y1Na23nH73e", //Iron (x2)
    "EDjA54ZqrWE5BcigRG3aMHtLrwuRjFi9SQp1u7YjmMmU"//biomass
]

export const resource: string[] = [ //? depende de planeta
    "D7SPd5DcJ5UcDGocH4X8AS7LtzwB8WAfaXv9rFFtULJe", //hydrogen
    "6LMGfeZcYc2uKfLtB9i9tz3btrPzmHUJvA2D3Zfgz9mR", //carbon
    "2u3dpZ7p7NSmqiJWp7kumbx3iyrczDUefoCRt3t1X7Fj", //Iron (x2)
    "Fx4ULUzTFKdTaYwWrSDq2J2zEUgnobJAaecyGQ3yoErg"//biomass
]

export const bankResource: string[] = [ //? depende de planeta
    "FA1JEuqhrwirw4RQKnHMSsXzHAyqaSgSUScsN5ZhJua4", //hydrogen
    "HvRHMCzSy8pcFMzwaA3uXQgjQGhcroMhvdV7FRHuVNTu", //carbon
    "6tAhXZ6bWXRHgy8HPEMfjmZ1Ue2kyFDXyEQuwPrN2ffh", //iron (x2)
    "2bTB9Gyrt1FncEo4Bn7UXS5SpwBMpiuNwSAdrsPgGM2U"//biomass
]