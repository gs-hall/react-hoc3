export function aggregateByMonth({ list, ...rest }) {
  return aggregate({
    dimensionName: "month",
    getDimensionFunction: (item => new Date(item.date).toLocaleString('en-US', { month: 'short' })),
    list,
    ...rest
  });
};

export function aggregateByYear({ list, ...rest }) {
  return aggregate({
    dimensionName: "year",
    getDimensionFunction: (item => new Date(item.date).getFullYear()),
    list,
    ...rest
  });
};

export function aggregateByDate({ list, ...rest }) {
  return aggregate({
    dimensionName: "date",
    getDimensionFunction: (item => item.date),
    list,
    ...rest
  });
};

export function aggregate({ list, dimensionName, getDimensionFunction, ...rest }) {
  var aggr = {};
  list.forEach((item, index) => {
    const x = getDimensionFunction(item);
    aggr[x] = aggr[x] !== undefined ? aggr[x] + item.amount : item.amount;
  });

  var result = [];
  Object.keys(aggr).sort().forEach(x => {
    result.push({[dimensionName]: x, "amount": aggr[x]});
    });

  return ({ list: result, ...rest });
};
