function checkCashRegister(price, cash, cid) {
  let dSum = 0;
  let change = cash - price;
  const mVal = [.01, .05, .1, .25, 1, 5, 10, 20, 100];
  cid.forEach(index =>
  {
    dSum += index[1];
  });

  dSum = Math.round(dSum * 100)/ 100;
  

  let reg = {status: "OPEN", change: []};

  if(change > dSum)
  {
    reg.status = "INSUFFICIENT_FUNDS";
    return reg;
  }
  else if(change == dSum)
  {
    reg.status = "CLOSED";
    cid.forEach(item => reg.change.push(item));
    return reg;
  }
  
  for(let i = cid.length-1; i>=0; i--)
  {
    if(mVal[i] > change || cid[i][1] == 0)
    {
      continue;
    }
    change = Math.round(change * 100)/100;
    let need = (Math.floor(change/mVal[i]) * mVal[i]);
    if(need >= cid[i][1] )
    {
      change -= cid[i][1];
      reg.change.push(cid[i]);
    }
    else if(need < cid[i][1])
    {
      change -= need;
      reg.change.push([cid[i][0], need])
    }
  }

  
  if(change != 0)
  {
    reg.status = "INSUFFICIENT_FUNDS";
    reg.change = [];
    return reg;
  }

  console.log(reg);
  return reg;
}

checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
