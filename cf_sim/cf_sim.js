google.charts.load('current', {'packages':['bar']});
google.charts.load('current', {'packages':['line']});


window.onload = function() {
  document.getElementById('zoom').style.display = 'none';
  document.getElementById('zoom2').style.display = 'none';
  document.getElementById('curve_chart').style.display = 'none';
  document.getElementById('columnchart_material2').style.display = 'none';
  document.getElementById('curve_chart2').style.display = 'none';
  document.getElementById('columnchart_material4').style.display = 'none';
  document.getElementById('big').style.display = 'none';
  document.getElementById('big2').style.display = 'none';
  document.getElementById('prediction').style.display = 'none';
};


document.getElementById('run1').addEventListener('click', radioFunction1);
document.getElementById('run2').addEventListener('click', radioFunction2);
function radioFunction1() {
  var radiosPerc1 = document.getElementsByName('percent1');
  for (var i = 0, length = radiosPerc1.length; i < length; i++) {
    if (radiosPerc1[i].checked) {
      var perc1 = radiosPerc1[i].value;
    }
  }

  var radiosHeal1 = document.getElementsByName('health1');
  for (var i = 0, length = radiosHeal1.length; i < length; i++) {
    if (radiosHeal1[i].checked) {
      var heal1 = radiosHeal1[i].value;
    }
  }
  document.getElementById('run1').innerHTML = 'Running...';
  setTimeout(function() {myFunction(perc1, heal1, 30)}, 1);
}


function radioFunction2() {
  var radiosPerc2 = document.getElementsByName('percent2');
  for (var i = 0, length = radiosPerc2.length; i < length; i++) {
    if (radiosPerc2[i].checked) {
      var perc2 = radiosPerc2[i].value;
    }
  }

  var radiosHeal2 = document.getElementsByName('health2');
  for (var i = 0, length = radiosHeal2.length; i < length; i++) {
    if (radiosHeal2[i].checked) {
      var heal2 = radiosHeal2[i].value;
    }
  }
  document.getElementById('run2').innerHTML = 'Running...';
  setTimeout(function() {myFunction2(perc2, heal2, 30)}, 1);
}


function makePeople(wild=894, het=103, cf=3) {
  var wilds=Array(wild);
  var hets=Array(het);
  var cfs=Array(cf);
  wilds.fill(2);
  hets.fill(1);
  cfs.fill(-1);
  var people = wilds.concat(hets);
  var peoples = people.concat(cfs);
  var wealth = Array.from({length: peoples.length}, () => Math.floor(Math.random() * 101));
  return [peoples, wealth];
}


function hardyWeinberg(people, wealth, numChild, gen=0) {
  var newPeopleandWealth=shuffle(people, wealth);
  var num=people.slice(0).length;
  if (num>1000*Math.pow(1.027, gen)) {
    var random_temp=Math.floor(1000*Math.pow(1.027, gen));
    var people=newPeopleandWealth[0].slice(0, random_temp);
    var wealth=newPeopleandWealth[1].slice(0, random_temp);
  }
  var children=Array();
  var wealths=Array();
  while (people.length>1) {
    var random_temp1=Math.floor(Math.random()*people.length);
    var random_temp2=Math.floor(Math.random()*people.length);
    var mate1=people.splice(random_temp1, 1);
    var mate2=people.splice(random_temp2, 1);
    var wealth1=wealth.splice(random_temp1, 1);
    var wealth2=wealth.splice(random_temp2, 1);
    if (wealth1>wealth2){
      var temp_wealth=wealth1;
    } else {
      var temp_weath=wealth2;
    }
    // var temp_wealth=(wealth1+wealth2)/2;
    var child=Number(mate1)+Number(mate2);
    if (child==4) {
      for (i=0; i<numChild; i++) {
        children=children.concat(2);
        wealths=wealths.concat(temp_wealth);
      }
    } else if (child==3) {
      for (i=0; i<numChild; i++) {
        children=children.concat(Math.floor(Math.random()*2+1));
        wealths=wealths.concat(temp_wealth);
      }
    } else if (child==2) {
      for (i=0;i<numChild;i++){
        if (Math.floor(Math.random()*2)==1) {
          children=children.concat(1);
          wealths=wealths.concat(temp_wealth);
        } else {
          if (Math.floor(Math.random()*2)==1){
            children=children.concat(-1);
            wealths=wealths.concat(temp_wealth);
          } else {
            children=children.concat(2);
            wealths=wealths.concat(temp_wealth);
          }
        }
      }
    } else if (child==1) {
      for (i=0;i<numChild;i++) {
        children=children.concat(1);
        wealths=wealths.concat(temp_wealth);
      }
    } else if (child==-2) {
      for (i=0;i<numChild;i++) {
        children=children.concat(-1);
        wealths=wealths.concat(temp_wealth);
      }
    } else {
      for (i=0;i<numChild;i++){
        if (Math.floor(Math.random()*2)==1) {
          children=children.concat(-1);
          wealths=wealths.concat(temp_wealth);
        } else {
          children=children.concat(1);
          wealths=wealths.concat(temp_wealth);
        }
      }
    }
  }
  var newChild=shuffle(children, wealths);
  var smallerKids=newChild[0];
  var smallerWealth=newChild[1];
  // var mapped = smallerWealth.sort(function(a, b) {return a-b;});
  var list2 = [];
  for (var j = 0; j < smallerKids.length; j++) {
    list2.push({'genot': smallerKids[j], 'money': smallerWealth[j]});
  }
  list2.sort(function(a, b) {
      return a.money - b.money;
  });
  for (var k = 0; k < list2.length; k++) {
      smallerKids[k] = list2[k].genot;
      smallerWealth[k] = parseInt(100/list2.length*k);
  }
  return [smallerKids, smallerWealth];
}

function wealth_health(wealth_percentile, genHealth, wealth_factor){
  if (wealth_factor==1){
    return Math.max(Math.min(([.1, .23, .45, .8][genHealth]*Math.exp(-1.85)*Math.exp(.057*wealth_percentile)-1)/(7.21681)+[.1, .23, .45, .8][genHealth], .8),-.05);
  } else {
    return [.2, .4, .6, .8][genHealth];
  }
}

function childToAdult(children, wealth, percWithTB, genHealth, wealth_factor) {
  var adults=Array();
  var adultWealth=Array();
  var helpful_gene=.2;
  var i;
  for (i=0; i<children.length; i++) {
    var temp_percentile = wealth[i];
    var temp_health=wealth_health(wealth_percentile=temp_percentile, genHealth=genHealth, wealth_factor=wealth_factor);
    if (percWithTB>Math.random()) {
      if (children[i]==2) {
        if (Math.random()>.8-temp_health) {
          adults=adults.concat(2);
          adultWealth=adultWealth.concat(temp_percentile);
        }
      } else if (children[i]==-1) {
        if (Math.random()>.8-temp_health-helpful_gene) {
          if (temp_health>.6 && Math.random()>.5) {
            adults=adults.concat(-1);
            adultWealth=adultWealth.concat(temp_percentile);
          }
        }
      } else if (children[i]==1) {
        if (Math.random()>.8-temp_health-helpful_gene) {
          adults=adults.concat(1);
          adultWealth=adultWealth.concat(temp_percentile);
        }
      }
    } else {
      if (children[i]==-1) {
        if (temp_health>.6 && Math.random()>.5) {
          adults=adults.concat(-1);
          adultWealth=adultWealth.concat(temp_percentile);
        }
      } else if (children[i]==1) {
        adults=adults.concat(1);
        adultWealth=adultWealth.concat(temp_percentile);
      } else if (children[i]==2) {
        adults=adults.concat(2);
        adultWealth=adultWealth.concat(temp_percentile);
      }
    }
  }
  return [adults, adultWealth];
}


function numOfChildren(percWithTB=.5, genHealth=2) {
  var numKids = 3;
  var totalHealth=10*(1-percWithTB)+genHealth*2.5;
  if (totalHealth<8.5) {
    numKids += 1;
  }
  if (totalHealth<5.5) {
    numKids += 1;
  }
  if (totalHealth<4.5) {
    numKids += 1;
  }
  if (totalHealth<3.5) {
    numKids += 1;
  }
  if (totalHealth<2) {
    numKids += 1;
  }
  if (totalHealth<=1) {
    numKids += 1;
  }
  return numKids;
}


function drawChart(pWTB=.5, gH=2, tot=8, wealth_factor=0) {
  var healthCare=Array();
  healthCare=['no health care', 'poor health care', 'OK health care', 'great health care'];
  var nC = numOfChildren(pWTB, gH);
  var people=[];
  var peopleC=[];
  var the_wealth=[]
  var the_initial_peoples=makePeople();
  var z = hardyWeinberg(people=the_initial_peoples[0], wealth=the_initial_peoples[1], numChild=nC, gen=0);
  var z1 = z[0].slice(0);
  var z2 = z[1].slice(0)
  var a = childToAdult(children=z1, wealth=z2, percWithTB=pWTB, genHealth=gH, wealth_factor=wealth_factor);
  var a1 = a[0].slice(0);
  var a2 = a[1].slice(0);
  people[0] = a[0];
  the_wealth[0] = a[1];
  peopleC[0] = z[0];
  var i;
  for (i=0; i<tot-1; i++) {
    var y = hardyWeinberg(a1, a2, numChild=nC, gen=i+1);
    var y1 = y[0].slice(0);
    var y2 = y[1].slice(0);
    var b = childToAdult(children=y1, wealth=y2, percWithTB=pWTB, genHealth=gH, wealth_factor=wealth_factor);
    a1 = b[0].slice(0);
    a2 = b[1].slice(0);
    people[i+1] = b[0];
    the_wealth[i+1] = b[1];
    peopleC[i+1] = y[0];
  }

  var genCount=Array();
  genCount[0]=['Generation','Normal','CF Carrier','CF'];

  var i;
  for (i=0; i<people.length; i++) {
    var hets = Array();
    var wild = Array();
    var cf = Array();
    for (j=0; j<people[i].length; j++) {
      hets.push(Number(people[i][j]==1));
      wild.push(Number(people[i][j]==2));
      cf.push(Number(people[i][j]==-1));
    }
    var totalHets=hets.reduce(function(a,b){ return a+b; }, 0);
    var totalWild=wild.reduce(function(a,b){ return a+b; }, 0);
    var totalCF=cf.reduce(function(a,b){ return a+b; }, 0);
    genCount[i+1]=[String(i+1), totalWild, totalHets, totalCF];
  }

  data = google.visualization.arrayToDataTable(genCount);
  options = {
    colors: ['#00993f', '#365B7f', '#C4820E'],
    chart: {
      title: 'Adult Population',
      subtitle: String(pWTB*100)+'% of people have TB and there is '+healthCare[gH],
    }
  };
  chart = new google.charts.Bar(document.getElementById('columnchart_material2'));
  chart.draw(data, options);

  var genCount2=Array();
  genCount2[0]=['Generation','Normal','CF Carrier', 'CF'];
  var i;
  for (i=0; i<peopleC.length; i++) {
    var hets = Array();
    var wild = Array();
    var cf = Array();
    for (j=0; j<peopleC[i].length; j++) {
      hets.push(Number(peopleC[i][j]==1));
      wild.push(Number(peopleC[i][j]==2));
      cf.push(Number(peopleC[i][j]==-1));
    }
    var totalHets=hets.reduce(function(a,b) { return a+b; }, 0);
    var totalWild=wild.reduce(function(a,b) { return a+b; }, 0);
    var totalCF=cf.reduce(function(a,b) { return a+b; }, 0);
    genCount2[i+1]=[String(i+1), totalWild, totalHets, totalCF];
  }

  var genCount3=Array();
  var genCount4=Array();
  genCount4[0]=['Generation','Normal','CF Carrier','CF'];
  genCount3[0]=['Generation','CF Carrier','CF'];
  var i;
  for (i=1; i<genCount2.length; i++) {
    var percHets=genCount2[i][2]/(genCount2[i][2]+genCount2[i][1]+genCount2[i][3]);
    var percWild=genCount2[i][1]/(genCount2[i][2]+genCount2[i][1]+genCount2[i][3]);
    var percCF=genCount2[i][3]/(genCount2[i][1]+genCount2[i][2]+genCount2[i][3]);
    genCount4[i]=[i, percWild*100, percHets*100, percCF*100];
    genCount3[i]=[i, percHets*100, percCF*100];
  }

  data3 = google.visualization.arrayToDataTable(genCount4);
  options3 = {
    colors: ['#00993f', '#365B7f', '#C4820E'],
    chart: {
      title: 'Relative Percentage of genotype',
      subtitle: 'over multiple generations',
    }
  };


  chart3 = new google.charts.Line(document.getElementById('curve_chart'));
  chart3.draw(data3, options3);
  document.getElementById('zoom').style.display = 'block';
  data4 = google.visualization.arrayToDataTable(genCount3);
  options4 = {
    colors: ['#365B7f', '#C4820E'],
    chart: {
      title: 'Relative Percentage of genotype',
      subtitle: 'over multiple generations',
    }
  };



  var wealthCount=Array();
  var wealthCount2=Array();
  wealthCount[0]=['Generation','Normal','CF Carrier','CF'];

  var i;
  for (i=0; i<peopleC.length; i++) {
    var hets = Array();
    var wild = Array();
    var cf = Array();
    for (var j=0; j<peopleC[i].length; j++) {
      if (parseInt(the_wealth[i][j])>90){
        hets.push(Number(peopleC[i][j]==1));
        wild.push(Number(peopleC[i][j]==2));
        cf.push(Number(peopleC[i][j]==-1));
      }
    }
    var totalHets=hets.reduce(function(a,b){ return a+b; }, 0);
    var totalWild=wild.reduce(function(a,b){ return a+b; }, 0);
    var totalCF=cf.reduce(function(a,b){ return a+b; }, 0);
    wealthCount[i+1]=[String(i+1), totalWild, totalHets, totalCF];
  }
  wealthCount2[0]=['Generation','Normal','CF Carrier','CF'];
  var i;
  for (i=1; i<wealthCount.length; i++) {
    var percHets=wealthCount[i][2]/(wealthCount[i][2]+wealthCount[i][1]+wealthCount[i][3]);
    var percWild=wealthCount[i][1]/(wealthCount[i][2]+wealthCount[i][1]+wealthCount[i][3]);
    var percCF=wealthCount[i][3]/(wealthCount[i][1]+wealthCount[i][2]+wealthCount[i][3]);
    wealthCount2[i]=[i, percWild*100, percHets*100, percCF*100];
  }

  dataWealth = google.visualization.arrayToDataTable(wealthCount2);
  optionsWealth = {
    colors: ['#00993f', '#365B7f', '#C4820E'],
    chart: {
      title: 'Adult Population',
      subtitle: String(pWTB*100)+'% of people have TB and there is '+healthCare[gH],
    }
  };
}


function zoomIn() {
  var elem=document.getElementById('zoomb1');
  if (elem.textContent == "Zoom In") {
    elem.textContent = "Zoom Out";
    var chart4 = new google.charts.Line(document.getElementById('curve_chart'));
    // chart4.draw(data4, options4);
    chart4.draw(dataWealth, optionsWealth);
  } else {
    elem.textContent = "Zoom In";
    var chart3 = new google.charts.Line(document.getElementById('curve_chart'));
    chart3.draw(data3, options3);
  }
}


function zoomIn2() {
  var elem=document.getElementById('zoomb2');
  if (elem.textContent == "Zoom In") {
    var chart4a = new google.charts.Line(document.getElementById('curve_chart2'));
    // chart4a.draw(data4a, options4a);
    chart4a.draw(dataWealtha, optionsWealtha);
    elem.textContent = "Zoom Out";
  } else {
    elem.textContent = "Zoom In";
    var chart3a = new google.charts.Line(document.getElementById('curve_chart2'));
    chart3a.draw(data3a, options3a);
  }
}

function makeBig() {
  var elem=document.getElementById('bigly1');
  if (elem.textContent == "Expand") {
    elem.textContent = "Collapse";
    document.getElementById('big').style.display = 'block';
    document.getElementById('zoomb1').style.display = 'none';
    document.getElementById('curve_chart').style.display = 'none';
    document.getElementById('columnchart_material2').style.display = 'none';
    var chart6 = new google.charts.Bar(document.getElementById('big'));
    chart6.draw(data, options);
  } else {
    elem.textContent = "Expand";
    document.getElementById('big').style.display = 'none';
    document.getElementById('zoomb1').style.display = 'block';
    document.getElementById('curve_chart').style.display = 'block';
    document.getElementById('columnchart_material2').style.display = 'block';
  }
}


function makeBig2() {
  var elem=document.getElementById('bigly2');
  if (elem.textContent == "Expand") {
    elem.textContent = "Collapse";
    document.getElementById('big2').style.display = 'block';
    document.getElementById('zoomb2').style.display = 'none';
    document.getElementById('curve_chart2').style.display = 'none';
    document.getElementById('columnchart_material4').style.display = 'none';
    var chart6 = new google.charts.Bar(document.getElementById('big2'));
    chart6.draw(data2, options2);
  } else {
    elem.textContent = "Expand";
    document.getElementById('big2').style.display = 'none';
    document.getElementById('zoomb2').style.display = 'block';
    document.getElementById('curve_chart2').style.display = 'block';
    document.getElementById('columnchart_material4').style.display = 'block';
  }
}


function myFunction(pWTB=50, gH=2, tot=8, wealth_factor=0) {
  document.getElementById('zoom').style.display = 'block';
  document.getElementById('zoomb1').style.display = 'block';
  var elem=document.getElementById('zoomb1');
  elem.textContent = "Zoom In";
  document.getElementById('curve_chart').style.display = 'block';
  document.getElementById('columnchart_material2').style.display = 'block';
  document.getElementById('prediction').style.display = 'block';
  var elem=document.getElementById('bigly1');
  elem.textContent = "Expand";
  var pWTB = pWTB/100;
  google.charts.setOnLoadCallback(drawChart(pWTB, gH, tot, wealth_factor));
  document.getElementById('run1').innerHTML = 'Run Simulation';
}


function myFunction2(pWTB=50, gH=2, tot=8, wealth_factor=0) {
  document.getElementById('zoom2').style.display = 'block';
  document.getElementById('zoomb2').style.display = 'block';
  var elem=document.getElementById('zoomb2');
  elem.textContent = "Zoom In";
  document.getElementById('curve_chart2').style.display = 'block';
  document.getElementById('columnchart_material4').style.display = 'block';
  var elem=document.getElementById('bigly2');
  elem.textContent = "Expand";
  var pWTB = pWTB/100;
  google.charts.setOnLoadCallback(drawChart2(pWTB, gH, tot, wealth_factor));
  document.getElementById('run2').innerHTML = 'Run Simulation';
}


function drawChart2(pWTB=.5, gH=2, tot=8, wealth_factor=0) {
  wealth_factor=1;
  var healthCare=Array();
  healthCare=['no health care', 'poor health care', 'OK health care', 'great health care'];
  var nC = numOfChildren(pWTB, gH)
  var people=[];
  var peopleC=[];
  var the_wealth=[]
  var the_initial_peoples=makePeople();
  var z = hardyWeinberg(people=the_initial_peoples[0], wealth=the_initial_peoples[1], numChild=nC, gen=0);
  var z1 = z[0].slice(0);
  var z2 = z[1].slice(0)
  var a = childToAdult(children=z1, wealth=z2, percWithTB=pWTB, genHealth=gH, wealth_factor=wealth_factor);
  var a1 = a[0].slice(0);
  var a2 = a[1].slice(0);
  people[0] = a[0];
  the_wealth[0] = a[1];
  peopleC[0] = z[0];
  var i;
  for (i=0; i<tot-1; i++) {
    var y = hardyWeinberg(a1, a2, numChild=nC, gen=i+1);
    var y1 = y[0].slice(0);
    var y2 = y[1].slice(0);
    var b = childToAdult(children=y1, wealth=y2, percWithTB=pWTB, genHealth=gH, wealth_factor=wealth_factor);
    a1 = b[0].slice(0);
    a2 = b[1].slice(0);
    people[i+1] = b[0];
    the_wealth[i+1] = b[1];
    peopleC[i+1] = y[0];
  }

  var genCount=Array();
  genCount[0]=['Generation','Normal','CF\nCarrier','CF'];

  var i;
  for (i=0; i<people.length; i++) {
    var hets = Array();
    var wild = Array();
    var cf = Array();
    for (j=0; j<people[i].length; j++) {
      hets.push(Number(people[i][j]==1));
      wild.push(Number(people[i][j]==2));
      cf.push(Number(people[i][j]==-1));
    }
    var totalHets=hets.reduce(function(a,b){ return a+b; }, 0);
    var totalWild=wild.reduce(function(a,b){ return a+b; }, 0);
    var totalCF=cf.reduce(function(a,b){ return a+b; }, 0);
    genCount[i+1]=[String(i+1), totalWild, totalHets, totalCF];
  }

  data2 = google.visualization.arrayToDataTable(genCount);
  options2 = {
    colors: ['#00993f', '#365B7f', '#C4820E'],
    chart: {
      title: 'Adult Population',
      subtitle: String(pWTB*100)+'% of people have TB and there is '+healthCare[gH],
    }
  };
  chart2 = new google.charts.Bar(document.getElementById('columnchart_material4'));
  chart2.draw(data2, options2);

  var genCount2=Array();
  genCount2[0]=['Generation','Normal','CF\nCarrier','CF'];
  var i;
  for (i=0; i<peopleC.length; i++) {
    var hets = Array();
    var wild = Array();
    var cf = Array();
    for (j=0; j<peopleC[i].length; j++) {
      hets.push(Number(peopleC[i][j]==1));
      wild.push(Number(peopleC[i][j]==2));
      cf.push(Number(peopleC[i][j]==-1));
    }
    var totalHets=hets.reduce(function(a,b) { return a+b; }, 0);
    var totalWild=wild.reduce(function(a,b) { return a+b; }, 0);
    var totalCF=cf.reduce(function(a,b) { return a+b; }, 0);
    genCount2[i+1]=[String(i+1), totalWild, totalHets, totalCF];
  }

  var genCount3=Array();
  var genCount4=Array();
  genCount4[0]=['Generation','Normal',' CF Carrier','CF'];
  genCount3[0]=['Generation','CF Carrier','CF'];
  var i;
  for (i=1; i<genCount2.length; i++) {
    var percHets=genCount2[i][2]/(genCount2[i][2]+genCount2[i][1]+genCount2[i][3]);
    var percWild=genCount2[i][1]/(genCount2[i][2]+genCount2[i][1]+genCount2[i][3]);
    var percCF=genCount2[i][3]/(genCount2[i][1]+genCount2[i][2]+genCount2[i][3]);
    genCount4[i]=[i, percWild*100, percHets*100, percCF*100];
    genCount3[i]=[i, percHets*100, percCF*100];
  }



  data3a = google.visualization.arrayToDataTable(genCount4);
  options3a = {
    colors: ['#00993f','#365B7f', '#C4820E'],
    chart: {
      title: 'Relative Percentage of genotype',
      subtitle: 'over multiple generations',

    }
  };


  chart3a = new google.charts.Line(document.getElementById('curve_chart2'));

  chart3a.draw(data3a, options3a);
  document.getElementById('zoom2').style.display = 'block';


  data4a = google.visualization.arrayToDataTable(genCount3);
  options4a = {
    colors: ['#365B7f', '#C4820E'],
    chart: {
      title: 'Relative Percentage of genotype',
      subtitle: 'over multiple generations',

    }
  };
  var wealthCount=Array();
  var wealthCount2=Array();
  wealthCount[0]=['Generation','Normal','CF Carrier','CF'];

  var i;
  for (i=0; i<peopleC.length; i++) {
    var hets = Array();
    var wild = Array();
    var cf = Array();
    for (var j=0; j<peopleC[i].length; j++) {
      if (parseInt(the_wealth[i][j])>90){
        hets.push(Number(peopleC[i][j]==1));
        wild.push(Number(peopleC[i][j]==2));
        cf.push(Number(peopleC[i][j]==-1));
      }
    }
    var totalHets=hets.reduce(function(a,b){ return a+b; }, 0);
    var totalWild=wild.reduce(function(a,b){ return a+b; }, 0);
    var totalCF=cf.reduce(function(a,b){ return a+b; }, 0);
    wealthCount[i+1]=[String(i+1), totalWild, totalHets, totalCF];
  }

  wealthCount2[0]=['Generation','Normal','CF Carrier','CF'];
  var i;
  for (i=1; i<wealthCount.length; i++) {
    var percHets=wealthCount[i][2]/(wealthCount[i][2]+wealthCount[i][1]+wealthCount[i][3]);
    var percWild=wealthCount[i][1]/(wealthCount[i][2]+wealthCount[i][1]+wealthCount[i][3]);
    var percCF=wealthCount[i][3]/(wealthCount[i][1]+wealthCount[i][2]+wealthCount[i][3]);
    wealthCount2[i]=[i, percWild*100, percHets*100, percCF*100];
  }
  dataWealtha = google.visualization.arrayToDataTable(wealthCount2);
  optionsWealtha = {
    colors: ['#00993f', '#365B7f', '#C4820E'],
    chart: {
      title: 'Adult Population',
      subtitle: String(pWTB*100)+'% of people have TB and there is '+healthCare[gH],
    }
  };
}


function shuffle(a, b) {
  var j, x, i, y;
  for (i = a.length; i; i--) {
    j = Math.floor(Math.random() * i);
    y = b[i - 1];
    x = a[i - 1];
    a[i - 1] = a[j];
    b[i -1] = b[j]
    a[j] = x;
    b[j] = y;
  }
  return [a,b];
}






// function hardyWeinberg(people, wealth, numChild, gen=0) {
//   var newPeopleandWealth=shuffle(people, wealth);
//   var num=people.slice(0).length;
//   if (num>1000*Math.pow(1.027, gen)) {
//     var random_temp=Math.floor(1000*Math.pow(1.027, gen));
//     var people=newPeopleandWealth[0].slice(0, random_temp);
//     var wealth=newPeopleandWealth[1].slice(0, random_temp);
//   }
//   var children=Array();
//   var wealths=Array();
//   while (people.length>1) {
//     var random_temp1=Math.floor(Math.random()*people.length);
//     var random_temp2=Math.floor(Math.random()*people.length);
//     var mate1=people.splice(random_temp1, 1);
//     var mate2=people.splice(random_temp2, 1);
//     var wealth1=wealth.splice(random_temp1, 1);
//     var wealth2=wealth.splice(random_temp2, 1);
//     var child=Number(mate1)+Number(mate2);
//     if (child==4) {
//       for (i=0; i<numChild; i++) {
//         children=children.concat(2);
//         if (i%2==0){
//           wealths=wealths.concat(wealth1);
//         } else {
//           wealths=wealths.concat(wealth2);
//         }
//       }
//     } else if (child==3) {
//       for (i=0; i<numChild; i++) {
//         children=children.concat(Math.floor(Math.random()*2+1));
//         if (i%2==0){
//           wealths=wealths.concat(wealth1);
//         } else {
//           wealths=wealths.concat(wealth2);
//         }
//       }
//     } else if (child==2) {
//       for (i=0;i<numChild;i++){
//         if (Math.floor(Math.random()*2)==1) {
//           children=children.concat(1);
//           if (i%2==0){
//             wealths=wealths.concat(wealth1);
//           } else {
//             wealths=wealths.concat(wealth2);
//           }
//         } else {
//           if (Math.floor(Math.random()*2)==1){
//             children=children.concat(-1);
//             if (i%2==0){
//               wealths=wealths.concat(wealth1);
//             } else {
//               wealths=wealths.concat(wealth2);
//             }
//           } else {
//             children=children.concat(2);
//             if (i%2==0){
//               wealths=wealths.concat(wealth1);
//             } else {
//               wealths=wealths.concat(wealth2);
//             }
//           }
//         }
//       }
//     } else if (child==1) {
//       for (i=0;i<numChild;i++) {
//         children=children.concat(1);
//         if (i%2==0){
//           wealths=wealths.concat(wealth1);
//         } else {
//           wealths=wealths.concat(wealth2);
//         }
//       }
//     } else if (child==-2) {
//       for (i=0;i<numChild;i++) {
//         children=children.concat(-1);
//         if (i%2==0){
//           wealths=wealths.concat(wealth1);
//         } else {
//           wealths=wealths.concat(wealth2);
//         }
//       }
//     } else {
//       for (i=0;i<numChild;i++){
//         if (Math.floor(Math.random()*2)==1) {
//           children=children.concat(-1);
//           if (i%2==0){
//             wealths=wealths.concat(wealth1);
//           } else {
//             wealths=wealths.concat(wealth2);
//           }
//         } else {
//           children=children.concat(1);
//           if (i%2==0){
//             wealths=wealths.concat(wealth1);
//           } else {
//             wealths=wealths.concat(wealth2);
//           }
//         }
//       }
//     }
//   }
//   var newChild=shuffle(children, wealths);
//   var smallerKids=newChild[0];
//   var smallerWealth=newChild[1];
//   // var mapped = smallerWealth.sort(function(a, b) {return a-b;});
//   var list2 = [];
//   for (var j = 0; j < smallerKids.length; j++) {
//     list2.push({'genot': smallerKids[j], 'money': smallerWealth[j]});
//   }
//   list2.sort(function(a, b) {
//       return a.money - b.money;
//   });
//   for (var k = 0; k < list2.length; k++) {
//       smallerKids[k] = list2[k].genot;
//       smallerWealth[k] = list2[k].money;
//   }
//   console.log(list2);
//   return [smallerKids, smallerWealth];
// }
