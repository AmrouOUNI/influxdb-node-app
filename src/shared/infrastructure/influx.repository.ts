import { InfluxDB, Point } from "@influxdata/influxdb-client";

const url = process.env.INFLUXDB_URL;
const token = process.env.INFLUXDB_TOKEN;
const org = process.env.INFLUXDB_ORG;
const bucket = process.env.binance;

export const test = () => {
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
