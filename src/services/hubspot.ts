import Hubspot from "hubspot";
const hubspot = new Hubspot({ apiKey: process.env.HUBSPOT_API_KEY || "" });
export default hubspot;
