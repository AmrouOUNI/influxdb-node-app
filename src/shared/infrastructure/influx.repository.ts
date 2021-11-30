import { InfluxDB, Point } from "@influxdata/influxdb-client";

export const test = () => {
  const url = process.env.INFLUXDB_URL ?? "http://localhost:8086";
  const token = process.env.INFLUXDB_TOKEN ?? "";
  const org = process.env.INFLUXDB_ORG ?? "bstrategy";
  const bucket = process.env.INFLUXDB_BUCKET ?? "binance";
  const influxDB = new InfluxDB({ url, token });
  const writeApi = influxDB.getWriteApi(org, bucket);
  const point1 = new Point("temperature")
    .tag("sensor_id", "TLM010")
    .floatField("value", 24);

  writeApi.writePoint(point1);

  writeApi.close().then(() => {
    console.log("WRITE FINISHED");
  });
};

export const save = (trade: MyTrade) => {
  const url = process.env.INFLUXDB_URL ?? "http://localhost:8086";
  const token = process.env.INFLUXDB_TOKEN ?? "";
  const org = process.env.INFLUXDB_ORG ?? "bstrategy";
  const bucket = process.env.INFLUXDB_BUCKET ?? "binance";
  const influxDB = new InfluxDB({ url, token });
  const writeApi = influxDB.getWriteApi(org, bucket);

  const point1 = new Point("trades")
    .tag("symbol", trade.symbol)
    .tag("id", trade.id)
    .tag("order", trade.order)
    .tag("side", trade.side)
    .tag("takerOrMaker", trade.takerOrMaker)
    .floatField("price", trade.price)
    .floatField("amount", trade.amount)
    .floatField("cost", trade.cost)
    .floatField("price", trade.price)
    .timestamp(trade.timestamp);

  writeApi.writePoint(point1);

  writeApi.close().then(() => {
    console.log("WRITE FINISHED");
  });
};

export interface MyTrade {
  timestamp: number;
  datetime: Date;
  symbol: string;
  id: string;
  order: string;
  side: "buy" | "sell";
  takerOrMaker: "taker" | "maker";
  price: number;
  amount: number;
  cost: number;
  // fee: { cost: 0.075, currency: 'BAT' },
  // fees: [{ cost: 0.075, currency: 'BAT' }],

  // constructor(raw: MyTrade) {
  //   Object.assign(this, raw);
  // }
}
