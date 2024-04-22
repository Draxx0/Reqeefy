import { Agency } from "../agency";
import { AgentRole } from "./enum";

export interface Agent {
  id: string;
  role: AgentRole;
  agency_groups: Agency;
}
