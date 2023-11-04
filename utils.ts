export function extractAmount(data: any, isFood: boolean = false): number {
    if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        const amount = data.data[0].amount;
        if (typeof amount === 'number') {
            return amount;
        }
    }
    if (isFood) {
        return 0;
    } else {
        return 999999;
    }
}



  export function getAmountByTokenAddress(data: any, tokenAddress: string): number {
    let amount = 0;
    console.log("@@@@@@@@*****")
    if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        console.log("@@@@@@@@____")
        data.data.forEach((item: any) => {
            console.log("@@@@@@@@"+item.tokenAddress)
            if (item.tokenAddress === tokenAddress) {
              // Sumar el valor de 'amount' al total
              amount = item.amount;
            }
        });
    }
    return amount;
    
  }