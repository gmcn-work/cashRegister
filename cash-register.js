function checkCashRegister(price, cash, cid) {
  var change;         // Keep track of changing remainder
  var giveBack = [];  // Array to be returned as change for the final obj
  //var emptyType = 0;  // Keep Track of how many money types 
  var tally = 0;      // Will keep track of empty currencies
  cid.reverse();      // Sorts the arr in highest to lowest

  //Object for currency values
  const currency = 
  {
    "PENNY": .01,
    "NICKEL": .05,
    "DIME": .1,
    "QUARTER": .25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
  };
  
  //Get change value
  change = cash - price;

  for(const elem in cid)
  {
    var count = 0; //Keeping track of how much of a money type we need
    var type = cid[elem][0]; //Money type
    var amt = cid[elem][1];  //Money Amount
    var need = 0; //The amount of money type we need

    if(amt == 0)
    {
      tally++; 
      continue;
    }

    //If our money type is ever more then our change move to the nxt type
    if(change < currency[type])
    {
      continue;
    }
  
    //How much of an amount of money type do we have to get?
    if(type == "PENNY" && amt > change) 
    {
      count = Math.ceil(change/currency[type])
    }
    else
    {
      count = Math.floor(change / currency[type]);  
    }

    //How much of a money type will we need?
    need = currency[type] * count;

    //If the amount that we need is less then or equal to the amount
    //of that money type in the drawer, then take it out of the drawer.
    if(need <= amt)
    {
      amt = amt - need;
      //If we have to use all of a money type for change
      //Increment our count of empty types 
      if(amt == 0)
      {
        tally++;
      }

      change = change - need;

      //Add our change to the array
      giveBack.push([type, need])
    } 
    else if(need > amt)
    {
      tally++;
    
      change = change - amt;
      giveBack.push([type, amt]);
      amt = 0;
    }
  }

  console.log(giveBack);
  console.log(change);

  //If we have the required change but no money in the drawers,
  // the register is closed
  if(change == 0 && tally >= 8)
  {
    cid.reverse();
    for(var elem in cid) 
    {
      if(cid[elem][1] == 0)
      {
        giveBack.push(cid[elem])
      } 
    }
    console.log(giveBack) 

    return {status: "CLOSED", change: giveBack};
  }
  //If we have the required change and money in some or all drawers
  //the register is open
  if(change <= 0 && tally != 9)
  {
    return {status: "OPEN", change: giveBack};
  }

  //Otherwise we have insufficient funds
  return {status: "INSUFFICIENT_FUNDS", change: []};
}

checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
