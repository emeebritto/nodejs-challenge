import config from "config";
import { formatListName } from "../utils";

export const listName = formatListName(config.get("list.name"));
// export const isDevEnv = process.env.NODE_ENV === 'development';