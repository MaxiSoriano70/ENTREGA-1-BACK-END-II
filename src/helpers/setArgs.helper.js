import { Command } from "commander";

const args = new Command();

args.option("--mode <mode>", "mode prod/dev/test", "prod");
//args.option("-p <port>", "port", 8080);

args.parse();
export default args.opts();
