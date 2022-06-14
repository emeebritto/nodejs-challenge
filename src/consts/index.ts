import config from "config";
import { formatListName } from "../utils";

export const listName = formatListName(config.get("list.name"));